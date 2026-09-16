import React, { useEffect, useState } from 'react';
import { 
  Check, 
  PartyPopper, 
  Calendar, 
  MapPin, 
  UserCheck, 
  Zap, 
  Lock, 
  ShieldCheck, 
  Navigation, 
  ArrowRight, 
  Download, 
  Store,
  Star,
  CheckCircle2,
  FileCheck,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Repeat
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../../context/BookingContext';
import { WhatsAppNotificationCard } from '../common/WhatsAppNotificationCard';

interface Step5ConfirmProps {
  onOpenReceiptModal: () => void;
  onOpenDashboardModal: () => void;
}

export const Step5Confirm: React.FC<Step5ConfirmProps> = ({ 
  onOpenReceiptModal, 
  onOpenDashboardModal 
}) => {
  const { state, pricing, cancelBooking, resetFlow } = useBooking();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Schedule change');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (state.status !== 'cancelled') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#5415A0', '#9333EA', '#C084FC', '#10B981']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [state.status]);

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    await cancelBooking(cancelReason);
    setIsCancelling(false);
    setIsCancelModalOpen(false);
  };

  // IF ORDER IS CANCELLED: Display reassuring cancellation receipt with 100% refund
  if (state.status === 'cancelled') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-rose-600">
            <XCircle className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order Cancelled & Escrow Refunded
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            <span>Booking ID: </span>
            <span className="font-extrabold text-slate-800">{state.bookingId}</span>
            <span> • 100% of your deposit has been reversed.</span>
          </p>
        </div>

        {/* Refund Status Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-900">
                Full Refund of ₹{state.refundAmount || pricing.depositRequired} Completed
              </h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Reversed to your UPI ID (<strong className="font-mono">{state.upiId}</strong>). Zero cancellation penalties charged under the WORKIVO Cooperative Charter.
              </p>
              <div className="mt-2 text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md w-fit">
                Reversal Tx: {state.refundTxHash || '0xREV849201COOP'}
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs text-slate-600">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-900">{state.selectedService?.title}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Scheduled Worker:</span>
              <span className="font-semibold text-slate-900">{state.selectedWorker?.name}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Reason for Cancellation:</span>
              <span className="font-semibold text-slate-900">{state.cancellationReason || 'Requested by user'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Artisan Notification:</span>
              <span className="text-slate-800 font-medium">Slot released back to Hub #408</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetFlow}
              className="flex-1 py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Book Another Service or Worker</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fadeIn">
      {/* Celebratory Hero Header */}
      <div className="text-center space-y-3">
        {/* Scalloped Purple Badge with Checkmark & Confetti */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-purple-100/70 flex items-center justify-center animate-pulse">
            <div className="w-14 h-14 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>
          <span className="absolute -top-1 -right-1 text-xl animate-bounce">
            🎉
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Booking & Escrow Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          <span>Booking ID: </span>
          <span className="font-extrabold text-slate-800">{state.bookingId}</span>
          <span> • {state.selectedWorker?.name} has been notified and scheduled.</span>
        </p>

        {state.frequency === 'every_saturday' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5415A0] text-xs font-bold border border-purple-200">
            <Repeat className="w-3.5 h-3.5" />
            <span>Regular Plan: Every Saturday Home Visit Active</span>
          </div>
        )}
      </div>

      {/* Main Confirmed Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top subtle ambient gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-[#5415A0] to-purple-400" />

        {/* 2x2 Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* 1. Service Reserved */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Service Reserved
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                {state.selectedService?.title}
              </h4>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100/70 text-[#5415A0]">
                Cooperative Certified
              </span>
            </div>
          </div>

          {/* 2. Scheduled Time */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Scheduled Time
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                {state.frequency === 'every_saturday' 
                  ? 'Every Saturday (Weekly)' 
                  : `${state.selectedDate.dayName}, ${state.selectedDate.month} ${state.selectedDate.dateNumber}, ${state.selectedDate.year}`}
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {state.selectedSlot?.timeRange} IST
              </p>
            </div>
          </div>

          {/* 3. Assigned Artisan */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Assigned Artisan
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                {state.selectedWorker?.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {state.selectedWorker?.title} • {state.selectedWorker?.guildPartner}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{state.selectedWorker?.rating} ({state.selectedWorker?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* 4. Service Address */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Service Address
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                {state.address.street}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {state.address.locality}, {state.address.city}, {state.address.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Escrow Protection Active Card */}
        <div className="rounded-2xl p-4 bg-[#FAF8FE] border border-purple-200/80 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-extrabold text-slate-900">
                Escrow Protection Active
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ₹{pricing.depositRequired} Secured
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">₹{pricing.depositRequired} Locked</span> in sovereign cooperative escrow. Balance of <span className="font-bold text-slate-900">₹{pricing.balanceOnSignoff}</span> is payable only upon your final satisfactory sign-off.
            </p>
          </div>
        </div>

        {/* Status Callout 1: Live Tracking */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
          <Navigation className="w-4 h-4 text-[#5415A0] shrink-0 transform rotate-45" />
          <span>
            <strong className="text-slate-800">Live Tracking:</strong> {state.selectedWorker?.name.split(' ')[0]} will send arrival telemetry 15 minutes before the arrival window.
          </span>
        </div>

        {/* Status Callout 2: WORKIVO Guarantee */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0" />
          <span>
            <strong className="text-slate-800">Zero Cancellation Penalty:</strong> Cancel anytime prior to dispatch for an instant 100% refund.
          </span>
        </div>
      </div>

      {/* Real-time Twilio WhatsApp Notification & 1-Click Dispatch Hub */}
      <WhatsAppNotificationCard />

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onOpenDashboardModal}
          className="w-full py-3.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View Active Booking in Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenReceiptModal}
          className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Escrow Receipt (PDF)</span>
        </button>

        {/* WORKING CANCEL BUTTON (User Request: "make the cancel button work cuz it does not work when we try to cancel that order") */}
        <button
          onClick={() => setIsCancelModalOpen(true)}
          className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <XCircle className="w-4 h-4 text-rose-600" />
          <span>Cancel This Booking (100% Instant Refund of ₹{pricing.depositRequired})</span>
        </button>

        <div className="text-center pt-2">
          <button
            onClick={resetFlow}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#5415A0] transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Return to Marketplace</span>
          </button>
        </div>
      </div>

      {/* CANCEL ORDER CONFIRMATION MODAL */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Cancel Work Order?</h3>
                <span className="text-xs text-slate-500">{state.bookingId}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Under the WORKIVO Fair Cancellation Charter, <strong className="text-slate-900">100% of your ₹{pricing.depositRequired} escrow deposit</strong> will be reversed immediately back to your UPI ID (<strong className="font-mono">{state.upiId}</strong>) with zero fee deduction.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Reason for cancellation:</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option value="Schedule change">Schedule change / Need another time</option>
                <option value="Issue resolved">Issue resolved on my own</option>
                <option value="Booked by mistake">Booked by mistake</option>
                <option value="Want to book another trade">Want to book another trade</option>
              </select>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                <span>{isCancelling ? 'Processing Instant Refund...' : `Yes, Cancel Order & Refund ₹${pricing.depositRequired}`}</span>
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                Keep Booking Active
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
