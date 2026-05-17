import { FORM_TYPES } from '../constants/formTypes.js';
import { validateContactForm } from '../validators/contactValidator.js';
import { transformContactData } from '../transformers/contactTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitContactForm(formData, sourcePage = 'contact_page') {
  return runFormSubmission({
    formType: FORM_TYPES.CONTACT,
    rawData: formData,
    sourcePage,
    validate: validateContactForm,
    transform: transformContactData,
  });
}
