import { FORM_TYPES } from '../constants/formTypes.js';
import { validateInquiryForm } from '../validators/inquiryValidator.js';
import { transformInquiryData } from '../transformers/inquiryTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitFranchiseInquiry(formData, sourcePage = 'floating_cta') {
  return runFormSubmission({
    formType: FORM_TYPES.FRANCHISE_INQUIRY,
    rawData: formData,
    sourcePage,
    validate: validateInquiryForm,
    transform: transformInquiryData,
  });
}
