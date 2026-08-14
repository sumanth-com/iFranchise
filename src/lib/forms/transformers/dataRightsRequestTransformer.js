import { FORM_TYPES } from '../constants/formTypes.js';
import { SHEET_TABS } from '../constants/formEndpoints.js';

export function transformDataRightsRequestData(
  formData,
  sourcePage = 'data_rights_request',
) {
  return {
    form_type: FORM_TYPES.DATA_RIGHTS_REQUEST,
    sheet_tab: SHEET_TABS[FORM_TYPES.DATA_RIGHTS_REQUEST],
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      request_type: formData.requestType,
      name: formData.fullName,
      email: formData.email,
      details: formData.details,
      verification_acknowledgment: formData.verificationAcknowledgment === true,
    },
  };
}
