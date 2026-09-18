import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

function twilioApiPlugin() {
  return {
    name: 'twilio-api-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // 1. Send WhatsApp Message
        if (req.url === '/api/send-whatsapp' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const accountSid = data.accountSid || process.env.TWILIO_ACCOUNT_SID;
              const authToken = data.authToken || process.env.TWILIO_AUTH_TOKEN;
              const from = data.from || process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+17372508034';
              const to = data.to || process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+919426262139';
              const contentSid = data.contentSid || process.env.TWILIO_CONTENT_SID || 'HXfe5ab5f00277942d4d4200328b4d403c';

              if (!accountSid || !authToken) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({
                    success: false,
                    configured: false,
                    message: 'Twilio Account SID or Auth Token not yet provided in .env.',
                    to,
                    from,
                    contentSid
                  })
                );
              }

              const { default: twilio } = await import('twilio');
              const client = twilio(accountSid, authToken);

              const messagePayload: any = {
                contentSid,
                from,
                to
              };

              if (data.contentVariables) {
                messagePayload.contentVariables = JSON.stringify(data.contentVariables);
              }

              const message = await client.messages.create(messagePayload);
              console.log('✅ Twilio WhatsApp Sent! SID:', message.sid);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({
                  success: true,
                  configured: true,
                  sid: message.sid,
                  status: message.status,
                  to: message.to,
                  from: message.from
                })
              );
            } catch (err: any) {
              console.error('Twilio API Error:', err.message);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({
                  success: false,
                  error: err.message,
                  code: err.code || 500
                })
              );
            }
          });
          return;
        }

        // 2. Check Twilio Status
        if (req.url === '/api/twilio-status' && req.method === 'GET') {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(
            JSON.stringify({
              configured: Boolean(accountSid && authToken && !accountSid.includes('your-')),
              from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+17372508034',
              to: process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+919426262139',
              contentSid: process.env.TWILIO_CONTENT_SID || 'HXfe5ab5f00277942d4d4200328b4d403c'
            })
          );
        }

        // 3. Save Twilio Keys to .env dynamically
        if (req.url === '/api/save-twilio-keys' && req.method === 'POST') {
          let body = '';
          req.on('data', (c: any) => { body += c; });
          req.on('end', () => {
            try {
              const { accountSid, authToken, from, to, contentSid } = JSON.parse(body || '{}');
              if (accountSid) process.env.TWILIO_ACCOUNT_SID = accountSid;
              if (authToken) process.env.TWILIO_AUTH_TOKEN = authToken;
              if (from) process.env.TWILIO_WHATSAPP_FROM = from;
              if (to) process.env.TWILIO_WHATSAPP_TO = to;
              if (contentSid) process.env.TWILIO_CONTENT_SID = contentSid;

              const envPath = path.resolve(process.cwd(), '.env');
              let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

              const updateKey = (key: string, val: string) => {
                const regex = new RegExp(`^${key}=.*$`, 'm');
                if (regex.test(envContent)) {
                  envContent = envContent.replace(regex, `${key}=${val}`);
                } else {
                  envContent += `\n${key}=${val}`;
                }
              };

              if (accountSid) updateKey('TWILIO_ACCOUNT_SID', accountSid);
              if (authToken) updateKey('TWILIO_AUTH_TOKEN', authToken);
              if (from) updateKey('TWILIO_WHATSAPP_FROM', from);
              if (to) updateKey('TWILIO_WHATSAPP_TO', to);
              if (contentSid) updateKey('TWILIO_CONTENT_SID', contentSid);

              fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Twilio keys saved successfully!' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 4. Save Razorpay Keys to .env dynamically
        if (req.url === '/api/save-razorpay-key' && req.method === 'POST') {
          let body = '';
          req.on('data', (c: any) => { body += c; });
          req.on('end', () => {
            try {
              const { keyId, keySecret } = JSON.parse(body || '{}');
              if (keyId) process.env.VITE_RAZORPAY_KEY_ID = keyId;
              if (keySecret) process.env.RAZORPAY_KEY_SECRET = keySecret;

              const envPath = path.resolve(process.cwd(), '.env');
              let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

              const updateKey = (key: string, val: string) => {
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

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Razorpay Key ID saved successfully!' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 5. Real-time Razorpay Payment Verification Poller
        if (req.url?.startsWith('/api/check-razorpay-payment') && req.method === 'GET') {
          let keyId = process.env.VITE_RAZORPAY_KEY_ID;
          let keySecret = process.env.RAZORPAY_KEY_SECRET;

          if (!keyId || !keySecret) {
            const possiblePaths = [
              path.resolve(process.cwd(), 'frontend/.env'),
              path.resolve(process.cwd(), '.env'),
              path.resolve(__dirname, '.env'),
              path.resolve(__dirname, 'frontend/.env')
            ];
            for (const p of possiblePaths) {
              if (fs.existsSync(p)) {
                const envContent = fs.readFileSync(p, 'utf8');
                const matchKey = envContent.match(/^VITE_RAZORPAY_KEY_ID=(.*)$/m);
                const matchSecret = envContent.match(/^RAZORPAY_KEY_SECRET=(.*)$/m);
                if (matchKey && matchKey[1]) keyId = matchKey[1].trim();
                if (matchSecret && matchSecret[1]) keySecret = matchSecret[1].trim();
                if (keyId && keySecret) break;
              }
            }
          }

          if (!keyId || !keySecret) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ configured: false, error: 'Razorpay keys not configured' }));
          }

          try {
            const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
            const rzpRes = await fetch('https://api.razorpay.com/v1/payments?count=5', {
              headers: { Authorization: authHeader }
            });
            const data = await rzpRes.json();
            const payments = data.items || [];
            const latest = payments[0] || null;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
              configured: true,
              latestPayment: latest,
              isSuccess: latest?.status === 'captured' || latest?.status === 'authorized',
              isBlockedDomain: Boolean(latest?.error_description?.includes('website does not match')),
              errorDescription: latest?.error_description || null,
              items: payments
            }));
          } catch (err: any) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ configured: true, error: err.message }));
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), twilioApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
