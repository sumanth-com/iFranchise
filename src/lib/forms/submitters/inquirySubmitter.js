import { validateInquiryForm } from '../validators/inquiryValidator.js';
import { transformInquiryData } from '../transformers/inquiryTransformer.js';
import { submitToGoogleSheets } from '../utils/googleSheetsClient.js';
import { checkRateLimit, recordSubmission } from '../../rateLimiter.js';

export async function submitFranchiseInquiry(formData, sourcePage = 'floating_cta') {
  const rateLimitCheck = checkRateLimit('franchise_inquiry');
  if (!rateLimitCheck.allowed) {
    return { success: false, error: 'Please wait before submitting again.' };
  }

  const validation = validateInquiryForm(formData);
  if (!validation.success) {
    return { success: false, error: 'Please fix the errors in the form.', errors: validation.errors };
  }

  const payload = transformInquiryData(validation.data, sourcePage);
  const result = await submitToGoogleSheets(payload);

  if (result.success) {
    recordSubmission('franchise_inquiry');
  }

  return result;
}
