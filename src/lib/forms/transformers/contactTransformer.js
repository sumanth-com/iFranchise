/**
 * contactTransformer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Transform contact form data into standardized Google Sheets payload format.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Transform contact form data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformContactData(formData, sourcePage = 'contact_page') {
  return {
    form_type: 'contact',
    sheet_tab: 'Contact_Leads',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      email: formData.email,
      website: formData.website || '',
      company: formData.company || '',
      message: formData.message,
    }
  };
}
