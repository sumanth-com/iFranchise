import { sanitizeObjectStrings } from '../../sanitize.js';
import { isValidPhone, isNonEmptyString } from '../utils/fieldValidators.js';

export function validateBrandChatbotForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  if (!isNonEmptyString(data.brandName, 2)) {
    errors.brandName = 'Brand name is required';
  } else {
    data.brandName = data.brandName.trim();
  }

  if (!isNonEmptyString(data.contactName, 2)) {
    errors.contactName = 'Contact name is required';
  } else {
    data.contactName = data.contactName.trim();
  }

  if (!isValidPhone(data.contactPhone)) {
    errors.contactPhone = 'Please enter a valid phone number';
  } else {
    data.contactPhone = data.contactPhone.trim();
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

export function validateInvestorChatbotForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  const industries = Array.isArray(data.industries)
    ? data.industries
    : data.industries
      ? [data.industries]
      : [];

  if (industries.length === 0) {
    errors.industries = 'Please select at least one industry';
  } else {
    data.industries = industries;
  }

  if (!data.budget) {
    errors.budget = 'Please select an investment budget';
  }

  if (!data.cities) {
    errors.cities = 'Please select target cities';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
