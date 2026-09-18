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
  XCircle,
  Zap,
  QrCode,
  AlertTriangle,
  Key
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { PaymentProcessingModal } from '../common/PaymentProcessingModal';
import { initiateRazorpayPayment } from '../../lib/razorpay';

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
  const { currentUser } = useAuth();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentErrorCode, setPaymentErrorCode] = useState<string | null>(null);
  const [activePaymentId, setActivePaymentId] = useState<string>('');
  const [customKey, setCustomKey] = useState<string>(
    import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TO0Zvk3JDd91cP'
  );
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [showManualUpi, setShowManualUpi] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    await verifyUpi();
    setIsVerifying(false);
  };

  const handleAuthorize = async () => {
    setPaymentError(null);
    setPaymentErrorCode(null);
    setIsSubmitting(true);

    const initiated = await initiateRazorpayPayment({
      amount: pricing.depositRequired,
      bookingId: state.bookingId,
      serviceTitle: state.selectedService?.title || 'Cooperative Service',
      workerName: state.selectedWorker?.name || 'Assigned Artisan',
      customerName: currentUser?.name || 'WORKIVO Customer',
      customerEmail: currentUser?.email || 'member@workivo.coop',
      customerPhone: currentUser?.phone || '9426262139',
      upiId: state.upiId || 'success@razorpay',
      customKey: customKey,
      onSuccess: async (response) => {
        console.log('[WORKIVO Step4] Razorpay Payment Success:', response);
        setActivePaymentId(response.razorpay_payment_id);
        setPaymentError(null);
        setPaymentErrorCode(null);
        // Payment verified! Show escrow lock animation modal
        setShowProcessingModal(true);
      },
      onError: (error) => {
        console.warn('[WORKIVO Step4] Razorpay Payment Error:', error);
        setIsSubmitting(false);
        setPaymentError(error.description || 'Payment authorization failed. Please try again.');
        if (error.code) {
          setPaymentErrorCode(error.code);
        }
      },
      onDismiss: () => {
        setIsSubmitting(false);
        setPaymentError('Payment window was dismissed before completing the 25% deposit.');
      }
    });

    if (!initiated) {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = async () => {
    // Advancing to Step 5 only after payment is authorized & escrow protocol is locked
    await confirmBooking(activePaymentId);
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

      {/* Razorpay Payment Error Notification Banner */}
      {paymentError && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-900 shadow-sm animate-fadeIn">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <XCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-extrabold text-rose-900">
                  Payment Authorization Unsuccessful
                </h4>
                {paymentErrorCode && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-200 text-rose-800 font-bold uppercase">
                    {paymentErrorCode}
                  </span>
                )}
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                  Step 5 Blocked
                </span>
              </div>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                {paymentError}
              </p>
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleAuthorize}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry 25% Escrow Deposit (₹{pricing.depositRequired})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentError(null)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  25% Initial Mobilization Lock
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
                <span className="text-xs text-slate-500">75% Released only after service satisfaction</span>
              </div>
              <span className="font-extrabold text-slate-900">₹{pricing.balanceOnSignoff}</span>
            </div>

            {/* Transparent Wage Split */}
            <div className="mt-5 pt-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5415A0]" />
                  <h4 className="text-xs font-extrabold text-slate-900">
                    Transparent Wage Split
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-[#5415A0]">
                  100% Fair Standard
                </span>
              </div>

              {/* Progress Bar (85% / 10% / 5%) */}
              <div className="w-full h-2.5 rounded-full overflow-hidden flex mb-4 bg-slate-100">
                <div className="h-full bg-[#5415A0]" style={{ width: '85%' }} title="85% Artisan" />
                <div className="h-full bg-[#9333EA]" style={{ width: '10%' }} title="10% Guild Insurance" />
                <div className="h-full bg-[#C084FC]" style={{ width: '5%' }} title="5% Tech Maintenance" />
              </div>

              {/* Breakdown Legend */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5415A0]" />
                    <span>Direct to {state.selectedWorker?.name} (Worker Dividend)</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{pricing.workerDividend} (85%)</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                    <span>Guild Healthcare & Tool Insurance Pool</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{pricing.healthcarePool} (10%)</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
                    <span>Open Technology Maintenance</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{pricing.techMaintenance} (5%)</span>
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
                      <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                        <span>UPI & Dynamic QR Code</span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Razorpay
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Scan & Pay via Google Pay, PhonePe, Paytm, CRED & BHIM
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5415A0]">
                    Fastest
                  </span>
                </div>

                {state.paymentMethod === 'upi' && (
                  <div className="mt-3.5 space-y-3 pl-6">
                    {/* Razorpay Dynamic QR Code Action Box */}
                    <div className="p-3.5 rounded-2xl bg-white border border-purple-200/90 shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5415A0] flex items-center justify-center shrink-0">
                            <QrCode className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Dynamic UPI Escrow QR
                            </span>
                            <span className="text-[10px] text-slate-500">
                              25% Deposit: <strong>₹{pricing.depositRequired}</strong>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAuthorize();
                          }}
                          disabled={isSubmitting || showProcessingModal}
                          className="px-3 py-1.5 bg-[#5415A0] hover:bg-[#430E7E] text-white text-[11px] font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Open QR Code</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed bg-[#FAF8FE] p-2.5 rounded-xl border border-purple-100/80">
                        A dynamic QR code will appear on screen. Once scanned and authorized on your banking app, Razorpay automatically verifies the transaction and locks your escrow.
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-0.5">
                        <span>Supported: GPay, PhonePe, Paytm, BHIM, CRED</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          API Active
                        </span>
                      </div>
                    </div>

                    {/* Active UPI ID & Gateway Selector */}
                    <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-200/90 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Active UPI ID for Escrow:</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#5415A0] bg-white px-2.5 py-0.5 rounded-md border border-purple-200 shadow-2xs">
                          {state.upiId}
                        </span>
                      </div>

                      {/* Quick Select Presets */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span className="text-[10px] text-slate-500 font-semibold">1-Click Presets:</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpiId('success@razorpay');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                            state.upiId === 'success@razorpay'
                              ? 'bg-[#5415A0] text-white border-[#5415A0] shadow-xs'
                              : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          <span>success@razorpay (Test Gateway Verified)</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpiId('9426262139@upi');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                            state.upiId === '9426262139@upi'
                              ? 'bg-[#5415A0] text-white border-[#5415A0] shadow-xs'
                              : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          <span>9426262139@upi</span>
                        </button>
                      </div>

                      {/* Direct UPI Input Field */}
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          value={state.upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="success@razorpay or username@bank"
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:border-[#5415A0] bg-white font-mono"
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
                            <span>Verify</span>
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-tight">
                        * Razorpay Sandbox API (<code className="text-purple-800 font-bold">{customKey}</code>) automatically routes <strong className="text-purple-900">success@razorpay</strong> to instant verified status.
                      </p>
                    </div>
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

                <CreditCard className="w-5 h-5 text-slate-400" />
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
                      HDFC, ICICI, SBI, Axis and 40+ Indian Banks
                    </span>
                  </div>
                </div>

                <Building2 className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Trust Badges Row */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 font-semibold px-2">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5415A0]" />
              <span>256-bit Bank Grade Security</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#5415A0]" />
              <span>100% Peer Replacement</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-[#5415A0]" />
              <span>Zero Cancellation Penalty</span>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Recap (Span 5 / 40%) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            {/* Step 4 of 5 header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-slate-900">
                Booking Recap
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                Step 4 of 5
              </span>
            </div>

            {/* Worker Recap Row */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5415A0] text-white flex items-center justify-center font-black text-xs shrink-0">
                {state.selectedWorker?.initials}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {state.selectedWorker?.name}
                </h4>
                <p className="text-[11px] text-[#5415A0] font-semibold">
                  ⚡ {state.selectedWorker?.title} • Level 4 Artisan
                </p>
              </div>
            </div>

            {/* Detail items */}
            <div className="space-y-3.5 text-xs border-y border-slate-100 py-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#5415A0] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    {state.frequency === 'every_saturday' 
                      ? '🔁 Every Saturday (Weekly Plan)' 
                      : `${state.selectedDate.dayName}, ${state.selectedDate.month} ${state.selectedDate.dateNumber}`}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {state.selectedSlot?.timeRange} ({pricing.estimatedHours} Hours Allocated)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Service Address</span>
                  <span className="text-slate-500 text-[11px]">
                    {state.address.street}, {state.address.locality}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wrench className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Task Scope</span>
                  <span className="text-slate-500 text-[11px]">
                    {state.selectedService?.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Tariff Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Base Service Rate</span>
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
                    <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>
                      {state.paymentMethod === 'upi'
                        ? `Pay 25% Deposit (₹${pricing.depositRequired}) with QR Code`
                        : `Authorize Escrow Deposit (₹${pricing.depositRequired})`}
                    </span>
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
        razorpayPaymentId={activePaymentId}
        onComplete={handlePaymentComplete}
      />
    </div>
  );
};
