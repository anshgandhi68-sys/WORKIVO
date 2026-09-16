import React, { useState } from 'react';
import { HelpCircle, Bell, Plus, ShieldCheck, ChevronDown, Radio, Menu, X, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export type PortalMode = 'client' | 'worker';

export type AppPage = 
  // Client Marketplace Pages
  | 'home' 
  | 'services' 
  | 'bookings' 
  | 'artisan-profile' 
  | 'resolution' 
  // Worker & Guild Pages
  | 'worker-dashboard'
  | 'command' 
  | 'earnings' 
  | 'availability' 
  | 'members' 
  | 'welfare' 
  | 'cooperative';

interface NavbarProps {
  activePage: AppPage;
  portalMode: PortalMode;
  onSelectPortalMode: (mode: PortalMode) => void;
  onNavigate: (page: AppPage) => void;
  onOpenHelp: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activePage, 
  portalMode,
  onSelectPortalMode,
  onNavigate, 
  onOpenHelp, 
  onOpenDashboard 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page: AppPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo with official hot air balloon emblem beside WORKIVO name */}
        <div className="flex items-center gap-4 shrink-0">
          <div 
            onClick={() => handleNav(portalMode === 'client' ? 'home' : 'worker-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            title="WORKIVO — Small Tasks, Big Relief."
          >
            <div className="w-9 h-9 rounded-xl bg-[#5415A0] p-1.5 flex items-center justify-center shadow-sm group-hover:bg-[#430E7E] group-hover:shadow-md transition-all overflow-hidden shrink-0">
              <img 
                src="/workivo-balloon-icon.png" 
                alt="WORKIVO Logo" 
                className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-[#5415A0] transition-colors block leading-none">
                  WORKIVO
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-black bg-purple-100 text-[#5415A0] tracking-wider uppercase leading-none">
                  Co-op
                </span>
              </div>
              <span className="text-[9.5px] font-semibold text-slate-400 group-hover:text-purple-700 transition-colors block tracking-tight leading-tight mt-0.5">
                Small Tasks, Big Relief.
              </span>
            </div>
          </div>

          {/* Clean Portal Switcher Pill */}
          <div className="hidden sm:flex items-center p-0.5 bg-slate-100/90 rounded-full border border-slate-200 text-[11px] font-bold">
            <button
              onClick={() => {
                onSelectPortalMode('client');
                handleNav('home');
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                portalMode === 'client'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🛍️ Marketplace</span>
            </button>
            <button
              onClick={() => {
                onSelectPortalMode('worker');
                handleNav('worker-dashboard');
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                portalMode === 'worker'
                  ? 'bg-[#5415A0] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>⚡ Worker & Guild</span>
            </button>
          </div>
        </div>

        {/* Center: Clean & Focused Links (Different per Portal Mode) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
          {portalMode === 'client' ? (
            <>
              <button 
                onClick={() => handleNav('home')}
                className={`py-2 transition-colors relative ${activePage === 'home' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Home
              </button>

              <button 
                onClick={() => handleNav('services')}
                className={`py-2 transition-colors relative ${activePage === 'services' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Services
              </button>

              <button 
                onClick={() => handleNav('bookings')}
                className={`py-2 transition-colors relative ${activePage === 'bookings' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Bookings
              </button>

              <button 
                onClick={() => handleNav('artisan-profile')}
                className={`py-2 transition-colors relative ${activePage === 'artisan-profile' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Artisan Profile
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNav('worker-dashboard')}
                className={`py-2 transition-colors relative ${activePage === 'worker-dashboard' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Daily Dispatch
              </button>

              <button 
                onClick={() => handleNav('command')}
                className={`py-2 transition-colors relative ${activePage === 'command' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Guild Command
              </button>

              <button 
                onClick={() => handleNav('earnings')}
                className={`py-2 transition-colors relative ${activePage === 'earnings' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Earnings & Ledger
              </button>

              <button 
                onClick={() => handleNav('availability')}
                className={`py-2 transition-colors relative ${activePage === 'availability' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Availability
              </button>

              <button 
                onClick={() => handleNav('members')}
                className={`py-2 transition-colors relative ${activePage === 'members' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Directory (183)
              </button>

              <button 
                onClick={() => handleNav('welfare')}
                className={`py-2 transition-colors relative ${activePage === 'welfare' ? 'text-[#5415A0] font-extrabold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#5415A0]' : 'hover:text-[#5415A0]'}`}
              >
                Welfare Fund
              </button>
            </>
          )}
        </nav>

        {/* Right: Actions, Notifications & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {portalMode === 'client' ? (
            <button 
              onClick={() => handleNav('bookings')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5415A0] hover:bg-[#430E7E] text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post a Task</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready for Dispatch</span>
            </div>
          )}

          <button 
            onClick={onOpenHelp}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:text-[#5415A0] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden xl:inline">Need Help?</span>
          </button>

          <button 
            onClick={onOpenDashboard}
            className="relative p-2 rounded-full text-slate-500 hover:text-[#5415A0] hover:bg-purple-50 transition-colors"
            title="Notifications & Active Bookings"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5415A0] rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile Pill */}
          <div 
            onClick={() => handleNav(portalMode === 'client' ? 'artisan-profile' : 'worker-dashboard')}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 bg-white hover:border-purple-300 cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-purple-100 text-[#5415A0] font-black text-xs flex items-center justify-center">
              RK
            </div>
            <div className="hidden md:block text-left pr-1">
              <span className="block text-[11px] font-extrabold text-slate-900 leading-tight">Ravi Kumar</span>
              <span className="block text-[9px] text-slate-400 leading-tight">Hub #408</span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white p-4 space-y-3 text-xs font-bold animate-in slide-in-from-top-2">
          {/* Mobile Portal Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-2">
            <button
              onClick={() => {
                onSelectPortalMode('client');
                handleNav('home');
              }}
              className={`flex-1 py-1.5 text-center rounded-lg ${portalMode === 'client' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              🛍️ Marketplace
            </button>
            <button
              onClick={() => {
                onSelectPortalMode('worker');
                handleNav('worker-dashboard');
              }}
              className={`flex-1 py-1.5 text-center rounded-lg ${portalMode === 'worker' ? 'bg-[#5415A0] text-white' : 'text-slate-500'}`}
            >
              ⚡ Worker Hub
            </button>
          </div>

          {(portalMode === 'client' ? [
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services Catalog' },
            { id: 'bookings', label: '5-Step Booking Wizard' },
            { id: 'artisan-profile', label: 'Artisan Profile (Ravi Kumar)' },
            { id: 'resolution', label: 'Resolution Desk (Worker Replacement)' },
          ] : [
            { id: 'worker-dashboard', label: 'Daily Dispatch Dashboard' },
            { id: 'command', label: 'Bangalore Central Guild Command' },
            { id: 'earnings', label: 'Earnings & Co-op Ledger' },
            { id: 'availability', label: 'Availability Planner' },
            { id: 'members', label: 'Cooperative Member Directory (183)' },
            { id: 'welfare', label: 'Community Welfare Fund' },
            { id: 'cooperative', label: 'Your Cooperative Hub' },
          ]).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id as any)}
              className={`w-full py-2.5 px-3 text-left rounded-xl transition-colors ${
                activePage === item.id 
                  ? 'bg-purple-100 text-[#5415A0] font-extrabold' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
