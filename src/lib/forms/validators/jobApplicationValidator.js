/** Validation logic for job application forms. */

import { sanitizeObjectStrings } from '../../sanitize.js';
import { validatePhoneField } from '../utils/fieldValidators.js';

/**
 * Validate job application form data
 * 
 * @param {object} formData - Raw form data
 * @param {string} formData.name - Applicant name
 * @param {string} formData.email - Email address
 * @param {string} formData.phone - Phone number
 * @param {string} formData.portfolio - Portfolio URL (optional)
 * @param {string} formData.resume - Resume URL (Google Drive)
 * @param {string} formData.linkedin - LinkedIn URL (optional)
 * @param {string} formData.interest - Interest statement
 * @param {string} formData.roleId - Role ID (optional, injected)
 * @param {string} formData.roleTitle - Role title (optional, injected)
 * 
 * @returns {{ success: boolean, errors?: object, data?: object }}
 */
export function validateJobApplicationForm(formData) {
  const errors = {};
  const data = sanitizeObjectStrings({ ...formData });

  // Name validation
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

  const phoneResult = validatePhoneField(data.phone);
  if (!phoneResult.ok) errors.phone = phoneResult.error;
  else data.phone = phoneResult.value;

  // Portfolio validation (optional)
  if (data.portfolio && data.portfolio.trim()) {
    if (!data.portfolio.trim().startsWith('http://') && !data.portfolio.trim().startsWith('https://')) {
      errors.portfolio = 'Please enter a valid URL (include https://)';
    } else if (data.portfolio.trim().length > 500) {
      errors.portfolio = 'URL is too long';
    } else {
      data.portfolio = data.portfolio.trim();
    }
  } else {
    data.portfolio = '';
  }

  // Resume validation (required, must be Google Drive)
  if (!data.resume || !data.resume.trim()) {
    errors.resume = 'Resume URL is required';
  } else if (!data.resume.trim().startsWith('http')) {
    errors.resume = 'Please enter a valid URL';
  } else if (!data.resume.includes('drive.google.com') && !data.resume.includes('docs.google.com')) {
    errors.resume = 'Please use a Google Drive link for your resume';
  } else if (data.resume.trim().length > 500) {
    errors.resume = 'URL is too long';
  } else {
    data.resume = data.resume.trim();
  }

  // LinkedIn validation (optional)
  if (data.linkedin && data.linkedin.trim()) {
    if (!data.linkedin.trim().startsWith('http://') && !data.linkedin.trim().startsWith('https://')) {
      errors.linkedin = 'Please enter a valid URL (include https://)';
    } else if (data.linkedin.trim().length > 500) {
      errors.linkedin = 'URL is too long';
    } else {
      data.linkedin = data.linkedin.trim();
    }
  } else {
    data.linkedin = '';
  }

  // Interest statement validation
  if (!data.interest || data.interest.trim().length < 20) {
    errors.interest = 'Please write at least 20 characters about your interest';
  } else if (data.interest.trim().length > 2000) {
    errors.interest = 'Response must be under 2000 characters';
  } else {
    data.interest = data.interest.trim();
  }

  // Role ID (optional, injected by component)
  if (data.roleId && data.roleId.trim()) {
    data.roleId = data.roleId.trim();
  } else {
    data.roleId = '';
  }

  // Role title (optional, injected by component)
  if (data.roleTitle && data.roleTitle.trim()) {
    if (data.roleTitle.trim().length > 200) {
      errors.roleTitle = 'Role title is too long';
    } else {
      data.roleTitle = data.roleTitle.trim();
    }
  } else {
    data.roleTitle = '';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
