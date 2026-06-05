import { sanitizeObjectStrings } from '../../sanitize.js';
import { validatePhoneFieldOnData, validateRequiredString } from '../utils/fieldValidators.js';

export function validateFranchiseInquiryForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  if (!data.franchiseType?.trim()) {
    errors.franchiseType = 'Please select a franchise type';
  } else {
    data.franchiseType = data.franchiseType.trim();
  }

  const nameResult = validateRequiredString(data.fullName, 'Full name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  validatePhoneFieldOnData(data, errors, 'contactNumber');

  if (data.city && data.city.trim().length > 100) {
    errors.city = 'City name is too long';
  } else {
    data.city = data.city?.trim() || '';
  }

  if (data.message && data.message.trim().length > 2000) {
    errors.message = 'Message must be under 2000 characters';
  } else {
    data.message = data.message?.trim() || '';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
