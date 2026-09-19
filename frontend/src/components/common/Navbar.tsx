import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Bell, Plus, ShieldCheck, ChevronDown, Radio, Menu, X, Sparkles, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

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
  const { currentUser, openAuthModal, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: AppPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
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

          {/* User Profile / Sign In Area */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 bg-white hover:border-purple-300 cursor-pointer transition-all shadow-xs hover:shadow-sm select-none"
                title="Account Menu"
              >
                <div className="w-7 h-7 rounded-full bg-[#5415A0] text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {currentUser.avatarInitials || 'WK'}
                </div>
                <div className="hidden md:block text-left pr-0.5">
                  <span className="block text-[11px] font-extrabold text-slate-900 leading-tight truncate max-w-[85px]">
                    {currentUser.name}
                  </span>
                  <span className="block text-[9px] text-emerald-600 font-bold leading-tight flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>{currentUser.role === 'worker' ? 'Artisan' : 'Client'}</span>
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 block truncate">{currentUser.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate">{currentUser.email}</span>
                    <span className="mt-1.5 inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-100 text-[#5415A0]">
                      LocalStorage Session Active
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNav(currentUser.role === 'worker' ? 'worker-dashboard' : 'bookings')}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-between"
                    >
                      <span>{currentUser.role === 'worker' ? 'Worker Dashboard' : 'My Bookings'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        openAuthModal('login');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-between"
                    >
                      <span>Switch / Manage Accounts</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-[#5415A0] text-xs font-bold transition-all shadow-xs active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

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
            { id: 'artisan-profile', label: 'Artisan Profile (Ansh Gandhi)' },
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

          {/* Mobile Auth Actions */}
          <div className="pt-2 border-t border-slate-100">
            {currentUser ? (
              <div className="p-3 bg-purple-50/70 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#5415A0] text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.avatarInitials || 'WK'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{currentUser.email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 bg-[#5415A0] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
