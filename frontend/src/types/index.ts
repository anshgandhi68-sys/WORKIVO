export type TradeId = 
  | 'all' 
  | 'cooking' 
  | 'cleaning' 
  | 'salon' 
  | 'electrical' 
  | 'plumbing' 
  | 'carpentry' 
  | 'appliance' 
  | 'painting';

export type BookingFrequency = 
  | 'one_time' 
  | 'every_saturday' 
  | 'weekly' 
  | 'biweekly' 
  | 'daily_weekdays';

export interface ServiceItem {
  id: string;
  title: string;
  category: TradeId;
  description: string;
  price: number;
  priceUnit: '/hr' | 'fixed package' | 'diagnostic' | 'fixed per unit';
  estimatedDuration: string;
  badge?: {
    text: string;
    variant: 'recommended' | 'fixed' | 'hourly' | 'priority' | 'standard' | 'smart';
  };
  arrivalNotice?: string;
  isRecommended?: boolean;
}

export interface Worker {
  id: string;
  name: string;
  initials: string;
  title: string;
  tradeCategory?: TradeId;
  guildPartner: string;
  rating: number;
  reviewCount: number;
  jobsDone: number;
  experienceYears: number;
  distanceKm: number;
  hubLocation: string;
  skills: string[];
  earliestSlotText: string;
  hourlyRate: number;
  avatarUrl: string;
  badge: {
    text: string;
    variant: 'selected' | 'member' | 'senior';
  };
}

export interface TimeSlot {
  id: string;
  key: 'morning' | 'midday' | 'afternoon' | 'evening';
  title: string;
  timeRange: string;
  subtitle: string;
  badge: 'Recommended' | 'Available' | 'Booked';
  isAvailable: boolean;
}

export interface CalendarDay {
  dayName: string;
  dateNumber: number;
  month: string;
  year: number;
  slotStatusText: string;
  isFull: boolean;
  isOptimal?: boolean;
  isAvailable: boolean;
}

export interface AddressInfo {
  street: string;
  locality: string;
  city: string;
  pincode: string;
  apartmentDetails: string;
  landmark: string;
}

export interface BookingState {
  currentStep: 1 | 2 | 3 | 4 | 5;
  selectedTrade: TradeId;
  selectedService: ServiceItem | null;
  selectedWorker: Worker | null;
  selectedDate: CalendarDay;
  selectedSlot: TimeSlot | null;
  frequency: BookingFrequency;
  recurringDay?: string;
  address: AddressInfo;
  artisanNotes: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  upiId: string;
  isUpiVerified: boolean;
  bookingId: string;
  razorpayPaymentId?: string;
  paymentStatus?: 'pending' | 'success' | 'failed';
  status: 'scheduled' | 'cancelled' | 'in_progress' | 'completed';
  cancellationReason?: string;
  refundAmount?: number;
  refundTxHash?: string;
  createdAt: string;
}

export interface PricingBreakdown {
  baseRate: number;
  hourlyRate: number;
  estimatedHours: number;
  totalEstimate: number;
  discountAmount: number;
  finalTotal: number;
  depositRequired: number;
  balanceOnSignoff: number;
  workerDividend: number;
  healthcarePool: number;
  techMaintenance: number;
}
