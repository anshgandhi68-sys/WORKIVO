import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Vote, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Heart, 
  ThumbsUp, 
  Check, 
  Clock,
  Zap,
  Ticket
} from 'lucide-react';

interface CooperativePageProps {
  onNavigateToWelfare: () => void;
  onOpenMutualAid: () => void;
}

export const CooperativePage: React.FC<CooperativePageProps> = ({ 
  onNavigateToWelfare, 
  onOpenMutualAid 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'training' | 'welfare' | 'announcements'>('overview');
  const [seatReserved, setSeatReserved] = useState(false);
  const [kudosSent, setKudosSent] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(142);

  const handleVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
      setVoteCount(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold mb-3 border border-purple-200">
            <Users className="w-3.5 h-3.5" />
            <span>Democratic Worker Cooperative Entity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Your Cooperative
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500 font-medium">
            Bengaluru Central Hub #408 • Governed horizontally by certified skilled technicians and service professionals.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => alert("WORKIVO Central Guild Hub #408 Charter: 1-worker 1-vote governance codified under the Karnataka Cooperative Societies Act.")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#5415A0]" />
            <span>Guild By-Laws</span>
          </button>

          <button 
            onClick={handleVote}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-sm ${
              hasVoted
                ? 'bg-emerald-600 text-white'
                : 'bg-[#5415A0] hover:bg-[#430E7E] text-white'
            }`}
          >
            <Vote className="w-4 h-4" />
            <span>{hasVoted ? 'Ballot Cast ✓' : 'Open Ballot #42'}</span>
          </button>
        </div>
      </div>

      {/* 3 Top Hub KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Worker-Owners</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">183</span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +7% MoM
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            • 12 new apprentice onboarded this month
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Hub Welfare Reserve</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">₹42.8K</span>
            <span className="text-xs font-extrabold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-full">
              Solvent
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            • Emergency & healthcare reserve ring-fenced
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Guild Service Readiness</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5415A0] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">96%</span>
            <span className="text-xs font-extrabold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-full">
              Peak
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            • Verified on-duty dispatch rate across Bangalore Urban
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="border-b border-slate-200/90 flex items-center gap-8 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 relative flex items-center gap-1.5 transition-colors ${
            activeTab === 'overview'
              ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]'
              : 'hover:text-slate-800'
          }`}
        >
          <span>Overview</span>
          <span className="px-1.5 py-0.5 text-[9px] font-black bg-purple-100 text-[#5415A0] rounded-md">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`pb-3.5 relative transition-colors ${
            activeTab === 'members'
              ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]'
              : 'hover:text-slate-800'
          }`}
        >
          Members (183)
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`pb-3.5 relative transition-colors ${
            activeTab === 'training'
              ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]'
              : 'hover:text-slate-800'
          }`}
        >
          Training •
        </button>

        <button
          onClick={onNavigateToWelfare}
          className="pb-3.5 hover:text-[#5415A0] transition-colors"
        >
          Welfare
        </button>

        <button
          onClick={() => alert("Hub #408 Assembly Announcement: New mobile tooling stations deployed in Indiranagar Locker #04.")}
          className="pb-3.5 hover:text-[#5415A0] transition-colors"
        >
          Announcements
        </button>
      </div>

      {/* 2x2 Grid of Guild Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget 1: Guild Quorum Assembly #42 — Annual Dividend Vote */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                Active Quorum Assembly
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Closes Oct 25, 23:59 IST
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Guild Quorum Assembly #42 — Annual Dividend Vote
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
              Voting is open until Oct 25. All 183 equity co-owners hold equal voting power on the 10% welfare pool allocation.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">
                Quorum threshold reached: {voteCount} / 183 votes ({Math.round((voteCount / 183) * 100)}%)
              </span>
              <span className="text-emerald-700">Valid & Binding</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5415A0] rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((voteCount / 183) * 100)}%` }} 
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleVote}
              className="text-xs font-extrabold text-[#5415A0] hover:underline flex items-center gap-1"
            >
              <span>{hasVoted ? 'Ballot Cast — View Tallies' : 'Review Ballot & Cast Vote'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Widget 2: Skill Uplift & Labs */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#5415A0]" />
                Skill Uplift & Labs
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Funded by Hub
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Advanced Inverter & EV Wallbox Certification
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5415A0]" />
              <span>Tomorrow at 10:00 AM • Led by Master Wireman Priya S.</span>
            </p>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-slate-600 font-bold">
              {seatReserved ? '43 of 50 seats reserved' : '42 of 50 seats reserved'}
            </span>
            <span className="text-amber-700 font-bold">
              {seatReserved ? '7 spots left' : '8 spots left'}
            </span>
          </div>

          <button
            onClick={() => setSeatReserved(!seatReserved)}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
              seatReserved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#5415A0] hover:bg-[#430E7E] text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{seatReserved ? 'Seat Confirmed (Ticket #EV-408)' : 'Reserve Seat'}</span>
          </button>
        </div>

        {/* Widget 3: Member Achievements & Celebrations */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#5415A0]" />
              Member Achievements & Celebrations
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
              October Honors
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 space-y-2">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                alt="Meena Sharma"
                className="w-12 h-12 rounded-2xl object-cover border border-purple-200"
              />
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Meena Sharma</h4>
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-md">
                  ⭐ Guild Master Insignia
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Completed 100 verified bookings with zero cancellations and a 4.98★ safety rating. Awarded Guild Master Insignia.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-slate-500 text-[11px]">
              {kudosSent ? '35 co-workers sent respect & congratulations' : '34 co-workers sent respect & congratulations'}
            </span>
            <button
              onClick={() => setKudosSent(!kudosSent)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                kudosSent 
                  ? 'border-[#5415A0] bg-purple-50 text-[#5415A0]' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{kudosSent ? 'Kudos Sent 👍' : 'Send Kudos'}</span>
            </button>
          </div>
        </div>

        {/* Widget 4: Mutual Aid & Healthcare Disbursal */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5415A0]" />
              Mutual Aid & Healthcare Disbursal
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs">
            <span className="font-bold text-slate-900">₹42,850 ready in decentralized treasury</span>
            <span className="text-[10px] font-extrabold text-[#5415A0]">Ledger 100% Audited</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Tool Replacement Grant (₹4,500) disbursed to Anil P.</span>
                <span className="text-[11px] text-slate-500">Approved within 30 mins • Peer Guild Council</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Preventive Health Checkup Voucher active for all members</span>
                <span className="text-[11px] text-slate-500">Manipal Hospital Koramangala • 100% covered</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenMutualAid}
              className="text-xs font-extrabold text-[#5415A0] hover:underline flex items-center gap-1"
            >
              <span>Submit Mutual Aid Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Guild Members Directory Preview */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Active Guild Members Directory Preview
            </h2>
            <p className="text-xs text-slate-500">
              Worker-owners currently on duty or available for cooperative peer swap.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            <span>Showing 6 of 183 • </span>
            <button onClick={() => alert("Showing all 183 active member-owners across Hub #408")} className="text-[#5415A0] font-bold hover:underline">
              View All 183 Members →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Ansh G.', role: 'Electrician', rating: '4.96 (312)', isYou: true, img: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80' },
            { name: 'Priya S.', role: 'Lead Wireman', rating: '4.99 (540)', isYou: false, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
            { name: 'Amitav G.', role: 'Plumbing Master', rating: '4.92 (218)', isYou: false, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
            { name: 'Meena S.', role: 'HVAC Spec', rating: '4.98 (100)', isYou: false, img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80' },
            { name: 'Vikram T.', role: 'HVAC & Solar', rating: '4.88 (174)', isYou: false, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
            { name: 'Sunil D.', role: 'Carpentry', rating: '4.95 (419)', isYou: false, img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80' },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-2 relative">
              {m.isYou && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black bg-[#5415A0] text-white">
                  YOU
                </span>
              )}
              <img
                src={m.img}
                alt={m.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-100"
              />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{m.name}</h4>
                <span className="inline-block text-[10px] font-bold text-[#5415A0] bg-purple-50 px-2 py-0.5 rounded-full mt-0.5">
                  {m.role}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{m.rating}</span>
              </div>
              <button
                onClick={() => alert(m.isYou ? "Status updated: Available for dispatch" : `Direct peer line opened with ${m.name}`)}
                className={`w-full py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
                  m.isYou 
                    ? 'border border-slate-200 hover:bg-slate-50 text-slate-700' 
                    : 'bg-[#5415A0] hover:bg-[#430E7E] text-white'
                }`}
              >
                {m.isYou ? 'Edit Status' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
