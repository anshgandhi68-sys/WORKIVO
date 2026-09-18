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
  Zap,
  QrCode,
  Key,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { initiateRazorpayPayment } from '../../lib/razorpay';
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
  const { currentUser } = useAuth();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [activePaymentId, setActivePaymentId] = useState<string>('');
  const [dismissedWithBankTransfer, setDismissedWithBankTransfer] = useState<boolean>(false);

  // Resolve Razorpay Key: from env, localStorage, or user input
  const [customKey, setCustomKey] = useState<string>(() => {
    return (
      (import.meta.env.VITE_RAZORPAY_KEY_ID as string)?.trim() ||
      localStorage.getItem('workivo_razorpay_key')?.trim() ||
      ''
    );
  });
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);
  const [keySaveSuccess, setKeySaveSuccess] = useState<boolean>(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    await verifyUpi();
    setIsVerifying(false);
  };

  const handleSaveKey = async (newKey: string) => {
    const trimmed = newKey.trim();
    setCustomKey(trimmed);
    if (trimmed) {
      localStorage.setItem('workivo_razorpay_key', trimmed);
      try {
        await fetch('/api/save-razorpay-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyId: trimmed })
        });
      } catch (e) {
        // ignore if static / production
      }
      setKeySaveSuccess(true);
      setTimeout(() => setKeySaveSuccess(false), 3000);
      setPaymentError(null);
    } else {
      localStorage.removeItem('workivo_razorpay_key');
    }
  };

  const handlePaymentComplete = React.useCallback(async (overrideId?: string) => {
    const finalId = overrideId || activePaymentId || `pay_upi_bank_${Date.now()}`;
    await confirmBooking(finalId);
    setIsSubmitting(false);
    setShowProcessingModal(false);
  }, [activePaymentId, confirmBooking]);

  const handleDirectConfirmPayment = async (customTxnId?: string) => {
    const txn = customTxnId?.trim() || activePaymentId || `pay_upi_bank_${Date.now()}`;
    setActivePaymentId(txn);
    setPaymentError(null);
    setDismissedWithBankTransfer(false);
    setShowProcessingModal(true);
  };

  const handleAuthorize = async () => {
    setPaymentError(null);
    setDismissedWithBankTransfer(false);
    const keyToUse = customKey.trim() || (import.meta.env.VITE_RAZORPAY_KEY_ID as string)?.trim() || '';

    if (!keyToUse) {
      setShowKeyConfig(true);
      setPaymentError(
        'Razorpay API Key ID is required. Please paste your Key ID (rzp_test_... or rzp_live_...) below to start checkout.'
      );
      return;
    }

    setIsSubmitting(true);

    const initiated = await initiateRazorpayPayment({
      amount: pricing.depositRequired, // e.g. ₹1
      bookingId: state.bookingId,
      serviceTitle: state.selectedService?.title || 'Cooperative Service',
      workerName: state.selectedWorker?.name || 'Assigned Specialist',
      customerName: currentUser?.name || 'WORKIVO Customer',
      customerEmail: currentUser?.email || 'member@workivo.coop',
      customerPhone: currentUser?.phone || '9426262139',
      upiId: state.upiId || 'success@razorpay',
      customKey: keyToUse,
      onSuccess: async (response) => {
        console.info('[WORKIVO Step4] Razorpay Payment Success:', response);
        const paymentId = response.razorpay_payment_id;
        setActivePaymentId(paymentId);
        setPaymentError(null);
        // Show escrow lock animation modal
        setShowProcessingModal(true);
      },
      onError: (error) => {
        console.warn('[WORKIVO Step4] Razorpay Payment Error:', error);
        setIsSubmitting(false);
        setPaymentError(error.description || 'Payment authorization failed. Please try again.');
      },
      onDismiss: () => {
        setIsSubmitting(false);
        setDismissedWithBankTransfer(true);
      }
    });

    if (!initiated) {
      setIsSubmitting(false);
    }
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
          Payment is locked safely in cooperative escrow and only disbursed upon your digital sign-off.
        </p>
      </div>

      {/* Bank Transfer / Paid on Mobile Confirmation Banner */}
      {dismissedWithBankTransfer && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-black text-emerald-950">
                    Did you complete payment on your Phone / UPI App?
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-200 text-emerald-900 uppercase">
                    Bank Received
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed font-medium">
                  If the ₹{pricing.depositRequired} deposit was debited from your account and received in your bank, click below to immediately generate your cryptographic escrow certificate and confirm your booking!
                </p>
                <div className="mt-3.5 flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleDirectConfirmPayment()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm Payment Received & View Booking →</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorize}
                    className="px-4 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-open Razorpay QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDismissedWithBankTransfer(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Error / Dismiss Banner */}
      {paymentError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wide">
                  Payment Notice
                </h4>
                <button
                  type="button"
                  onClick={() => setPaymentError(null)}
                  className="text-xs text-rose-500 hover:text-rose-800 font-semibold"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed font-medium">
                {paymentError}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAuthorize}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Payment (₹{pricing.depositRequired})</span>
                </button>
                {!customKey && (
                  <button
                    type="button"
                    onClick={() => setShowKeyConfig(true)}
                    className="px-3 py-1.5 bg-white border border-rose-300 text-rose-700 text-xs font-bold rounded-xl hover:bg-rose-50"
                  >
                    Enter Key ID
                  </button>
                )}
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

          {/* 2. Razorpay Gateway Status & Key Management Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Razorpay Payment Gateway
                    </h3>
                    {customKey ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Key Pending
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {customKey ? (
                      <span>Active Key: <code className="text-[#5415A0] font-bold font-mono text-[11px] bg-purple-50 px-1.5 py-0.5 rounded">{customKey}</code></span>
                    ) : (
                      <span>Enter your Key ID below or set <code className="text-purple-900 font-bold font-mono">VITE_RAZORPAY_KEY_ID</code></span>
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                className="px-3 py-1.5 text-[11px] font-bold text-[#5415A0] hover:bg-purple-50 rounded-xl transition-colors flex items-center gap-1 border border-purple-200 shrink-0 cursor-pointer"
              >
                <Key className="w-3 h-3 text-[#5415A0]" />
                <span>{showKeyConfig ? 'Close' : (customKey ? 'Change Key' : 'Configure')}</span>
              </button>
            </div>

            {/* Expandable Key Configuration Box */}
            {(showKeyConfig || !customKey) && (
              <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Razorpay Key ID (rzp_test_... or rzp_live_...):</span>
                  {keySaveSuccess && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Saved & Connected!
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value.trim())}
                    placeholder="rzp_test_TO0Zvk3JDd91cP"
                    className="flex-1 px-3.5 py-2 text-xs font-mono rounded-xl border border-purple-200 bg-[#FAF8FE] focus:outline-none focus:border-[#5415A0] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveKey(customKey)}
                    className="px-4 py-2 bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Save Key
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Supports instant UPI QR code, PhonePe, GPay, Paytm, Cards & NetBanking via official Razorpay modal.
                </p>
              </div>
            )}
          </div>

          {/* 3. Select Payment Method Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Select Payment Channel
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
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          UPI & Dynamic QR Code
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-[#5415A0] border border-purple-200">
                          Razorpay UPI
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Scan QR or pay via Google Pay, PhonePe, Paytm, BHIM, CRED
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                    Instant
                  </span>
                </div>

                {state.paymentMethod === 'upi' && (
                  <div className="mt-3 pl-6 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={state.upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank or 9426262139@upi"
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] bg-white"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify();
                        }}
                        disabled={isVerifying}
                        className="px-4 py-2 bg-[#3B0764] hover:bg-[#5415A0] text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
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
                      When you click Pay, a live Razorpay UPI QR code is also displayed for instant camera scanning.
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Credit / Debit Cards
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 text-slate-700">
                        3D Secure
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Visa, Mastercard, RuPay, Maestro & Corporate cards
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Net Banking
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 text-slate-700">
                        50+ Banks
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      HDFC, ICICI, SBI, Axis, Kotak and all scheduled banks
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
                className="w-full py-3.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-80 active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting || showProcessingModal ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Connecting Razorpay Gateway...</span>
                  </span>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 stroke-[2.5]" />
                    <span>
                      {state.paymentMethod === 'upi'
                        ? `Pay ₹${pricing.depositRequired} with Razorpay UPI / QR`
                        : `Pay ₹${pricing.depositRequired} with Razorpay`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Instant Verification if User Already Sent Bank / UPI Payment */}
              <button
                type="button"
                onClick={() => handleDirectConfirmPayment()}
                disabled={isSubmitting || showProcessingModal}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Already Paid via UPI / Bank? Confirm Receipt</span>
              </button>

              <button
                onClick={prevStep}
                disabled={isSubmitting || showProcessingModal}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
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
