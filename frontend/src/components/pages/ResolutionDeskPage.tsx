import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  Clock, 
  User, 
  Star, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  XCircle,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface ResolutionDeskPageProps {
  onBackToBookings: () => void;
  onSelectReplacement: (artisanName: string) => void;
}

export const ResolutionDeskPage: React.FC<ResolutionDeskPageProps> = ({ 
  onBackToBookings, 
  onSelectReplacement 
}) => {
  const [selectedReplacement, setSelectedReplacement] = useState('Anil Patel');
  const [isHandoverComplete, setIsHandoverComplete] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const handleAccept = (name: string) => {
    setSelectedReplacement(name);
    setIsHandoverComplete(true);
    setTimeout(() => {
      onSelectReplacement(name);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Breadcrumb & Escrow Protected Pill */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToBookings}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#5415A0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Active Bookings / Resolution Desk</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#5415A0] text-xs font-bold border border-purple-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Escrow Protected (₹1 Deposited)</span>
        </div>
      </div>

      {/* Main Resolution Alert Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            Booking Update #WKV-849201
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your worker is unavailable.
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            WORKIVO found 3 verified peer alternatives ready for dispatch.
          </p>
        </div>

        {/* 100% Peer Replacement Guarantee Banner */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Your scheduled slot (<strong className="text-slate-900">Today, 08:00 AM – 10:00 AM</strong>) and <strong className="text-slate-900">₹1 escrow deposit</strong> are 100% protected under the WORKIVO Peer Replacement Guarantee. Seamless handover with zero extra charge.
          </p>
        </div>

        {/* 3 Context Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100/70 flex items-start gap-3">
            <Zap className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5 fill-current" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Service Task</span>
              <span className="text-xs font-bold text-slate-900 block mt-0.5">Residential Rewiring & Load Balancing</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100/70 flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Window & District</span>
              <span className="text-xs font-bold text-slate-900 block mt-0.5">Today, 08:00 AM – 10:00 AM</span>
              <span className="text-[10px] text-slate-500">Indiranagar, Bengaluru</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100/70 flex items-start gap-3">
            <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Original Artisan</span>
              <span className="text-xs font-bold text-slate-900 block mt-0.5">Ansh Gandhi</span>
              <span className="text-[10px] text-rose-600 font-semibold">Emergency tool repair at Guild #408</span>
            </div>
          </div>
        </div>
      </div>

      {/* Select a Verified Replacement Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Select a Verified Replacement</h2>
            <p className="text-xs text-slate-500">Each artisan has accepted your dispatch details and has immediate peer guild authorization.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>• Standard ₹450/hr capped rate</span>
            <span>• Instant 1-Click Handover</span>
          </div>
        </div>

        {/* 3 Replacement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Anil Patel (Selected / 98% Match) */}
          <div className={`bg-white rounded-3xl p-5 sm:p-6 transition-all border-2 ${
            selectedReplacement === 'Anil Patel' 
              ? 'border-[#5415A0] shadow-md ring-1 ring-[#5415A0]' 
              : 'border-slate-200'
          } flex flex-col justify-between space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#5415A0] text-white">
                  98% MATCH
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#5415A0]">
                  Best Proximity
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
                  alt="Anil Patel"
                  className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Anil Patel</h3>
                  <p className="text-xs text-slate-500">Master Electrician</p>
                  <p className="text-[10px] font-bold text-[#5415A0]">🛡️ Guild Partner #408</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-extrabold text-slate-900">4.9 (214 jobs completed)</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-bold text-slate-900">2.1 km away (Indiranagar East)</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-extrabold text-emerald-700">Ready for 08:00 AM slot</span>
                </div>
                <div className="text-[10px] text-slate-400 text-right">Arrival within 25 mins</div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Verified Skill Match</span>
                <div className="flex flex-wrap gap-1">
                  {['Load Balancing', 'Circuit Breakers', 'Industrial Wire'].map((s, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-base font-black text-slate-900">₹450</span>
                  <span className="text-xs text-slate-400">/hr</span>
                  <p className="text-[10px] text-slate-400">Identical Co-op Standard Rate</p>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-[#5415A0]">
                  ₹0 Price Difference
                </span>
              </div>

              <button
                onClick={() => handleAccept('Anil Patel')}
                className="w-full py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Accept Replacement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Priya Sunder */}
          <div className={`bg-white rounded-3xl p-5 sm:p-6 transition-all border-2 ${
            selectedReplacement === 'Priya Sunder' 
              ? 'border-[#5415A0] shadow-md ring-1 ring-[#5415A0]' 
              : 'border-slate-200'
          } flex flex-col justify-between space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  96% MATCH
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                  Systems Expert
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                  alt="Priya Sunder"
                  className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Priya Sunder</h3>
                  <p className="text-xs text-slate-500">Electrical Systems Engineer</p>
                  <p className="text-[10px] font-bold text-[#5415A0]">🛡️ Guild Partner #312</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-extrabold text-slate-900">4.9 (98 jobs completed)</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-bold text-slate-900">3.4 km away (HAL / Old Airport Rd)</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-extrabold text-slate-800">Ready for 08:15 AM slot</span>
                </div>
                <div className="text-[10px] text-slate-400 text-right">Buffer: +15 mins</div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Verified Skill Match</span>
                <div className="flex flex-wrap gap-1">
                  {['Panel Rewiring', 'Inverter Setup', 'Safety Isolation'].map((s, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-base font-black text-slate-900">₹450</span>
                  <span className="text-xs text-slate-400">/hr</span>
                  <p className="text-[10px] text-slate-400">Escrow covered • 100% Wage Parity</p>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  Co-op Guaranteed
                </span>
              </div>

              <button
                onClick={() => handleAccept('Priya Sunder')}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Accept Replacement</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Siddharth Rao */}
          <div className={`bg-white rounded-3xl p-5 sm:p-6 transition-all border-2 ${
            selectedReplacement === 'Siddharth Rao' 
              ? 'border-[#5415A0] shadow-md ring-1 ring-[#5415A0]' 
              : 'border-slate-200'
          } flex flex-col justify-between space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  94% MATCH
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                  Fast Response
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                  alt="Siddharth Rao"
                  className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Siddharth Rao</h3>
                  <p className="text-xs text-slate-500">Senior Wireman</p>
                  <p className="text-[10px] font-bold text-[#5415A0]">🛡️ Guild Partner #408</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-extrabold text-slate-900">4.8 (176 jobs completed)</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-bold text-slate-900">2.8 km away (Domlur Hub)</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-extrabold text-slate-800">Ready for 08:30 AM slot</span>
                </div>
                <div className="text-[10px] text-slate-400 text-right">Buffer: +30 mins</div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Verified Skill Match</span>
                <div className="flex flex-wrap gap-1">
                  {['Heavy Rewiring', 'Fault Diagnostics', 'Concealed Wiring'].map((s, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-base font-black text-slate-900">₹450</span>
                  <span className="text-xs text-slate-400">/hr</span>
                  <p className="text-[10px] text-slate-400">Escrow covered • Zero surcharge</p>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  Co-op Guaranteed
                </span>
              </div>

              <button
                onClick={() => handleAccept('Siddharth Rao')}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Accept Replacement</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Guarantee & Cancellation Actions */}
      <div className="bg-[#FAF8FE] border border-purple-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-slate-900">
                WORKIVO Peer Replacement Guarantee
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                Civic Shield
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              All alternatives are peer-vetted co-owners in your district hub with identical certified toolkits, synchronized diagnosis briefs, and equal wage parity. No hidden fees or renegotiations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert("Reschedule window opened: You may pick any future slot this week without losing your deposit.")}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
          >
            Need to reschedule instead?
          </button>

          <button
            onClick={() => {
              if (confirm("Cancel this booking? Your ₹1 escrow deposit will be reversed instantly to your UPI account.")) {
                alert("Escrow deposit reversed (₹1.00 refunded via UPI: ansh.coop@oksbi).");
                onBackToBookings();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel with Instant Full Refund (₹1)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
