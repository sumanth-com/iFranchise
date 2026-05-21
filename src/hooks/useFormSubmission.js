import { useCallback, useEffect, useRef, useState } from 'react';
import { HONEYPOT_FIELD } from '@/lib/forms';
import { clearSubmissionGuard } from '@/lib/forms/utils/submissionGuard';
import { mapRequestError } from '@/lib/forms/utils/requestClient';

const DEFAULT_MESSAGES = {
  title: 'Thank you!',
  description: 'Your submission was received successfully. Our team will get back to you shortly.',
  resetLabel: 'Submit Another Response',
};

/**
 * Production form state: loading, success, error, reset, race-safe async.
 *
 * @param {object} options
 * @param {Record<string, unknown>} options.initialValues
 * @param {(values: Record<string, unknown>, ctx?: { signal?: AbortSignal }) => Promise<{ success: boolean, error?: string, errors?: object }>} options.onSubmit
 * @param {string} [options.formKey] - Guards concurrent duplicate submits for this form instance
 * @param {string} [options.successTitle]
 * @param {string} [options.successDescription]
 */
export function useFormSubmission({
  initialValues,
  onSubmit,
  formKey = 'form',
  successTitle = DEFAULT_MESSAGES.title,
  successDescription = DEFAULT_MESSAGES.description,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const mountedRef = useRef(true);
  const generationRef = useRef(0);
  const abortRef = useRef(null);
  const onSubmitRef = useRef(onSubmit);
  const initialRef = useRef(initialValues);

  onSubmitRef.current = onSubmit;
  initialRef.current = initialValues;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      clearSubmissionGuard(formKey);
    };
  }, [formKey]);

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    generationRef.current += 1;
    abortRef.current?.abort();
    clearSubmissionGuard(formKey);
    setValues(initialRef.current);
    setIsSuccess(false);
    setSubmitError('');
    setIsSubmitting(false);
  }, [formKey]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      if (isSubmitting || isSuccess) return;

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setSubmitError('You appear to be offline. Check your connection and try again.');
        return;
      }

      const gen = ++generationRef.current;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSubmitting(true);
      setSubmitError('');

      try {
        const result = await onSubmitRef.current(values, { signal: controller.signal });

        if (!mountedRef.current || gen !== generationRef.current || controller.signal.aborted) {
          return;
        }

        setIsSubmitting(false);

        if (!result?.success) {
          const fieldErrors = result?.errors;
          if (fieldErrors && typeof fieldErrors === 'object') {
            const first = Object.values(fieldErrors)[0];
            setSubmitError(
              typeof first === 'string' ? first : result.error || 'Please check the form and try again.',
            );
          } else {
            setSubmitError(result?.error || 'Something went wrong. Please try again.');
          }
          return;
        }

        setIsSuccess(true);
      } catch (err) {
        if (!mountedRef.current || gen !== generationRef.current) return;
        setIsSubmitting(false);
        const mapped = mapRequestError(err);
        setSubmitError(mapped.error);
      }
    },
    [isSubmitting, isSuccess, values],
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
    resetLabel: DEFAULT_MESSAGES.resetLabel,
  };
}

export function withHoneypot(initialValues) {
  return { ...initialValues, [HONEYPOT_FIELD]: '' };
}
