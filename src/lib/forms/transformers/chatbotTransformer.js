import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

function resolveCities(formData) {
  if (formData.cities === 'Other') {
    return formData.citiesOther?.trim() || '';
  }
  return formData.cities || '';
}

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
      cities: resolveCities(formData),
      investment: formData.investment || '',
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
      preferred_date: formData.preferredDate || '',
      preferred_time: formData.preferredTime || '',
      consultation_email: formData.email?.trim() || '',
      consultation_notes: formData.notes?.trim() || '',
      consultation_requested: Boolean(formData.preferredDate),
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
      cities: formData.citiesResolved || resolveCities(formData),
      timeline: formData.timeline || '',
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
    },
  };
}

export function transformStrategyCallData(formData, sourcePage = 'chatbot') {
  return {
    form_type: FORM_TYPES.CHATBOT_STRATEGY,
    sheet_tab: SHEET_TABS[FORM_TYPES.CHATBOT_STRATEGY],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      name: formData.name,
      phone: formData.phone,
      email: formData.email?.trim() || '',
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message: formData.message?.trim() || '',
    },
  };
}
