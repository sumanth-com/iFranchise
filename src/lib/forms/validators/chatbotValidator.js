import { sanitizeObjectStrings } from '../../sanitize.js';
import { isValidPhone, isNonEmptyString } from '../utils/fieldValidators.js';

function resolveCities(data) {
  if (data.cities === 'Other') {
    return data.citiesOther?.trim() || '';
  }
  return data.cities || '';
}

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

export function validateBrandConsultationForm(formData) {
  const brandResult = validateBrandChatbotForm(formData);
  if (!brandResult.success) return brandResult;

  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date';
  }

  if (!data.preferredTime) {
    errors.preferredTime = 'Please select a preferred time';
  }

  if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: { ...brandResult.data, ...data } };
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

  const cities = resolveCities(data);
  if (!cities) {
    errors.cities = data.cities === 'Other' ? 'Please enter your city' : 'Please select target cities';
  } else {
    data.citiesResolved = cities;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

export function validateStrategyCallForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  if (!isNonEmptyString(data.name, 2)) {
    errors.name = 'Name is required';
  } else {
    data.name = data.name.trim();
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  } else {
    data.phone = data.phone.trim();
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date';
  }

  if (!data.preferredTime) {
    errors.preferredTime = 'Please select a preferred time';
  }

  if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
