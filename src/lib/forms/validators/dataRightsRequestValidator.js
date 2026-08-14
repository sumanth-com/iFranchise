import { sanitizeObjectStrings } from '../../sanitize.js';
import { validateRequiredString } from '../utils/fieldValidators.js';

export const DATA_RIGHTS_REQUEST_TYPES = Object.freeze([
  'access_information',
  'correction',
  'erasure',
  'consent_withdrawal',
  'grievance',
]);

export function validateDataRightsRequestForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const nameResult = validateRequiredString(data.fullName, 'Full name', { min: 2, max: 100 });
  if (!nameResult.ok) errors.fullName = nameResult.error;
  else data.fullName = nameResult.value;

  const email = String(data.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.email = 'Please enter a valid email address';
  } else {
    data.email = email;
  }

  if (!DATA_RIGHTS_REQUEST_TYPES.includes(data.requestType)) {
    errors.requestType = 'Please select a request type';
  }

  const detailsResult = validateRequiredString(data.details, 'Request details', {
    min: 10,
    max: 2000,
  });
  if (!detailsResult.ok) errors.details = detailsResult.error;
  else data.details = detailsResult.value;

  if (data.verificationAcknowledgment !== true) {
    errors.verificationAcknowledgment = 'Please acknowledge the identity-verification step';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
