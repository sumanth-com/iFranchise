import { FORM_TYPES } from '../constants/formTypes.js';
import {
  validateBrandChatbotForm,
  validateBrandConsultationForm,
  validateInvestorChatbotForm,
  validateStrategyCallForm,
} from '../validators/chatbotValidator.js';
import {
  transformBrandChatbotData,
  transformInvestorChatbotData,
  transformStrategyCallData,
} from '../transformers/chatbotTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitChatbotLead(formData, variant = 'brand', sourcePage = 'chatbot') {
  if (variant === 'investor') {
    return runFormSubmission({
      formType: FORM_TYPES.CHATBOT_INVESTOR,
      rawData: formData,
      sourcePage,
      validate: validateInvestorChatbotForm,
      transform: transformInvestorChatbotData,
    });
  }

  return runFormSubmission({
    formType: FORM_TYPES.CHATBOT_BRAND,
    rawData: formData,
    sourcePage,
    validate: validateBrandChatbotForm,
    transform: transformBrandChatbotData,
  });
}

/** Brand profile + consultation scheduling → Google Sheet */
export async function submitBrandConsultation(formData, sourcePage = 'expansion_assistant_brand_consultation') {
  return runFormSubmission({
    formType: FORM_TYPES.CHATBOT_BRAND,
    rawData: formData,
    sourcePage,
    validate: validateBrandConsultationForm,
    transform: transformBrandChatbotData,
  });
}

/** Strategy call request → Google Sheet */
export async function submitStrategyCall(formData, sourcePage = 'expansion_assistant_strategy') {
  return runFormSubmission({
    formType: FORM_TYPES.CHATBOT_STRATEGY,
    rawData: formData,
    sourcePage,
    validate: validateStrategyCallForm,
    transform: transformStrategyCallData,
  });
}
