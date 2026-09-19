import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Download, 
  Wallet, 
  Lock, 
  TrendingUp, 
  Scale, 
  PieChart, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Info,
  Check
} from 'lucide-react';

interface EarningsLedgerPageProps {
  onOpenWithdrawModal?: () => void;
  onNavigateToJobs?: () => void;
}

export const EarningsLedgerPage: React.FC<EarningsLedgerPageProps> = ({
  onOpenWithdrawModal,
  onNavigateToJobs
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'withdrawals' | 'contributions'>('overview');
  const [filterType, setFilterType] = useState<'all' | 'job'>('all');
  const [upiPayoutEnabled, setUpiPayoutEnabled] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 3000);
    }, 1000);
  };

  const handleDownloadStatement = () => {
    alert("Cooperative Tax & Ledger Statement (FY 2025-26 Q3) generated. 100% TDS-compliant invoice summary ready for download.");
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Earnings & Co-op Ledger
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-[#5415A0] border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5415A0]" />
              Audited Smart Contract #408-IND
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Transparent, real-time breakdown of worker dividends, escrow settlements, and cooperative fund contributions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleDownloadStatement}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Tax & Ledger Statement (PDF)</span>
          </button>
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className="py-2.5 px-4 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold shadow-md shadow-purple-900/10 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Wallet className="w-4 h-4" />
            <span>{isWithdrawing ? "Processing..." : withdrawSuccess ? "Transferred!" : "Withdraw Funds"}</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Available for Withdrawal */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-500">Available for Withdrawal</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹6,420</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant payout ready • Zero transfer fees</p>
          </div>
          <button
            onClick={handleWithdraw}
            className="w-full py-2 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#5415A0] text-xs font-bold border border-purple-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Instant Transfer to Bank</span>
          </button>
        </div>

        {/* Card 2: In Escrow / Pending */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-500">In Escrow / Pending</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹3,750</div>
            <p className="text-[11px] text-slate-500 mt-0.5">4 active bookings • Releases upon client sign-off</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50/70 border border-purple-100 text-[#5415A0] text-[11px] font-semibold w-fit">
            <Lock className="w-3 h-3 text-[#5415A0]" />
            <span>Co-op Escrow Protected</span>
          </div>
        </div>

        {/* Card 3: This Month Total */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-500">This Month Total</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹28,450</div>
            <p className="text-[11px] text-slate-500 mt-0.5">28 completed service dispatches</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold w-fit">
            <TrendingUp className="w-3 h-3" />
            <span>+₹4,300 vs previous month</span>
          </div>
        </div>

        {/* Card 4: Dividend Split Rate */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-500">Dividend Split Rate</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">85% Direct Pay</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Co-op fair rate benchmark: 100% compliant</p>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold w-fit">
            <Scale className="w-3 h-3 text-[#5415A0]" />
            <span>Tier 1 Artisan Rate</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
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
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'transactions'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'withdrawals'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Withdrawals
        </button>
        <button
          onClick={() => setActiveTab('contributions')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'contributions'
              ? 'border-[#5415A0] text-[#5415A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Contributions (Co-op Health & Tech Funds)
        </button>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Trends Chart & Disbursements Table */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Monthly Earnings & Dispatch Trends */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Monthly Earnings & Dispatch Trends</h2>
                <p className="text-xs text-slate-500">October 2025 • Total Generated: ₹28,450</p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#5415A0]" />
                  <span className="text-slate-600 font-medium">Direct Dividend (85%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#9333EA]" />
                  <span className="text-slate-600 font-medium">Guild Health Pool (10%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#C084FC]" />
                  <span className="text-slate-600 font-medium">Tech Fund (5%)</span>
                </div>
              </div>
            </div>

            {/* Peak Banner */}
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5415A0]" />
                <span className="text-slate-800 font-semibold">
                  Week 3 Peak: ₹8,100 total generated • 8 jobs • ₹6,885 direct worker dividend
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#5415A0] border border-purple-200">
                High Volume
              </span>
            </div>

            {/* 4-Week Stacked Bar Visual */}
            <div className="pt-6 pb-2">
              <div className="grid grid-cols-4 gap-4 sm:gap-8 h-52 items-end px-4 border-b border-slate-100">
                
                {/* Week 1 */}
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-bold text-slate-700 opacity-90">₹6,200</span>
                  <div className="w-full max-w-[56px] flex flex-col rounded-t-xl overflow-hidden shadow-sm transition-all group-hover:opacity-95" style={{ height: '76%' }}>
                    <div className="bg-[#C084FC] h-[5%]" title="Tech Fund 5%: ₹310" />
                    <div className="bg-[#9333EA] h-[10%]" title="Health Pool 10%: ₹620" />
                    <div className="bg-[#5415A0] h-[85%]" title="Worker Dividend 85%: ₹5,270" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 mt-1">Week 1</span>
                </div>

                {/* Week 2 */}
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-bold text-slate-700 opacity-90">₹7,850</span>
                  <div className="w-full max-w-[56px] flex flex-col rounded-t-xl overflow-hidden shadow-sm transition-all group-hover:opacity-95" style={{ height: '94%' }}>
                    <div className="bg-[#C084FC] h-[5%]" title="Tech Fund 5%: ₹392.50" />
                    <div className="bg-[#9333EA] h-[10%]" title="Health Pool 10%: ₹785" />
                    <div className="bg-[#5415A0] h-[85%]" title="Worker Dividend 85%: ₹6,672.50" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 mt-1">Week 2</span>
                </div>

                {/* Week 3 (Peak) */}
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-black text-[#5415A0]">₹8,100</span>
                  <div className="w-full max-w-[56px] flex flex-col rounded-t-xl overflow-hidden shadow-md ring-2 ring-purple-300 transition-all" style={{ height: '100%' }}>
                    <div className="bg-[#C084FC] h-[5%]" title="Tech Fund 5%: ₹405" />
                    <div className="bg-[#9333EA] h-[10%]" title="Health Pool 10%: ₹810" />
                    <div className="bg-[#5415A0] h-[85%]" title="Worker Dividend 85%: ₹6,885" />
                  </div>
                  <span className="text-xs font-extrabold text-[#5415A0] mt-1">Week 3</span>
                </div>

                {/* Week 4 */}
                <div className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-bold text-slate-700 opacity-90">₹6,300</span>
                  <div className="w-full max-w-[56px] flex flex-col rounded-t-xl overflow-hidden shadow-sm transition-all group-hover:opacity-95" style={{ height: '78%' }}>
                    <div className="bg-[#C084FC] h-[5%]" title="Tech Fund 5%: ₹315" />
                    <div className="bg-[#9333EA] h-[10%]" title="Health Pool 10%: ₹630" />
                    <div className="bg-[#5415A0] h-[85%]" title="Worker Dividend 85%: ₹5,355" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 mt-1">Week 4</span>
                </div>

              </div>
            </div>
          </div>

          {/* Card 2: Recent Booking Disbursements */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent Booking Disbursements</h2>
                <p className="text-xs text-slate-500">Real-time ledger entries cryptographically signed by Hub #408</p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    filterType === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Recent
                </button>
                <button
                  onClick={() => setFilterType('job')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    filterType === 'job'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Filter by Job
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">Task ID & Service</th>
                    <th className="pb-3 px-3">Client</th>
                    <th className="pb-3 px-3">Date</th>
                    <th className="pb-3 px-3">Gross</th>
                    <th className="pb-3 px-3">Worker Cut (85%)</th>
                    <th className="pb-3 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="font-bold text-slate-900 block">#WKV-849201</span>
                      <span className="text-slate-500 text-[11px]">Residential Rewiring & Load Balancing</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">Arvind K.</td>
                    <td className="py-3.5 px-3 text-slate-500">Oct 15, 2025</td>
                    <td className="py-3.5 px-3 text-slate-900 font-bold">₹900</td>
                    <td className="py-3.5 px-3 text-[#5415A0] font-black">₹765.00</td>
                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid to Balance
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="font-bold text-slate-900 block">#WKV-848810</span>
                      <span className="text-slate-500 text-[11px]">Inverter Battery Circuit Check</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">Sunita R.</td>
                    <td className="py-3.5 px-3 text-slate-500">Oct 14, 2025</td>
                    <td className="py-3.5 px-3 text-slate-900 font-bold">₹600</td>
                    <td className="py-3.5 px-3 text-[#5415A0] font-black">₹510.00</td>
                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid to Balance
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="font-bold text-slate-900 block">#WKV-848122</span>
                      <span className="text-slate-500 text-[11px]">Smart Switchboard Automation</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">Deepak M.</td>
                    <td className="py-3.5 px-3 text-slate-500">Oct 13, 2025</td>
                    <td className="py-3.5 px-3 text-slate-900 font-bold">₹850</td>
                    <td className="py-3.5 px-3 text-[#5415A0] font-black">₹722.50</td>
                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        <Clock className="w-3 h-3" />
                        In Escrow (Pending Sign-off)
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="font-bold text-slate-900 block">#WKV-847904</span>
                      <span className="text-slate-500 text-[11px]">Ceiling Fan & Fixture Installation</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">Malini S.</td>
                    <td className="py-3.5 px-3 text-slate-500">Oct 12, 2025</td>
                    <td className="py-3.5 px-3 text-slate-900 font-bold">₹500</td>
                    <td className="py-3.5 px-3 text-[#5415A0] font-black">₹425.00</td>
                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid to Balance
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span>Showing 4 of 28 transactions this billing cycle</span>
              <button 
                onClick={() => alert("Full immutable ledger archive: 28 transactions verified by Karnataka Hub #408.")}
                className="font-bold text-[#5415A0] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Ledger Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Where Rupee Goes & Payout Bank */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Where does each Rupee go? */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Where does each Rupee go?</h3>
              <PieChart className="w-4 h-4 text-purple-600" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every booking rupee is distributed automatically via open-ledger rules defined by worker-owners.
            </p>

            {/* Tri-color progress bar */}
            <div className="h-3 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
              <div className="bg-[#5415A0] h-full w-[85%]" title="Direct Worker Dividend: 85%" />
              <div className="bg-[#9333EA] h-full w-[10%]" title="Guild Healthcare & Tools: 10%" />
              <div className="bg-[#DDD6FE] h-full w-[5%]" title="Open Technology & Hosting: 5%" />
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 pt-2">
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5415A0]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Worker Dividend</span>
                    <span className="text-[11px] text-slate-500">85% of total gross</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹24,182.50</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Guild Healthcare & Tools</span>
                    <span className="text-[11px] text-slate-500">10% mutual protection fund</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹2,845.00</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DDD6FE]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Open Technology & Hosting</span>
                    <span className="text-[11px] text-slate-500">5% server & map costs</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900">₹1,422.50</span>
              </div>

            </div>

            {/* 0% Commission Guarantee Box */}
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
              <p className="text-xs text-purple-900 leading-relaxed">
                Unlike conventional gig platforms that take <span className="font-bold">25–35%</span> in private corporate commissions, WORKIVO retains <span className="font-bold">0% private profit</span>. 100% of non-wage funds are democratically managed by Hub #408.
              </p>
            </div>
          </div>

          {/* Card 2: Payout Account & Transfer */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Payout Account & Transfer</h3>
              <Building2 className="w-4 h-4 text-slate-500" />
            </div>

            {/* Bank Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-blue-900 text-white text-[10px] font-black flex items-center justify-center tracking-tighter">
                  HDFC
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">HDFC Bank •••• 4092</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Co-op Account
                  </span>
                </div>
              </div>
              <button 
                onClick={() => alert("Bank Account Details:\nHDFC Bank - Indiranagar Branch\nAccount ending: 4092\nIFSC: HDFC0000128\nStatus: Active (Audited)")}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Auto-deposit schedule */}
            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
              <span>Auto-deposit schedule:</span>
              <span className="font-semibold text-slate-800">Every Friday at 5:00 PM IST</span>
            </div>

            {/* UPI Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Enable 1-Click UPI Payouts</span>
                <span className="text-[11px] text-slate-500 block">Transfers to ansh.gandhi@okhdfc</span>
              </div>
              <button
                onClick={() => setUpiPayoutEnabled(!upiPayoutEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  upiPayoutEnabled ? 'bg-[#5415A0]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs absolute top-1 ${
                    upiPayoutEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => alert("Cooperative Banking & Tax Portal:\nGSTIN: 29AABCS1429B1Z8\nForm 16A TDS certificates available for FY24-25 and FY25-26.")}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Manage Banking & Tax Documents</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
