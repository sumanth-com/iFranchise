import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformNewsletterData(formData, sourcePage = 'blog_sidebar') {
  return {
    form_type: FORM_TYPES.NEWSLETTER,
    sheet_tab: SHEET_TABS[FORM_TYPES.NEWSLETTER],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      email: formData.email,
    },
  };
}
