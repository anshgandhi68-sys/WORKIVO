import React, { useState } from 'react';
import { 
  Radio, 
  RotateCw, 
  Plus, 
  Coffee, 
  Check, 
  Clock, 
  Calendar, 
  Sliders, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Zap,
  SplitSquareVertical
} from 'lucide-react';

export const AvailabilityPlannerPage: React.FC = () => {
  const [liveRadar, setLiveRadar] = useState(true);
  const [emergencyDispatches, setEmergencyDispatches] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(3); // Thu
  const [activePreset, setActivePreset] = useState<'morning' | 'afternoon' | 'peak' | 'split' | 'weekend'>('afternoon');
  const [morningActive, setMorningActive] = useState(true);
  const [afternoonActive, setAfternoonActive] = useState(true);
  const [eveningActive, setEveningActive] = useState(false);
  const [bufferMinutes, setBufferMinutes] = useState(30);
  const [dailyCapHours, setDailyCapHours] = useState(6);
  const [saveToast, setSaveToast] = useState(false);

  const DAYS = [
    { dayName: 'MON', date: 'Oct 21', status: 'Available', statusClass: 'bg-purple-100 text-[#5415A0]', timeRange: '08:00 AM – 06:00 PM', subtitle: '3 dispatch slots active' },
    { dayName: 'TUE', date: 'Oct 22', status: 'Available', statusClass: 'bg-purple-100 text-[#5415A0]', timeRange: '08:00 AM – 06:00 PM', subtitle: '4 dispatch slots active' },
    { dayName: 'WED', date: 'Oct 23', status: 'Available', isToday: true, statusClass: 'bg-[#5415A0] text-white', timeRange: '08:00 AM – 05:30 PM', subtitle: '✓ 2 jobs scheduled' },
    { dayName: 'THU', date: 'Oct 24', status: 'Limited', statusClass: 'bg-amber-50 text-amber-800 border-amber-200', timeRange: '01:00 PM – 06:00 PM', subtitle: 'Afternoon Only • Part-time' },
    { dayName: 'FRI', date: 'Oct 25', status: 'Available', statusClass: 'bg-purple-100 text-[#5415A0]', timeRange: '08:00 AM – 04:00 PM', subtitle: '2 slots active' },
    { dayName: 'SAT', date: 'Oct 26', status: 'Limited', statusClass: 'bg-amber-50 text-amber-800 border-amber-200', timeRange: '09:00 AM – 01:00 PM', subtitle: 'Weekend Half-Day' },
    { dayName: 'SUN', date: 'Oct 27', status: 'Unavailable', statusClass: 'bg-slate-100 text-slate-500', timeRange: 'Full Day Off', subtitle: 'Co-op Rest Day' },
  ];

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2400);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed top-20 right-8 z-50 bg-[#3B0764] text-white px-5 py-3 rounded-2xl shadow-xl border border-purple-400 flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
          <span>Dispatch Schedule Synchronized with Hub #408 Central Router!</span>
        </div>
      )}

      {/* Top Header & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5415A0] text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>Worker Dispatch Control • Guild Hub #408</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Availability Planner
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Manage your dispatch schedule, set weekly operating hours, and configure custom part-time shifts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert("Dispatch Sync Log: Last synchronized 2 mins ago with Karnataka Municipal Gateway.")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-colors shadow-sm"
          >
            <RotateCw className="w-4 h-4 text-slate-500" />
            <span>Sync Log</span>
          </button>

          <button
            onClick={() => alert("Add custom on-demand dispatch window.")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Shift</span>
          </button>
        </div>
      </div>

      {/* Available Today Control Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#5415A0] flex items-center justify-center shrink-0 border border-purple-100">
            <Radio className={`w-7 h-7 ${liveRadar ? 'animate-pulse text-[#5415A0]' : 'text-slate-400'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900">AVAILABLE TODAY</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                • Live Radar Active
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Shift: <strong className="text-slate-900">08:00 AM – 06:00 PM</strong> • <strong className="text-emerald-700">✓ 2 Bookings confirmed today</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Radar active for emergency dispatch within 5 km
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end w-full lg:w-auto">
          {/* Toggle 1: Live Radar */}
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 select-none">
            <div 
              onClick={() => setLiveRadar(!liveRadar)}
              className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${liveRadar ? 'bg-[#5415A0]' : 'bg-slate-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${liveRadar ? 'translate-x-5' : ''}`} />
            </div>
            <span>Live Dispatch Radar</span>
          </label>

          {/* Toggle 2: Emergency Dispatches */}
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 select-none">
            <div 
              onClick={() => setEmergencyDispatches(!emergencyDispatches)}
              className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${emergencyDispatches ? 'bg-[#5415A0]' : 'bg-slate-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${emergencyDispatches ? 'translate-x-5' : ''}`} />
            </div>
            <span>Accept Emergency Dispatches</span>
          </label>

          {/* Take a break button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              isPaused 
                ? 'bg-amber-100 text-amber-900' 
                : 'bg-purple-50 text-[#5415A0] hover:bg-purple-100'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>{isPaused ? 'Resumed (Break Paused)' : 'Take a Break / Pause Dispatch'}</span>
          </button>
        </div>
      </div>

      {/* Weekly Schedule Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Weekly Schedule Matrix</h2>
            <p className="text-xs text-slate-500">Click any day to quickly fine-tune time windows or allocate peer cover.</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5415A0]" />
              <span>Available (Full Shift)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Limited (Part-Time)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span>Unavailable (Off-Duty)</span>
            </span>
          </div>
        </div>

        {/* 7 Day Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {DAYS.map((d, index) => {
            const isSelected = activeDayIndex === index;

            return (
              <div
                key={d.dayName}
                onClick={() => setActiveDayIndex(index)}
                className={`rounded-3xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-white ${
                  d.isToday
                    ? 'border-2 border-[#5415A0] shadow-md ring-2 ring-purple-100'
                    : isSelected
                    ? 'border-2 border-purple-400 shadow-sm'
                    : 'border border-slate-200 hover:border-purple-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-900">{d.dayName}</span>
                    <span className="text-[11px] font-medium text-slate-400">{d.date}</span>
                  </div>

                  {d.isToday && (
                    <span className="inline-block mb-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#3B0764] text-white">
                      Today
                    </span>
                  )}

                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${d.statusClass}`}>
                    {d.status}
                  </span>

                  <div className="text-xs font-extrabold text-slate-900 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{d.timeRange}</span>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-1 font-medium">
                    {d.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#5415A0]">
                  <span>{d.isToday ? 'Current Shift ⦿' : 'Edit Day'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Columns: Shift Configuration & Blocked Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quick Part-Time & Shift Configuration (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Quick Part-Time & Shift Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                One-click templates or modular time-slot adjustments for flexible work schedules.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-[#5415A0] border border-purple-200 shrink-0">
              Ergonomic Worker Cap: Max 6h/day
            </span>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-2">Quick Presets (1-Click Application)</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'morning', label: '☀️ Mornings Only (08:00 AM – 12:00 PM)' },
                { id: 'afternoon', label: '🌙 Afternoons Only (01:00 PM – 05:00 PM)' },
                { id: 'peak', label: '⚡ Peak Hours (10:00 AM – 04:00 PM)' },
                { id: 'split', label: '🔀 Custom Split Shift' },
                { id: 'weekend', label: '☕ Weekend Half-Day' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activePreset === p.id 
                      ? 'bg-[#5415A0] text-white shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editing Slot Matrix for Day Pills */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Editing Slot Matrix for:</span>
            <div className="flex gap-1.5 text-xs font-bold">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <button
                  key={day}
                  onClick={() => setActiveDayIndex(i)}
                  className={`w-9 h-7 rounded-lg transition-all ${
                    activeDayIndex === i 
                      ? 'bg-[#5415A0] text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Time Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Block 1 */}
            <div 
              onClick={() => setMorningActive(!morningActive)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                morningActive ? 'border-2 border-[#5415A0] bg-[#FAF8FE]' : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-500 block">Morning Block</span>
              <span className="text-sm font-black text-slate-900 block my-0.5">08:00 – 12:00</span>
              <span className="text-[10px] text-slate-400 block mb-2">4.0 hrs capacity</span>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${morningActive ? 'text-[#5415A0]' : 'text-slate-400'}`}>
                <Check className="w-3 h-3" />
                {morningActive ? 'Active (Available)' : 'Off (Unavailable)'}
              </span>
            </div>

            {/* Block 2 */}
            <div 
              onClick={() => setAfternoonActive(!afternoonActive)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                afternoonActive ? 'border-2 border-[#5415A0] bg-[#FAF8FE]' : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-500 block">Afternoon Block</span>
              <span className="text-sm font-black text-slate-900 block my-0.5">12:00 – 16:00</span>
              <span className="text-[10px] text-slate-400 block mb-2">4.0 hrs capacity</span>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${afternoonActive ? 'text-[#5415A0]' : 'text-slate-400'}`}>
                <Check className="w-3 h-3" />
                {afternoonActive ? 'Active (Available)' : 'Off (Unavailable)'}
              </span>
            </div>

            {/* Block 3 */}
            <div 
              onClick={() => setEveningActive(!eveningActive)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                eveningActive ? 'border-2 border-[#5415A0] bg-[#FAF8FE]' : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-500 block">Evening Block</span>
              <span className="text-sm font-black text-slate-900 block my-0.5">16:00 – 20:00</span>
              <span className="text-[10px] text-slate-400 block mb-2">Rest & Family</span>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${eveningActive ? 'text-[#5415A0]' : 'text-slate-400'}`}>
                <Check className="w-3 h-3" />
                {eveningActive ? 'Active (Available)' : 'Off (Unavailable)'}
              </span>
            </div>
          </div>

          {/* Ergonomic Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Buffer between jobs</span>
                <span className="text-[#5415A0] font-black">{bufferMinutes} mins</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                step={15}
                value={bufferMinutes}
                onChange={(e) => setBufferMinutes(Number(e.target.value))}
                className="w-full accent-[#5415A0]"
              />
              <span className="text-[10px] text-slate-400">Recommended for Bangalore traffic zone 4</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Daily Active Cap</span>
                <span className="text-[#5415A0] font-black">{dailyCapHours} hours</span>
              </div>
              <input
                type="range"
                min={4}
                max={8}
                step={1}
                value={dailyCapHours}
                onChange={(e) => setDailyCapHours(Number(e.target.value))}
                className="w-full accent-[#5415A0]"
              />
              <span className="text-[10px] text-slate-400">Co-op Ergonomic Healthy Work Policy</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#5415A0]" />
                <span>Apply to All Weekdays</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="accent-[#5415A0]" />
                <span>Weekends Only</span>
              </label>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setMorningActive(true);
                  setAfternoonActive(true);
                  setEveningActive(false);
                }}
                className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Reset Full-Time
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Save & Synchronize Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Blocked Dates & Time Off (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5415A0]" />
              <span>Blocked Dates & Time Off</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Guild assembly blackout periods and personal time off guaranteed by peer reserve dispatch.
          </p>

          <div className="space-y-3">
            {/* Block 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#5415A0] flex flex-col items-center justify-center font-black shrink-0">
                <span className="text-[9px] uppercase">OCT</span>
                <span className="text-base leading-none">24</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-slate-900">Guild Quorum Assembly</h4>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-100 text-[#5415A0]">
                    Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Mandatory 2h co-op closure for ballot voting (11:00 AM – 01:00 PM).
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-100 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#5415A0] flex flex-col items-center justify-center font-black shrink-0">
                <span className="text-[9px] uppercase">NOV</span>
                <span className="text-base leading-none">02</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-slate-900">Diwali Holiday Notice</h4>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">
                    Approved
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Nov 02–03 • Auto-covered by Hub #408 Peer Guarantee Reserve.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Request personal leave or schedule custom time-off block.")}
            className="w-full py-3 border border-dashed border-purple-300 hover:border-[#5415A0] hover:bg-purple-50/50 text-[#5415A0] font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Time Off / Block Range</span>
          </button>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-[11px] text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
            <span>All planned leaves maintain 100% baseline guild dividend eligibility without penalty.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
