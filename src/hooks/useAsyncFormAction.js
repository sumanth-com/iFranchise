import { useCallback, useEffect, useRef, useState } from 'react';
import { runGuardedSubmission, clearSubmissionGuard } from '@/lib/forms/utils/submissionGuard';
import { mapRequestError } from '@/lib/forms/utils/requestClient';

/**
 * Lightweight async action hook for multi-step / chatbot flows (non-field forms).
 */
export function useAsyncFormAction({ formKey, onAction }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const mountedRef = useRef(true);
  const generationRef = useRef(0);
  const onActionRef = useRef(onAction);

  onActionRef.current = onAction;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (formKey) clearSubmissionGuard(formKey);
    };
  }, [formKey]);

  const execute = useCallback(
    async (payload) => {
      if (submitting || complete) return { success: false };

      const gen = ++generationRef.current;
      setSubmitting(true);
      setError('');

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        if (mountedRef.current && gen === generationRef.current) {
          setError('You appear to be offline. Check your connection and try again.');
          setSubmitting(false);
        }
        return { success: false };
      }

      try {
        const result = await runGuardedSubmission(formKey || 'async-form', () =>
          onActionRef.current(payload),
        );

        if (!mountedRef.current || gen !== generationRef.current) {
          return result;
        }

        if (result?.success) {
          setComplete(true);
          setError('');
        } else {
          setError(result?.error || 'Something went wrong. Please try again.');
        }
        return result;
      } catch (err) {
        const mapped = mapRequestError(err);
        if (mountedRef.current && gen === generationRef.current) {
          setError(mapped.error);
        }
        return mapped;
      } finally {
        if (mountedRef.current && gen === generationRef.current) {
          setSubmitting(false);
        }
      }
    },
    [submitting, complete, formKey],
  );

  const reset = useCallback(() => {
    generationRef.current += 1;
    setComplete(false);
    setError('');
    setSubmitting(false);
    if (formKey) clearSubmissionGuard(formKey);
  }, [formKey]);

  return { submitting, error, complete, execute, reset, setError };
}
