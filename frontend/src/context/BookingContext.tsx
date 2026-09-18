import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TradeId, 
  ServiceItem, 
  Worker, 
  TimeSlot, 
  CalendarDay, 
  AddressInfo, 
  BookingState,
  BookingFrequency
} from '../types';
import { 
  SERVICES, 
  WORKERS, 
  CALENDAR_DAYS, 
  TIME_SLOTS, 
  DEFAULT_ADDRESS 
} from '../data/mockData';
import { syncBookingToDatabase } from '../lib/supabase';

interface BookingContextType {
  state: BookingState;
  selectedTrade: TradeId;
  setSelectedTrade: (trade: TradeId) => void;
  selectService: (service: ServiceItem | null) => void;
  selectWorker: (worker: Worker) => void;
  workerSort: 'best_match' | 'distance' | 'rating' | 'availability';
  setWorkerSort: (sort: 'best_match' | 'distance' | 'rating' | 'availability') => void;
  sortedWorkers: Worker[];
  selectDate: (day: CalendarDay) => void;
  selectSlot: (slot: TimeSlot) => void;
  frequency: BookingFrequency;
  setFrequency: (freq: BookingFrequency) => void;
  recurringDay: string;
  setRecurringDay: (day: string) => void;
  updateAddress: (newAddress: AddressInfo) => void;
  setArtisanNotes: (notes: string) => void;
  setPaymentMethod: (method: 'upi' | 'card' | 'netbanking') => void;
  setUpiId: (id: string) => void;
  verifyUpi: () => Promise<boolean>;
  goToStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  nextStep: () => void;
  prevStep: () => void;
  confirmBooking: (razorpayPaymentId?: string) => Promise<void>;
  cancelBooking: (reason?: string) => Promise<void>;
  resetFlow: () => void;
  pricing: {
    baseRate: number;
    hourlyRate: number;
    estimatedHours: number;
    totalEstimate: number;
    discountAmount: number;
    finalTotal: number;
    depositRequired: number; // 25%
    balanceOnSignoff: number; // 75%
    workerDividend: number; // 85% of total
    healthcarePool: number; // 10% of total
    techMaintenance: number; // 5% of total
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(() => {
    try {
      const saved = sessionStorage.getItem('workivo_current_step');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 5) return num as any;
      }
    } catch {}
    return 1;
  });
  const [selectedTrade, setSelectedTradeState] = useState<TradeId>('cooking');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(SERVICES[0]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(WORKERS[0]);
  const [workerSort, setWorkerSort] = useState<'best_match' | 'distance' | 'rating' | 'availability'>('best_match');
  const [selectedDate, setSelectedDate] = useState<CalendarDay>(CALENDAR_DAYS[5]); // Sat 18 Popular
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(TIME_SLOTS[0]); // Morning 8-10
  const [frequency, setFrequency] = useState<BookingFrequency>('every_saturday');
  const [recurringDay, setRecurringDay] = useState<string>('Saturday');
  const [address, setAddress] = useState<AddressInfo>(DEFAULT_ADDRESS);
  const [artisanNotes, setArtisanNotes] = useState<string>('Gate code #4012. Please ring the calling bell.');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('9426262139@upi');
  const [isUpiVerified, setIsUpiVerified] = useState<boolean>(true);
  const [bookingId, setBookingId] = useState<string>('#WKV-849201');
  const [razorpayPaymentId, setRazorpayPaymentId] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [status, setStatus] = useState<'scheduled' | 'cancelled' | 'in_progress' | 'completed'>('scheduled');
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundTxHash, setRefundTxHash] = useState<string>('');

  // Handle Trade selection cleanly without showing wrong category options
  const setSelectedTrade = (trade: TradeId) => {
    setSelectedTradeState(trade);
    const matchingService = SERVICES.find(s => s.category === trade) || SERVICES[0];
    setSelectedService(matchingService);
    const matchingWorker = WORKERS.find(w => w.tradeCategory === trade) || WORKERS[0];
    setSelectedWorker(matchingWorker);
  };

  // Dynamic lower pricing calculations
  const hourlyRate = selectedWorker ? selectedWorker.hourlyRate : (selectedService?.price || 149);
  const estimatedHours = 1.5; // Realistic everyday duration
  const baseEstimate = selectedService?.priceUnit === 'fixed package' || selectedService?.priceUnit === 'fixed per unit'
    ? selectedService.price 
    : Math.round(hourlyRate * estimatedHours);

  // 10% cooperative recurring discount for regular bookings (e.g. Every Saturday)
  const isRecurring = frequency !== 'one_time';
  const discountAmount = isRecurring ? Math.round(baseEstimate * 0.10) : 0;
  const finalTotal = Math.max(99, baseEstimate - discountAmount);

  // 25% escrow lock (Reduced to ₹1 for gateway test mode and ₹1 QR Code generation)
  const depositRequired = 1;
  const balanceOnSignoff = Math.max(0, finalTotal - depositRequired);
  
  // 85% / 10% / 5% Co-op Transparent Wage Split
  const workerDividend = Math.round(finalTotal * 0.85);
  const healthcarePool = Math.round(finalTotal * 0.10);
  const techMaintenance = finalTotal - workerDividend - healthcarePool;

  // Filtered and Sorted Workers
  const relevantWorkers = selectedTrade === 'all'
    ? WORKERS
    : WORKERS.filter(w => w.tradeCategory === selectedTrade);
  
  const displayWorkers = relevantWorkers.length > 0 ? relevantWorkers : WORKERS;

  const sortedWorkers = [...displayWorkers].sort((a, b) => {
    if (workerSort === 'distance') return a.distanceKm - b.distanceKm;
    if (workerSort === 'rating') return b.rating - a.rating;
    if (workerSort === 'availability') return a.earliestSlotText.localeCompare(b.earliestSlotText);
    return 0; // default best match
  });

  const selectService = (service: ServiceItem | null) => {
    setSelectedService(service);
  };

  const selectWorker = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const selectDate = (day: CalendarDay) => {
    if (!day.isFull) {
      setSelectedDate(day);
    }
  };

  const selectSlot = (slot: TimeSlot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const updateAddress = (newAddress: AddressInfo) => {
    setAddress(newAddress);
  };

  const verifyUpi = async (): Promise<boolean> => {
    if (!upiId || !upiId.includes('@')) return false;
    await new Promise(r => setTimeout(r, 400));
    setIsUpiVerified(true);
    return true;
  };

  const goToStep = (step: 1 | 2 | 3 | 4 | 5) => {
    setCurrentStep(step);
    try {
      sessionStorage.setItem('workivo_current_step', step.toString());
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      goToStep((currentStep + 1) as any);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep((currentStep - 1) as any);
    }
  };

  const confirmBooking = async (paymentId?: string) => {
    setStatus('scheduled');
    const finalPaymentId = paymentId || razorpayPaymentId;
    if (finalPaymentId) {
      setRazorpayPaymentId(finalPaymentId);
    }
    setPaymentStatus('success');

    const currentState: BookingState = {
      currentStep: 5,
      selectedTrade,
      selectedService,
      selectedWorker,
      selectedDate,
      selectedSlot,
      frequency,
      recurringDay,
      address,
      artisanNotes,
      paymentMethod,
      upiId,
      isUpiVerified,
      bookingId,
      razorpayPaymentId: finalPaymentId || undefined,
      paymentStatus: 'success',
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    await syncBookingToDatabase(currentState);
    goToStep(5);
  };

  // 100% Instant Escrow Refund on Cancellation
  const cancelBooking = async (reason: string = 'Customer requested cancellation') => {
    const refund = depositRequired;
    const reversalTx = '0xREV' + Math.random().toString(16).substring(2, 8).toUpperCase() + 'COOP';
    setStatus('cancelled');
    setCancellationReason(reason);
    setRefundAmount(refund);
    setRefundTxHash(reversalTx);

    const cancelledState: BookingState = {
      currentStep,
      selectedTrade,
      selectedService,
      selectedWorker,
      selectedDate,
      selectedSlot,
      frequency,
      recurringDay,
      address,
      artisanNotes,
      paymentMethod,
      upiId,
      isUpiVerified,
      bookingId,
      status: 'cancelled',
      cancellationReason: reason,
      refundAmount: refund,
      refundTxHash: reversalTx,
      createdAt: new Date().toISOString()
    };
    await syncBookingToDatabase(cancelledState);
  };

  const resetFlow = () => {
    try {
      sessionStorage.removeItem('workivo_current_step');
    } catch {}
    setCurrentStep(1);
    setStatus('scheduled');
    setCancellationReason('');
    setRefundAmount(0);
    setRefundTxHash('');
    setRazorpayPaymentId('');
    setPaymentStatus('pending');
    setSelectedService(SERVICES[0]);
    setSelectedWorker(WORKERS[0]);
    setSelectedDate(CALENDAR_DAYS[5]);
    setSelectedSlot(TIME_SLOTS[0]);
    setFrequency('every_saturday');
    setBookingId(`#WKV-${Math.floor(100000 + Math.random() * 900000)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bookingState: BookingState = {
    currentStep,
    selectedTrade,
    selectedService,
    selectedWorker,
    selectedDate,
    selectedSlot,
    frequency,
    recurringDay,
    address,
    artisanNotes,
    paymentMethod,
    upiId,
    isUpiVerified,
    bookingId,
    razorpayPaymentId,
    paymentStatus,
    status,
    cancellationReason,
    refundAmount,
    refundTxHash,
    createdAt: new Date().toISOString()
  };

  return (
    <BookingContext.Provider
      value={{
        state: bookingState,
        selectedTrade,
        setSelectedTrade,
        selectService,
        selectWorker,
        workerSort,
        setWorkerSort,
        sortedWorkers,
        selectDate,
        selectSlot,
        frequency,
        setFrequency,
        recurringDay,
        setRecurringDay,
        updateAddress,
        setArtisanNotes,
        setPaymentMethod,
        setUpiId,
        verifyUpi,
        goToStep,
        nextStep,
        prevStep,
        confirmBooking,
        cancelBooking,
        resetFlow,
        pricing: {
          baseRate: hourlyRate,
          hourlyRate,
          estimatedHours,
          totalEstimate: baseEstimate,
          discountAmount,
          finalTotal,
          depositRequired,
          balanceOnSignoff,
          workerDividend,
          healthcarePool,
          techMaintenance
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
