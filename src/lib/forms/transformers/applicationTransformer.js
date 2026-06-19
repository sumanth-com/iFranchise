import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';
import { spreadPhoneFields } from '../utils/phoneSubmission.js';

function buildDescription(formData) {
  const lines = [];
  if (formData.model) lines.push(`Franchise model: ${formData.model}`);
  if (formData.timeline) lines.push(`Timeline: ${formData.timeline}`);
  if (formData.budget) lines.push(`Budget: ${formData.budget}`);
  if (formData.hasSOPs) lines.push(`SOPs: ${formData.hasSOPs}`);
  if (formData.hasDocs) lines.push(`Documentation: ${formData.hasDocs}`);
  if (formData.founded) lines.push(`Founded: ${formData.founded}`);
  if (formData.vision) lines.push(`Vision: ${formData.vision}`);
  if (formData.company && formData.company !== formData.brandName) {
    lines.push(`Company: ${formData.company}`);
  }
  return lines.join('\n');
}

function buildLocations(formData) {
  const parts = [];
  if (formData.state || formData.city) {
    parts.push(`Location: ${[formData.city, formData.state].filter(Boolean).join(', ')}`);
  }
  if (formData.outlets) parts.push(`Outlets: ${formData.outlets}`);
  if (formData.cityGoal) parts.push(`Expansion goal: ${formData.cityGoal}`);
  return parts.join(' | ') || '';
}

export function transformApplicationData(formData, sourcePage = 'brand_owners_page') {
  return {
    form_type: FORM_TYPES.BRAND_APPLICATION,
    sheet_tab: SHEET_TABS[FORM_TYPES.BRAND_APPLICATION],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      brandName: formData.brandName,
      industry: formData.industry,
      locations: buildLocations(formData),
      state: formData.state || '',
      city: formData.city || '',
      contactName: formData.name,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      ...spreadPhoneFields(formData),
      description: buildDescription(formData),
    },
  };
}
