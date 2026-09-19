require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to save Razorpay keys
app.post('/api/save-razorpay-key', (req, res) => {
  try {
    const { keyId, keySecret } = req.body;
    if (keyId) process.env.VITE_RAZORPAY_KEY_ID = keyId;
    if (keySecret) process.env.RAZORPAY_KEY_SECRET = keySecret;

    const envPath = path.resolve(__dirname, '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    const updateKey = (key, val) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${val}`);
      } else {
        envContent += `\n${key}=${val}`;
      }
    };

    if (keyId) updateKey('VITE_RAZORPAY_KEY_ID', keyId);
    if (keySecret) updateKey('RAZORPAY_KEY_SECRET', keySecret);

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

    res.json({ success: true, message: 'Razorpay Key ID saved successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Real-time Razorpay Payment Verification Poller
app.get('/api/check-razorpay-payment', async (req, res) => {
  let keyId = process.env.VITE_RAZORPAY_KEY_ID;
  let keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const matchKey = envContent.match(/^VITE_RAZORPAY_KEY_ID=(.*)$/m);
      const matchSecret = envContent.match(/^RAZORPAY_KEY_SECRET=(.*)$/m);
      if (matchKey && matchKey[1]) keyId = matchKey[1].trim();
      if (matchSecret && matchSecret[1]) keySecret = matchSecret[1].trim();
      if (keyId && keySecret) {
        process.env.VITE_RAZORPAY_KEY_ID = keyId;
        process.env.RAZORPAY_KEY_SECRET = keySecret;
      }
    }
  }

  if (!keyId || !keySecret) {
    return res.json({ configured: false, error: 'Razorpay keys not configured' });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const rzpRes = await fetch('https://api.razorpay.com/v1/payments?count=5', {
      headers: { Authorization: authHeader }
    });
    
    if (!rzpRes.ok) {
        const errText = await rzpRes.text();
        return res.json({ configured: true, error: `Razorpay API error: ${rzpRes.status} ${errText}` });
    }
    
    const data = await rzpRes.json();
    const payments = data.items || [];
    const latest = payments[0] || null;

    return res.json({
      configured: true,
      latestPayment: latest,
      isSuccess: latest?.status === 'captured' || latest?.status === 'authorized',
      isBlockedDomain: Boolean(latest?.error_description?.includes('website does not match')),
      errorDescription: latest?.error_description || null,
      items: payments
    });
  } catch (err) {
    return res.json({ configured: true, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`WORKIVO Backend running on port ${PORT}`);
});
