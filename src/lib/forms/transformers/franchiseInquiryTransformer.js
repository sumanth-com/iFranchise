import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformFranchiseInquiryData(formData, sourcePage = 'franchise_details_inquiry') {
  const lines = [
    `Franchise interest: ${formData.franchiseType}`,
    `Brand: ${formData.franchiseName} (ID ${formData.franchiseId})`,
  ];
  if (formData.city) lines.push(`Preferred city: ${formData.city}`);
  if (formData.message) lines.push(`Notes: ${formData.message}`);

  return {
    form_type: FORM_TYPES.CONTACT,
    sheet_tab: SHEET_TABS[FORM_TYPES.CONTACT],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      company: formData.franchiseName,
      message: lines.join('\n'),
    },
  };
}
