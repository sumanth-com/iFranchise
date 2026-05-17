import { FORM_TYPES } from '../constants/formTypes.js';
import {
  validateBrandChatbotForm,
  validateInvestorChatbotForm,
} from '../validators/chatbotValidator.js';
import {
  transformBrandChatbotData,
  transformInvestorChatbotData,
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
