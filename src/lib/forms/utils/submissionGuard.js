/**
 * Prevents duplicate concurrent submissions (double-click / rapid tap).
 * Does NOT limit total submissions over time — unlimited repeat usage is allowed.
 */

const inFlight = new Map();

/**
 * @param {string} key - Unique key per form instance (e.g. contact_page, homepage_contact)
 * @param {() => Promise<{ success: boolean, error?: string, errors?: object }>} fn
 */
export async function runGuardedSubmission(key, fn) {
  if (!key) {
    return fn();
  }

  const existing = inFlight.get(key);
  if (existing) {
    return existing;
  }

  const promise = Promise.resolve()
    .then(fn)
    .finally(() => {
      if (inFlight.get(key) === promise) {
        inFlight.delete(key);
      }
    });

  inFlight.set(key, promise);
  return promise;
}

/** Clear in-flight lock for a key (e.g. after unmount). */
export function clearSubmissionGuard(key) {
  if (key) inFlight.delete(key);
}
