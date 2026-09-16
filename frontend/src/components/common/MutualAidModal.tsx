import React, { useState } from 'react';
import { X, ShieldCheck, Check, AlertCircle, HeartHandshake } from 'lucide-react';

interface MutualAidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MutualAidModal: React.FC<MutualAidModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<'emergency' | 'healthcare' | 'tools' | 'skills'>('emergency');
  const [amount, setAmount] = useState('4500');
  const [description, setDescription] = useState('Emergency tool replacement after voltage surge on site');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
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
            <h3 className="text-xl font-extrabold text-slate-900">Grant Request Broadcasted</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your mutual aid request has been submitted to the Hub #408 Peer Quorum Council. Average approval time is 18 minutes.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Request Mutual Aid Grant</h3>
                <p className="text-xs text-slate-500">Funded by 10% member welfare pool • Zero interest or payback</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Grant Category
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCategory('emergency')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      category === 'emergency'
                        ? 'border-[#5415A0] bg-purple-50 text-[#5415A0]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🚨 Emergency Support
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('healthcare')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      category === 'healthcare'
                        ? 'border-[#5415A0] bg-purple-50 text-[#5415A0]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🏥 Healthcare Relief
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('tools')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      category === 'tools'
                        ? 'border-[#5415A0] bg-purple-50 text-[#5415A0]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🔧 Tool Replacement
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('skills')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      category === 'skills'
                        ? 'border-[#5415A0] bg-purple-50 text-[#5415A0]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🎓 Skills & Labs Subsidy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Requested Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Circumstance / Task Details
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-xs text-slate-800 resize-none"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5415A0] shrink-0" />
                <span>
                  All grants are reviewed by 3 peer member-owners and recorded to the audited public ledger.
                </span>
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
                  Submit for Quorum Review
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
