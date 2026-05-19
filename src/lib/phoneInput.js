/** Shared phone field UX - masked placeholder, never show example digits in forms */
export const PHONE_PLACEHOLDER = '+91 **********';
export const PHONE_INPUT_PATTERN = '[\\+]?[0-9\\s\\-\\(\\)]{10,20}';

/** Mask phone for display in summaries (never show raw digits in UI) */
export function maskPhoneDisplay(phone) {
  if (!phone?.trim()) return PHONE_PLACEHOLDER;
  return PHONE_PLACEHOLDER;
}
