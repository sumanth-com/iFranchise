import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';
import { spreadPhoneFields } from '../utils/phoneSubmission.js';

export function transformCareerApplicationData(formData, sourcePage = 'careers_role_detail') {
  return {
    form_type: FORM_TYPES.CAREER_APPLICATION,
    sheet_tab: SHEET_TABS[FORM_TYPES.CAREER_APPLICATION],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      role_id: formData.roleId,
      role_title: formData.roleTitle,
      name: formData.fullName,
      email: formData.email,
      phone: formData.contactNumber,
      ...spreadPhoneFields(formData),
      resume_link: formData.resumeLink,
      portfolio_link: formData.portfolioLink || '',
      state: formData.state || '',
      city: formData.city || '',
      message: formData.message,
    },
  };
}
