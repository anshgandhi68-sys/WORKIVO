import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Send, 
  ExternalLink, 
  Key, 
  RefreshCw, 
  MessageSquare, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  Copy,
  Smartphone
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { 
  dispatchWhatsAppNotification, 
  getTwilioConfigStatus, 
  saveTwilioKeys, 
  WhatsAppSendResult, 
  TwilioConfigStatus 
} from '../../services/whatsappService';

export const WhatsAppNotificationCard: React.FC = () => {
  const { state, pricing } = useBooking();
  const [phoneNumber, setPhoneNumber] = useState('+919426262139');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<WhatsAppSendResult | null>(null);
  const [twilioStatus, setTwilioStatus] = useState<TwilioConfigStatus | null>(null);
  
  // Twilio Settings Modal
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [accountSidInput, setAccountSidInput] = useState('');
  const [authTokenInput, setAuthTokenInput] = useState('');
  const [isSavingKeys, setIsSavingKeys] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-send WhatsApp notification on component mount
  useEffect(() => {
    let isMounted = true;

    async function initialDispatch() {
      const status = await getTwilioConfigStatus();
      if (isMounted) setTwilioStatus(status);

      setIsSending(true);
      const res = await dispatchWhatsAppNotification(state, pricing, phoneNumber);
      if (isMounted) {
        setSendResult(res);
        setIsSending(false);
      }
    }

    initialDispatch();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleResend = async () => {
    setIsSending(true);
    const res = await dispatchWhatsAppNotification(state, pricing, phoneNumber);
    setSendResult(res);
    setIsSending(false);
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountSidInput.trim() || !authTokenInput.trim()) return;

    setIsSavingKeys(true);
    const ok = await saveTwilioKeys(accountSidInput.trim(), authTokenInput.trim());
    setIsSavingKeys(false);

    if (ok) {
      setSaveSuccessMsg('Twilio API credentials saved to .env!');
      const updatedStatus = await getTwilioConfigStatus();
      setTwilioStatus(updatedStatus);
      setTimeout(() => {
        setIsConfigModalOpen(false);
        setSaveSuccessMsg('');
        handleResend();
      }, 1200);
    }
  };

  const handleCopyMessage = () => {
    if (sendResult?.messageText) {
      navigator.clipboard.writeText(sendResult.messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50/90 via-white to-purple-50/60 rounded-3xl border border-emerald-200/80 p-6 sm:p-7 shadow-sm relative overflow-hidden">
      {/* Decorative ambient bubble */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
            <MessageSquare className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                WhatsApp Dispatch & Alerts
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Twilio Cloud
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Real-time booking dispatch sent to client & artisan via WhatsApp
            </p>
          </div>
        </div>

        {/* Twilio Status Badge */}
        <div className="flex items-center gap-2">
          {sendResult?.success ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Twilio Sent (SID: {sendResult.sid?.substring(0, 10)}...)</span>
            </div>
          ) : twilioStatus?.configured ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Twilio Configured</span>
            </div>
          ) : (
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/90 hover:bg-purple-200 text-[#5415A0] text-xs font-bold border border-purple-200 transition-colors"
            >
              <Key className="w-3 h-3" />
              <span>Configure Twilio Keys</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 text-xs">
        {/* Recipient Phone */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Recipient WhatsApp:</span>
            <button
              onClick={() => setIsEditingPhone(!isEditingPhone)}
              className="text-[#5415A0] font-bold text-[11px] hover:underline"
            >
              {isEditingPhone ? 'Done' : 'Change'}
            </button>
          </div>
          {isEditingPhone ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-2.5 py-1 text-xs font-bold border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="+919426262139"
            />
          ) : (
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{phoneNumber}</span>
            </div>
          )}
          <span className="text-[10px] text-slate-400 block">
            Client confirmation & live tracking updates
          </span>
        </div>

        {/* Sender Channel */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm space-y-1">
          <span className="text-slate-400 font-medium block">Verified Twilio Sender:</span>
          <div className="font-extrabold text-slate-900 text-sm">
            +1 (737) 250-8034
          </div>
          <span className="text-[10px] text-slate-400 block">
            Official WORKIVO WhatsApp Business Account
          </span>
        </div>

        {/* Content Template SID */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm space-y-1">
          <span className="text-slate-400 font-medium block">Approved Content SID:</span>
          <div className="font-mono font-bold text-slate-800 text-[11px] truncate" title="HXfe5ab5f00277942d4d4200328b4d403c">
            HXfe5ab5f00277942d4d4200328b4d403c
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            Meta Pre-Approved Dispatch Template
          </span>
        </div>
      </div>

      {/* WhatsApp Message Preview Bubble */}
      <div className="mb-5 p-4 rounded-2xl bg-[#EFEAE2] border border-[#DAD3C7] text-slate-800 font-sans text-xs relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>WhatsApp Template Payload Preview:</span>
          </div>
          <button
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-white/80 px-2 py-0.5 rounded-md border border-slate-300"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
        
        {/* Mock WhatsApp message bubble */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-[11px] leading-relaxed border-l-4 border-l-[#25D366] max-w-xl whitespace-pre-line font-mono text-slate-700">
          {sendResult?.messageText || 'Generating WhatsApp confirmation...'}
          <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span>WORKIVO Sovereign Escrow Protocol</span>
            <span className="flex items-center gap-1 text-[#53bdeb] font-bold">
              Just now <Check className="w-3 h-3 inline stroke-[3] text-[#53bdeb]" /><Check className="w-3 h-3 -ml-2.5 inline stroke-[3] text-[#53bdeb]" />
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Open in WhatsApp Web / App */}
        <a
          href={sendResult?.directUrl || `https://api.whatsapp.com/send?phone=919426262139`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[200px] py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Open in WhatsApp (+91 9426262139)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Resend via Twilio API */}
        <button
          onClick={handleResend}
          disabled={isSending}
          className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSending ? 'animate-spin text-[#5415A0]' : ''}`} />
          <span>{isSending ? 'Dispatching via Twilio...' : 'Resend via Twilio API'}</span>
        </button>

        {/* Configure Twilio Credentials button */}
        <button
          onClick={() => setIsConfigModalOpen(true)}
          className="py-3 px-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#5415A0] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5" />
          <span>API Key Settings</span>
        </button>
      </div>

      {/* Twilio Credentials Modal */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Twilio API Key Configuration
                </h4>
                <p className="text-xs text-slate-500">
                  Manage Account SID & Auth Token for WhatsApp API
                </p>
              </div>
            </div>

            {/* 10-second guide for Auth Token */}
            <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div className="font-extrabold flex items-center gap-1.5 mb-1.5 text-amber-950">
                <span>🔑 How to get your Auth Token (in 10 seconds):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-800 leading-relaxed font-medium">
                <li>Log in to <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950 hover:text-black">console.twilio.com</a></li>
                <li>Under <strong>Account Info</strong>, find <strong>Auth Token</strong> right below your Account SID.</li>
                <li>Click the <strong>Show</strong> eyeball icon, copy the token, and paste it below.</li>
              </ol>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  TWILIO_ACCOUNT_SID:
                </label>
                <input
                  type="text"
                  placeholder="e.g. ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={accountSidInput}
                  onChange={(e) => setAccountSidInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Found on your Twilio Console (starts with AC)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  TWILIO_AUTH_TOKEN:
                </label>
                <input
                  type="password"
                  placeholder="e.g. 32-character Auth Token"
                  value={authTokenInput}
                  onChange={(e) => setAuthTokenInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Secret Auth Token from Twilio Console
                </span>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-[#5415A0]">Pre-configured Settings:</div>
                <div>• From: <span className="font-mono">whatsapp:+17372508034</span></div>
                <div>• To: <span className="font-mono">whatsapp:+919426262139</span></div>
                <div>• Content SID: <span className="font-mono">HXfe5ab5f00277942d4d4200328b4d403c</span></div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSavingKeys}
                  className="flex-1 py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSavingKeys ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>Save to .env & Test</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(false)}
                  className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
