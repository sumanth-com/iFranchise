/**
 * Production-safe form pipeline logging (no PII).
 */

const PREFIX = '[iFranchise Forms]';

function safeMeta(meta = {}) {
  return {
    event: meta.event,
    form_type: meta.formType ?? meta.form_type,
    source_page: meta.sourcePage ?? meta.source_page,
    code: meta.code,
    status: meta.status,
    transport: meta.transport,
    endpoint_ready: meta.endpointReady,
    duration_ms: meta.durationMs,
  };
}

export function logFormInfo(event, meta = {}) {
  const payload = safeMeta({ ...meta, event });
  if (import.meta.env.DEV) {
    console.info(PREFIX, event, payload, meta.debug ?? '');
  } else {
    console.info(PREFIX, JSON.stringify(payload));
  }
}

export function logFormWarn(event, meta = {}) {
  const payload = safeMeta({ ...meta, event });
  if (import.meta.env.DEV) {
    console.warn(PREFIX, event, payload, meta.debug ?? '');
  } else {
    console.warn(PREFIX, JSON.stringify(payload));
  }
}

export function logFormError(event, meta = {}) {
  const payload = safeMeta({ ...meta, event });
  if (import.meta.env.DEV) {
    console.error(PREFIX, event, payload, meta.debug ?? '');
  } else {
    console.error(PREFIX, JSON.stringify(payload));
  }
}
