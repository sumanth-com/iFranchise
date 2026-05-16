/**
 * applicationTransformer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Transform brand application form data into standardized Google Sheets payload format.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Transform brand application data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformApplicationData(formData, sourcePage = 'brand_owners_page') {
  return {
    form_type: 'brand_application',
    sheet_tab: 'Brand_Applications',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      brand_name: formData.brandName,
      industry: formData.industry,
      year_founded: formData.founded ? parseInt(formData.founded, 10) : null,
      current_outlets: formData.outlets ? parseInt(formData.outlets, 10) : null,
      franchise_model: formData.model,
      has_sops: formData.hasSOPs || null,
      has_docs: formData.hasDocs || null,
      city_goal: formData.cityGoal,
      timeline: formData.timeline,
      budget: formData.budget || null,
      vision: formData.vision || null,
      contact_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || '',
    }
  };
}
