/**
 * formTypes.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Form type constants for centralized form management.
 * Each form type maps to a specific Google Sheet tab and submission logic.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const FORM_TYPES = {
  CONTACT: 'contact',
  BRAND_APPLICATION: 'brand_application',
  JOB_APPLICATION: 'job_application',
  CHATBOT_BRAND: 'chatbot_brand',
  CHATBOT_INVESTOR: 'chatbot_investor',
  CHATBOT_STRATEGY: 'chatbot_strategy',
};

export const FORM_LABELS = {
  [FORM_TYPES.CONTACT]: 'Contact Form',
  [FORM_TYPES.BRAND_APPLICATION]: 'Brand Application',
  [FORM_TYPES.JOB_APPLICATION]: 'Job Application',
  [FORM_TYPES.CHATBOT_BRAND]: 'Brand Chatbot Session',
  [FORM_TYPES.CHATBOT_INVESTOR]: 'Investor Chatbot Session',
  [FORM_TYPES.CHATBOT_STRATEGY]: 'Strategy Call Request',
};
