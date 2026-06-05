/**
 * contactValidator.js - Validation logic for contact forms.
 */

import { isValidContactEmail } from '../../contactForm.js';
import { sanitizeObjectStrings } from '../../sanitize.js';
import { validatePhoneFieldOnData, validateRequiredString } from '../utils/fieldValidators.js';

/**
 * Validate contact form data
 *
 * @param {object} formData - Raw form data
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateContactForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const nameResult = validateRequiredString(data.fullName, 'Name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  validatePhoneFieldOnData(data, errors, 'contactNumber');

  if (!isValidContactEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  if (data.company) {
    if (data.company.trim().length > 200) {
      errors.company = 'Company name is too long';
    } else {
      data.company = data.company.trim();
    }
  } else {
    data.company = '';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please enter a message';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be under 2000 characters';
  } else {
    data.message = data.message.trim();
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
