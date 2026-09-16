/**
 * WORKIVO Twilio WhatsApp Notification Test Script
 * Run with: node scripts/test-twilio.cjs
 */
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+17372508034";
const toNumber = process.env.TWILIO_WHATSAPP_TO || "whatsapp:+919426262139";
const contentSid = process.env.TWILIO_CONTENT_SID || "HXfe5ab5f00277942d4d4200328b4d403c";

async function createMessage() {
  if (!accountSid || !authToken) {
    console.warn("⚠️ TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not set in .env.");
    console.warn("Please get your Account SID and Auth Token from https://twilio.com/console and add them to frontend/.env");
    return;
  }

  try {
    const client = twilio(accountSid, authToken);
    console.log(`🚀 Sending WhatsApp message via Twilio...`);
    console.log(`From: ${fromNumber}`);
    console.log(`To: ${toNumber}`);
    console.log(`Content SID: ${contentSid}`);

    const message = await client.messages.create({
      contentSid: contentSid,
      from: fromNumber,
      to: toNumber,
    });

    console.log(`✅ WhatsApp message sent successfully! Message SID: ${message.sid}`);
    console.log(`Status: ${message.status}`);
  } catch (error) {
    console.error("❌ Failed to send WhatsApp message via Twilio:", error.message);
  }
}

createMessage();
