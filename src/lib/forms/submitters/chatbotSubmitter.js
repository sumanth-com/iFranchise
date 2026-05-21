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
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

const submitBrandChatbot = createFormSubmitter({
  formType: FORM_TYPES.CHATBOT_BRAND,
  validate: validateBrandChatbotForm,
  transform: transformBrandChatbotData,
  defaultSourcePage: 'chatbot',
});

const submitInvestorChatbot = createFormSubmitter({
  formType: FORM_TYPES.CHATBOT_INVESTOR,
  validate: validateInvestorChatbotForm,
  transform: transformInvestorChatbotData,
  defaultSourcePage: 'chatbot',
});

export const submitBrandConsultation = createFormSubmitter({
  formType: FORM_TYPES.CHATBOT_BRAND,
  validate: validateBrandConsultationForm,
  transform: transformBrandChatbotData,
  defaultSourcePage: 'expansion_assistant_brand_consultation',
});

export const submitStrategyCall = createFormSubmitter({
  formType: FORM_TYPES.CHATBOT_STRATEGY,
  validate: validateStrategyCallForm,
  transform: transformStrategyCallData,
  defaultSourcePage: 'expansion_assistant_strategy',
});

export async function submitChatbotLead(formData, variant = 'brand', sourcePage, options = {}) {
  if (variant === 'investor') {
    return submitInvestorChatbot(formData, sourcePage || 'chatbot', options);
  }
  return submitBrandChatbot(formData, sourcePage || 'chatbot', options);
}
