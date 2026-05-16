/** Validation logic for franchise inquiry forms. */

import { sanitizeObjectStrings } from '../../sanitize.js';

/**
 * Validate franchise inquiry form data
 * 
 * @param {object} formData - Raw form data
 * @param {string} formData.firstName - First name
 * @param {string} formData.lastName - Last name
 * @param {string} formData.phone - Phone number
 * @param {string} formData.email - Email address
 * @param {string} formData.investmentRange - Investment range
 * @param {string} formData.state - State
 * @param {string} formData.city - City
 * @param {string} formData.website - Website (optional)
 * @param {string} formData.message - Message (optional)
 * @param {string} formData.franchiseName - Franchise name (optional)
 * 
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateInquiryForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  // First name validation
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 100) {
    errors.firstName = 'First name must be under 100 characters';
  } else {
    data.firstName = data.firstName.trim();
  }

  // Last name validation
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 100) {
    errors.lastName = 'Last name must be under 100 characters';
  } else {
    data.lastName = data.lastName.trim();
  }

  // Phone validation
  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = 'Phone number is too short';
  } else if (data.phone.trim().length > 20) {
    errors.phone = 'Phone number is too long';
  } else if (!/^[\+]?[0-9\s\-\(\)]{7,20}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  } else {
    data.phone = data.phone.trim();
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  } else if (data.email.trim().length > 254) {
    errors.email = 'Email address is too long';
  } else {
    data.email = data.email.trim().toLowerCase();
  }

  // Investment range validation
  const validInvestmentRanges = [
    'under-25l', '25l-50l', '50l-1cr', '1cr-5cr', '5cr+',
    'Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr–₹5Cr', '₹5Cr+',
    '₹1Cr+', 'Under Rs.25L', 'Rs.25L - Rs.50L', 'Rs.50L - Rs.1Cr', 'Rs.1Cr - Rs.5Cr', 'Rs.5Cr+'
  ];
  if (!data.investmentRange || !validInvestmentRanges.includes(data.investmentRange)) {
    errors.investmentRange = 'Please select an investment range';
  }

  // State validation
  if (!data.state || data.state.trim().length < 2) {
    errors.state = 'State is required';
  } else if (data.state.trim().length > 100) {
    errors.state = 'State name is too long';
  } else {
    data.state = data.state.trim();
  }

  // City validation
  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  } else if (data.city.trim().length > 100) {
    errors.city = 'City name is too long';
  } else {
    data.city = data.city.trim();
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

  // Message validation (optional)
  if (data.message && data.message.trim()) {
    if (data.message.trim().length > 2000) {
      errors.message = 'Message must be under 2000 characters';
    } else {
      data.message = data.message.trim();
    }
  } else {
    data.message = '';
  }

  // Franchise name (optional, injected by component)
  if (data.franchiseName && data.franchiseName.trim()) {
    if (data.franchiseName.trim().length > 200) {
      errors.franchiseName = 'Franchise name is too long';
    } else {
      data.franchiseName = data.franchiseName.trim();
    }
  } else {
    data.franchiseName = '';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
