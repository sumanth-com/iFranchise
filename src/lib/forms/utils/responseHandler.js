/** Normalize API and validation responses for form submitters. */

export function createValidationErrorResponse(errors, message = 'Please fix the errors in the form.') {
  return {
    success: false,
    error: message,
    errors: errors || {},
    code: 'VALIDATION_ERROR',
  };
}

export function createConfigErrorResponse(message = 'Server configuration error. Please contact support.') {
  return {
    success: false,
    error: message,
    code: 'CONFIG_ERROR',
  };
}

export function parseSubmissionResponse(body) {
  if (!body || typeof body !== 'object') {
    return {
      success: false,
      error: 'The form service returned an invalid response. Please try again.',
      code: 'INVALID_RESPONSE',
    };
  }

  if (body.success !== true) {
    return {
      success: false,
      error: body.error || body.message || 'Submission failed. Please try again.',
      code: body.code || 'SERVER_ERROR',
    };
  }

  return {
    success: true,
    data: body.data || body,
  };
}
