import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  MapPin, 
  Zap, 
  Wrench, 
  Hammer, 
  Sparkles, 
  Lock, 
  Users, 
  Clock, 
  Star, 
  CheckCircle2, 
  Check, 
  Award,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigateToBooking: (trade?: string) => void;
  onNavigateToServices: () => void;
  onNavigateToCoop: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigateToBooking, 
  onNavigateToServices, 
  onNavigateToCoop 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('Ward 112: Indiranagar & Domlur');

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section with Live Match Card */}
      <section className="pt-4 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Hero Content (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-[#5415A0]" />
            <span>Democratic Worker Cooperative • 0% Venture Extraction</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Small Tasks, <span className="text-[#5415A0]">Big Relief.</span><br />
            Owned by the People Who Do the Work.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
            Verified municipal craftspeople. Guaranteed living wages with 25/75 dual milestone escrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToBooking('electrical')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#5415A0] hover:bg-[#430E7E] text-white font-extrabold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Book a Trusted Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToCoop}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-[#5415A0]" />
              <span>Explore Co-op Ownership</span>
            </button>
          </div>
        </div>

        {/* Right Hero: Live Guild Match Widget (Span 5) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">Live Guild Match</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#5415A0] border border-purple-200">
                Dispatch Hub #408
              </span>
            </div>

            {/* Worker Preview */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80"
                  alt="Raghavan S."
                  className="w-12 h-12 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Raghavan S.</h4>
                  <p className="text-[11px] text-[#5415A0] font-semibold">Master Electrician • Shareholder #017</p>
                  <p className="text-[10px] text-slate-500">⭐ 4.96 (326 tasks) • Indiranagar, 2.4 km</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-slate-900">₹149</span>
                <span className="text-xs text-slate-400 block">/hr</span>
              </div>
            </div>

            {/* Dual Milestone Escrow Box */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#5415A0]" />
                  25/75 Milestone Escrow
                </span>
                <span className="text-[10px] font-extrabold text-[#5415A0] bg-white px-2 py-0.5 rounded-md border border-purple-200">
                  25% Locked upon dispatch
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 text-[11px]">Phase 1: Transit & Initial Service Lock</span>
                <span className="font-extrabold text-slate-900">₹75 Held</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToBooking('electrical')}
              className="w-full py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Confirm Match & Reserve Slot
            </button>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Living Wage Multiplier: 1.6x Municipal Floor
              </span>
              <span className="font-mono text-slate-400">#DISPATCH-849</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search Bar Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#F8F9FE] border border-slate-200/80">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks: e.g., 'EV Charger Installation', 'Dual-Split AC Repair', 'Custom Joinery' ..."
              className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F8F9FE] border border-slate-200/80 shrink-0">
            <MapPin className="w-4 h-4 text-[#5415A0] shrink-0" />
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option>Ward 112: Indiranagar & Domlur</option>
              <option>Ward 145: Koramangala Central</option>
              <option>Ward 084: Malleshwaram West</option>
              <option>Ward 174: HSR Layout Sector 1-7</option>
            </select>
          </div>

          <button
            onClick={() => onNavigateToServices()}
            className="px-6 py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white font-extrabold text-xs rounded-2xl transition-colors shrink-0 shadow-sm"
          >
            Find Certified Co-op Member
          </button>
        </div>

        {/* Quick Trade Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
          {[
            { label: '🍳 Daily Home Cooking', trade: 'cooking' },
            { label: '🧹 Cleaning & Housekeeping', trade: 'cleaning' },
            { label: '💅 Manicure & Pedicure', trade: 'salon' },
            { label: '⚡ Electrical & Appliance', trade: 'electrical' },
            { label: '🔧 Plumbing & HVAC', trade: 'plumbing' },
            { label: '🪚 Carpentry & Joinery', trade: 'carpentry' },
          ].map((pill, i) => (
            <button
              key={i}
              onClick={() => onNavigateToBooking(pill.trade)}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#F8F9FE] hover:bg-purple-100/70 text-slate-700 hover:text-[#5415A0] border border-slate-200/80 transition-colors shrink-0"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. The Cooperative Difference Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold text-[#5415A0] uppercase tracking-wider">
              Civic Infrastructure & Economic Equity
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              The Cooperative Difference
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Zero venture extraction. 100% owned and operated by municipal craftspeople.
            </p>
          </div>
          <button 
            onClick={onNavigateToCoop}
            className="text-xs font-bold text-[#5415A0] hover:underline flex items-center gap-1"
          >
            <span>Read Guild Charter #408</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  85% Payout
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">Living Wage</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                85% goes directly to technicians, with 15% dedicated to healthcare and shared tools.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-600">
              <span>Municipal Floor:</span>
              <span className="font-extrabold text-slate-900">1.6x Base Rate</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  Dual Escrow
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">25/75 Escrow</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                25% is reserved on dispatch, the remaining 75% unlocks only after your physical sign-off.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-600">
              <span>Protection:</span>
              <span className="font-extrabold text-emerald-700">Zero Upward Risk</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700">
                  Guaranteed
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">Peer Backup</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Peer artisans step in immediately if emergencies arise, ensuring zero task abandonment.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-600">
              <span>Dispatch Rate:</span>
              <span className="font-extrabold text-[#5415A0]">99.4% Verified</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  No Surge
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">WORKIVO Match</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ethical round dispatch based strictly on proximity and skills, banning surge pricing.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-600">
              <span>Pricing Policy:</span>
              <span className="font-extrabold text-slate-900">Fixed Ward Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Member-Owners on Duty */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold text-[#5415A0] uppercase tracking-wider">
              Direct Guild Hire
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Verified Member-Owners on Duty
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Hire vetted craftspeople directly without algorithmic obscurities. Every worker holds voting shares in the cooperative.
            </p>
          </div>
          <button 
            onClick={onNavigateToCoop}
            className="text-xs font-bold text-[#5415A0] hover:underline flex items-center gap-1"
          >
            <span>Browse all 1,400+ members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Artisan 1: Pooja Nair */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                    alt="Pooja Nair"
                    className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Pooja Nair</h3>
                    <span className="inline-block text-[10px] font-extrabold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-md mt-0.5">
                      Owner #0716
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900">₹750</span>
                  <span className="text-[10px] text-slate-400 block">per hour</span>
                </div>
              </div>

              <p className="text-xs font-bold text-[#5415A0] mt-3">
                HVAC & Commercial Inverter Specialist
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ⭐ 4.99 (240 Tasks) • Indiranagar Hub
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Heat Pumps', 'ICB Retrofit', 'BEE 5-Star Certified'].map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateToBooking('electrical')}
              className="w-full py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
            >
              Book Specialist
            </button>
          </div>

          {/* Artisan 2: Kavish Mehta */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Kavish Mehta"
                    className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Kavish Mehta</h3>
                    <span className="inline-block text-[10px] font-extrabold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-md mt-0.5">
                      Owner #0289
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900">₹820</span>
                  <span className="text-[10px] text-slate-400 block">per hour</span>
                </div>
              </div>

              <p className="text-xs font-bold text-[#5415A0] mt-3">
                Architectural Joinery & Custom Cabinetry
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ⭐ 4.97 (440 Tasks) • Koramangala Hub
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Solid Teak Repair', 'Modular Fittings', 'Skill-India Certified'].map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateToBooking('carpentry')}
              className="w-full py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
            >
              Book Specialist
            </button>
          </div>

          {/* Artisan 3: Anand Vardhan */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                    alt="Anand Vardhan"
                    className="w-13 h-13 rounded-2xl object-cover border border-purple-200"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Anand Vardhan</h3>
                    <span className="inline-block text-[10px] font-extrabold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-md mt-0.5">
                      Owner #0533
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900">₹680</span>
                  <span className="text-[10px] text-slate-400 block">per hour</span>
                </div>
              </div>

              <p className="text-xs font-bold text-[#5415A0] mt-3">
                Hydraulic Systems & Acoustic Leak Detection
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ⭐ 4.96 (302 Tasks) • Malleshwaram Hub
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Pressure Valves', 'Thermal Camera', 'Borewell Pumps'].map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateToBooking('plumbing')}
              className="w-full py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
            >
              Book Specialist
            </button>
          </div>
        </div>
      </section>

      {/* 5. Where Does Your Money Actually Go? (Radical Financial Transparency) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#5415A0] uppercase tracking-wider">
            Radical Financial Transparency
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Where Does Your Money Actually Go?
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Verifiable on-chain ledger comparing cooperative payout vs venture gig apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WORKIVO Model Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#5415A0] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#5415A0] text-white flex items-center justify-center font-black text-xs">
                  W
                </div>
                <h3 className="text-base font-extrabold text-slate-900">WORKIVO Model</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-100 text-[#5415A0]">
                Member-Owned Guild
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Direct Worker Wage</span>
                  <span className="text-[#5415A0]">85%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5415A0] rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Mutual Tool & Healthcare Reserve</span>
                  <span>10%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#9333EA] rounded-full w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Open Ledger Server & Civic Ops</span>
                  <span>5%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C084FC] rounded-full w-[5%]" />
                </div>
              </div>

              <div className="pt-2 flex justify-between text-xs font-bold text-slate-800">
                <span>Corporate Extraction / Venture Dividends</span>
                <span className="text-emerald-700 font-extrabold">0% (Prohibited)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Audited monthly by Municipal Assembly</span>
              <span className="font-extrabold text-[#5415A0]">100% On-Chain Verifiable</span>
            </div>
          </div>

          {/* Conventional Gig Apps Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 opacity-90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-700">Conventional Gig Apps</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600">
                Venture Platforms
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Worker Wage (Post-Penalties)</span>
                  <span className="text-rose-600">~46% - 54%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full w-[50%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Platform Take-Rate & Commission</span>
                  <span className="text-rose-600">32% - 40%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full w-[36%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Arbitrary Surge & Lead Fees</span>
                  <span className="text-rose-600">14% - 18%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[16%]" />
                </div>
              </div>

              <div className="pt-2 flex justify-between text-xs font-bold text-slate-700">
                <span>Worker Healthcare & Safety Fund</span>
                <span className="text-slate-400 font-medium">0% (Worker Bears All Risk)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Worker Turnover: 72% Annual</span>
              <span className="font-extrabold text-rose-600">Black-Box Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
            100% Escrow-Protected Marketplace
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Experience small tasks with <span className="text-[#5415A0]">big relief.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Book verified guild artisans backed by living wages and guaranteed dual escrow.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateToBooking('electrical')}
            className="px-6 py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white font-extrabold text-xs rounded-xl transition-colors shadow-sm"
          >
            Post a Task Now
          </button>
          <button
            onClick={onNavigateToCoop}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-colors"
          >
            Apply as Member-Owner
          </button>
        </div>
      </section>
    </div>
  );
};
