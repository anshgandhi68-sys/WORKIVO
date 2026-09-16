import React, { useState } from 'react';
import { X, Navigation, Phone, ShieldCheck, CheckCircle2, AlertCircle, XCircle, RotateCcw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose }) => {
  const { state, pricing, cancelBooking } = useBooking();
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const isCancelled = state.status === 'cancelled';

  const handleCancel = async () => {
    if (confirm(`Cancel this booking? 100% of your ₹${pricing.depositRequired} escrow deposit will be refunded immediately back to ${state.upiId}.`)) {
      setIsCancelling(true);
      await cancelBooking('User cancelled from active dashboard');
      setIsCancelling(false);
      alert(`Booking #WKV-849201 cancelled. Instant refund of ₹${pricing.depositRequired} credited back to ${state.upiId}.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isCancelled ? 'bg-rose-100 text-rose-600' : 'bg-purple-100 text-[#5415A0]'
          }`}>
            {isCancelled ? <XCircle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                {isCancelled ? 'Cancelled Work Order' : 'Active Work Order'}
              </h3>
              <span className="text-xs font-mono font-bold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-md">
                {state.bookingId}
              </span>
            </div>
            <p className="text-xs text-slate-500">Karnataka Cooperative Guild Hub #408</p>
          </div>
        </div>

        {/* Live Status Tracker or Cancelled Notice */}
        {isCancelled ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Order Cancelled & 100% Refunded</span>
            </div>
            <p className="text-xs text-rose-600 leading-relaxed">
              Deposit of ₹{state.refundAmount || pricing.depositRequired} was reversed to {state.upiId}. Reversal hash: {state.refundTxHash || '0xREV849201COOP'}.
            </p>
          </div>
        ) : (
          <div className="bg-[#F8F9FE] border border-purple-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-700">Dispatch Status</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Escrow Active & Scheduled
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-purple-200">
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#5415A0] ring-4 ring-purple-100" />
                <h4 className="text-xs font-bold text-slate-900">Escrow Mobilization Authorized</h4>
                <p className="text-[11px] text-slate-500">₹{pricing.depositRequired} locked safely in peer-audited vault</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#5415A0] ring-4 ring-purple-100" />
                <h4 className="text-xs font-bold text-slate-900">Artisan Roster Locked</h4>
                <p className="text-[11px] text-slate-500">
                  {state.selectedWorker?.name} allocated for {state.frequency === 'every_saturday' ? 'Every Saturday' : 'Wednesday, Oct 15'} ({state.selectedSlot?.timeRange})
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                <h4 className="text-xs font-semibold text-slate-500">Arrival Telemetry</h4>
                <p className="text-[11px] text-slate-400">GPS location broadcast activates 15 mins prior to slot</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                <h4 className="text-xs font-semibold text-slate-500">Service Completion & Digital Sign-off</h4>
                <p className="text-[11px] text-slate-400">Remaining ₹{pricing.balanceOnSignoff} disbursed only after your 100% satisfaction</p>
              </div>
            </div>
          </div>
        )}

        {/* Assigned Artisan Card */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <img 
              src={state.selectedWorker?.avatarUrl} 
              alt={state.selectedWorker?.name} 
              className="w-12 h-12 rounded-full object-cover border border-purple-200"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{state.selectedWorker?.name}</h4>
              <p className="text-xs text-[#5415A0] font-medium">{state.selectedWorker?.title} • {state.selectedWorker?.guildPartner}</p>
              <p className="text-[11px] text-slate-500">⭐ {state.selectedWorker?.rating} ({state.selectedWorker?.reviewCount} reviews)</p>
            </div>
          </div>
          <button
            onClick={() => alert(`Direct artisan contact line: +91 98450 12408. Hub #408 coordinates dispatched call.`)}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-[#5415A0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>

        {/* Modal Buttons: Close + Working Cancel Button */}
        <div className="space-y-2 pt-2">
          {!isCancelled && (
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Cancel Order (100% Instant Refund of ₹{pricing.depositRequired})</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
