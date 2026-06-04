import { digitsOnlyPhone } from '../../phoneInput.js';
import { isValidContactEmail } from '../../contactForm.js';
import { sanitizeObjectStrings } from '../../sanitize.js';
import { validateRequiredString } from '../utils/fieldValidators.js';

function isValidHttpsUrl(value) {
  try {
    const u = new URL(String(value).trim());
    return u.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidGoogleDriveUrl(value) {
  if (!isValidHttpsUrl(value)) return false;
  const host = new URL(String(value).trim()).hostname.toLowerCase();
  return host.includes('drive.google.com') || host.includes('docs.google.com');
}

/**
 * @param {object} formData
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateCareerApplicationForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const nameResult = validateRequiredString(data.fullName, 'Full name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  const phoneDigits = digitsOnlyPhone(data.contactNumber);
  if (!/^\d{10}$/.test(phoneDigits)) {
    errors.contactNumber = 'Please enter a valid 10-digit mobile number';
  } else {
    data.contactNumber = phoneDigits;
  }

  if (!isValidContactEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  if (!data.resumeLink?.trim()) {
    errors.resumeLink = 'Resume link is required';
  } else if (!isValidGoogleDriveUrl(data.resumeLink)) {
    errors.resumeLink = 'Enter a valid Google Drive link (https://drive.google.com/…)';
  } else {
    data.resumeLink = data.resumeLink.trim();
  }

  if (data.portfolioLink?.trim()) {
    if (!isValidHttpsUrl(data.portfolioLink)) {
      errors.portfolioLink = 'Enter a valid https link';
    } else {
      data.portfolioLink = data.portfolioLink.trim();
    }
  } else {
    data.portfolioLink = '';
  }

  if (!data.message?.trim()) {
    errors.message = 'Please enter a short message';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be under 2000 characters';
  } else {
    data.message = data.message.trim();
  }

  if (!data.roleId?.trim()) {
    errors.roleId = 'Role is required';
  } else {
    data.roleId = data.roleId.trim();
  }

  if (!data.roleTitle?.trim()) {
    errors.roleTitle = 'Role title is required';
  } else {
    data.roleTitle = data.roleTitle.trim();
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
