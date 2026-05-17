import { FORM_TYPES } from '../constants/formTypes.js';
import { validateJobApplicationForm } from '../validators/jobApplicationValidator.js';
import { transformJobApplicationData } from '../transformers/jobApplicationTransformer.js';
import { runFormSubmission } from '../utils/submitPipeline.js';

export async function submitJobApplication(formData, sourcePage = 'career_detail') {
  return runFormSubmission({
    formType: FORM_TYPES.JOB_APPLICATION,
    rawData: formData,
    sourcePage,
    validate: validateJobApplicationForm,
    transform: transformJobApplicationData,
  });
}
