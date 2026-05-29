import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformFranchiseInquiryData(formData, sourcePage = 'franchise_details_inquiry') {
  return {
    form_type: FORM_TYPES.FRANCHISE_INQUIRY,
    sheet_tab: SHEET_TABS[FORM_TYPES.FRANCHISE_INQUIRY],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      franchise_id: formData.franchiseId,
      franchise_name: formData.franchiseName,
      franchise_type: formData.franchiseType,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      city: formData.city || '',
      message: formData.message || '',
    },
  };
}
