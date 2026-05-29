/**
 * formEndpoints.js
 * -----------------------------------------------------------------------------
 * Centralized configuration for form endpoints and sheet mappings.
 * This allows easy scaling to multiple Google Sheets or different webhook URLs.
 * 
 * Future enhancements:
 * - Support for multiple Google Sheets per form type
 * - Support for different webhook URLs per environment
 * - Support for CRM integration endpoints
 * - Support for analytics tracking endpoints
 * -----------------------------------------------------------------------------
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
  [FORM_TYPES.BRAND_APPLICATION]: 'Brand_Applications',
  [FORM_TYPES.CHATBOT_BRAND]: 'Chatbot_Brands',
  [FORM_TYPES.CHATBOT_INVESTOR]: 'Chatbot_Investors',
  [FORM_TYPES.CHATBOT_STRATEGY]: 'Chatbot_Strategy',
  [FORM_TYPES.BROCHURE_DOWNLOAD]: 'Brochure_Downloads',
  [FORM_TYPES.FRANCHISE_INQUIRY]: 'Franchise_Inquiries',
};

/**
 * Source page tracking for analytics
 * Helps identify which page/form generated the lead
 */
export const SOURCE_PAGES = {
  CONTACT_PAGE: 'contact_page',
  BRAND_OWNERS_PAGE: 'brand_owners_page',
  HOMEPAGE: 'homepage',
  CHATBOT: 'chatbot',
  FRANCHISE_DETAILS: 'franchise_details_brochure',
  FRANCHISE_DETAILS_INQUIRY: 'franchise_details_inquiry',
};

