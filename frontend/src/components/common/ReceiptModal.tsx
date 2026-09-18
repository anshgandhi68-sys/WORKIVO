import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Download } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose }) => {
  const { state, pricing } = useBooking();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Area */}
        <div id="receipt-print-area">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5415A0] p-1 flex items-center justify-center shadow-xs shrink-0">
                <img src="/workivo-balloon-icon.png" alt="WORKIVO Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 tracking-tight text-lg">WORKIVO</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Cooperative Escrow Certificate</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Funds Safeguarded
              </span>
              <p className="text-xs font-mono text-slate-500 mt-1 font-semibold">{state.bookingId}</p>
            </div>
          </div>

          {/* Core Info */}
          <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-600">Escrow Transaction Hash:</span>
              <span className="font-mono text-slate-800 font-semibold">0x7F2a...49E1</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-600">Initial Escrow Lock (25%):</span>
              <span className="font-bold text-[#5415A0] text-sm">₹{pricing.depositRequired}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Balance on Final Sign-off (75%):</span>
              <span className="font-semibold text-slate-800">₹{pricing.balanceOnSignoff}</span>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3 text-xs mb-6">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-800 text-right">{state.selectedService?.title}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Assigned Member-Owner:</span>
              <span className="font-semibold text-slate-800 text-right">{state.selectedWorker?.name} ({state.selectedWorker?.guildPartner})</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Scheduled Date & Time:</span>
              <span className="font-semibold text-slate-800 text-right">Wednesday, Oct 15, 2025 • {state.selectedSlot?.timeRange}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Premises Address:</span>
              <span className="font-semibold text-slate-800 text-right">{state.address.street}, {state.address.locality}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Payment Channel:</span>
              <span className="font-semibold text-slate-800 uppercase">
                {state.razorpayPaymentId ? 'Razorpay UPI QR' : state.paymentMethod} {state.paymentMethod === 'upi' && state.upiId && !state.razorpayPaymentId ? `(${state.upiId})` : ''}
              </span>
            </div>
            {state.razorpayPaymentId && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Razorpay Ref ID:</span>
                <span className="font-mono font-bold text-[#5415A0] text-xs">{state.razorpayPaymentId}</span>
              </div>
            )}
          </div>

          {/* Wage Split Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 mb-6">
            <h4 className="text-xs font-bold text-slate-800 mb-2">Audited Cooperative Wage Allocation (₹{pricing.totalEstimate})</h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-700">
                <span>• Direct to {state.selectedWorker?.name} (85% Artisan Dividend)</span>
                <span className="font-semibold">₹{pricing.workerDividend}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Guild Healthcare & Tool Insurance Pool (10%)</span>
                <span className="font-semibold">₹{pricing.healthcarePool}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Open Technology Maintenance & Peer Auditing (5%)</span>
                <span className="font-semibold">₹{pricing.techMaintenance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0" />
            <span>Cryptographically sealed under WORKIVO Fair Trade Charter & Karnataka Cooperative Societies Act.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 print:hidden">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="w-1/2 py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Receipt / PDF
          </button>
        </div>
      </div>
    </div>
  );
};
