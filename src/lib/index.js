/**
 * lib/index.js
 * -----------------------------------------------------------------------------
 * Barrel export for the backend infrastructure layer.
 * Import from here instead of individual files to keep imports clean.
 *
 * Usage:
 *   import { submitContactForm } from '@/lib';
 *   import { FORM_TYPES, SHEET_TABS } from '@/lib/forms';
 * -----------------------------------------------------------------------------
 */

// Centralized form architecture
export * from './forms';

// Rate limiting
export {
  checkRateLimit,
  recordSubmission,
  RATE_LIMIT_KEYS,
} from './rateLimiter';

// Utilities
export { logger } from './logger';
export { sanitizeText, sanitizeEmail, sanitizePhone, sanitizeObjectStrings } from './sanitize';
