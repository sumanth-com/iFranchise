/**
 * GA4 conversion events — pushed to dataLayer via trackEvent (GTM-only).
 */
import { trackEvent } from './ga4.js';
import { FORM_TYPES } from '../forms/constants/formTypes.js';

/** formType → GA4 custom event name (successful sheet submit only). */
export const FORM_TYPE_CONVERSION_EVENTS = {
  [FORM_TYPES.CONTACT]: 'contact_form_submit',
  [FORM_TYPES.FRANCHISE_INQUIRY]: 'franchise_inquiry_submit',
  [FORM_TYPES.BRAND_APPLICATION]: 'list_brand_submit',
  [FORM_TYPES.BROCHURE_DOWNLOAD]: 'brochure_download',
};

export const CONVERSION_CLICK_EVENTS = {
  WHATSAPP: 'whatsapp_click',
  PHONE: 'phone_click',
  CAREER_APPLY: 'career_apply',
};

function getPageContext() {
  if (typeof window === 'undefined') {
    return { page_path: '', page_title: '' };
  }
  return {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title || 'iFranchise',
  };
}

/**
 * Fire a mapped form conversion after a successful Google Sheets submit.
 * @param {string} formType - FORM_TYPES value
 * @param {string} sourcePage - form source identifier (e.g. contact_page)
 * @param {Record<string, unknown>} [extra]
 */
export function trackFormConversion(formType, sourcePage, extra = {}) {
  const eventName = FORM_TYPE_CONVERSION_EVENTS[formType];
  if (!eventName) return;

  trackEvent(eventName, {
    ...getPageContext(),
    form_type: formType,
    source_page: sourcePage || 'unknown',
    ...extra,
  });
}

/**
 * @param {string} eventName
 * @param {string} sourcePage
 * @param {Record<string, unknown>} [extra]
 */
export function trackConversionClick(eventName, sourcePage, extra = {}) {
  trackEvent(eventName, {
    ...getPageContext(),
    source_page: sourcePage || 'unknown',
    ...extra,
  });
}
