import { sanitizeEmail } from '../../sanitize.js';
import { isValidEmail } from '../utils/fieldValidators.js';

export function validateNewsletterForm(formData) {
  const errors = {};
  const email = sanitizeEmail(formData?.email);

  if (!email || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: { email } };
}
