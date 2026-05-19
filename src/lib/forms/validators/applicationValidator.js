/** Validation logic for brand application forms. */

import { sanitizeObjectStrings } from '../../sanitize.js';

/**
 * Validate brand application form data
 * 
 * @param {object} formData - Raw form data from multi-step form
 * @param {string} formData.brandName - Brand name
 * @param {string} formData.industry - Industry
 * @param {string} formData.founded - Year founded (optional)
 * @param {string} formData.outlets - Current outlets (optional)
 * @param {string} formData.model - Franchise model
 * @param {string} formData.hasSOPs - SOP status (optional)
 * @param {string} formData.hasDocs - Documentation status (optional)
 * @param {string} formData.cityGoal - Target city expansion
 * @param {string} formData.timeline - Expansion timeline
 * @param {string} formData.budget - Investment range (optional)
 * @param {string} formData.vision - Brand vision (optional)
 * @param {string} formData.name - Contact name
 * @param {string} formData.email - Contact email
 * @param {string} formData.phone - Contact phone
 * @param {string} formData.company - Company name (optional)
 * 
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateApplicationForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  // Brand name validation
  if (!data.brandName || data.brandName.trim().length < 2) {
    errors.brandName = 'Brand name is required';
  } else if (data.brandName.trim().length > 200) {
    errors.brandName = 'Brand name is too long';
  } else {
    data.brandName = data.brandName.trim();
  }

  // Industry validation
  const validIndustries = [
    'Food & Beverage', 'Health & Wellness', 'Education', 'Retail',
    'Technology', 'Home Services', 'Entertainment', 'Other',
  ];
  if (!data.industry || !validIndustries.includes(data.industry)) {
    errors.industry = 'Please select an industry';
  }

  // Year founded validation (optional)
  if (data.founded && data.founded.trim()) {
    if (!/^\d{4}$/.test(data.founded.trim())) {
      errors.founded = 'Enter a valid 4-digit year';
    } else {
      const year = parseInt(data.founded.trim(), 10);
      if (year < 1900 || year > new Date().getFullYear()) {
        errors.founded = 'Enter a valid year';
      } else {
        data.founded = data.founded.trim();
      }
    }
  } else {
    data.founded = '';
  }

  // Current outlets validation (optional - free text or numeric)
  if (data.outlets && data.outlets.trim()) {
    if (data.outlets.trim().length > 100) {
      errors.outlets = 'Locations value is too long';
    } else {
      data.outlets = data.outlets.trim();
    }
  } else {
    data.outlets = '';
  }

  // Franchise model validation (hero short codes + full labels)
  const validModels = [
    'FOFO',
    'FOCO',
    'FICO',
    'Not Sure Yet',
    'FOFO - Franchise Owned & Operated',
    'FOCO - Franchise Owned, Company Operated',
    'FICO - Franchise Invested, Company Operated',
  ];
  if (!data.model || !validModels.includes(data.model)) {
    errors.model = 'Please select a franchise model';
  }

  // SOP status (optional)
  if (data.hasSOPs) {
    data.hasSOPs = data.hasSOPs.trim();
  } else {
    data.hasSOPs = '';
  }

  // Documentation status (optional)
  if (data.hasDocs) {
    data.hasDocs = data.hasDocs.trim();
  } else {
    data.hasDocs = '';
  }

  // City goal validation
  const validCityGoals = [
    '1-3 cities',
    '4-10 cities',
    '10-25 cities',
    '25+ cities',
    '25+ cities (National)',
  ];
  if (!data.cityGoal || !validCityGoals.includes(data.cityGoal)) {
    errors.cityGoal = 'Please select a city expansion target';
  }

  // Timeline validation
  const validTimelines = [
    'Within 3 months', '3-6 months', '6-12 months', '12+ months'
  ];
  if (!data.timeline || !validTimelines.includes(data.timeline)) {
    errors.timeline = 'Please select an expansion timeline';
  }

  // Budget validation (optional)
  if (data.budget && data.budget.trim()) {
    data.budget = data.budget.trim();
  } else {
    data.budget = '';
  }

  // Vision validation (optional)
  if (data.vision && data.vision.trim()) {
    if (data.vision.trim().length > 1000) {
      errors.vision = 'Vision must be under 1000 characters';
    } else {
      data.vision = data.vision.trim();
    }
  } else {
    data.vision = '';
  }

  // Contact name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be under 100 characters';
  } else {
    data.name = data.name.trim();
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

  // Company validation (optional)
  if (data.company && data.company.trim()) {
    if (data.company.trim().length > 200) {
      errors.company = 'Company name is too long';
    } else {
      data.company = data.company.trim();
    }
  } else {
    data.company = '';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
