import { FORM_TYPES } from '../constants/formTypes.js';
import { validateApplicationForm } from '../validators/applicationValidator.js';
import { transformApplicationData } from '../transformers/applicationTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitBrandApplication(formData, sourcePage = 'brand_owners_page') {
  return runFormSubmission({
    formType: FORM_TYPES.BRAND_APPLICATION,
    rawData: formData,
    sourcePage,
    validate: validateApplicationForm,
    transform: transformApplicationData,
  });
}
