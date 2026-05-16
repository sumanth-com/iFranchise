/**
 * jobApplicationTransformer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Transform job application form data into standardized Google Sheets payload format.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Transform job application data for Google Sheets submission
 * 
 * @param {object} formData - Validated form data
 * @param {string} sourcePage - Page where form was submitted
 * 
 * @returns {object} Standardized payload for Google Sheets
 */
export function transformJobApplicationData(formData, sourcePage = 'career_detail') {
  return {
    form_type: 'job_application',
    sheet_tab: 'Job_Applications',
    submitted_at: new Date().toISOString(),
    source_page: sourcePage,
    data: {
      role_id: formData.roleId || null,
      role_title: formData.roleTitle || null,
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      portfolio_url: formData.portfolio || null,
      resume_url: formData.resume,
      linkedin_url: formData.linkedin || null,
      interest_statement: formData.interest,
    }
  };
}
