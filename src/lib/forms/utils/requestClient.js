/**
 * Production fetch utilities — timeout, retry, abort, offline-safe errors.
 */

const DEFAULT_TIMEOUT_MS = 12_000;
const DEFAULT_RETRIES = 1;
const RETRY_BASE_MS = 400;

function isAbortError(err) {
  return err?.name === 'AbortError' || err?.code === 20;
}

function isOffline() {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

/**
 * Fetch with timeout + optional retries. Aborts if external signal aborts.
 * @param {string} url
 * @param {RequestInit & { timeout?: number, retries?: number }} options
 */
export async function fetchWithRetry(url, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, retries = DEFAULT_RETRIES, signal: outerSignal, ...init } = options;

  if (isOffline()) {
    const err = new Error('OFFLINE');
    err.code = 'OFFLINE';
    throw err;
  }

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (outerSignal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), timeout);

    const onOuterAbort = () => timeoutController.abort();
    outerSignal?.addEventListener('abort', onOuterAbort);

    try {
      const response = await fetch(url, {
        ...init,
        signal: timeoutController.signal,
      });
      clearTimeout(timeoutId);
      outerSignal?.removeEventListener('abort', onOuterAbort);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      outerSignal?.removeEventListener('abort', onOuterAbort);
      lastError = err;

      if (isAbortError(err) && outerSignal?.aborted) {
        throw err;
      }

      if (attempt >= retries) break;
      await new Promise((r) => setTimeout(r, RETRY_BASE_MS * (attempt + 1)));
    }
  }

  if (isAbortError(lastError)) {
    const err = new Error('Request timed out. Please try again.');
    err.code = 'TIMEOUT';
    throw err;
  }

  if (lastError?.code === 'OFFLINE' || isOffline()) {
    const err = new Error('You appear to be offline. Check your connection and try again.');
    err.code = 'OFFLINE';
    throw err;
  }

  throw lastError;
}

export function mapRequestError(err) {
  if (!err) {
    return { success: false, error: 'Something went wrong. Please try again.', code: 'UNKNOWN' };
  }
  if (err.code === 'OFFLINE' || err.message === 'OFFLINE') {
    return {
      success: false,
      error: 'You appear to be offline. Check your connection and try again.',
      code: 'OFFLINE',
    };
  }
  if (err.code === 'TIMEOUT' || isAbortError(err)) {
    return {
      success: false,
      error: 'Request timed out. Please check your connection and try again.',
      code: 'TIMEOUT',
    };
  }
  return {
    success: false,
    error: 'Could not reach our server. Please check your connection and try again.',
    code: 'NETWORK_ERROR',
  };
}
