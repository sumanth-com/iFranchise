/**
 * inquiryTransformer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Transform franchise inquiry form data into standardized Google Sheets payload format.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Transform franchise inquiry data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformInquiryData(formData, sourcePage = 'floating_cta') {
  return {
    form_type: 'franchise_inquiry',
    sheet_tab: 'Franchise_Inquiries',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      investment_range: formData.investmentRange,
      state: formData.state,
      city: formData.city,
      website: formData.website || '',
      message: formData.message || '',
      franchise_name: formData.franchiseName || '',
    }
  };
}
