import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, Check } from 'lucide-react';

interface NominateApprenticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NominateApprenticeModal: React.FC<NominateApprenticeModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Electrical');
  const [experience, setExperience] = useState('1-2 years');
  const [mentor, setMentor] = useState('Ansh Gandhi (Hub #408)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#5415A0] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Apprentice Nominated</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Nomination credentials submitted to Karnataka Guild Assembly #408 for apprenticeship sponsorship.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Nominate Apprentice</h3>
                <p className="text-xs text-slate-500">Guild-funded onboarding and tool stipend sponsorship</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Candidate Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karthik Venkat"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-xs font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Trade</label>
                  <select
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] outline-none text-xs font-medium"
                  >
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>Carpentry</option>
                    <option>HVAC & Inverters</option>
                    <option>Smart Home Automation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Field Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] outline-none text-xs font-medium"
                  >
                    <option>Fresh ITI Graduate</option>
                    <option>1-2 years</option>
                    <option>3+ years assistant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Sponsoring Master Co-owner</label>
                <input
                  type="text"
                  value={mentor}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0" />
                <span>Apprentices receive ₹12,000 monthly stipend from the Hub Welfare Pool during training.</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Submit Nomination
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
