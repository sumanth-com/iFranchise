import { runFormSubmission } from './submitPipeline.js';

/**
 * Factory for typed form submitters — single pipeline for all forms.
 */
export function createFormSubmitter({ formType, validate, transform, defaultSourcePage = 'unknown' }) {
  return function submit(rawData, sourcePage = defaultSourcePage, options = {}) {
    return runFormSubmission({
      formType,
      rawData,
      sourcePage,
      validate,
      transform,
      signal: options.signal,
      guardKey: options.guardKey ?? `${formType}:${sourcePage}`,
    });
  };
}
