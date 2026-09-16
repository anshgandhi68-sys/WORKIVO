import React from 'react';
import { X, ShieldCheck, PhoneCall, MessageSquare, AlertTriangle, Clock } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cooperative Member Assistance</h3>
            <p className="text-xs text-slate-500">Hub #408 Central Dispatch & Support Guild</p>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-purple-100/60 hover:border-purple-300 transition-all">
            <PhoneCall className="w-5 h-5 text-[#5415A0] mb-2" />
            <h4 className="text-xs font-bold text-slate-800">Direct Hotline</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">1800-408-WORK (Toll-Free)</p>
            <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Avg 15s answer
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-purple-100/60 hover:border-purple-300 transition-all">
            <MessageSquare className="w-5 h-5 text-[#5415A0] mb-2" />
            <h4 className="text-xs font-bold text-slate-800">Artisan Peer Chat</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Live coordinator on duty</p>
            <span className="inline-block mt-2 text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Online now
            </span>
          </div>
        </div>

        {/* Co-op Policy Highlights */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-3 text-xs text-slate-600 p-3 rounded-xl bg-slate-50">
            <Clock className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">30-Minute Peer Replacement:</span> If your assigned member has an unforeseen emergency, an equivalent certified artisan is automatically mobilized.
            </div>
          </div>

          <div className="flex gap-3 text-xs text-slate-600 p-3 rounded-xl bg-slate-50">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">100% Escrow Protection:</span> Funds remain securely locked in the Cooperative Vault and are only disbursed upon your digital sign-off.
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          Close & Return to Booking
        </button>
      </div>
    </div>
  );
};
