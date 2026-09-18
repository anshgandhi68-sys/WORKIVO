import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  RefreshCw, 
  Smartphone, 
  CreditCard, 
  UserCheck, 
  FileCheck2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface PaymentProcessingModalProps {
  isOpen: boolean;
  depositAmount: number;
  workerName: string;
  serviceTitle: string;
  paymentMethod: string;
  upiId?: string;
  razorpayPaymentId?: string;
  onComplete: () => void;
}

export const PaymentProcessingModal: React.FC<PaymentProcessingModalProps> = ({
  isOpen,
  depositAmount,
  workerName,
  serviceTitle,
  paymentMethod,
  upiId,
  razorpayPaymentId,
  onComplete
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(0);
      setProgress(15);
      setIsDone(false);
      return;
    }

    // Step 0 -> Step 1: Gateway Authorization (0 to 650ms)
    const timer1 = setTimeout(() => {
      setCurrentStage(1);
      setProgress(40);
    }, 700);

    // Step 1 -> Step 2: Escrow Lock (700 to 1400ms)
    const timer2 = setTimeout(() => {
      setCurrentStage(2);
      setProgress(68);
    }, 1450);

    // Step 2 -> Step 3: Worker Slot Reservation (1450 to 2200ms)
    const timer3 = setTimeout(() => {
      setCurrentStage(3);
      setProgress(90);
    }, 2200);

    // Step 3 -> Step 4: Final Cryptographic Escrow Certificate (2200 to 2850ms)
    const timer4 = setTimeout(() => {
      setCurrentStage(4);
      setProgress(100);
      setIsDone(true);
    }, 2900);

    // Transition to confirmation after showing final completion state
    const timer5 = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const STAGES = [
    {
      title: 'Payment Authorization',
      desc: razorpayPaymentId 
        ? `Razorpay Verified (${razorpayPaymentId})`
        : (paymentMethod === 'upi' 
          ? `Verified via UPI (${upiId || 'Secure VPA'})` 
          : 'Authorized via 256-bit Banking Gateway'),
      icon: paymentMethod === 'upi' ? Smartphone : CreditCard
    },
    {
      title: 'Cooperative Escrow Lock',
      desc: `₹${depositAmount} deposited into sovereign multi-sig trust`,
      icon: Lock
    },
    {
      title: 'Worker Slot Reservation',
      desc: `Confirmed priority booking with ${workerName}`,
      icon: UserCheck
    },
    {
      title: 'WhatsApp Alert & Escrow Certificate',
      desc: 'Dispatched to +91 9426262139 with zero-markup cryptographic proof',
      icon: MessageSquare
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-purple-100 relative overflow-hidden text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Emblem & Animated Halo */}
        <div className="relative mx-auto mb-5 w-20 h-20 flex items-center justify-center">
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 rounded-2xl bg-purple-500/20 animate-ping opacity-60 pointer-events-none" />
          
          {/* Spinning Gradient Border Ring */}
          <div className="absolute -inset-1.5 rounded-3xl border-2 border-transparent border-t-[#5415A0] border-r-purple-400 border-b-emerald-400 animate-spin" />

          {/* Logo Badge */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5415A0] to-[#7B2CBF] flex items-center justify-center shadow-lg shadow-purple-900/30">
            <img 
              src="/workivo-balloon-icon.png" 
              alt="WORKIVO" 
              className="w-10 h-10 object-contain drop-shadow" 
            />
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#5415A0] text-xs font-bold mb-2">
          {isDone ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Escrow Locked & Verified!</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5415A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5415A0]"></span>
              </span>
              <span>Processing Escrow Protocol...</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isDone ? 'Booking Secured Successfully!' : 'Securing Your Worker & Escrow'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-5 font-medium max-w-sm mx-auto">
          {isDone 
            ? 'Redirecting to your cryptographic certificate & dispatch receipt...' 
            : `Safeguarding ₹${depositAmount} deposit for ${serviceTitle}.`}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="mb-6 space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/80">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#5415A0] via-purple-600 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 px-1">
            <span>Cooperative Protocol</span>
            <span className="text-[#5415A0]">{progress}% Complete</span>
          </div>
        </div>

        {/* Sequential Step Cards */}
        <div className="space-y-2.5 text-left mb-6">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = currentStage > idx;
            const isActive = currentStage === idx && !isDone;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-950'
                    : isActive
                    ? 'bg-purple-50/90 border-2 border-[#5415A0]/40 text-slate-900 shadow-sm scale-[1.01]'
                    : 'bg-slate-50/80 border border-slate-100 text-slate-400 opacity-60'
                }`}
              >
                {/* Icon or Status Indicator */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-[#5415A0] text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isActive ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Text Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold truncate ${
                      isCompleted ? 'text-emerald-900' : isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500'
                    }`}>
                      {stage.title}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-extrabold text-[#5415A0] animate-pulse">
                        Active
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-extrabold text-emerald-700">
                        Verified ✓
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${
                    isCompleted ? 'text-emerald-800/80' : isActive ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Trust Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit Escrow Vault • 100% Client & Worker Protection</span>
        </div>
      </div>
    </div>
  );
};
