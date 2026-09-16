import React, { useState } from 'react';
import { 
  Calendar, 
  Wallet, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Navigation, 
  FileText, 
  Wrench, 
  Vote, 
  Clock, 
  AlertCircle, 
  Bike, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Building2,
  PieChart,
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface WorkerDashboardPageProps {
  onNavigateToEarnings?: () => void;
  onNavigateToAvailability?: () => void;
  onNavigateToCoop?: () => void;
  onOpenReportToolModal?: () => void;
}

export const WorkerDashboardPage: React.FC<WorkerDashboardPageProps> = ({
  onNavigateToEarnings,
  onNavigateToAvailability,
  onNavigateToCoop,
  onOpenReportToolModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'earnings' | 'availability'>('overview');
  const [radarActive, setRadarActive] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState<string | null>(null);

  const handleOpenMaps = (address: string) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#5415A0] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Worker Cooperative Platform</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Good morning, Ravi.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-2 mt-1">
              <span className="font-semibold text-slate-800">Bengaluru Central Guild #408</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                On-Duty
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Next arrival: <strong className="text-slate-700">Indiranagar East at 08:00 AM</strong></span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setRadarActive(!radarActive)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                radarActive
                  ? 'bg-purple-50 border-purple-200 text-[#5415A0]'
                  : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${radarActive ? 'bg-[#5415A0] animate-ping' : 'bg-slate-400'}`} />
              <span>Dispatch Radar: {radarActive ? 'Active' : 'Paused'}</span>
            </button>

            <button
              onClick={() => {
                if (onOpenReportToolModal) {
                  onOpenReportToolModal();
                } else {
                  alert("Report Tool Issue: Depot #408 inventory manager notified. Replacement Fluke multimeter ready for dispatch.");
                }
              }}
              className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-slate-500" />
              <span>Report Tool Issue</span>
            </button>

            <button
              onClick={onNavigateToCoop}
              className="py-2 px-3.5 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Vote className="w-3.5 h-3.5" />
              <span>View Hub Quorum</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">3 Jobs</div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-[#5415A0] text-[11px] font-bold w-fit">
            <Sparkles className="w-3 h-3 text-[#5415A0]" />
            <span>+1 Urgent Dispatched</span>
          </div>
        </div>

        {/* Card 2: This Month */}
        <div 
          onClick={onNavigateToEarnings}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3 cursor-pointer hover:border-purple-200 transition-colors"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">This Month</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">₹28,450</div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-bold w-fit">
            <span>📈 +18% vs Last Month</span>
          </div>
        </div>

        {/* Card 3: Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rating</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-3xl font-black text-slate-900 tracking-tight">4.8</div>
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-[#5415A0] text-[11px] font-bold w-fit">
            <span>🛡️ Top 5% in Guild</span>
          </div>
        </div>

        {/* Card 4: Completion */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completion</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">96%</div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-[#5415A0] text-[11px] font-bold w-fit">
            <span>✓ Zero Cancellations</span>
          </div>
        </div>

      </div>

      {/* Sub-nav Tabs */}
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
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'jobs'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Jobs (3)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#5415A0]">Active</span>
        </button>
        <button
          onClick={() => {
            if (onNavigateToEarnings) onNavigateToEarnings();
            else setActiveTab('earnings');
          }}
          className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap cursor-pointer"
        >
          Earnings & Escrow
        </button>
        <button
          onClick={() => {
            if (onNavigateToAvailability) onNavigateToAvailability();
            else setActiveTab('availability');
          }}
          className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap cursor-pointer"
        >
          Availability Planner
        </button>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Today's Visual Dispatch Schedule */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Today's Visual Dispatch Schedule</h2>
                <p className="text-xs text-slate-500">Wednesday, Oct 15 • 3 Co-operative Scheduled Dispatches</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold w-fit">
                Estimated Transit: 32 mins total
              </span>
            </div>

            {/* Vertical Timeline Dispatches */}
            <div className="relative space-y-6 pt-2">
              
              {/* Connecting line */}
              <div className="absolute top-6 bottom-6 left-4 w-0.5 bg-slate-200 -z-0" />

              {/* Dispatch 1 */}
              <div className="relative flex items-start gap-4">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#5415A0] text-white font-black text-xs flex items-center justify-center shrink-0 ring-4 ring-white shadow-sm z-10">
                  1
                </div>

                <div className="flex-1 space-y-3">
                  <div className="p-4 rounded-xl border border-purple-200 bg-[#FAF8FE]/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900">08:00 AM – 10:00 AM</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#5415A0]">
                            Upcoming in 25m
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Residential Rewiring & Load Balancing
                        </h3>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Indiranagar 2nd Stage, 100ft Road • <strong>Arvind K.</strong></span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold">Co-op Escrow</span>
                        <span className="text-base font-black text-slate-900">₹900</span>
                        <span className="text-[10px] text-slate-500 block">(₹225 deposit held)</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Safety gear verified: Grade-A Insulated</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedBrief("Diagnostic Brief: Client reported recurrent tripping in Master AC circuit breaker. 32A MCB rated check and neutral grounding verification required.")}
                        className="py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Client Diagnostic Brief</span>
                      </button>

                      <button
                        onClick={() => handleOpenMaps("Indiranagar 2nd Stage, 100ft Road, Bengaluru")}
                        className="py-2 px-3 rounded-lg bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Open Navigation (Maps)</span>
                      </button>
                    </div>
                  </div>

                  {/* Transit Indicator */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                    <Bike className="w-3.5 h-3.5 text-purple-600" />
                    <span>Transit: 2.1 km (~12 mins via CMH Road)</span>
                  </div>
                </div>
              </div>

              {/* Dispatch 2 */}
              <div className="relative flex items-start gap-4">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 ring-4 ring-white z-10">
                  2
                </div>

                <div className="flex-1 space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">11:30 AM – 01:00 PM</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmed
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Inverter Battery Circuit Check
                        </h3>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Domlur Layout, Near BDA Complex • <strong>Sunita R.</strong></span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold">Co-op Escrow</span>
                        <span className="text-base font-black text-slate-900">₹600</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Task Type: Preventive Maintenance</span>
                      <button
                        onClick={() => alert("Job #WKV-848810 Details:\nClient: Sunita R.\nEquipment: Exide Tubular 150Ah\nWarranty verification passed.")}
                        className="font-bold text-[#5415A0] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View Job Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Transit Indicator */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                    <Bike className="w-3.5 h-3.5 text-purple-600" />
                    <span>Transit: 3.4 km (~18 mins via Old Airport Road)</span>
                  </div>
                </div>
              </div>

              {/* Dispatch 3 */}
              <div className="relative flex items-start gap-4">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 ring-4 ring-white z-10">
                  3
                </div>

                <div className="flex-1 space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">03:30 PM – 05:00 PM</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmed
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Smart Switchboard Automation
                        </h3>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>HAL 3rd Stage, Near Wind Tunnel Road • <strong>Deepak M.</strong></span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold">Co-op Escrow</span>
                        <span className="text-base font-black text-slate-900">₹850</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Components: 4-Channel WiFi Relay provided by client</span>
                      <button
                        onClick={() => alert("Job #WKV-848122 Details:\nClient: Deepak M.\nProtocol: Sonoff 4CH Pro R3 Setup with neutral bridge.")}
                        className="font-bold text-[#5415A0] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View Job Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Ergonomic Load, Transparent Earnings, Tool Depot */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Card 1: Weekly Hourly Load & Efficiency */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Weekly Hourly Load & Efficiency</h3>
                <p className="text-[11px] text-slate-500">Optimum target: 7h / day threshold</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-[#5415A0]">
                36.5h logged
              </span>
            </div>

            {/* Daily Bar Chart */}
            <div className="pt-4 pb-1">
              <div className="relative h-40 flex items-end justify-between px-2 border-b border-slate-100">
                
                {/* 7h Dashed Line */}
                <div className="absolute top-10 left-0 right-0 border-t border-dashed border-purple-300 flex items-center justify-end pr-1">
                  <span className="text-[9px] font-bold text-purple-600 bg-white px-1 -mt-2">Co-op Cap (7h)</span>
                </div>

                {/* Mon */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] text-slate-500">6h</span>
                  <div className="w-7 sm:w-9 bg-purple-100 rounded-t-md" style={{ height: '70px' }} />
                  <span className="text-[11px] font-medium text-slate-500">Mon</span>
                </div>

                {/* Tue */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] text-slate-500">7h</span>
                  <div className="w-7 sm:w-9 bg-purple-100 rounded-t-md" style={{ height: '82px' }} />
                  <span className="text-[11px] font-medium text-slate-500">Tue</span>
                </div>

                {/* Wed (Active / Today) */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] font-bold text-[#5415A0]">5.5h</span>
                  <div className="w-7 sm:w-9 bg-[#5415A0] rounded-t-md shadow-sm" style={{ height: '65px' }} />
                  <span className="text-[11px] font-bold text-[#5415A0]">Wed</span>
                </div>

                {/* Thu */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] text-slate-500">6h</span>
                  <div className="w-7 sm:w-9 bg-purple-100 rounded-t-md" style={{ height: '70px' }} />
                  <span className="text-[11px] font-medium text-slate-500">Thu</span>
                </div>

                {/* Fri */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] text-slate-500">8h</span>
                  <div className="w-7 sm:w-9 bg-purple-100 rounded-t-md" style={{ height: '94px' }} />
                  <span className="text-[11px] font-medium text-slate-500">Fri</span>
                </div>

                {/* Sat */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[10px] text-slate-500">4h</span>
                  <div className="w-7 sm:w-9 bg-purple-100 rounded-t-md" style={{ height: '48px' }} />
                  <span className="text-[11px] font-medium text-slate-500">Sat</span>
                </div>

              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5415A0]" />
                <span className="text-slate-600 font-medium">Today's active shift</span>
              </div>
              <span className="text-emerald-700 font-bold">
                Safe ergonomic balance (Zero fatigue flagged)
              </span>
            </div>
          </div>

          {/* Card 2: Transparent Earnings Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Transparent Earnings Breakdown</h3>
                <p className="text-[11px] text-slate-500">October 2025 • Total: ₹28,450</p>
              </div>
              <PieChart className="w-4 h-4 text-purple-600" />
            </div>

            {/* Tri-color progress bar */}
            <div className="h-2.5 rounded-full overflow-hidden flex bg-slate-100">
              <div className="bg-[#5415A0] h-full w-[85%]" title="85% Direct Worker Dividend" />
              <div className="bg-[#9333EA] h-full w-[10%]" title="10% Guild Health & Tools" />
              <div className="bg-[#DDD6FE] h-full w-[5%]" title="5% Open Technology" />
            </div>

            {/* List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5415A0]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Worker Dividend (85%)</span>
                    <span className="text-[10px] text-slate-500">Dispatched straight to Ravi's registered account</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹24,182.50</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Guild Health & Tool Pool (10%)</span>
                    <span className="text-[10px] text-slate-500">Fully democratic shared safety net</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹2,845.00</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DDD6FE]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Open Technology Fund (5%)</span>
                    <span className="text-[10px] text-slate-500">Platform hosting, servers & SMS relays</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹1,422.50</span>
              </div>
            </div>

            <button
              onClick={onNavigateToEarnings}
              className="w-full py-2.5 px-4 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Instant Payout to Bank (₹6,420 Available)</span>
            </button>
          </div>

          {/* Card 3: Mutual Tool Depot #408 */}
          <div 
            onClick={() => alert("Mutual Tool Depot #408 Inventory:\n• Fluke 87V Multimeter: Station 3 (Calibrated Oct 2025)\n• Bosch GBH 18V Rotary Hammer: Station 1\n• Flir E4 Thermal Imager: Station 2")}
            className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between cursor-pointer hover:bg-purple-100/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white text-[#5415A0] flex items-center justify-center shadow-xs">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Mutual Tool Depot #408</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Calibrated
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Fluke Multimeter ready at station 3. Next cooperative quorum vote on tool grants in <strong>2 days</strong>.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5415A0] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </div>

        </div>

      </div>

      {/* Client Diagnostic Brief Modal */}
      {selectedBrief && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Client Diagnostic Brief</h3>
              </div>
              <button 
                onClick={() => setSelectedBrief(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedBrief}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedBrief(null)}
                className="py-2 px-4 rounded-lg bg-[#5415A0] text-white text-xs font-bold"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
