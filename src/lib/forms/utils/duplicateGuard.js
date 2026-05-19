/**
 * Legacy duplicate guard — disabled (unlimited submissions to Google Sheets).
 */

/** @deprecated No-op: always allow */
export function checkDuplicateSubmission() {
  return { ok: true };
}

/** @deprecated No-op */
export function recordDuplicateSubmission() {
  /* unlimited */
}
