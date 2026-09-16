import { BookingState, PricingBreakdown } from '../types';

export interface WhatsAppSendResult {
  success: boolean;
  configured: boolean;
  sid?: string;
  status?: string;
  error?: string;
  directUrl: string;
  messageText: string;
}

export interface TwilioConfigStatus {
  configured: boolean;
  from: string;
  to: string;
  contentSid: string;
}

/**
 * Builds the official formatted WhatsApp message for a WORKIVO booking
 */
export function buildWhatsAppMessage(state: BookingState, pricing: PricingBreakdown): string {
  const workerName = state.selectedWorker?.name || 'Assigned Specialist';
  const workerTrade = state.selectedWorker?.tradeCategory?.toUpperCase() || 'GENERAL';
  const serviceTitle = state.selectedService?.title || 'Home Service';
  const dateStr = state.selectedDate 
    ? `${state.selectedDate.dayName}, ${state.selectedDate.month} ${state.selectedDate.dateNumber}, ${state.selectedDate.year}`
    : 'Scheduled Day';
  const slotStr = state.selectedSlot?.timeRange || state.selectedSlot?.title || 'Agreed Slot';
  const addressStr = `${state.address.street}, ${state.address.locality}`;
  const freqStr = state.frequency === 'every_saturday' 
    ? 'Every Saturday (10% Loyalty Discount)' 
    : 'One-Time Escrow Dispatch';

  return `🔔 *WORKIVO Cooperative Booking Confirmation*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 *Booking ID:* ${state.bookingId}
🛠️ *Service:* ${serviceTitle}
👨‍🔧 *Specialist:* ${workerName} (${workerTrade})
📅 *Date & Slot:* ${dateStr} • ${slotStr}
🔄 *Frequency:* ${freqStr}
📍 *Address:* ${addressStr}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Escrow Deposit Locked:* ₹${pricing.depositRequired}
⚖️ *Worker Dividend (85%):* ₹${pricing.workerDividend}
🛡️ *Escrow Guarantee:* 100% Refundable on cancellation
━━━━━━━━━━━━━━━━━━━━━━━━━━
*Small Tasks, Big Relief.*
Cooperative verified: Workers own their equity; clients pay zero surge markups.`;
}

/**
 * Generates a direct WhatsApp web/app link to open and send to the designated phone number
 */
export function generateDirectWhatsAppLink(phoneNumber: string, text: string): string {
  // Strip non-digits
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}

/**
 * Dispatches WhatsApp message via the Twilio backend API or returns direct fallback
 */
export async function dispatchWhatsAppNotification(
  state: BookingState,
  pricing: PricingBreakdown,
  customToNumber?: string
): Promise<WhatsAppSendResult> {
  const targetPhone = customToNumber || 'whatsapp:+919426262139';
  const messageText = buildWhatsAppMessage(state, pricing);
  const directUrl = generateDirectWhatsAppLink(targetPhone, messageText);

  try {
    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: targetPhone.startsWith('whatsapp:') ? targetPhone : `whatsapp:${targetPhone}`,
        from: 'whatsapp:+17372508034',
        contentSid: 'HXfe5ab5f00277942d4d4200328b4d403c',
        contentVariables: {
          '1': state.selectedWorker?.name || 'Artisan',
          '2': state.selectedService?.title || 'Service',
          '3': state.selectedDate ? `${state.selectedDate.dayName} ${state.selectedDate.dateNumber}` : 'Scheduled',
          '4': state.selectedSlot?.timeRange || '10:00 AM',
          '5': `₹${pricing.depositRequired}`
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: data.success || false,
        configured: data.configured ?? false,
        sid: data.sid,
        status: data.status,
        error: data.error,
        directUrl,
        messageText
      };
    }
  } catch (err: any) {
    console.warn('Backend WhatsApp dispatch error:', err);
  }

  // Fallback
  return {
    success: false,
    configured: false,
    directUrl,
    messageText
  };
}

/**
 * Fetches status of Twilio configuration
 */
export async function getTwilioConfigStatus(): Promise<TwilioConfigStatus> {
  try {
    const res = await fetch('/api/twilio-status');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // ignore
  }
  return {
    configured: false,
    from: 'whatsapp:+17372508034',
    to: 'whatsapp:+919426262139',
    contentSid: 'HXfe5ab5f00277942d4d4200328b4d403c'
  };
}

/**
 * Saves Twilio keys to .env via the backend API
 */
export async function saveTwilioKeys(accountSid: string, authToken: string): Promise<boolean> {
  try {
    const res = await fetch('/api/save-twilio-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSid,
        authToken,
        from: 'whatsapp:+17372508034',
        to: 'whatsapp:+919426262139',
        contentSid: 'HXfe5ab5f00277942d4d4200328b4d403c'
      })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
