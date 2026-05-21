import { FORM_TYPES } from '../constants/formTypes.js';
import { validateContactForm } from '../validators/contactValidator.js';
import { transformContactData } from '../transformers/contactTransformer.js';
import { createFormSubmitter } from '../utils/createFormSubmitter.js';

export const submitContactForm = createFormSubmitter({
  formType: FORM_TYPES.CONTACT,
  validate: validateContactForm,
  transform: transformContactData,
  defaultSourcePage: 'contact_page',
});
