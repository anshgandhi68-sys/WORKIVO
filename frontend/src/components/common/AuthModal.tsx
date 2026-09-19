import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Briefcase, 
  ShoppingBag,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    currentUser, 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal, 
    login, 
    signup, 
    logout,
    usersCount 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'worker'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [authModalMode, isAuthModalOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (mode === 'signup') {
      const res = signup({ name, email, password, phone, role });
      if (res.success) {
        setSuccessMsg(`Account created in localStorage! Welcome, ${res.user?.name}.`);
        setTimeout(() => {
          setIsSubmitting(false);
          closeAuthModal();
        }, 1100);
      } else {
        setIsSubmitting(false);
        setErrorMsg(res.error || 'Failed to sign up.');
      }
    } else {
      const res = login(email, password);
      if (res.success) {
        setSuccessMsg(`Authenticated via localStorage! Welcome back, ${res.user?.name}.`);
        setTimeout(() => {
          setIsSubmitting(false);
          closeAuthModal();
        }, 900);
      } else {
        setIsSubmitting(false);
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    }
  };

  const handleFillDemo = (demoType: 'ansh-client' | 'ansh-worker') => {
    if (demoType === 'ansh-client') {
      setEmail('ansh@workivo.coop');
      setPassword('password123');
    } else {
      setEmail('ansh.gandhi@workivo.coop');
      setPassword('password123');
    }
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-br from-[#5415A0] via-[#430E7E] to-[#2E0258] p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md p-1.5 flex items-center justify-center">
              <img 
                src="/workivo-balloon-icon.png" 
                alt="WORKIVO" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full">
              LocalStorage Auth
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {currentUser ? 'Manage Session' : (mode === 'login' ? 'Welcome to WORKIVO' : 'Create Co-op Account')}
          </h2>
          <p className="text-xs text-purple-200 mt-1 font-medium">
            {currentUser 
              ? `Currently logged in as ${currentUser.name}`
              : (mode === 'login' 
                ? 'Sign in with your localStorage verified profile' 
                : 'Join the cooperative marketplace. Data stored locally.')
            }
          </p>

          {/* LocalStorage pill indicator */}
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-purple-200/90 bg-purple-900/40 px-2.5 py-1 rounded-lg w-fit border border-purple-400/20">
            <Database className="w-3 h-3 text-emerald-400" />
            <span>localStorage: {usersCount} registered profile{usersCount === 1 ? '' : 's'}</span>
          </div>
        </div>

        {/* If user is already logged in, show account management */}
        {currentUser ? (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-purple-200 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center font-black text-sm shadow-md">
                {currentUser.avatarInitials || 'WK'}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{currentUser.name}</h3>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-[#5415A0]">
                    {currentUser.role === 'worker' ? 'Co-op Artisan' : 'Verified Client'}
                  </span>
                  {currentUser.phone && (
                    <span className="text-[10px] text-slate-400">{currentUser.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setSuccessMsg('Logged out successfully from current session.');
                }}
                className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Log Out of LocalStorage</span>
              </button>
              <button
                type="button"
                onClick={closeAuthModal}
                className="w-full py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="p-6">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{errorMsg}</span>
              </div>
            )}

            {/* Success Banner */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-tight font-medium">{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ansh Gandhi"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9426262139"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                          role === 'client'
                            ? 'border-2 border-[#5415A0] bg-[#FAF8FE] text-[#5415A0] font-bold'
                            : 'border-slate-200 text-slate-600 hover:border-purple-200'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Client (Hire)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole('worker')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                          role === 'worker'
                            ? 'border-2 border-[#5415A0] bg-[#FAF8FE] text-[#5415A0] font-bold'
                            : 'border-slate-200 text-slate-600 hover:border-purple-200'
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Artisan (Work)</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Fill Demo Pill in Login Mode */}
              {mode === 'login' && (
                <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Quick Demo Credentials:</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleFillDemo('ansh-client')}
                      className="px-2 py-0.5 bg-white hover:bg-purple-100 text-[#5415A0] border border-purple-200 font-bold rounded text-[10px] transition-colors"
                    >
                      Ansh (Client)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('ansh-worker')}
                      className="px-2 py-0.5 bg-white hover:bg-purple-100 text-[#5415A0] border border-purple-200 font-bold rounded text-[10px] transition-colors"
                    >
                      Ansh G. (Worker)
                    </button>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-75 active:scale-[0.99] mt-2"
              >
                {isSubmitting ? (
                  <span>Verifying localStorage...</span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Create & Store Account'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Switcher */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              {mode === 'login' ? (
                <p>
                  New to WORKIVO?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                    }}
                    className="font-bold text-[#5415A0] hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                    }}
                    className="font-bold text-[#5415A0] hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
