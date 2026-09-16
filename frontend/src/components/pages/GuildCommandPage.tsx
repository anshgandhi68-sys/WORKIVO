import React, { useState } from 'react';
import { 
  Radio, 
  RotateCw, 
  Download, 
  Bell, 
  TrendingUp, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Activity
} from 'lucide-react';

interface GuildCommandPageProps {
  onNavigateToWelfare: () => void;
  onNavigateToMembers: () => void;
}

export const GuildCommandPage: React.FC<GuildCommandPageProps> = ({
  onNavigateToWelfare,
  onNavigateToMembers
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'workers' | 'jobs' | 'welfare' | 'training' | 'analytics'>('overview');
  const [syncNotice, setSyncNotice] = useState(false);

  const handleSync = () => {
    setSyncNotice(true);
    setTimeout(() => setSyncNotice(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Status Banner & Notice */}
      {syncNotice && (
        <div className="fixed top-20 right-8 z-50 bg-[#5415A0] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Autonomous Ledger & Dispatch Radar Synced!</span>
        </div>
      )}

      {/* Sub-Tabs Navigation (matching Image 1) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/90 pb-2.5 gap-3">
        <div className="flex items-center gap-6 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 pb-2 transition-colors relative ${
              activeTab === 'overview' 
                ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' 
                : 'hover:text-slate-800'
            }`}
          >
            <span>Overview</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-100 text-[#5415A0]">Live</span>
          </button>

          <button 
            onClick={onNavigateToMembers}
            className="pb-2 hover:text-slate-800 transition-colors"
          >
            Members
          </button>

          <button 
            onClick={onNavigateToMembers}
            className="pb-2 hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <span>Workers</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-600 font-bold">142</span>
          </button>

          <button 
            onClick={() => alert("38 Active live dispatches running in Indiranagar, Domlur, and Koramangala.")}
            className="pb-2 hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <span>Jobs</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-bold">38 Active</span>
          </button>

          <button 
            onClick={onNavigateToWelfare}
            className="pb-2 hover:text-slate-800 transition-colors"
          >
            Welfare
          </button>

          <button 
            onClick={() => alert("Guild Training Modules: Inverter Certifications & Safe High-Voltage Routing.")}
            className="pb-2 hover:text-slate-800 transition-colors"
          >
            Training
          </button>

          <button 
            onClick={() => alert("Autonomous Guild Analytics: Audited zero-commission financial surplus graphs.")}
            className="pb-2 hover:text-slate-800 transition-colors"
          >
            Analytics
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Audited Report</span>
          </button>

          <button 
            onClick={() => alert("Broadcast emergency guild notice to all 183 active co-owners.")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>+ Broadcast Notice</span>
          </button>
        </div>
      </div>

      {/* Hero Title Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#5415A0] flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Bangalore Central Guild Command
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-[#5415A0]">
                Decentralized Hub #408
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-3xl leading-relaxed">
              Operating under zero-commission cooperative charters. Real-time civic labor dispatch, algorithmic transparent surplus allocation, and mutual welfare safety nets.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
          <div className="text-right">
            <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Co-op Net Surplus
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹1,48,200
            </span>
          </div>

          <button
            onClick={handleSync}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#5415A0] border border-purple-200 font-extrabold text-xs transition-colors shadow-sm"
          >
            <RotateCw className="w-4 h-4" />
            <span>Live Sync</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Members</span>
            <Users className="w-3.5 h-3.5 text-[#5415A0]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">183</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">+12 this mo.</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">100% verified co-owners</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Active Workers</span>
            <Activity className="w-3.5 h-3.5 text-[#5415A0]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">142</span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded">82% on-duty</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">24 peer reserve backup</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Active Jobs</span>
            <Zap className="w-3.5 h-3.5 text-[#5415A0]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">38</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">⚡ 4.2m avg</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">Bangalore Central Zone</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Completed Jobs</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">2,410</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">99.4% res.</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">0% commission take</span>
        </div>

        {/* Metric 5 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Average Rating</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">4.94</span>
            <span className="text-[10px] text-slate-400 font-bold">1,980 audits</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">Verified civic ratings</span>
        </div>

        {/* Metric 6 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500">Welfare Fund</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#5415A0]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">₹42.8K</span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded">Solvent</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">Ring-fenced mutual reserve</span>
        </div>
      </div>

      {/* Middle Grid: Demand Trajectory & Worker Dispatch Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Service Demand & Booking Trajectory (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  Service Demand & Booking Trajectory
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-purple-100 text-[#5415A0]">
                  Weekly Inflow
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison across top guild trades with lavender projected overflow
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#5415A0]" />
                <span>Actual Dispatches</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-200" />
                <span>Forecast Buffer</span>
              </span>
            </div>
          </div>

          {/* 5 Stacked Progress Bars */}
          <div className="space-y-4 pt-1">
            {[
              { trade: 'Electrical Repair & Wiring', count: '684 tasks', growth: '+18%', actual: 75, buffer: 20 },
              { trade: 'Sanitary & Municipal Plumbing', count: '542 tasks', growth: '+11%', actual: 60, buffer: 25 },
              { trade: 'HVAC & Heat Relief Systems', count: '430 tasks', growth: '+24%', actual: 50, buffer: 30 },
              { trade: 'Civic Carpentry & Structural', count: '395 tasks', growth: '+7%', actual: 42, buffer: 20 },
              { trade: 'Rooftop Solar & Micro-Grids', count: '359 tasks', growth: '+31%', actual: 38, buffer: 35 },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-800">{item.trade}</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span className="text-slate-900">{item.count}</span>
                    <span className="text-emerald-700 text-[11px]">({item.growth})</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#5415A0]" style={{ width: `${item.actual}%` }} />
                  <div className="h-full bg-purple-200" style={{ width: `${item.buffer}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Real-time dispatch optimization active</span>
            <button className="text-[#5415A0] font-extrabold hover:underline flex items-center gap-1">
              <span>Explore Guild Trade Capacity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Worker Activity & Dispatch Flow (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                Worker Activity & Dispatch Flow
              </h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Peak coverage window: 09:00 - 17:00 IST</p>
          </div>

          {/* Hour Blocks Heatmap */}
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-2 text-center">
              {[
                { time: '06-09h', count: 42, active: false, bg: 'bg-purple-100/70 text-[#5415A0]' },
                { time: '09-12h', count: 138, active: true, bg: 'bg-[#5415A0] text-white' },
                { time: '12-15h', count: 126, active: true, bg: 'bg-[#7E22CE] text-white' },
                { time: '15-18h', count: 131, active: true, bg: 'bg-[#5415A0] text-white' },
                { time: '18-21h', count: 68, active: false, bg: 'bg-purple-200 text-purple-900' },
                { time: '21-00h', count: 16, active: false, bg: 'bg-slate-100 text-slate-600' },
              ].map((b, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">{b.time}</span>
                  <div className={`h-14 rounded-2xl flex items-center justify-center font-extrabold text-xs shadow-sm ${b.bg}`}>
                    {b.count}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>Low Traffic</span>
              <span className="text-[#5415A0]">Peak Relief Operations</span>
              <span>Reserve Active</span>
            </div>
          </div>

          {/* Relief Capacity Buffer Gauge */}
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5415A0]" />
                Relief Capacity Buffer
              </span>
              <span className="text-[#5415A0]">94.2%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full purple-gradient-bar rounded-full w-[94.2%]" />
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>24 Peer backup specialists on standby</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Zero Queued Delays
            </span>
          </div>
        </div>
      </div>

      {/* Bottom 3 Cards: Earnings, Quality & Welfare Reserve */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Cooperative Earnings & Escrow */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cooperative Earnings & Escrow</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Transparent
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">₹1,48,200</div>
            <p className="text-xs text-slate-400 mt-0.5">Total weekly volume in algorithmic escrow</p>

            <div className="w-full h-2 rounded-full overflow-hidden flex my-3 bg-slate-100">
              <div className="h-full bg-[#5415A0] w-[85%]" />
              <div className="h-full bg-[#9333EA] w-[10%]" />
              <div className="h-full bg-[#C084FC] w-[5%]" />
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>• Direct Worker Dividend (85%)</span>
                <span className="font-extrabold text-slate-900">₹1,25,970</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Mutual Welfare Fund (10%)</span>
                <span className="font-extrabold text-slate-900">₹14,820</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>• Open Tech & Servers (5%)</span>
                <span className="font-extrabold text-slate-900">₹7,410</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-600">
            <span>Worker Take-home: <strong>85-95%</strong></span>
            <span className="text-[#5415A0]">Zero Investor Cut</span>
          </div>
        </div>

        {/* Card 2: Quality & Relief Index */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality & Relief Index</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                Audited
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900">4.94</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-semibold ml-auto">1,980 audits</span>
            </div>

            <div className="space-y-1.5 pt-3">
              {[
                { stars: '5 ★', pct: '92%', width: '92%' },
                { stars: '4 ★', pct: '6%', width: '6%' },
                { stars: '3 ★', pct: '1.5%', width: '3%' },
                { stars: '< 3 ★', pct: '0.5%', width: '1%' },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-8 text-slate-500 font-bold">{row.stars}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5415A0] rounded-full" style={{ width: row.width }} />
                  </div>
                  <span className="w-8 text-right font-bold text-slate-800">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-600">
            <span className="text-emerald-700">🛡️ 99.8% Guarantee Adherence</span>
            <span>Zero disputes</span>
          </div>
        </div>

        {/* Card 3: Welfare Reserve Allocations */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Welfare Reserve Allocations</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-50 text-[#5415A0] border border-purple-200">
                ₹42,800 Total
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">Autonomous mutual aid distribution governed by steward vote</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
                <span className="text-[10px] font-bold text-slate-400 block">Healthcare (40%)</span>
                <span className="font-extrabold text-slate-900 block">₹17,120</span>
                <span className="text-[9px] text-[#5415A0]">Zero worker copay</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
                <span className="text-[10px] font-bold text-slate-400 block">Emergency Support (25%)</span>
                <span className="font-extrabold text-slate-900 block">₹10,700</span>
                <span className="text-[9px] text-emerald-700">Instant micro-grant</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
                <span className="text-[10px] font-bold text-slate-400 block">Skill Training (20%)</span>
                <span className="font-extrabold text-slate-900 block">₹8,560</span>
                <span className="text-[9px] text-slate-500">Safety certifications</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
                <span className="text-[10px] font-bold text-slate-400 block">Shared Tools (15%)</span>
                <span className="font-extrabold text-slate-900 block">₹6,420</span>
                <span className="text-[9px] text-slate-500">Guild tool library</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-700">Steward Audit: Passed</span>
            <button onClick={onNavigateToWelfare} className="text-[#5415A0] hover:underline flex items-center gap-1">
              <span>Disburse Aid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Administrative Activity & Live Dispatch Stream Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Recent Administrative Activity & Live Dispatch Stream
              </h3>
              <p className="text-xs text-slate-400">Real-time cooperative ledger entries and field dispatches</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Stream Active
            </span>
            <button className="px-3 py-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
              Filter Activity
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Event ID & Type</th>
                <th className="pb-3 px-4">Subject & Guild Actor</th>
                <th className="pb-3 px-4">Location / Hub</th>
                <th className="pb-3 px-4">Escrow / Value</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              <tr>
                <td className="py-3.5 pr-4 font-mono font-bold text-slate-900">
                  <span className="text-emerald-500 mr-1.5">●</span>
                  #DSP-8924 <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-purple-50 text-[#5415A0]">Dispatch</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  Emergency 3-Phase Main Breaker Replacement
                  <span className="text-slate-400 block text-[10px] font-normal">Assigned: Rajesh Kumar (Master Electrician #108)</span>
                </td>
                <td className="py-3.5 px-4">Indiranagar Sector 2</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹2,450 <span className="text-[10px] text-slate-400 font-normal">(Direct 90%)</span></td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    En Route (3m)
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right text-slate-400 font-mono text-[11px]">Just now</td>
              </tr>

              <tr>
                <td className="py-3.5 pr-4 font-mono font-bold text-slate-900">
                  <span className="text-purple-500 mr-1.5">●</span>
                  #WLF-2011 <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-purple-50 text-[#5415A0]">Welfare Grant</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  Autonomous Healthcare Prescription Subsidy
                  <span className="text-slate-400 block text-[10px] font-normal">Beneficiary: S. Ananthi (Carpentry Apprentice #419)</span>
                </td>
                <td className="py-3.5 px-4">Koramangala Hub 4</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹1,800 <span className="text-[10px] text-slate-400 font-normal">(Mutual Fund)</span></td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                    Disbursed
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right text-slate-400 font-mono text-[11px]">14 mins ago</td>
              </tr>

              <tr>
                <td className="py-3.5 pr-4 font-mono font-bold text-slate-900">
                  <span className="text-blue-500 mr-1.5">●</span>
                  #PWR-0498 <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-blue-50 text-blue-700">Peer Warranty</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  Plumbing Valve Joint Seal Inspection Swap
                  <span className="text-slate-400 block text-[10px] font-normal">Peer Reviewer: Farhan Qureshi (Plumber Guild #055)</span>
                </td>
                <td className="py-3.5 px-4">Ulsoor East Zone</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹0 <span className="text-[10px] text-slate-400 font-normal">(Mutual Guarantee)</span></td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                    Verified 5★
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right text-slate-400 font-mono text-[11px]">32 mins ago</td>
              </tr>

              <tr>
                <td className="py-3.5 pr-4 font-mono font-bold text-slate-900">
                  <span className="text-amber-500 mr-1.5">●</span>
                  #TRN-1102 <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-amber-50 text-amber-800">Training</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  Solar Inverter & Microgrid Grid-Tie Certification
                  <span className="text-slate-400 block text-[10px] font-normal">Cohort: 8 Technicians promoted to Level-II Co-owners</span>
                </td>
                <td className="py-3.5 px-4">Central Guild Lab</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Sponsored <span className="text-[10px] text-slate-400 font-normal">(Co-op Pool)</span></td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900">
                    Exam Completed
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right text-slate-400 font-mono text-[11px]">1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 4 of 38 active stream records in current duty shift</span>
          <div className="flex gap-1.5">
            <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 rounded-lg bg-[#5415A0] text-white font-bold">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
