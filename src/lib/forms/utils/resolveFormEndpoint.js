/**
 * Resolve Google Apps Script URL: Vite build-time env first, then /forms-endpoint.json.
 */

const BUILD_TIME_URL = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '').trim();

let cachedUrl = BUILD_TIME_URL;
let inflight = null;

export function isValidFormEndpointUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname.includes('script.google.com') &&
      parsed.pathname.includes('/macros/s/')
    );
  } catch {
    return false;
  }
}

export function hasBuildTimeFormEndpoint() {
  return Boolean(BUILD_TIME_URL);
}

/**
 * @returns {Promise<string>}
 */
export async function resolveFormEndpointUrl() {
  if (cachedUrl && isValidFormEndpointUrl(cachedUrl)) return cachedUrl;

  if (typeof window === 'undefined') return BUILD_TIME_URL || '';

  if (!inflight) {
    inflight = fetch('/forms-endpoint.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { url: '' }))
      .then((data) => {
        const fromFile = typeof data?.url === 'string' ? data.url.trim() : '';
        if (isValidFormEndpointUrl(fromFile)) {
          cachedUrl = fromFile;
        } else if (isValidFormEndpointUrl(BUILD_TIME_URL)) {
          cachedUrl = BUILD_TIME_URL;
        } else {
          cachedUrl = '';
        }
        return cachedUrl;
      })
      .catch(() => {
        cachedUrl = isValidFormEndpointUrl(BUILD_TIME_URL) ? BUILD_TIME_URL : '';
        return cachedUrl;
      })
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

/** Sync URL when inlined at build time. */
export function getFormEndpointUrlSync() {
  return cachedUrl || BUILD_TIME_URL || '';
}

/** Mask URL for logs (deployment id only). */
export function maskFormEndpointUrl(url) {
  if (!url) return '(not set)';
  try {
    const id = url.split('/macros/s/')[1]?.split('/')[0];
    return id ? `script.google.com/.../${id.slice(0, 8)}...` : 'script.google.com/...';
  } catch {
    return 'script.google.com/...';
  }
}
