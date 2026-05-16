import { validateApplicationForm } from '../validators/applicationValidator.js';
import { transformApplicationData } from '../transformers/applicationTransformer.js';
import { submitToGoogleSheets } from '../utils/googleSheetsClient.js';
import { checkRateLimit, recordSubmission } from '../../rateLimiter.js';

export async function submitBrandApplication(formData, sourcePage = 'brand_owners_page') {
  const rateLimitCheck = checkRateLimit('brand_application');
  if (!rateLimitCheck.allowed) {
    return { success: false, error: 'Please wait before submitting again.' };
  }

  const validation = validateApplicationForm(formData);
  if (!validation.success) {
    return { success: false, error: 'Please fix the errors in the form.', errors: validation.errors };
  }

  const payload = transformApplicationData(validation.data, sourcePage);
  const result = await submitToGoogleSheets(payload);

  if (result.success) {
    recordSubmission('brand_application');
  }

  return result;
}
