import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformBrandChatbotData(formData, sourcePage = 'chatbot') {
  return {
    form_type: FORM_TYPES.CHATBOT_BRAND,
    sheet_tab: SHEET_TABS[FORM_TYPES.CHATBOT_BRAND],
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
    },
  };
}

export function transformInvestorChatbotData(formData, sourcePage = 'chatbot') {
  return {
    form_type: FORM_TYPES.CHATBOT_INVESTOR,
    sheet_tab: SHEET_TABS[FORM_TYPES.CHATBOT_INVESTOR],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      industries: Array.isArray(formData.industries)
        ? formData.industries.join(', ')
        : formData.industries || '',
      budget: formData.budget || '',
      cities: formData.cities || '',
      roi: formData.roi || '',
      timeline: formData.timeline || '',
    },
  };
}
