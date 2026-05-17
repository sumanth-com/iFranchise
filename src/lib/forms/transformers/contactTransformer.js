import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

function buildMessage(formData) {
  const parts = [];
  if (formData.website) parts.push(`Website: ${formData.website}`);
  parts.push(formData.message);
  return parts.join('\n\n');
}

export function transformContactData(formData, sourcePage = 'contact_page') {
  return {
    form_type: FORM_TYPES.CONTACT,
    sheet_tab: SHEET_TABS[FORM_TYPES.CONTACT],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      company: formData.company || '',
      message: buildMessage(formData),
    },
  };
}
