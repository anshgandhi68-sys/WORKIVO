import React from 'react';
import { 
  Check, 
  Award, 
  Navigation, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  Wrench, 
  BadgeCheck,
  ShieldAlert
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Worker } from '../../types';

export const Step2Worker: React.FC = () => {
  const { 
    state, 
    selectWorker, 
    workerSort, 
    setWorkerSort, 
    sortedWorkers, 
    nextStep, 
    prevStep 
  } = useBooking();

  return (
    <div className="space-y-6 pb-28">
      {/* Top Header & Protection Pool Badge */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold mb-3 border border-purple-200">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Cooperative Worker-Led Model</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose your Cooperative Member-Owner
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 font-medium">
            <span>Selected: </span>
            <span className="font-bold text-slate-800">
              {state.selectedService?.title} (₹{state.selectedService?.price}/hr)
            </span>
            <span className="text-[#5415A0] font-semibold"> • 85% payout directly to artisan.</span>
          </p>
        </div>

        {/* Co-op Protection Pool Widget */}
        <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#5415A0]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Co-op Protection Pool
            </span>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              100% Guaranteed Work
            </span>
          </div>
        </div>
      </div>

      {/* Sorting & Availability Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mr-1">
            Sort by:
          </span>

          <button
            onClick={() => setWorkerSort('best_match')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              workerSort === 'best_match'
                ? 'bg-[#5415A0] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Best Match</span>
          </button>

          <button
            onClick={() => setWorkerSort('distance')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              workerSort === 'distance'
                ? 'bg-[#5415A0] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Nearest Distance</span>
          </button>

          <button
            onClick={() => setWorkerSort('rating')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              workerSort === 'rating'
                ? 'bg-[#5415A0] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Highest Rating</span>
          </button>

          <button
            onClick={() => setWorkerSort('availability')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              workerSort === 'availability'
                ? 'bg-[#5415A0] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Earliest Availability</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-[#5415A0]" />
          <span>3 Member-Owners Available in Hub #408</span>
        </div>
      </div>

      {/* Worker Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedWorkers.map((worker) => {
          const isSelected = state.selectedWorker?.id === worker.id;

          return (
            <div
              key={worker.id}
              onClick={() => selectWorker(worker)}
              className={`rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between relative bg-white ${
                isSelected
                  ? 'border-2 border-[#5415A0] shadow-[0_4px_25px_rgba(84,21,160,0.08)] ring-1 ring-[#5415A0]'
                  : 'border border-slate-200/90 hover:border-purple-200 hover:shadow-md'
              }`}
            >
              <div>
                {/* Badge Row & Checkmark Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    worker.badge.variant === 'selected'
                      ? 'bg-purple-100 text-[#5415A0] border-purple-200'
                      : worker.badge.variant === 'senior'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {worker.badge.variant === 'selected' && <Award className="w-3 h-3 text-[#5415A0]" />}
                    {worker.badge.variant === 'senior' && <Wrench className="w-3 h-3 text-amber-700" />}
                    {worker.badge.variant === 'member' && <BadgeCheck className="w-3 h-3 text-blue-600" />}
                    {worker.badge.text}
                  </span>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-[#5415A0] text-white shadow-sm' 
                      : 'border-2 border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Profile Row */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative">
                    <img
                      src={worker.avatarUrl}
                      alt={worker.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#5415A0] text-white flex items-center justify-center ring-2 ring-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                      {worker.name}
                    </h3>
                    <p className="text-xs font-bold text-[#5415A0]">
                      {worker.title}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400">
                      {worker.guildPartner}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center mb-4">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-slate-900">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{worker.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {worker.reviewCount} reviews
                    </span>
                  </div>

                  <div className="border-x border-slate-100">
                    <div className="text-xs font-extrabold text-slate-900">
                      {worker.jobsDone}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Jobs Done
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {worker.experienceYears}+ yrs
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Experience
                    </span>
                  </div>
                </div>

                {/* Distance & Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    <span className="font-bold text-slate-800">{worker.distanceKm} km away</span> ({worker.hubLocation})
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4">
                  <Zap className="w-3.5 h-3.5 text-[#5415A0] shrink-0 fill-current" />
                  <span className="text-slate-700 font-medium truncate">
                    {worker.skills.join(', ')}
                  </span>
                </div>

                {/* Earliest Slot Container */}
                <div className="rounded-xl bg-[#F8F9FE] border border-purple-100/60 p-2.5 flex items-center justify-between text-xs mb-4">
                  <span className="text-slate-500 font-medium">Earliest Slot:</span>
                  <span className="font-bold text-slate-900">{worker.earliestSlotText}</span>
                </div>
              </div>

              {/* Card Footer: Hourly rate and button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{worker.hourlyRate}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/hr</span>
                </div>

                {isSelected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5415A0] py-1 px-3">
                    <span>Selected</span>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectWorker(worker);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:text-[#5415A0] transition-colors"
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* WORKIVO Fair Trade Cooperative Promise Banner */}
      <div className="bg-[#FAF8FE] border border-purple-100/90 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#5415A0] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              WORKIVO Fair Trade Cooperative Promise
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Every member owns equal equity in their local district chapter. You receive artisanal care, and they keep fair, dignified earnings.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm shrink-0">
          Zero Surge Pricing
        </span>
      </div>

      {/* Sticky Bottom Summary Bar */}
      {state.selectedWorker && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] animate-in slide-in-from-bottom-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-[#5415A0] font-extrabold text-xs">
                {state.selectedWorker.initials}
              </div>
              <div className="text-xs">
                <div>
                  <span className="text-slate-500">Selected Worker: </span>
                  <span className="font-extrabold text-slate-900">
                    {state.selectedWorker.name}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  <span>{state.selectedWorker.guildPartner}</span>
                  <span className="mx-1">•</span>
                  <span>Next Slot: {state.selectedWorker.earliestSlotText}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={prevStep}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Service</span>
              </button>
              <button
                onClick={nextStep}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md"
              >
                <span>Continue to Schedule Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
