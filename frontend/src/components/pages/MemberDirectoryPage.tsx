import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  UserPlus, 
  Star, 
  CheckCircle2, 
  Send, 
  Clock, 
  ChevronDown, 
  Filter, 
  Zap, 
  Award, 
  RefreshCw, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

interface MemberDirectoryPageProps {
  onOpenNominate: () => void;
  onNavigateToCoop: () => void;
}

export const MemberDirectoryPage: React.FC<MemberDirectoryPageProps> = ({ 
  onOpenNominate, 
  onNavigateToCoop 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTradeFilter, setSelectedTradeFilter] = useState('all');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'full' | 'part'>('all');
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  const MEMBERS = [
    {
      id: 'm1',
      name: 'Ansh Gandhi',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Available Now',
      availType: 'now',
      primaryRole: 'Master Electrician',
      experience: '8 yrs exp',
      badgeChip: 'EV Specialist',
      rating: 4.96,
      reviewsCount: 312,
      tagText: '100% On-Time Record',
      location: 'Indiranagar • 2.1 km',
      img: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80',
      actionType: 'connect'
    },
    {
      id: 'm2',
      name: 'Priya Sunder',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Available Now',
      availType: 'now',
      primaryRole: 'HVAC Master',
      experience: '7 yrs exp',
      badgeChip: 'Eco-Chiller Cert',
      rating: 4.98,
      reviewsCount: 274,
      tagText: 'Zero-cancellation badge',
      location: 'Koramangala • 3.4 km',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      actionType: 'connect'
    },
    {
      id: 'm3',
      name: 'Amitav Ghosh',
      verified: true,
      employment: 'Verified Co-owner • Part-time (Flexible)',
      availability: 'Afternoon Shift (4h)',
      availType: 'shift',
      primaryRole: 'Master Carpenter',
      experience: '11 yrs exp',
      badgeChip: 'Modular Cabinetry',
      rating: 4.94,
      reviewsCount: 189,
      tagText: '100% On-Time',
      location: 'HSR Layout • 4.8 km',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      actionType: 'profile'
    },
    {
      id: 'm4',
      name: 'Meena Sharma',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Available Now',
      availType: 'now',
      primaryRole: 'Solar Technician',
      experience: '5 yrs exp',
      badgeChip: 'Inverter Certified',
      rating: 4.99,
      reviewsCount: 410,
      tagText: 'Guild Peer Mentor',
      location: 'Ulsoor Lake • 1.8 km',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80',
      actionType: 'connect'
    },
    {
      id: 'm5',
      name: 'Vikram Thapa',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Co-op Rest Day',
      availType: 'rest',
      primaryRole: 'Plumbing Specialist',
      experience: '9 yrs exp',
      badgeChip: 'Leak Acoustic Analysis',
      rating: 4.91,
      reviewsCount: 228,
      tagText: 'Zero-cancellation',
      location: 'Malleshwaram • 5.1 km',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      actionType: 'profile'
    },
    {
      id: 'm6',
      name: 'Sunil Deshmukh',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Available Now',
      availType: 'now',
      primaryRole: 'Appliance Specialist',
      experience: '6 yrs exp',
      badgeChip: 'Inverter PCB Repair',
      rating: 4.95,
      reviewsCount: 340,
      tagText: 'Living Wage Fellow',
      location: 'Jayanagar • 3.9 km',
      img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
      actionType: 'connect'
    },
    {
      id: 'm7',
      name: 'Ananya Roy',
      verified: true,
      employment: 'Verified Co-owner • Part-time (Flexible)',
      availability: 'Part-time (4h)',
      availType: 'shift',
      primaryRole: 'Smart Home Automation',
      experience: '4 yrs exp',
      badgeChip: 'Zigbee/Matter Lead',
      rating: 4.97,
      reviewsCount: 195,
      tagText: 'Peer Cover Ready',
      location: 'Whitefield • 6.2 km',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      actionType: 'profile'
    },
    {
      id: 'm8',
      name: 'Farhan Akhtar',
      verified: true,
      employment: 'Verified Co-owner • Full-time',
      availability: 'Available Now',
      availType: 'now',
      primaryRole: 'Lead Wireman & EV',
      experience: '10 yrs exp',
      badgeChip: 'High Voltage Tier 2',
      rating: 4.98,
      reviewsCount: 362,
      tagText: '100% On-Time Record',
      location: 'Frazer Town • 2.6 km',
      img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      actionType: 'connect'
    }
  ];

  const filteredMembers = MEMBERS.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.primaryRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTime = timeFilter === 'all' 
      ? true 
      : timeFilter === 'full' 
      ? m.employment.includes('Full-time') 
      : m.employment.includes('Part-time');
    return matchesSearch && matchesTime;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Role,Experience,Rating,Jobs,Location,Availability\n" + 
      MEMBERS.map(e => `${e.name},${e.primaryRole},${e.experience},${e.rating},${e.reviewsCount},"${e.location}",${e.availability}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workivo_guild_408_members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Sub-Header Bar (Tab cluster matching Image 1) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/90 pb-3 gap-3">
        <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
          <button className="text-[#5415A0] font-extrabold pb-1 border-b-2 border-[#5415A0] relative">
            Members (183)
          </button>
          <button onClick={() => alert("Guild Governance: Peer council quorum rules and voting thresholds.")} className="hover:text-slate-800 transition-colors">
            Guild Governance
          </button>
          <button onClick={() => alert("Skill Badges & Standards: Karnataka cooperative certified craft credentials.")} className="hover:text-slate-800 transition-colors">
            Skill Badges & Standards
          </button>
          <button onClick={() => alert("Cooperative Dividend: Annual 10% welfare pool patronage disbursement.")} className="hover:text-slate-800 transition-colors">
            Cooperative Dividend
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready for Dispatch
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] text-slate-500 font-medium">Co-owner • Guild #408</span>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={onNavigateToCoop} className="hover:text-slate-700 transition-colors">Your Cooperative</button>
        <span>&gt;</span>
        <button onClick={onNavigateToCoop} className="hover:text-slate-700 transition-colors">Guild Hub #408</button>
        <span>&gt;</span>
        <span className="text-slate-700">Member Directory</span>
      </div>

      {/* Page Title & Main Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cooperative Member Directory
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
            183 verified worker-owners actively governing, dispatching, and collaborating across Bengaluru Central Hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Directory (CSV)</span>
          </button>

          <button
            onClick={onOpenNominate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-xs transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Nominate Apprentice</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar Container Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Box */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#F8F9FE] border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members... (e.g. by name, trade, badge, district)"
              className="w-full bg-transparent text-xs font-medium outline-none text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedTradeFilter}
              onChange={(e) => setSelectedTradeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none cursor-pointer hover:border-purple-300"
            >
              <option value="all">All Skills (Trades)</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="hvac">HVAC & Solar</option>
            </select>

            <select
              value={selectedRatingFilter}
              onChange={(e) => setSelectedRatingFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none cursor-pointer hover:border-purple-300"
            >
              <option value="all">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
              <option value="4.9">4.9+ Stars</option>
            </select>

            <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none cursor-pointer hover:border-purple-300">
              <option>All Availability</option>
              <option>Available Now</option>
              <option>Today Afternoon</option>
            </select>

            <select className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none cursor-pointer hover:border-purple-300">
              <option>All Experience</option>
              <option>5+ Years</option>
              <option>8+ Years</option>
              <option>10+ Years</option>
            </select>

            {/* Segmented Full/Part Time */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${timeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                All
              </button>
              <button
                onClick={() => setTimeFilter('full')}
                className={`px-3 py-1 rounded-lg transition-all ${timeFilter === 'full' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Full-time
              </button>
              <button
                onClick={() => setTimeFilter('part')}
                className={`px-3 py-1 rounded-lg transition-all ${timeFilter === 'part' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Part-time
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filters Row */}
        <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Quick Filters:</span>
            {[
              { id: 'today', label: '⚡ Available Today' },
              { id: 'master', label: '🛡️ Master Insignia' },
              { id: 'cover', label: '⇄ Peer Cover Ready' },
              { id: 'living', label: '🛡️ Living Wage Certified' }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setQuickFilter(quickFilter === chip.id ? null : chip.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  quickFilter === chip.id 
                    ? 'bg-[#5415A0] text-white border-[#5415A0]' 
                    : 'bg-[#F8F9FE] text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 shrink-0">
            <span>Showing <strong className="text-slate-900">{filteredMembers.length}</strong> of 183 Co-owners in Bengaluru Guild #408</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-bold">Sort by: Highest Rated ▾</span>
          </div>
        </div>
      </div>

      {/* 8 Detailed Member Cards Grid (2 rows x 4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:border-[#5415A0] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Avatar + Availability Pill */}
              <div className="flex items-start justify-between mb-3">
                <div className="relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#5415A0] text-white flex items-center justify-center ring-2 ring-white text-[9px] font-black">
                    ✓
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  member.availType === 'now' 
                    ? 'bg-purple-100 text-[#5415A0] border-purple-200' 
                    : member.availType === 'shift'
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${member.availType === 'now' ? 'bg-[#5415A0]' : 'bg-slate-400'}`} />
                  {member.availability}
                </span>
              </div>

              {/* Name & Employment */}
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {member.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {member.employment}
              </p>

              {/* Role & Experience Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5 mb-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-50 text-[#5415A0]">
                  {member.primaryRole}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                  {member.experience}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                  {member.badgeChip}
                </span>
              </div>

              {/* Rating & Location Meta */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1 text-slate-800 font-extrabold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{member.rating}</span>
                  <span className="text-slate-400 font-medium text-[11px]">({member.reviewsCount} completed jobs)</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {member.tagText}
                  </span>
                  <span>{member.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              {member.actionType === 'connect' ? (
                <button
                  onClick={() => alert(`Connect request initiated with ${member.name}. Peer dispatch swap line active.`)}
                  className="flex-1 py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
                >
                  Connect / Swap
                </button>
              ) : (
                <button
                  onClick={() => alert(`Opening verified guild credentials and work history for ${member.name}.`)}
                  className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  View Profile
                </button>
              )}

              <button
                onClick={() => alert(`Direct peer encrypted chat opened with ${member.name}.`)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-purple-50 hover:text-[#5415A0] text-slate-500 transition-colors"
                title="Send encrypted message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium">
          Showing members <strong className="text-slate-800">1 to 8</strong> of 183 in active roster
        </span>

        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#5415A0] text-white flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center">2</button>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center">3</button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center">23</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1">
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Cooperative Dispatch Network Active</span>
        </div>
      </div>
    </div>
  );
};
