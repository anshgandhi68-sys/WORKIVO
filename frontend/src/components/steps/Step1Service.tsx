import React from 'react';
import { 
  Check, 
  Lightbulb, 
  Zap, 
  BatteryCharging, 
  AlertTriangle, 
  Fan, 
  Bot, 
  Shield, 
  ArrowRight,
  Sparkles,
  Droplets,
  Hammer,
  Tv,
  Palette,
  Utensils,
  Heart,
  Clock,
  Coins
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { TRADES, SERVICES } from '../../data/mockData';

export const Step1Service: React.FC = () => {
  const { 
    selectedTrade, 
    setSelectedTrade, 
    state, 
    selectService, 
    nextStep 
  } = useBooking();

  // FIX BUG: Strict category filter without hardcoding 'electrical'
  const filteredServices = selectedTrade === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedTrade);

  const getBadgeIcon = (variant?: string) => {
    switch (variant) {
      case 'recommended':
        return <Lightbulb className="w-3 h-3 text-[#5415A0]" />;
      case 'fixed':
        return <Zap className="w-3 h-3 text-indigo-600" />;
      case 'hourly':
        return <BatteryCharging className="w-3 h-3 text-purple-600" />;
      case 'priority':
        return <AlertTriangle className="w-3 h-3 text-rose-600" />;
      case 'standard':
        return <Fan className="w-3 h-3 text-blue-600" />;
      case 'smart':
        return <Bot className="w-3 h-3 text-violet-600" />;
      default:
        return <Sparkles className="w-3 h-3 text-purple-600" />;
    }
  };

  const getBadgeClass = (variant?: string) => {
    switch (variant) {
      case 'recommended':
        return 'bg-purple-100/70 text-[#5415A0] border-purple-200';
      case 'fixed':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'hourly':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'priority':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'standard':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'smart':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTradeIcon = (id: string) => {
    switch (id) {
      case 'cooking':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'cleaning':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'salon':
        return <Heart className="w-3.5 h-3.5" />;
      case 'electrical':
        return <Zap className="w-3.5 h-3.5 fill-current" />;
      case 'plumbing':
        return <Droplets className="w-3.5 h-3.5" />;
      case 'carpentry':
        return <Hammer className="w-3.5 h-3.5" />;
      case 'appliance':
        return <Tv className="w-3.5 h-3.5" />;
      case 'painting':
        return <Palette className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      {/* Header & Worker Equity Standard Banner */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold mb-3 border border-purple-200">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Cooperative Guaranteed Fair Rates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select a Verified Service
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 font-medium">
            Affordable living-wage pricing with zero platform surge fees and 100% peer protection.
          </p>
        </div>

        {/* 100% Direct Payout Widget */}
        <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#5415A0]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Worker Equity Standard
            </span>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              85% Direct to Artisan
            </span>
          </div>
        </div>
      </div>

      {/* Trade Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TRADES.map((trade) => {
          const isActive = selectedTrade === trade.id;
          return (
            <button
              key={trade.id}
              onClick={() => setSelectedTrade(trade.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 select-none cursor-pointer ${
                isActive
                  ? 'bg-[#5415A0] text-white shadow-sm ring-2 ring-purple-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-[#5415A0]'
              }`}
            >
              {getTradeIcon(trade.id)}
              <span>{trade.label}</span>
            </button>
          );
        })}
      </div>

      {/* Notice of active category */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredServices.length}</strong> services for <strong>{TRADES.find(t => t.id === selectedTrade)?.label}</strong>
        </span>
        <span className="text-[#5415A0] font-semibold flex items-center gap-1">
          <Coins className="w-3.5 h-3.5" />
          <span>Affordable living-wage rates starting from ₹149</span>
        </span>
      </div>

      {/* Service Cards Grid (2 rows x 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const isSelected = state.selectedService?.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => selectService(service)}
              className={`rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between relative bg-white group ${
                isSelected
                  ? 'border-2 border-[#5415A0] shadow-[0_4px_25px_rgba(84,21,160,0.12)] ring-1 ring-[#5415A0]'
                  : 'border border-slate-200/90 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              {/* Top Row: Badge & Radio Check */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  {service.badge ? (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getBadgeClass(service.badge.variant)}`}>
                      {getBadgeIcon(service.badge.variant)}
                      {service.badge.text}
                    </span>
                  ) : <div />}

                  {/* Checkbox indicator */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-[#5415A0] text-white shadow-sm ring-2 ring-purple-200' 
                      : 'border-2 border-slate-300 group-hover:border-purple-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className={`text-base font-bold tracking-tight mb-2 ${
                  isSelected ? 'text-[#5415A0]' : 'text-slate-900 group-hover:text-[#5415A0]'
                }`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Bottom Meta Row: Price, Duration, Arrival */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      ₹{service.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {service.priceUnit === '/hr' ? ' / hr' : ` ${service.priceUnit}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{service.estimatedDuration}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectService(service);
                    nextStep();
                  }}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#5415A0] text-white shadow-xs'
                      : 'bg-purple-50 text-[#5415A0] hover:bg-[#5415A0] hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Proceed' : 'Select'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar if Selected */}
      {state.selectedService && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom-2">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#5415A0] flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-slate-500">Selected Service: </span>
                <span className="font-extrabold text-slate-900">
                  {state.selectedService.title}
                </span>
                <span className="text-[#5415A0] font-bold ml-1">
                  (₹{state.selectedService.price}{state.selectedService.priceUnit === '/hr' ? '/hr' : ''})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => selectService(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Deselect this service"
              >
                Cancel
              </button>
              <button
                onClick={nextStep}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Continue to Worker & Slots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
