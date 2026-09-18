/**
 * Razorpay Payment Gateway Integration Utilities for WORKIVO
 * Handles checkout script injection, UPI QR code flow prioritization,
 * and comprehensive error / success handling.
 */

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayPaymentErrorResponse {
  code?: string;
  description: string;
  source?: string;
  step?: string;
  reason?: string;
}

export interface InitiateRazorpayParams {
  amount: number; // in INR (e.g. 225 for ₹225)
  bookingId: string;
  serviceTitle: string;
  workerName: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  upiId?: string;
  customKey?: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onError: (error: RazorpayPaymentErrorResponse) => void;
  onDismiss?: () => void;
}

/**
 * Dynamically loads the Razorpay checkout script with caching.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      return resolve(true);
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('[WORKIVO] Failed to load Razorpay Checkout script.');
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

/**
 * Opens the Razorpay Checkout Modal configured for UPI QR code escrow deposit.
 */
export const initiateRazorpayPayment = async ({
  amount,
  bookingId,
  serviceTitle,
  workerName,
  customerName = 'WORKIVO Customer',
  customerPhone = '9876543210',
  customerEmail = 'member@workivo.coop',
  upiId = 'success@razorpay',
  customKey,
  onSuccess,
  onError,
  onDismiss
}: InitiateRazorpayParams): Promise<boolean> => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    onError({
      description: 'Unable to connect to Razorpay Payment Gateway. Check internet connection and disable adblockers.'
    });
    return false;
  }

  const key = customKey?.trim() || 
    import.meta.env.VITE_RAZORPAY_KEY_ID || 
    'rzp_test_TO0Zvk3JDd91cP';

  // Razorpay requires amounts in Paise (₹1 = 100 Paise)
  const amountInPaise = Math.round(amount * 100);

  let paymentSuccessful = false;

  const options = {
    key: key,
    amount: amountInPaise,
    currency: 'INR',
    name: 'WORKIVO Cooperative',
    description: `25% Sovereign Escrow Deposit • ${bookingId}`,
    image: '/workivo-balloon-icon.png',
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
      method: 'upi',
      vpa: upiId || 'success@razorpay'
    },
    notes: {
      booking_id: bookingId,
      service_title: serviceTitle,
      worker_name: workerName,
      deposit_type: '25% Cooperative Escrow Protection',
      guarantee: '100% Refund Guarantee on Cancellation'
    },
    theme: {
      color: '#5415A0',
      backdrop_color: 'rgba(26, 4, 56, 0.65)'
    },
    config: {
      display: {
        blocks: {
          upi: {
            name: 'Pay via UPI / QR Code',
            instruments: [
              {
                method: 'upi',
                flows: ['qr', 'intent', 'collect']
              }
            ]
          },
          other: {
            name: 'Cards & NetBanking',
            instruments: [
              {
                method: 'card'
              },
              {
                method: 'netbanking'
              }
            ]
          }
        },
        sequence: ['block.upi', 'block.other'],
        preferences: {
          show_default_blocks: true
        }
      }
    },
    handler: function (response: RazorpayPaymentSuccessResponse) {
      paymentSuccessful = true;
      console.info('[WORKIVO Razorpay] Payment Succeeded:', response);
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        if (!paymentSuccessful) {
          console.warn('[WORKIVO Razorpay] Checkout modal dismissed by user.');
          if (onDismiss) {
            onDismiss();
          } else {
            onError({
              description: 'Payment was cancelled before completion. Please scan the QR code to proceed.'
            });
          }
        }
      }
    }
  };

  try {
    const rzpInstance = new (window as any).Razorpay(options);

    rzpInstance.on('payment.failed', function (response: any) {
      console.error('[WORKIVO Razorpay] Payment Failed:', response.error);
      onError({
        code: response.error?.code,
        description: response.error?.description || 'Payment authorization failed.',
        source: response.error?.source,
        step: response.error?.step,
        reason: response.error?.reason
      });
    });

    rzpInstance.open();
    return true;
  } catch (err: any) {
    console.error('[WORKIVO Razorpay] Initialization error:', err);
    onError({
      description: err?.message || 'Failed to initialize Razorpay checkout window.'
    });
    return false;
  }
};
