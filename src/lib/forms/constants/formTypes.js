/**
 * formTypes.js
 * -----------------------------------------------------------------------------
 * Form type constants for centralized form management.
 * Each form type maps to a specific Google Sheet tab and submission logic.
 * -----------------------------------------------------------------------------
 */

export const FORM_TYPES = {
  CONTACT: 'contact',
  BRAND_APPLICATION: 'brand_application',
  CHATBOT_BRAND: 'chatbot_brand',
  CHATBOT_INVESTOR: 'chatbot_investor',
  CHATBOT_STRATEGY: 'chatbot_strategy',
  BROCHURE_DOWNLOAD: 'brochure_download',
  FRANCHISE_INQUIRY: 'franchise_inquiry',
  CAREER_APPLICATION: 'career_application',
  DATA_RIGHTS_REQUEST: 'data_rights_request',
};

export const FORM_LABELS = {
  [FORM_TYPES.CONTACT]: 'Contact Form',
  [FORM_TYPES.BRAND_APPLICATION]: 'Brand Application',
  [FORM_TYPES.CHATBOT_BRAND]: 'Brand Chatbot Session',
  [FORM_TYPES.CHATBOT_INVESTOR]: 'Investor Chatbot Session',
  [FORM_TYPES.CHATBOT_STRATEGY]: 'Strategy Call Request',
  [FORM_TYPES.BROCHURE_DOWNLOAD]: 'Brochure Download Lead',
  [FORM_TYPES.FRANCHISE_INQUIRY]: 'Franchise Interest Inquiry',
  [FORM_TYPES.CAREER_APPLICATION]: 'Career Application',
  [FORM_TYPES.DATA_RIGHTS_REQUEST]: 'Data Rights Request',
};
