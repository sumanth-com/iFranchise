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
    return { success: true, data: { message: 'Form submitted successfully' } };
  }

  if (body.success === false) {
    return {
      success: false,
      error: body.error || body.message || 'Submission failed. Please try again.',
      code: 'SERVER_ERROR',
    };
  }

  return {
    success: true,
    data: body.data || body,
  };
}
