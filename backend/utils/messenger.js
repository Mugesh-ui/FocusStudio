// utils/messenger.js
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send an SMS
 */
export async function sendSMS(toPhone, body) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_SMS_NUMBER, // e.g. "+12025551234" from your Twilio SMS number
    to: toPhone,                         // e.g. "+919876543210"
  });
}

/**
 * Send a WhatsApp message
 */
export async function sendWhatsApp(toPhone, body) {
  return client.messages.create({
    body,
    from: "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER, // e.g. whatsapp:+14155238886
    to: "whatsapp:" + toPhone,                              // e.g. whatsapp:+919876543210
  });
}
