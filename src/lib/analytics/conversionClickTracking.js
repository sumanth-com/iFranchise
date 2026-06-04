/**
 * Delegated click tracking for WhatsApp, phone, and career apply (mailto).
 * GTM-only via trackEvent — does not affect link behavior.
 */
import { SITE_CONTACT_PHONE, SITE_CONTACT_WHATSAPP_URL } from '../../data/siteContact.js';

/** Must match CAREERS_APPLY_EMAIL in careersData.jsx */
const CAREERS_APPLY_EMAIL = 'hr@ifranchise.in';
import {
  CONVERSION_CLICK_EVENTS,
  trackConversionClick,
} from './conversionEvents.js';

let initialized = false;

function normalizeHref(href) {
  return (href || '').trim().toLowerCase();
}

function isSiteWhatsAppLink(href) {
  const h = normalizeHref(href);
  if (!h) return false;
  if (h === normalizeHref(SITE_CONTACT_WHATSAPP_URL)) return true;
  return h.includes(`wa.me/91${SITE_CONTACT_PHONE}`);
}

function isSitePhoneLink(href) {
  const h = normalizeHref(href);
  if (!h.startsWith('tel:')) return false;
  const digits = h.replace(/\D/g, '');
  return digits.endsWith(SITE_CONTACT_PHONE) || digits.includes(`91${SITE_CONTACT_PHONE}`);
}

function isCareerApplyLink(href) {
  const h = normalizeHref(href);
  if (!h.startsWith('mailto:')) return false;
  const email = h.slice('mailto:'.length).split('?')[0];
  return email === CAREERS_APPLY_EMAIL.toLowerCase();
}

function careerRoleIdFromPath() {
  if (typeof window === 'undefined') return undefined;
  const match = window.location.pathname.match(/^\/careers\/([^/]+)\/?$/);
  return match?.[1];
}

function sourcePageFromLocation() {
  if (typeof window === 'undefined') return 'unknown';
  return window.location.pathname || '/';
}

function onDocumentClick(event) {
  const anchor = event.target?.closest?.('a[href]');
  if (!anchor) return;

  const href = anchor.getAttribute('href') || '';
  const sourcePage = sourcePageFromLocation();

  if (isSiteWhatsAppLink(href)) {
    trackConversionClick(CONVERSION_CLICK_EVENTS.WHATSAPP, sourcePage, {
      link_location: anchor.className?.split?.(' ')?.[0] || undefined,
    });
    return;
  }

  if (isSitePhoneLink(href)) {
    trackConversionClick(CONVERSION_CLICK_EVENTS.PHONE, sourcePage, {
      link_location: anchor.className?.split?.(' ')?.[0] || undefined,
    });
    return;
  }

  if (isCareerApplyLink(href)) {
    trackConversionClick(CONVERSION_CLICK_EVENTS.CAREER_APPLY, sourcePage, {
      form_type: 'career_apply',
      role_id: careerRoleIdFromPath(),
    });
  }
}

/** Idempotent — attach one capture listener for outbound contact/career links. */
export function initConversionClickTracking() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  document.addEventListener('click', onDocumentClick, true);
}
