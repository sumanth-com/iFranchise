/**
 * contactValidator.js - Validation logic for contact forms.
 */

import { digitsOnlyPhone, isValidContactEmail, isValidContactPhone10 } from '../../contactForm.js';
import { sanitizeObjectStrings } from '../../sanitize.js';
import { validateRequiredString } from '../utils/fieldValidators.js';

/**
 * Validate contact form data
 * 
 * @param {object} formData - Raw form data
 * @param {string} formData.fullName - Contact's full name
 * @param {string} formData.contactNumber - Contact's phone number
 * @param {string} formData.email - Contact's email address
 * @param {string} formData.website - Contact's website (optional)
 * @param {string} formData.company - Contact's company name (optional)
 * @param {string} formData.message - Contact's message
 * 
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateContactForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const nameResult = validateRequiredString(data.fullName, 'Name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  if (!isValidContactPhone10(data.contactNumber)) {
    errors.contactNumber = 'Please enter a valid 10-digit phone number';
  } else {
    data.contactNumber = digitsOnlyPhone(data.contactNumber);
  }

  if (!isValidContactEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  // Website validation (optional)
  if (data.website && data.website.trim()) {
    if (!data.website.trim().startsWith('http://') && !data.website.trim().startsWith('https://')) {
      errors.website = 'Please enter a valid URL (include https://)';
    } else if (data.website.trim().length > 500) {
      errors.website = 'URL is too long';
    } else {
      data.website = data.website.trim();
    }
  } else {
    data.website = '';
  }

  // Company validation (optional)
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
