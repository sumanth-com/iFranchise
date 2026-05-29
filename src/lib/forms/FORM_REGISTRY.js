/**
 * Production form registry — all user-facing submission entry points.
 * New forms: add a submitter via createFormSubmitter() and register here.
 */
import { FORM_TYPES } from './constants/formTypes.js';
import { SHEET_TABS } from './constants/formEndpoints.js';

export const FORM_REGISTRY = [
  {
    id: 'contact_page',
    label: 'Contact Us',
    formType: FORM_TYPES.CONTACT,
    sheetTab: SHEET_TABS[FORM_TYPES.CONTACT],
    submitter: 'submitContactForm',
    sourcePage: 'contact_page',
    hook: 'useFormSubmission',
  },
  {
    id: 'homepage_contact',
    label: 'Homepage contact modal',
    formType: FORM_TYPES.CONTACT,
    sheetTab: SHEET_TABS[FORM_TYPES.CONTACT],
    submitter: 'submitContactForm',
    sourcePage: 'homepage_contact',
    hook: 'useFormSubmission',
  },
  {
    id: 'list_your_brand_hero',
    label: 'List Your Brand',
    formType: FORM_TYPES.BRAND_APPLICATION,
    sheetTab: SHEET_TABS[FORM_TYPES.BRAND_APPLICATION],
    submitter: 'submitBrandApplication',
    sourcePage: 'list_your_brand_hero',
    hook: 'useFormSubmission',
  },
  {
    id: 'expansion_assistant_brand',
    label: 'Chatbot — Brand lead',
    formType: FORM_TYPES.CHATBOT_BRAND,
    sheetTab: SHEET_TABS[FORM_TYPES.CHATBOT_BRAND],
    submitter: 'submitChatbotLead',
    sourcePage: 'expansion_assistant_brand',
    hook: 'useAsyncFormAction',
  },
  {
    id: 'expansion_assistant_investor',
    label: 'Chatbot — Investor lead',
    formType: FORM_TYPES.CHATBOT_INVESTOR,
    sheetTab: SHEET_TABS[FORM_TYPES.CHATBOT_INVESTOR],
    submitter: 'submitChatbotLead',
    sourcePage: 'expansion_assistant_investor',
    hook: 'useAsyncFormAction',
  },
  {
    id: 'expansion_assistant_strategy',
    label: 'Chatbot — Strategy call',
    formType: FORM_TYPES.CHATBOT_STRATEGY,
    sheetTab: SHEET_TABS[FORM_TYPES.CHATBOT_STRATEGY],
    submitter: 'submitStrategyCall',
    sourcePage: 'expansion_assistant_strategy_calendar',
    hook: 'fire-and-forget',
  },
  {
    id: 'franchise_details_brochure',
    label: 'Franchise brochure download',
    formType: FORM_TYPES.BROCHURE_DOWNLOAD,
    sheetTab: SHEET_TABS[FORM_TYPES.BROCHURE_DOWNLOAD],
    submitter: 'submitBrochureDownload',
    sourcePage: 'franchise_details_brochure',
    hook: 'useFormSubmission',
  },
  {
    id: 'franchise_details_inquiry',
    label: 'Franchise interest inquiry',
    formType: FORM_TYPES.FRANCHISE_INQUIRY,
    sheetTab: SHEET_TABS[FORM_TYPES.FRANCHISE_INQUIRY],
    submitter: 'submitFranchiseInquiry',
    sourcePage: 'franchise_details_inquiry',
    hook: 'FranchiseInquiryModal',
  },
];

/** Careers page is marketing-only (HIRING_ACTIVE=false); no sheet integration. */
export const FORM_REGISTRY_NOTES = {
  careers: 'No form submission — careers page does not POST to Google Sheets.',
};
