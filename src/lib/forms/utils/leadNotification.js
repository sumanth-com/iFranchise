/**
 * The browser does not send lead email.
 * Google Apps Script calls /api/notify-lead after the sheet row is appended,
 * using a secret stored in Script Properties. The Resend key stays on the server.
 * This stays a no-op so Vite cannot inline a notification secret into the public bundle.
 */
export function notifyLeadSubmission() {}
