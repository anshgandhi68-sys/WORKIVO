import React, { useState } from 'react';
import { 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  Check, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HeartHandshake, 
  Wrench, 
  GraduationCap, 
  Building, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface WelfareFundPageProps {
  onOpenMutualAid: () => void;
  onNavigateToCoop: () => void;
}

export const WelfareFundPage: React.FC<WelfareFundPageProps> = ({ 
  onOpenMutualAid, 
  onNavigateToCoop 
}) => {
  const [selectedLedgerFilter, setSelectedLedgerFilter] = useState<'all' | 'healthcare' | 'emergency' | 'tools'>('all');
  const [activeDonutSlice, setActiveDonutSlice] = useState<string | null>(null);

  const TRANSACTIONS = [
    {
      id: 'tx-1',
      recipient: 'Anil Prakash',
      role: 'Lead Plumber',
      type: 'emergency',
      badgeText: 'Emergency Support',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Power Tool Replacement Grant • Approved in 24m by Guild Council',
      completedDate: 'Completed Oct 14 • Transaction ID: #WF-408-0982',
      amount: '₹4,500',
      statusText: 'Disbursed Instantly',
      statusClass: 'text-emerald-700'
    },
    {
      id: 'tx-2',
      recipient: 'Meena Sharma',
      role: 'Solar Tech',
      type: 'tools',
      badgeText: 'Training & Upskilling',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Advanced EV Inverter Certification Subsidy • 100% course fee covered',
      completedDate: 'Completed Oct 11 • Skill Credential Ledger Verified',
      amount: '₹3,200',
      statusText: 'Direct Institute Pay',
      statusClass: 'text-[#5415A0]'
    },
    {
      id: 'tx-3',
      recipient: 'Farhan Akhtar',
      role: 'Wireman',
      type: 'healthcare',
      badgeText: 'Healthcare',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'Family Health Diagnostic Voucher • Manipal Hospital Koramangala',
      completedDate: 'Completed Oct 08 • Digital Health Pass Generated',
      amount: '₹2,100',
      statusText: 'Cashless Settlement',
      statusClass: 'text-emerald-700'
    },
    {
      id: 'tx-4',
      recipient: 'Hub Tool Depot #408',
      role: 'Collective Asset',
      type: 'tools',
      badgeText: 'Community Development',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
      title: 'Shared Fluke Thermal Imager Purchase • Unanimous member ballot approval',
      completedDate: 'Completed Oct 02 • Stationed at Hub Locker #04',
      amount: '₹8,400',
      statusText: 'Guild Pooled Asset',
      statusClass: 'text-slate-700'
    },
    {
      id: 'tx-5',
      recipient: 'Rajesh K.',
      role: 'Carpenter',
      type: 'emergency',
      badgeText: 'Emergency Support',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Medical Sick-Day Replacement Wage • Paid within 15 mins',
      completedDate: 'Completed Sep 28 • Direct UPI Settlement',
      amount: '₹1,800',
      statusText: 'Disbursed in 15m',
      statusClass: 'text-emerald-700'
    }
  ];

  const filteredTransactions = TRANSACTIONS.filter(tx => {
    if (selectedLedgerFilter === 'all') return true;
    if (selectedLedgerFilter === 'healthcare') return tx.type === 'healthcare';
    if (selectedLedgerFilter === 'emergency') return tx.type === 'emergency';
    if (selectedLedgerFilter === 'tools') return tx.type === 'tools';
    return true;
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={onNavigateToCoop} className="hover:text-slate-700 transition-colors">Your Cooperative</button>
        <span>&gt;</span>
        <button onClick={onNavigateToCoop} className="hover:text-slate-700 transition-colors">Guild Hub #408</button>
        <span>&gt;</span>
        <span className="text-slate-700">Community Welfare Fund</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Community Welfare Fund
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
              • Guild Reserve Active
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">
            Democratically governed mutual safety net funded by 10% of every completed service booking across Bengaluru Central Hub #408.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Audited Ledger (PDF)</span>
          </button>

          <button
            onClick={onOpenMutualAid}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-xs transition-colors shadow-sm"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Request Mutual Aid Grant</span>
          </button>
        </div>
      </div>

      {/* Main Reserve Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
              Community Welfare Fund
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#5415A0] border border-purple-200">
              <ShieldCheck className="w-3 h-3" />
              100% Solvent • Fully Ring-Fenced & Audited
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Last autonomous audit sync: Today, 14:32 IST
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              ₹42,800
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +₹7,450 deposited this month from 148 completed dispatches
            </span>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Inflow */}
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Total Inflow (This Month)</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-slate-900">₹7,450</div>
            <span className="text-[10px] font-bold text-emerald-700">+18.2% vs last month</span>
          </div>

          {/* Disbursed YTD */}
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Disbursed YTD</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-slate-900">₹31,200</div>
            <span className="text-[10px] text-slate-500 font-semibold">14 member relief grants</span>
          </div>

          {/* Beneficiaries */}
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Active Beneficiaries</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-slate-900">8 Worker-Owners</div>
            <span className="text-[10px] text-slate-500 font-semibold">Across 4 skilled trades</span>
          </div>

          {/* Approval Time */}
          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Average Approval Time</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-black text-slate-900">18 mins</div>
            <span className="text-[10px] font-bold text-[#5415A0]">Peer Guild Council Quorum</span>
          </div>
        </div>
      </div>

      {/* Fund Allocation Section (Donut + 4 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Donut Chart (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Fund Allocation</h3>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5415A0] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Budget ring apportioned by Member Ballot #12</p>
          </div>

          {/* Donut Chart Display */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Healthcare (40%) */}
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#5415A0"
                  strokeWidth="14"
                  strokeDasharray="95.5 143.2"
                  strokeDashoffset="0"
                  className="cursor-pointer hover:opacity-85 transition-opacity"
                  onMouseEnter={() => setActiveDonutSlice('Healthcare (40%)')}
                  onMouseLeave={() => setActiveDonutSlice(null)}
                />
                {/* Emergency Support (25%) */}
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#7E22CE"
                  strokeWidth="14"
                  strokeDasharray="59.7 179"
                  strokeDashoffset="-95.5"
                  className="cursor-pointer hover:opacity-85 transition-opacity"
                  onMouseEnter={() => setActiveDonutSlice('Emergency Support (25%)')}
                  onMouseLeave={() => setActiveDonutSlice(null)}
                />
                {/* Training (20%) */}
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#A855F7"
                  strokeWidth="14"
                  strokeDasharray="47.7 191"
                  strokeDashoffset="-155.2"
                  className="cursor-pointer hover:opacity-85 transition-opacity"
                  onMouseEnter={() => setActiveDonutSlice('Training (20%)')}
                  onMouseLeave={() => setActiveDonutSlice(null)}
                />
                {/* Community Dev (15%) */}
                <circle
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke="#C084FC"
                  strokeWidth="14"
                  strokeDasharray="35.8 202.9"
                  strokeDashoffset="-202.9"
                  className="cursor-pointer hover:opacity-85 transition-opacity"
                  onMouseEnter={() => setActiveDonutSlice('Community Dev (15%)')}
                  onMouseLeave={() => setActiveDonutSlice(null)}
                />
              </svg>

              {/* Donut Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {activeDonutSlice || 'Total Reserve'}
                </span>
                <span className="text-xl font-black text-slate-900 my-0.5">
                  ₹42,800
                </span>
                <span className="text-[10px] font-bold text-[#5415A0]">
                  4 Categories
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF8FE] border border-purple-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>Hover over slices to inspect breakdown</span>
            <span className="text-[#5415A0]">100% Ring-Fenced</span>
          </div>
        </div>

        {/* Right Column: 4 Category Allocation Cards (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category 1: Healthcare */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5415A0]" />
                <h4 className="text-sm font-extrabold text-slate-900">Healthcare</h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                  40%
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">₹17,120</span>
                <span className="text-[10px] text-slate-400 block font-semibold">allocated</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive hospitalization cover & diagnostic health checks at partner clinics
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5415A0] rounded-full w-[40%]" />
            </div>
          </div>

          {/* Category 2: Emergency Support */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7E22CE]" />
                <h4 className="text-sm font-extrabold text-slate-900">Emergency Support</h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#7E22CE]">
                  25%
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">₹10,700</span>
                <span className="text-[10px] text-slate-400 block font-semibold">allocated</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Immediate bridge relief for lost transit, sudden equipment breakage, or injury leave
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#7E22CE] rounded-full w-[25%]" />
            </div>
          </div>

          {/* Category 3: Training & Upskilling */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                <h4 className="text-sm font-extrabold text-slate-900">Training & Upskilling</h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#A855F7]">
                  20%
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">₹8,560</span>
                <span className="text-[10px] text-slate-400 block font-semibold">allocated</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accredited trade certifications, smart-home diagnostics courses, and solar installation labs
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#A855F7] rounded-full w-[20%]" />
            </div>
          </div>

          {/* Category 4: Community Development */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C084FC]" />
                <h4 className="text-sm font-extrabold text-slate-900">Community Development</h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#C084FC]">
                  15%
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">₹6,420</span>
                <span className="text-[10px] text-slate-400 block font-semibold">allocated</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Guild Hub tool library maintenance, emergency battery chargers, and common resting suites
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#C084FC] rounded-full w-[15%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Allocations & Emergency Disbursals Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Recent Allocations & Emergency Disbursals
            </h3>
            <p className="text-xs text-slate-500">
              Immutable peer-approved ledger records with live verification hashes
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Allocations' },
              { id: 'healthcare', label: 'Healthcare' },
              { id: 'emergency', label: 'Emergency' },
              { id: 'tools', label: 'Tools & Training' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedLedgerFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedLedgerFilter === f.id
                    ? 'bg-[#5415A0] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Rows */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {filteredTransactions.map(tx => (
            <div key={tx.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-purple-50/30 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-extrabold text-slate-900">{tx.recipient}</span>
                    <span className="text-xs text-slate-400 font-medium">({tx.role})</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${tx.badgeClass}`}>
                      {tx.badgeText}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mt-1">
                    {tx.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{tx.completedDate}</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-black text-slate-900 block">{tx.amount}</span>
                <span className={`text-[11px] font-bold ${tx.statusClass}`}>
                  {tx.statusText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Democratic Quorum Banner */}
      <div className="bg-[#FAF8FE] border border-purple-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-slate-900">
                Governed by Guild Quorum Vote #38
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                100% Democratic
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Any member in good standing can apply with zero interest or payback requirement.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Welfare Guidelines: 10% pool ring-fenced under Article 14 of the Cooperative Charter.")}
          className="text-xs font-extrabold text-[#5415A0] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View Democratic Welfare Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
