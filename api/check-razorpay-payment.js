export default async function handler(req, res) {
  // Read keys from environment
  let keyId = process.env.VITE_RAZORPAY_KEY_ID;
  let keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(200).json({ configured: false, error: 'Razorpay keys not configured in environment' });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const rzpRes = await fetch('https://api.razorpay.com/v1/payments?count=5', {
      headers: { Authorization: authHeader }
    });
    const data = await rzpRes.json();
    const payments = data.items || [];
    const latest = payments[0] || null;

    return res.status(200).json({
      configured: true,
      latestPayment: latest,
      isSuccess: latest?.status === 'captured' || latest?.status === 'authorized',
      isBlockedDomain: Boolean(latest?.error_description?.includes('website does not match')),
      errorDescription: latest?.error_description || null,
      items: payments
    });
  } catch (err) {
    return res.status(200).json({ configured: true, error: err.message });
  }
}
