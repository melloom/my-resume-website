/**
 * EmailJS Configuration
 * 
 * This file contains the configuration for EmailJS service
 * including service IDs, template IDs, and public key.
 */

// Shared EmailJS public key for authentication
export const EMAILJS_PUBLIC_KEY = 'ZOX5uuIIhnKYyJF1D';

// Shared service ID used for all email templates
export const EMAIL_SERVICE_ID = 'JOBID1010';

// Email template configuration for the home page contact form
export const HOME_EMAIL_CONFIG = {
  templateId: 'TemPID101',
  serviceId: EMAIL_SERVICE_ID,
  publicKey: EMAILJS_PUBLIC_KEY,
  // Template format:
  // {{name}}
  // {{time}}
  // {{email}}
  // {{subject}}
  // {{message}}
};

// Email template configuration for the contact page form
export const CONTACT_EMAIL_CONFIG = {
  templateId: 'TempID202',
  serviceId: EMAIL_SERVICE_ID,
  publicKey: EMAILJS_PUBLIC_KEY,
  // Template format:
  // 👤
  // 📥 New Contact Request Received
  // - 🧑 Name: {{name}}
  // - 🕒 Time Sent: {{time}}
  // - 📧 Email: {{email}}
  // - ☎️ Phone: {{phone}}
  // - 🏢 Company: {{company}}
  // - 🧠 Subject: {{subject}}
  // - 💬 Message: {{message}}
  // 🔍 Interest Area: {{interest}}
};

// Helper function to format email parameters
export const formatEmailParams = (formData, includeTime = true) => {
  const params = { ...formData };
  
  // Add current time if needed
  if (includeTime) {
    params.time = new Date().toLocaleString();
  }
  
  return params;
};

// Default export for easier imports
export default {
  HOME_EMAIL_CONFIG,
  CONTACT_EMAIL_CONFIG,
  EMAILJS_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  formatEmailParams
};
