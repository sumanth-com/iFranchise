import { FORM_TYPES } from './constants/formTypes.js';

export const PRIVACY_NOTICE_VERSION = 'dpdp-technical-draft-2026-08-13';
export const PRIVACY_CONSENT_FIELD = 'privacyConsent';

export const PROCESSING_PURPOSES = Object.freeze({
  [FORM_TYPES.CONTACT]: 'respond_to_contact_or_advisory_enquiry',
  [FORM_TYPES.BRAND_APPLICATION]: 'evaluate_brand_application_and_respond',
  [FORM_TYPES.BROCHURE_DOWNLOAD]: 'provide_requested_brochure_and_respond_to_franchise_interest',
  [FORM_TYPES.FRANCHISE_INQUIRY]: 'respond_to_named_franchise_enquiry',
  [FORM_TYPES.CAREER_APPLICATION]: 'evaluate_career_application_and_respond',
  [FORM_TYPES.DATA_RIGHTS_REQUEST]: 'receive_and_verify_data_principal_request',
});

export function requiresProcessingConsent(formType) {
  return Object.prototype.hasOwnProperty.call(PROCESSING_PURPOSES, formType);
}

export function hasProcessingConsent(rawData) {
  return rawData?.[PRIVACY_CONSENT_FIELD] === true;
}

export function createProcessingConsentRecord(formType, sourcePage) {
  return {
    purpose: PROCESSING_PURPOSES[formType],
    status: 'granted',
    timestamp: new Date().toISOString(),
    notice_version: PRIVACY_NOTICE_VERSION,
    source: sourcePage,
  };
}
