/**
 * chatbotTransformer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Transform chatbot session data into standardized Google Sheets payload format.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Transform brand chatbot data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformBrandChatbotData(formData, sourcePage = 'chatbot') {
  return {
    form_type: 'chatbot_brand',
    sheet_tab: 'Chatbot_Brands',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      brand_name: formData.brandName,
      industry: formData.industry || '',
      locations: formData.locations || '',
      cities: formData.cities || '',
      investment: formData.investment || '',
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
    }
  };
}

/**
 * Transform investor chatbot data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformInvestorChatbotData(formData, sourcePage = 'chatbot') {
  return {
    form_type: 'chatbot_investor',
    sheet_tab: 'Chatbot_Investors',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      industries: Array.isArray(formData.industries) ? formData.industries.join(', ') : formData.industries || '',
      budget: formData.budget || '',
      cities: formData.cities || '',
      roi: formData.roi || '',
      timeline: formData.timeline || '',
    }
  };
}
