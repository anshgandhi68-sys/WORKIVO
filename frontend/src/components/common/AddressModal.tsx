import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { AddressInfo } from '../../types';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose }) => {
  const { state, updateAddress } = useBooking();
  const [formData, setFormData] = useState<AddressInfo>(state.address);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddress(formData);
    onClose();
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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5415A0] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Edit Service Address</h3>
            <p className="text-xs text-slate-500">Provide accurate entry landmarks for your artisan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Street / Building Name
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Floor / Apartment Details
              </label>
              <input
                type="text"
                value={formData.apartmentDetails}
                onChange={(e) => setFormData({ ...formData, apartmentDetails: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Locality / Area
              </label>
              <input
                type="text"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5415A0] focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-[#5415A0] hover:bg-[#430E7E] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
