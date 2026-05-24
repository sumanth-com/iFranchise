import { sanitizeObjectStrings } from '../../sanitize.js';
import { isNonEmptyString, validatePhoneField } from '../utils/fieldValidators.js';

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

  const brandPhone = validatePhoneField(data.contactPhone);
  if (!brandPhone.ok) errors.contactPhone = brandPhone.error;
  else data.contactPhone = brandPhone.value;

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

  if (!isNonEmptyString(data.contactName, 2)) {
    errors.contactName = 'Contact name is required';
  } else {
    data.contactName = data.contactName.trim();
  }

  const investorPhone = validatePhoneField(data.contactPhone);
  if (!investorPhone.ok) errors.contactPhone = investorPhone.error;
  else data.contactPhone = investorPhone.value;

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

  const strategyPhone = validatePhoneField(data.phone);
  if (!strategyPhone.ok) errors.phone = strategyPhone.error;
  else data.phone = strategyPhone.value;

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
