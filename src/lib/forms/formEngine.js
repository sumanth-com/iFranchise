/**
 * Central form engine entry. import from '@/lib/forms' or '@/lib/forms/formEngine'.
 */
export { FORM_TYPES } from './constants/formTypes.js';
export { GOOGLE_APPS_SCRIPT_URL, SHEET_TABS, SOURCE_PAGES } from './constants/formEndpoints.js';
export { HONEYPOT_FIELD } from './utils/honeypot.js';

export { runFormSubmission } from './utils/submitPipeline.js';
export { runGuardedSubmission, clearSubmissionGuard } from './utils/submissionGuard.js';
export { fetchWithRetry, mapRequestError } from './utils/requestClient.js';
export { createFormSubmitter } from './utils/createFormSubmitter.js';

export { submitContactForm } from './submitters/contactSubmitter.js';
export { submitBrandApplication } from './submitters/applicationSubmitter.js';
export {
  submitChatbotLead,
  submitBrandConsultation,
  submitStrategyCall,
} from './submitters/chatbotSubmitter.js';
export { submitBrochureDownload } from './submitters/brochureDownloadSubmitter.js';
export { submitFranchiseInquiry } from './submitters/franchiseInquirySubmitter.js';
