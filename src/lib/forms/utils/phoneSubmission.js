/**
 * Spread normalized international phone metadata into outbound form payloads.
 * @param {object} formData
 */
export function spreadPhoneFields(formData) {
  return {
    phone_country: formData.phoneCountry || '',
    phone_dial_code: formData.phoneDialCode || '',
    phone_local: formData.phoneLocal || '',
  };
}

/**
 * Apply validated phone metadata onto form data during validation.
 * @param {object} data
 * @param {object} submission
 * @param {string} fieldName
 */
export function applyPhoneSubmission(data, submission, fieldName) {
  data[fieldName] = submission.phone;
  data.phoneCountry = submission.phoneCountry;
  data.phoneDialCode = submission.phoneDialCode;
  data.phoneLocal = submission.phoneLocal;
}
