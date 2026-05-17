import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

function buildExperience(formData) {
  const parts = [];
  if (formData.portfolio) parts.push(`Portfolio: ${formData.portfolio}`);
  if (formData.linkedin) parts.push(`LinkedIn: ${formData.linkedin}`);
  return parts.join(' | ');
}

export function transformJobApplicationData(formData, sourcePage = 'career_detail') {
  return {
    form_type: FORM_TYPES.JOB_APPLICATION,
    sheet_tab: SHEET_TABS[FORM_TYPES.JOB_APPLICATION],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      roleTitle: formData.roleTitle || formData.roleId || '',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      resumeUrl: formData.resume,
      coverLetter: formData.interest,
      experience: buildExperience(formData),
    },
  };
}
