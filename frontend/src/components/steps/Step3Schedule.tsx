import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Star, 
  Lock, 
  Sun, 
  Coffee,
  Sparkles,
  Zap,
  Repeat,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { CALENDAR_DAYS, TIME_SLOTS } from '../../data/mockData';
import { BookingFrequency } from '../../types';

interface Step3ScheduleProps {
  onOpenAddressModal: () => void;
}

export const Step3Schedule: React.FC<Step3ScheduleProps> = ({ onOpenAddressModal }) => {
  const { 
    state, 
    selectDate, 
    selectSlot, 
    frequency,
    setFrequency,
    recurringDay,
    setRecurringDay,
    setArtisanNotes, 
    pricing, 
    nextStep, 
    prevStep 
  } = useBooking();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Top Header & Cooperative Artisan Badge */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Schedule & Booking Frequency
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 font-medium">
            <span>Booking with </span>
            <span className="font-extrabold text-slate-900">{state.selectedWorker?.name}</span>
            <span className="text-[#5415A0] font-semibold"> • {state.selectedWorker?.title}</span>
            <span className="text-slate-500"> • {state.selectedWorker?.hubLocation}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-50 text-[#5415A0] text-xs font-bold border border-purple-200/80 shadow-sm shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Cooperative Verified Artisan</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Span 7 / 60%) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. REGULAR / RECURRING BOOKING SELECTOR (User Requested: "book a worker who comes at my home every saturday") */}
          <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <Repeat className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Booking Frequency</h3>
                  <p className="text-[11px] text-slate-500">Choose between a single task or a recurring weekly home visit.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                10% Recurring Discount
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Option A: Every Saturday (Recommended) */}
              <div 
                onClick={() => {
                  setFrequency('every_saturday');
                  setRecurringDay('Saturday');
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 relative ${
                  frequency === 'every_saturday'
                    ? 'border-[#5415A0] bg-purple-50/60 shadow-xs ring-1 ring-[#5415A0]'
                    : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#5415A0]" />
                    <span>Every Saturday (Weekly)</span>
                  </span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    frequency === 'every_saturday' ? 'bg-[#5415A0] text-white' : 'border border-slate-300'
                  }`}>
                    {frequency === 'every_saturday' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Dedicated artisan visits your home <strong>every Saturday</strong>. Ideal for cooking, cleaning & housekeeping.
                </p>
                <span className="text-[10px] font-bold text-purple-700">
                  ✓ Same trusted worker • Cancel or pause anytime
                </span>
              </div>

              {/* Option B: One-Time Visit */}
              <div 
                onClick={() => setFrequency('one_time')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 relative ${
                  frequency === 'one_time'
                    ? 'border-[#5415A0] bg-purple-50/60 shadow-xs ring-1 ring-[#5415A0]'
                    : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-600" />
                    <span>One-Time Visit</span>
                  </span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    frequency === 'one_time' ? 'bg-[#5415A0] text-white' : 'border border-slate-300'
                  }`}>
                    {frequency === 'one_time' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Single service dispatch on your selected date. No ongoing commitment.
                </p>
                <span className="text-[10px] font-medium text-slate-500">
                  Standard single dispatch rate
                </span>
              </div>

            </div>

            {/* If user wants a different recurring day */}
            {frequency === 'every_saturday' && (
              <div className="p-3 bg-purple-100/50 rounded-xl border border-purple-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5415A0]" />
                  <span className="text-slate-800">
                    Recurring Plan Active: <strong>{state.selectedWorker?.name}</strong> will arrive <strong>every Saturday</strong>.
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#5415A0] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                  10% OFF
                </span>
              </div>
            )}
          </div>

          {/* 2. Date Selector Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#5415A0]" />
                <span className="text-sm font-extrabold text-slate-900">
                  {frequency === 'every_saturday' ? 'Select First Saturday Start Date' : 'Select Service Date (October 2025)'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                <span>Week 3</span>
              </div>
            </div>

            {/* Day Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {CALENDAR_DAYS.map((day) => {
                const isSelected = state.selectedDate.dateNumber === day.dateNumber;
                const isFull = day.isFull;

                return (
                  <div
                    key={day.dateNumber}
                    onClick={() => !isFull && selectDate(day)}
                    className={`rounded-2xl p-3 flex flex-col items-center justify-center transition-all relative cursor-pointer ${
                      isFull
                        ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#5415A0] text-white shadow-md ring-2 ring-purple-300 transform scale-105'
                        : 'bg-slate-50/80 hover:bg-purple-50 text-slate-700 border border-slate-100'
                    }`}
                  >
                    <span className="text-[11px] font-medium tracking-wide uppercase opacity-80">
                      {day.dayName}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight mt-0.5">
                      {day.dateNumber}
                    </span>
                    <span className={`text-[10px] font-semibold mt-1 px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'text-slate-400'
                    }`}>
                      {day.slotStatusText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Time Slot Windows */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5415A0]" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Select Time Window
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Guaranteed arrival</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_SLOTS.map((slot) => {
                const isSelected = state.selectedSlot?.id === slot.id;

                return (
                  <div
                    key={slot.id}
                    onClick={() => selectSlot(slot)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-[#5415A0] bg-purple-50/50 shadow-xs ring-1 ring-[#5415A0]'
                        : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">
                        {slot.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#5415A0]">
                        {slot.badge}
                      </span>
                    </div>

                    <div className="text-sm font-black text-slate-900">
                      {slot.timeRange}
                    </div>

                    <p className="text-[11px] text-slate-500">
                      {slot.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Address Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5415A0]" />
                <h3 className="text-sm font-extrabold text-slate-900">Service Location</h3>
              </div>
              <button
                onClick={onOpenAddressModal}
                className="text-xs font-bold text-[#5415A0] hover:underline cursor-pointer"
              >
                Change Address
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block">{state.address.street}</span>
              <span className="text-slate-500 block mt-0.5">
                {state.address.apartmentDetails} • {state.address.locality}, {state.address.city} - {state.address.pincode}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Landmark: {state.address.landmark}
              </span>
            </div>
          </div>

          {/* 5. Artisan Instructions / Notes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5415A0]" />
              <h3 className="text-sm font-extrabold text-slate-900">Special Instructions for Artisan</h3>
            </div>
            <textarea
              value={state.artisanNotes}
              onChange={(e) => setArtisanNotes(e.target.value)}
              placeholder="e.g. Dietary preferences, spice levels, gate codes, or specialized task details"
              rows={2}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 transition-all resize-none"
            />
          </div>
        </div>

        {/* Right Column: SUMMARY REVIEW (Span 5 / 40%) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Summary Review
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {state.selectedService?.title}
                </h3>
                <span className="text-[11px] text-[#5415A0] font-bold block mt-0.5">
                  {frequency === 'every_saturday' ? '🔁 Recurring: Every Saturday' : '🗓️ One-Time Visit'}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-[#5415A0] border border-purple-200 shrink-0">
                Co-op Rate Lock
              </span>
            </div>

            {/* Worker Mini Card */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF8FE] border border-purple-100">
              <img 
                src={state.selectedWorker?.avatarUrl} 
                alt={state.selectedWorker?.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-200 shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {state.selectedWorker?.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{state.selectedWorker?.rating}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {state.selectedWorker?.title} • {state.selectedWorker?.jobsDone} tasks completed
                </p>
              </div>
            </div>

            {/* Summary Line Items with Low Prices */}
            <div className="space-y-2.5 text-xs border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Service Base Rate</span>
                <span className="font-bold text-slate-900">₹{pricing.hourlyRate} / hr</span>
              </div>

              {pricing.discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span>Recurring Saturday Discount (10%)</span>
                  <span>-₹{pricing.discountAmount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimated Total</span>
                <span className="text-base font-black text-slate-900">₹{pricing.finalTotal}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[#5415A0] font-bold">
                <span>Escrow Lock Today (25%)</span>
                <span>₹{pricing.depositRequired}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Balance upon satisfactory sign-off (75%)</span>
                <span>₹{pricing.balanceOnSignoff}</span>
              </div>
            </div>

            {/* WORKIVO Guarantee Box */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs flex gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">WORKIVO Cooperative Guarantee</span>
                <span className="text-slate-500 text-[11px]">
                  100% Free peer replacement dispatch or instant full refund if artisan is unavailable.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={nextStep}
                className="w-full py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Escrow Deposit (₹{pricing.depositRequired})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={prevStep}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Worker</span>
              </button>
            </div>

            {/* Escrow Vault Tag */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Cooperative Escrow Vault • 100% Refundable until task start</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
