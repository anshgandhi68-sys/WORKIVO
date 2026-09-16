import React from 'react';
import { Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const STEPS = [
  { step: 1, label: '1. Service' },
  { step: 2, label: '2. Worker' },
  { step: 3, label: '3. Schedule' },
  { step: 4, label: '4. Payment' },
  { step: 5, label: '5. Confirmation' },
] as const;

export const Stepper: React.FC = () => {
  const { state, goToStep } = useBooking();
  const current = state.currentStep;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 sm:p-6 mb-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between relative">
        {STEPS.map((item, index) => {
          const isCompleted = current > item.step || (current === 5 && item.step === 5);
          const isCurrent = current === item.step;
          const isPastOrCurrent = current >= item.step;

          return (
            <React.Fragment key={item.step}>
              {/* Step Node */}
              <div 
                onClick={() => isCompleted && goToStep(item.step)}
                className={`flex flex-col items-center relative z-10 select-none ${
                  isCompleted ? 'cursor-pointer group' : 'cursor-default'
                }`}
              >
                {/* Circle Indicator */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    isCurrent
                      ? 'bg-[#5415A0] text-white shadow-md ring-4 ring-purple-100 scale-105'
                      : isCompleted
                      ? 'bg-[#F3EEFC] text-[#5415A0] border border-purple-200 group-hover:bg-purple-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-5 h-5 text-[#5415A0] stroke-[2.5]" />
                  ) : (
                    item.step
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`mt-2 text-xs font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? 'text-[#5415A0]'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Connecting Line between steps */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 -mt-5 transition-colors duration-300 relative">
                  <div 
                    className={`h-full w-full ${
                      current > item.step 
                        ? 'bg-[#5415A0]' 
                        : current === item.step 
                        ? 'bg-gradient-to-r from-[#5415A0] to-slate-200' 
                        : 'bg-slate-200'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
