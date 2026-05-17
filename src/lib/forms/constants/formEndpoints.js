/**
 * formEndpoints.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized configuration for form endpoints and sheet mappings.
 * This allows easy scaling to multiple Google Sheets or different webhook URLs.
 * 
 * Future enhancements:
 * - Support for multiple Google Sheets per form type
 * - Support for different webhook URLs per environment
 * - Support for CRM integration endpoints
 * - Support for analytics tracking endpoints
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { FORM_TYPES } from './formTypes.js';

/**
 * Google Apps Script Web App URL configuration
 * This URL should be set in .env as VITE_GOOGLE_APPS_SCRIPT_URL
 * The script should handle POST requests and route to appropriate sheet tabs
 */
export const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

/**
 * Sheet tab mappings for each form type
 * These correspond to tab names in your Google Sheet
 */
export const SHEET_TABS = {
  [FORM_TYPES.CONTACT]: 'Contact_Leads',
  [FORM_TYPES.FRANCHISE_INQUIRY]: 'Franchise_Inquiries',
  [FORM_TYPES.BRAND_APPLICATION]: 'Brand_Applications',
  [FORM_TYPES.JOB_APPLICATION]: 'Job_Applications',
  [FORM_TYPES.CHATBOT_BRAND]: 'Chatbot_Brands',
  [FORM_TYPES.CHATBOT_INVESTOR]: 'Chatbot_Investors',
};

/**
 * Source page tracking for analytics
 * Helps identify which page/form generated the lead
 */
export const SOURCE_PAGES = {
  CONTACT_PAGE: 'contact_page',
  FRANCHISE_DETAILS: 'franchise_details',
  BRAND_OWNERS_PAGE: 'brand_owners_page',
  CAREERS_PAGE: 'careers_page',
  CAREER_DETAIL: 'career_detail',
  HOMEPAGE: 'homepage',
  FLOATING_CTA: 'floating_cta',
  CHATBOT: 'chatbot',
};

/**
 * Rate limiting configuration per form type
 * Values in milliseconds
 */
export const RATE_LIMITS = {
  [FORM_TYPES.CONTACT]: 30000, // 30 seconds
  [FORM_TYPES.FRANCHISE_INQUIRY]: 30000, // 30 seconds
  [FORM_TYPES.BRAND_APPLICATION]: 60000, // 60 seconds
  [FORM_TYPES.JOB_APPLICATION]: 60000, // 60 seconds
  [FORM_TYPES.CHATBOT_BRAND]: 30000, // 30 seconds
  [FORM_TYPES.CHATBOT_INVESTOR]: 30000, // 30 seconds
};

/**
 * Maximum submissions per session per form type
 */
export const MAX_SUBMISSIONS_PER_SESSION = {
  [FORM_TYPES.CONTACT]: 5,
  [FORM_TYPES.FRANCHISE_INQUIRY]: 5,
  [FORM_TYPES.BRAND_APPLICATION]: 3,
  [FORM_TYPES.JOB_APPLICATION]: 3,
  [FORM_TYPES.CHATBOT_BRAND]: 5,
  [FORM_TYPES.CHATBOT_INVESTOR]: 5,
};
