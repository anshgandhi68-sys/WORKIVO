import React, { useState } from 'react';
import { 
  Shield, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Award, 
  Zap, 
  Calendar, 
  Share2, 
  MessageSquare, 
  ExternalLink, 
  Wrench, 
  Truck, 
  FileCheck, 
  AlertCircle,
  ThumbsUp,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface ArtisanProfilePageProps {
  onBookArtisan?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToCoop?: () => void;
}

export const ArtisanProfilePage: React.FC<ArtisanProfilePageProps> = ({
  onBookArtisan,
  onNavigateToServices,
  onNavigateToCoop
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'availability' | 'reviews' | 'history'>('overview');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBook = (serviceName?: string) => {
    if (onBookArtisan) {
      onBookArtisan();
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Top Breadcrumb & Cooperative Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span 
            onClick={onNavigateToCoop}
            className="hover:text-[#5415A0] cursor-pointer"
          >
            Bengaluru Hub
          </span>
          <span>›</span>
          <span 
            onClick={onNavigateToServices}
            className="hover:text-[#5415A0] cursor-pointer"
          >
            Electrical & Power Guild
          </span>
          <span>›</span>
          <span className="text-slate-900 font-bold">Ansh Gandhi</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#5415A0] text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-[#5415A0]" />
          <span>Cooperative Living Wage Certified: 85% Net Payout Escrow Lock</span>
        </div>
      </div>

      {/* Main Artisan Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Avatar & Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" 
                alt="Ansh Gandhi"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-purple-100 shadow-md"
              />
              <div 
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#5415A0] text-white flex items-center justify-center shadow-md ring-2 ring-white"
                title="Guild Verified Co-owner"
              >
                <Shield className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Ansh Gandhi
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-[#5415A0] border border-purple-200">
                  <Sparkles className="w-3 h-3 text-[#5415A0]" />
                  Guild Equity Partner #408
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  Master Electrician
                </span>
              </div>

              <p className="text-sm text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Bengaluru Central & East Districts (Indiranagar, Koramangala, Whitefield)</span>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  4.8 <span className="font-normal text-amber-700">(142 reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-[#5415A0] font-bold border border-purple-100">
                  <Award className="w-3.5 h-3.5" />
                  318 Jobs <span className="font-normal text-purple-700">(100% on-time)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  9+ Yrs Exp
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Tomorrow
                </span>
              </div>
            </div>
          </div>

          {/* Right: Booking CTA Card */}
          <div className="w-full lg:w-72 bg-[#FAF8FE] border border-purple-100 rounded-2xl p-5 shrink-0 flex flex-col justify-between space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">₹149</span>
                <span className="text-xs text-slate-500 ml-1">/ hour</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#5415A0] border border-purple-200">
                Cooperative Fixed
              </span>
            </div>

            <button
              onClick={() => handleBook()}
              className="w-full py-3 px-4 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-sm shadow-md shadow-purple-900/10 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Book Ansh</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Direct messaging open for cooperative client members with active bookings.")}
                className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Message</span>
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{isCopied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1 pt-1">
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>100% Escrow protected by WORKIVO</span>
            </p>
          </div>

        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'services'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Services & Transparent Pricing (4)
        </button>
        <button
          onClick={() => setActiveTab('availability')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'availability'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Live Availability & Calendar
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'reviews'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Client Reviews & Guild Endorsements (142)
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'history'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Work History
        </button>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Bio, Services, Guild Bond, Reviews */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: About Ansh & Guild Apprenticeship */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">About Ansh & Guild Apprenticeship</h2>
              </div>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
                Co-owner Member since 2021
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Ansh completed his 4-year rigorous industrial apprenticeship under the Karnataka Guild of Electricians with 
              distinction, specializing in smart grid distribution and high-capacity residential surges. As an equity partner 
              at WORKIVO Bengaluru Guild #408, every project he executes carries complete guild-backed liability protection 
              and transparent non-predatory hourly pricing.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                <Zap className="w-3.5 h-3.5 text-[#5415A0]" />
                Grade-A Electrical Contractor Lic #KA-5821
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Solar & Hybrid Inverter Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                NFPA 70 Safety Standards Compliant
              </span>
            </div>
          </div>

          {/* Card 2: Specialized Services & Standard Rates */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Specialized Services & Standard Rates</h2>
                  <p className="text-xs text-slate-500">Fixed cooperative rates with zero surge pricing, verified parts catalog, and automated escrow deposit.</p>
                </div>
              </div>
              <button 
                onClick={onNavigateToServices}
                className="text-xs font-bold text-[#5415A0] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Service Item 1 */}
              <div className="p-4 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">₹149</span>
                      <span className="text-xs text-slate-500"> / hr</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#5415A0] transition-colors">
                    Residential Rewiring & Load Balancing
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Complete diagnostic check, MCB panel repair, high-voltage load optimization, and neutral earthing check.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">⏱ Typical: 2 – 4 hrs</span>
                  <button 
                    onClick={() => handleBook("Residential Rewiring")}
                    className="font-bold text-[#5415A0] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Instant Select</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Service Item 2 */}
              <div className="p-4 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">₹499</span>
                      <span className="text-xs text-slate-500"> fixed</span>
                      <div className="text-[10px] text-slate-400">package</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#5415A0] transition-colors">
                    EV Home Charger Installation
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Dedicated 7.2kW or 11kW wallbox install, RCCB shock protector, fire-retardant armored conduit cabling.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">⏱ Typical: 3 – 5 hrs</span>
                  <button 
                    onClick={() => handleBook("EV Home Charger Installation")}
                    className="font-bold text-[#5415A0] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Instant Select</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Service Item 3 */}
              <div className="p-4 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">₹249</span>
                      <span className="text-xs text-slate-500"> / hr</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#5415A0] transition-colors">
                    Inverter & Battery Backup Setup
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pure sinewave inverter pairing, tubular battery rack installation, automated relay switch integration.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">⏱ Typical: 2 – 3 hrs</span>
                  <button 
                    onClick={() => handleBook("Inverter & Battery Backup")}
                    className="font-bold text-[#5415A0] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Instant Select</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Service Item 4 */}
              <div className="p-4 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-3 group">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">₹149</span>
                      <span className="text-xs text-slate-500"> diagnostic</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#5415A0] transition-colors">
                    Emergency Short-Circuit Isolation
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Thermal camera inspection, insulation resistance megger testing, fast restoration of critical circuits.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">⏱ Avg Arrival: 35 mins</span>
                  <button 
                    onClick={() => handleBook("Emergency Short-Circuit Isolation")}
                    className="font-bold text-[#5415A0] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Instant Select</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Guild Equipment & Protection Bond */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Guild Equipment & Protection Bond</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">₹50,000 Guild Bond</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Autonomous property damages guarantee backed directly by Cooperative Capital Reserve #408.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Mobile Tool Van</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Stocked with calibrated Fluke multimeters, Bosch heavy impact drivers, and Schneider switchgear.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Zero Parts Markup</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All cables and circuit breakers provided at direct cooperative wholesale invoice without kickbacks.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Verified Client Endorsements */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Verified Client Endorsements</h2>
                  <p className="text-xs text-slate-500">100% verified completed task reviews recorded in the WORKIVO Public Ledger.</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-slate-900">4.8</span>
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Review 1 */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-[#5415A0] font-bold flex items-center justify-center text-[10px]">
                      PK
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Pooja Krishnamurthy</span>
                      <span className="text-[11px] text-slate-500">Indiranagar • Task: Inverter Replacement</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-[11px]">3 days ago</span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed pt-1">
                  "Ansh arrived precisely at the booked hour with his guild toolkit. Diagnosed a faulty bypass switch within 10 minutes instead of selling me an expensive new inverter like commercial agencies tried to. Relief is real!"
                </p>
              </div>

              {/* Review 2 */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      AS
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Anand Somany</span>
                      <span className="text-[11px] text-slate-500">Whitefield • Task: 11kW EV Charger Setup</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-[11px]">2 weeks ago</span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed pt-1">
                  "Clean wiring, proper grounding certificate delivered directly to my email, and 100% adherence to WORKIVO living-wage cooperative standards. Outstanding craftsmanship."
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Telemetry, Escrow, Next Slot */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Guild Telemetry Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Guild Telemetry</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* Satisfaction Gauge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
              <div>
                <span className="text-[11px] text-slate-500 block">Client Satisfaction</span>
                <span className="text-xl font-black text-slate-900">99.2%</span>
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#5415A0]"
                    strokeDasharray="99.2, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-[#5415A0]">99%</span>
              </div>
            </div>

            {/* Response Time & Disputes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px]">Avg Emergency Response</span>
                  <Zap className="w-3 h-3 text-purple-600" />
                </div>
                <span className="text-base font-black text-slate-900">22 mins</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px]">Dispute Escalations</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-base font-black text-slate-900">0 in 24 Mos</span>
              </div>
            </div>

            {/* Escrow Payout Transparency */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Escrow Payout Transparency</span>
                <span className="font-bold text-[#5415A0]">85% Take-Home</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                WORKIVO retains only 15% for guild insurance, tooling pool, and civic health benefits.
              </p>
            </div>
          </div>

          {/* WORKIVO Escrow Guarantee Card */}
          <div className="bg-[#FAF8FE] rounded-2xl border border-purple-100 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#5415A0] text-white flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">WORKIVO Escrow Guarantee</h3>
                <span className="text-[10px] font-semibold text-purple-700 block">Mutual Guild Protection</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Payment held in sovereign cooperative escrow until job sign-off.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Free peer replacement dispatch from Hub #408 if emergency arises.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>30-day comprehensive electrical workmanship warranty.</span>
              </li>
            </ul>

            <button 
              onClick={() => alert("Cooperative Escrow Rules: Customer funds are locked in RBI-compliant escrow. 85% releases to artisan upon signature.")}
              className="text-xs font-bold text-[#5415A0] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Read Mutual Escrow Rules</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Next Available Slot Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Next Available Slot</h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Tomorrow (Wednesday)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#5415A0] border border-purple-200">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>09:00 AM – 12:00 PM (Morning Window)</span>
              </p>
            </div>

            <button
              onClick={() => handleBook()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Claim This Morning Slot</span>
            </button>
          </div>

          {/* Aadhaar & Police Verification Tag */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Aadhaar & Police Verified</span>
              <span className="text-[11px] text-slate-500 block">Validated on 14 Jan 2025 by Guild Registrar</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
