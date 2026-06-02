/**
 * Normalize lead fields from any form payload shape (server-side).
 */

const NAME_KEYS = ['name', 'fullName', 'full_name', 'contactName', 'contact_name'];
const PHONE_KEYS = ['phone', 'contactNumber', 'contact_number', 'contactPhone', 'contact_phone'];
const EMAIL_KEYS = ['email', 'contactEmail', 'contact_email'];
const COMPANY_KEYS = ['company', 'brandName', 'brand_name'];
const MESSAGE_KEYS = [
  'message',
  'description',
  'inquiry',
  'details',
  'notes',
  'consultation_notes',
  'consultationNotes',
  'comments',
  'question',
];

const STANDARD_KEYS = new Set([
  ...NAME_KEYS,
  ...PHONE_KEYS,
  ...EMAIL_KEYS,
  ...COMPANY_KEYS,
  ...MESSAGE_KEYS,
]);

function firstNonEmpty(data, keys) {
  if (!data || typeof data !== 'object') return '';
  for (const key of keys) {
    const value = data[key];
    if (value != null && String(value).trim()) return String(value).trim();
  }
  return '';
}

function formatFieldLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function collectAdditionalFields(data) {
  if (!data || typeof data !== 'object') return {};
  const extra = {};
  for (const [key, value] of Object.entries(data)) {
    if (STANDARD_KEYS.has(key)) continue;
    if (value == null || value === '') continue;
    if (typeof value === 'object') {
      extra[formatFieldLabel(key)] = JSON.stringify(value, null, 2);
    } else {
      extra[formatFieldLabel(key)] = String(value).trim();
    }
  }
  return extra;
}

const FORM_TYPE_LABELS = {
  contact: 'Contact Form',
  brand_application: 'List Your Brand Form',
  chatbot_brand: 'Chatbot Lead — Brand',
  chatbot_investor: 'Investor Inquiry Form',
  chatbot_strategy: 'Chatbot Lead — Strategy Call',
  brochure_download: 'Brochure Download',
  franchise_inquiry: 'Franchise Interest Inquiry Form',
};

export function getFormTypeLabel(formType) {
  return FORM_TYPE_LABELS[formType] || formatFieldLabel(formType || 'Form');
}

/**
 * @param {object} payload - Sanitized outbound form payload
 */
export function extractLeadFields(payload) {
  const data = payload?.data || {};
  const metadata = payload?.metadata || {};
  const name = firstNonEmpty(data, NAME_KEYS);
  const phone = firstNonEmpty(data, PHONE_KEYS);
  const email = firstNonEmpty(data, EMAIL_KEYS.concat(['consultation_email', 'consultationEmail']));
  const company = firstNonEmpty(data, COMPANY_KEYS);
  let message = firstNonEmpty(data, MESSAGE_KEYS);
  if (!message) {
    const fallbackParts = [
      data.timeline,
      data.budget,
      data.investment,
      data.industries,
      data.preferred_date,
      data.preferred_time,
      data.description,
      data.consultation_notes,
      data.consultationNotes,
    ]
      .filter((v) => v != null && String(v).trim())
      .map((v) => String(v).trim());
    message = fallbackParts.join('\n');
  }
  const formType = payload?.form_type || '';
  const formTypeLabel = getFormTypeLabel(formType);
  const submittedAt = payload?.submitted_at || new Date().toISOString();
  const sourcePage =
    payload?.source_page ||
    metadata?.source_page ||
    metadata?.path ||
    'unknown';

  return {
    formType,
    formTypeLabel,
    submittedAt,
    name: name || 'Unknown',
    phone,
    email,
    company,
    message,
    sourcePage,
    pageUrl: metadata?.page_url || '',
    referrer: metadata?.referrer || '',
    additionalFields: collectAdditionalFields(data),
  };
}
