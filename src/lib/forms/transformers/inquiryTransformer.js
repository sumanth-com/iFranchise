import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformInquiryData(formData, sourcePage = 'floating_cta') {
  const name = `${formData.firstName} ${formData.lastName}`.trim();
  const locationParts = [formData.city, formData.state].filter(Boolean);
  const messageParts = [
    formData.message,
    formData.website ? `Website: ${formData.website}` : '',
    formData.franchiseName ? `Franchise: ${formData.franchiseName}` : '',
    locationParts.length ? `Location: ${locationParts.join(', ')}` : '',
  ].filter(Boolean);

  return {
    form_type: FORM_TYPES.FRANCHISE_INQUIRY,
    sheet_tab: SHEET_TABS[FORM_TYPES.FRANCHISE_INQUIRY],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      name,
      email: formData.email,
      phone: formData.phone,
      franchiseInterest: formData.franchiseName || locationParts.join(', ') || '',
      investmentBudget: formData.investmentRange,
      timeline: formData.timeline || '',
      message: messageParts.join('\n'),
    },
  };
}
