import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  CreditCard, 
  Building2, 
  Smartphone, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  RefreshCw, 
  Zap
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { PaymentProcessingModal } from '../common/PaymentProcessingModal';

export const Step4Payment: React.FC = () => {
  const { 
    state, 
    pricing, 
    setPaymentMethod, 
    setUpiId, 
    verifyUpi, 
    confirmBooking, 
    prevStep 
  } = useBooking();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    await verifyUpi();
    setIsVerifying(false);
  };

  const handleAuthorize = () => {
    setIsSubmitting(true);
    setShowProcessingModal(true);
  };

  const handlePaymentComplete = async () => {
    await confirmBooking();
    setIsSubmitting(false);
    setShowProcessingModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Verified Escrow Badge */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold mb-3 border border-purple-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>WORKIVO Verified Cooperative Escrow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Transparent Escrow Deposit
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 font-medium">
          Payment is locked in cooperative escrow and only disbursed upon your digital sign-off.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Span 7 / 60%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Sovereign Escrow Protocol Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Sovereign Escrow Protocol
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-[#5415A0] border border-purple-200">
                Cooperative Backed
              </span>
            </div>

            {/* Total Estimate Line */}
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-600 font-medium">Total Estimate ({pricing.estimatedHours} hrs):</span>
              <span className="font-extrabold text-slate-900">₹{pricing.totalEstimate}</span>
            </div>

            {/* Deposit Required Today Box */}
            <div className="my-3 p-4 rounded-2xl bg-[#FAF8FE] border border-purple-200/90 flex items-center justify-between">
              <div>
                <span className="text-sm font-extrabold text-slate-900 block">
                  Deposit Required Today
                </span>
                <span className="text-xs text-slate-500">
                  Initial Escrow Mobilization Lock
                </span>
              </div>
              <span className="text-2xl font-black text-slate-900">
                ₹{pricing.depositRequired}
              </span>
            </div>

            {/* Balance on Sign-off */}
            <div className="flex items-center justify-between py-2 text-sm border-b border-slate-100 pb-5">
              <div>
                <span className="font-semibold text-slate-800 block">Balance on Sign-off:</span>
                <span className="text-xs text-slate-500">Released only after service satisfaction</span>
              </div>
              <span className="font-extrabold text-slate-900">₹{pricing.balanceOnSignoff}</span>
            </div>

            {/* Transparent Wage Split */}
            <div className="mt-5 pt-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Transparent Wage Split
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-bold text-[#5415A0]">
                  Peer Audited (₹0 Markup)
                </span>
              </div>

              {/* Progress bar representing wage distribution */}
              <div className="h-2.5 rounded-full w-full bg-slate-100 flex overflow-hidden gap-0.5 p-0.5 border border-slate-200/80 mb-3.5">
                <div 
                  className="h-full rounded-full bg-[#5415A0]" 
                  style={{ width: '85%' }} 
                  title="85% Direct to Worker"
                />
                <div 
                  className="h-full rounded-full bg-purple-400" 
                  style={{ width: '10%' }} 
                  title="10% Healthcare Pool"
                />
                <div 
                  className="h-full rounded-full bg-slate-300" 
                  style={{ width: '5%' }} 
                  title="5% Tech Maintenance"
                />
              </div>

              {/* Breakdown Legend */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#5415A0]" />
                    <span className="text-[11px] font-bold text-slate-900">85% Worker</span>
                  </div>
                  <span className="font-extrabold text-slate-900 block">₹{pricing.workerDividend}</span>
                  <span className="text-[10px] text-slate-500">Living wage</span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50/40 border border-purple-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-[11px] font-bold text-slate-900">10% Health</span>
                  </div>
                  <span className="font-extrabold text-slate-900 block">₹{pricing.healthcarePool}</span>
                  <span className="text-[10px] text-slate-500">Insurance fund</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="text-[11px] font-bold text-slate-900">5% Tech</span>
                  </div>
                  <span className="font-extrabold text-slate-900 block">₹{pricing.techMaintenance}</span>
                  <span className="text-[10px] text-slate-500">Platform cost</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Select Payment Method Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Select Payment Method
            </h3>

            <div className="space-y-3">
              {/* UPI (Default Selected) */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  state.paymentMethod === 'upi'
                    ? 'border-2 border-[#5415A0] bg-[#FAF8FE]'
                    : 'border-slate-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      state.paymentMethod === 'upi'
                        ? 'border-4 border-[#5415A0] bg-white'
                        : 'border-2 border-slate-300'
                    }`} />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        UPI (Instant & Zero Surcharge)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Google Pay, PhonePe, Paytm, BHIM & Any UPI ID
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                    Fastest
                  </span>
                </div>

                {state.paymentMethod === 'upi' && (
                  <div className="mt-3 pl-6 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={state.upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@bank or 9876543210@upi"
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] bg-white"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify();
                        }}
                        disabled={isVerifying}
                        className="px-4 py-2 bg-[#3B0764] hover:bg-[#5415A0] text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1"
                      >
                        {state.isUpiVerified ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <span>Verify ID</span>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Zero convenience fee or surge markup on cooperative escrow deposits.
                    </p>
                  </div>
                )}
              </div>

              {/* Credit / Debit Cards */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  state.paymentMethod === 'card'
                    ? 'border-2 border-[#5415A0] bg-[#FAF8FE]'
                    : 'border-slate-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    state.paymentMethod === 'card'
                      ? 'border-4 border-[#5415A0] bg-white'
                      : 'border-2 border-slate-300'
                  }`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Credit/Debit Cards
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Visa, Mastercard, RuPay, Maestro
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>

              {/* Net Banking */}
              <div
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  state.paymentMethod === 'netbanking'
                    ? 'border-2 border-[#5415A0] bg-[#FAF8FE]'
                    : 'border-slate-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    state.paymentMethod === 'netbanking'
                      ? 'border-4 border-[#5415A0] bg-white'
                      : 'border-2 border-slate-300'
                  }`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Net Banking
                    </span>
                    <span className="text-[11px] text-slate-500">
                      All Major Indian Banks (SBI, HDFC, ICICI, Axis)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 5 / 40%) - Booking Summary & Escrow Deposit Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <h3 className="text-base font-extrabold text-slate-900">
              Booking Summary
            </h3>

            {/* Service & Worker Pill Box */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {state.selectedService?.title || 'Cooperative Service'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Artisan: <strong className="text-slate-700">{state.selectedWorker?.name || 'Assigned Specialist'}</strong>
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#5415A0] flex items-center justify-center text-xs font-black shrink-0">
                  {state.selectedWorker ? state.selectedWorker.initials : 'WK'}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    {state.frequency === 'every_saturday' 
                      ? 'Every Saturday' 
                      : `${state.selectedDate.dayName}, ${state.selectedDate.month} ${state.selectedDate.dateNumber}`}
                    {' • '}
                    {state.selectedSlot?.timeRange}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">
                    {state.address.locality}, {state.address.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown Card */}
            <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Base Hourly Rate</span>
                <span className="font-semibold text-slate-900">₹{pricing.hourlyRate} / hr</span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Recurring Saturday Discount (10%)</span>
                  <span>-₹{pricing.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Total Booking Value</span>
                <span className="font-bold text-slate-900">₹{pricing.finalTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Cooperative Guarantee Fee</span>
                <span className="font-bold text-[#5415A0]">Included (₹0 Markup)</span>
              </div>
            </div>

            {/* Initial Escrow Lock Box */}
            <div className="pt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-extrabold text-slate-900">Initial Escrow Lock:</span>
                <span className="text-2xl font-black text-slate-900">₹{pricing.depositRequired}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                * Funds remain safeguarded in peer-audited escrow till work completion.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAuthorize}
                disabled={isSubmitting || showProcessingModal}
                className="w-full py-3.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-80 active:scale-[0.99]"
              >
                {isSubmitting || showProcessingModal ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Processing Escrow Protocol...</span>
                  </span>
                ) : (
                  <>
                    <span>Authorize Escrow Deposit (₹{pricing.depositRequired})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                onClick={prevStep}
                disabled={isSubmitting || showProcessingModal}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Schedule</span>
              </button>
            </div>

            {/* Cooperative Charter note */}
            <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-2 text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0" />
              <span>
                Cooperative Charter: Workers own their equity; clients pay verified, non-surge costs.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Payment Processing & Escrow Protocol Loading Modal */}
      <PaymentProcessingModal
        isOpen={showProcessingModal}
        depositAmount={pricing.depositRequired}
        workerName={state.selectedWorker?.name || 'Assigned Specialist'}
        serviceTitle={state.selectedService?.title || 'Cooperative Service'}
        paymentMethod={state.paymentMethod}
        upiId={state.upiId}
        onComplete={handlePaymentComplete}
      />
    </div>
  );
};
