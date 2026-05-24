import { digitsOnlyPhone, isValidPhone10 } from '../../phoneInput.js';
import { isValidContactEmail } from '../../contactForm.js';
import { sanitizeObjectStrings } from '../../sanitize.js';
import { validateRequiredString } from '../utils/fieldValidators.js';

export function validateBrochureDownloadForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const nameResult = validateRequiredString(data.fullName, 'Name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  if (!isValidPhone10(data.contactNumber)) {
    errors.contactNumber = 'Please enter a valid 10-digit phone number';
  } else {
    data.contactNumber = digitsOnlyPhone(data.contactNumber);
  }

  if (!isValidContactEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  if (!data.franchiseId?.trim()) {
    errors.franchiseId = 'Franchise is required';
  }

  if (!data.franchiseName?.trim()) {
    errors.franchiseName = 'Franchise name is required';
  } else {
    data.franchiseName = data.franchiseName.trim();
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
