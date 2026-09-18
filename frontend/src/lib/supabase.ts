import { createClient } from '@supabase/supabase-js';
import type { BookingState } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Persists a completed booking to Supabase if configured,
 * otherwise falls back to local storage and console simulation.
 */
export async function syncBookingToDatabase(booking: BookingState) {
  const payload = {
    booking_code: booking.bookingId,
    service_id: booking.selectedService?.id,
    service_title: booking.selectedService?.title,
    worker_id: booking.selectedWorker?.id,
    worker_name: booking.selectedWorker?.name,
    scheduled_date: `${booking.selectedDate.year}-10-${booking.selectedDate.dateNumber}`,
    scheduled_time: booking.selectedSlot?.timeRange,
    address_line: `${booking.address.street}, ${booking.address.locality}, ${booking.address.city}`,
    notes: booking.artisanNotes,
    deposit_amount: 1,
    total_amount: 900,
    payment_method: booking.paymentMethod,
    upi_id: booking.paymentMethod === 'upi' ? booking.upiId : null,
    razorpay_payment_id: booking.razorpayPaymentId || null,
    payment_status: booking.paymentStatus || 'success',
    status: 'escrow_locked',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([payload])
        .select();

      if (error) {
        console.warn('[Supabase Sync Warning]', error.message);
        saveToLocalStorage(payload);
        return { success: false, fallback: true, error: error.message };
      }
      return { success: true, data };
    } catch (err: any) {
      console.warn('[Supabase Exception]', err);
      saveToLocalStorage(payload);
      return { success: false, fallback: true, error: err.message };
    }
  } else {
    console.info('[WORKIVO Co-op Simulation] Supabase credentials not set in .env. Booking persisted locally:', payload);
    saveToLocalStorage(payload);
    return { success: true, localOnly: true, data: payload };
  }
}

function saveToLocalStorage(record: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('workivo_bookings') || '[]');
    existing.unshift(record);
    localStorage.setItem('workivo_bookings', JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}
