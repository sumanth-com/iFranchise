import { useCallback, useState } from 'react';
import { HONEYPOT_FIELD } from '@/lib/forms';

const DEFAULT_MESSAGES = {
  title: 'Thank you!',
  description: 'Your submission was received successfully. Our team will get back to you shortly.',
  resetLabel: 'Submit Another Response',
};

/**
 * Shared form submission state: loading, success, error, reset.
 * @param {object} options
 * @param {Record<string, unknown>} options.initialValues
 * @param {(values: Record<string, unknown>) => Promise<{ success: boolean, error?: string, errors?: object }>} options.onSubmit
 * @param {string} [options.successTitle]
 * @param {string} [options.successDescription]
 */
export function useFormSubmission({
  initialValues,
  onSubmit,
  successTitle = DEFAULT_MESSAGES.title,
  successDescription = DEFAULT_MESSAGES.description,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setIsSuccess(false);
    setSubmitError('');
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      if (isSubmitting || isSuccess) return;

      setIsSubmitting(true);
      setSubmitError('');

      let result;
      try {
        result = await onSubmit(values);
      } catch {
        setIsSubmitting(false);
        setSubmitError('Something went wrong. Please try again.');
        return;
      }

      setIsSubmitting(false);

      if (!result?.success) {
        const fieldErrors = result?.errors;
        if (fieldErrors && typeof fieldErrors === 'object') {
          const first = Object.values(fieldErrors)[0];
          setSubmitError(typeof first === 'string' ? first : result.error || 'Please check the form and try again.');
        } else {
          setSubmitError(result?.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setIsSuccess(true);
    },
    [isSubmitting, isSuccess, onSubmit, values],
  );

  return {
    values,
    setValues,
    setField,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
    successTitle,
    successDescription,
  };
}

export function withHoneypot(initialValues) {
  return { ...initialValues, [HONEYPOT_FIELD]: '' };
}
