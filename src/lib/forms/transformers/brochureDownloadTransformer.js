import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';
import { spreadPhoneFields } from '../utils/phoneSubmission.js';

export function transformBrochureDownloadData(formData, sourcePage = 'franchise_details_brochure') {
  return {
    form_type: FORM_TYPES.BROCHURE_DOWNLOAD,
    sheet_tab: SHEET_TABS[FORM_TYPES.BROCHURE_DOWNLOAD],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      ...spreadPhoneFields(formData),
      franchise_id: formData.franchiseId,
      franchise_name: formData.franchiseName,
      message: `Brochure download: ${formData.franchiseName} (ID ${formData.franchiseId})`,
    },
  };
}
