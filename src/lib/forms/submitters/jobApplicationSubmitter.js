import { validateJobApplicationForm } from '../validators/jobApplicationValidator.js';
import { transformJobApplicationData } from '../transformers/jobApplicationTransformer.js';
import { submitToGoogleSheets } from '../utils/googleSheetsClient.js';
import { checkRateLimit, recordSubmission } from '../../rateLimiter.js';

export async function submitJobApplication(formData, sourcePage = 'career_detail') {
  const rateLimitCheck = checkRateLimit('job_application');
  if (!rateLimitCheck.allowed) {
    return { success: false, error: 'Please wait before submitting again.' };
  }

  const validation = validateJobApplicationForm(formData);
  if (!validation.success) {
    return { success: false, error: 'Please fix the errors in the form.', errors: validation.errors };
  }

  const payload = transformJobApplicationData(validation.data, sourcePage);
  const result = await submitToGoogleSheets(payload);

  if (result.success) {
    recordSubmission('job_application');
  }

  return result;
}
