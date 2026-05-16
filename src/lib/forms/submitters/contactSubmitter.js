import { validateContactForm } from '../validators/contactValidator.js';
import { transformContactData } from '../transformers/contactTransformer.js';
import { submitToGoogleSheets } from '../utils/googleSheetsClient.js';
import { checkRateLimit, recordSubmission } from '../../rateLimiter.js';
import { RATE_LIMIT_KEYS } from '../../rateLimiter.js';

export async function submitContactForm(formData, sourcePage = 'contact_page') {
  const rateLimitCheck = checkRateLimit(RATE_LIMIT_KEYS.CONTACT);
  if (!rateLimitCheck.allowed) {
    return { success: false, error: 'Please wait before submitting again.' };
  }

  const validation = validateContactForm(formData);
  if (!validation.success) {
    return { success: false, error: 'Please fix the errors in the form.', errors: validation.errors };
  }

  const payload = transformContactData(validation.data, sourcePage);
  const result = await submitToGoogleSheets(payload);

  if (result.success) {
    recordSubmission(RATE_LIMIT_KEYS.CONTACT);
  }

  return result;
}
