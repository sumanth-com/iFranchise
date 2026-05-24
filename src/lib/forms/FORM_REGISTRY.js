/**
 * Production form registry — all user-facing submission entry points.
 * Used for audits and deployment verification (no runtime dependency).
 */
export const FORM_REGISTRY = [
  {
    id: 'contact_page',
    label: 'Contact Us',
    submitter: 'submitContactForm',
    sourcePage: 'contact_page',
    hook: 'useFormSubmission',
  },
  {
    id: 'homepage_contact',
    label: 'Homepage contact modal',
    submitter: 'submitContactForm',
    sourcePage: 'homepage_contact',
    hook: 'useFormSubmission',
  },
  {
    id: 'list_your_brand_hero',
    label: 'List Your Brand',
    submitter: 'submitBrandApplication',
    sourcePage: 'list_your_brand_hero',
    hook: 'useFormSubmission',
  },
  {
    id: 'career_detail',
    label: 'Careers / Job Applications',
    submitter: 'submitJobApplication',
    sourcePage: 'career_detail',
    hook: 'useFormSubmission',
  },
  {
    id: 'expansion_assistant_brand',
    label: 'Chatbot — Brand lead',
    submitter: 'submitChatbotLead',
    sourcePage: 'expansion_assistant_brand',
    hook: 'useAsyncFormAction',
  },
  {
    id: 'expansion_assistant_investor',
    label: 'Chatbot — Investor lead',
    submitter: 'submitChatbotLead',
    sourcePage: 'expansion_assistant_investor',
    hook: 'useAsyncFormAction',
  },
  {
    id: 'expansion_assistant_strategy',
    label: 'Strategy call tracking',
    submitter: 'submitStrategyCall',
    sourcePage: 'expansion_assistant_strategy_calendar',
    hook: 'fire-and-forget',
  },
  {
    id: 'franchise_details_brochure',
    label: 'Franchise brochure download',
    submitter: 'submitBrochureDownload',
    sourcePage: 'franchise_details_brochure',
    hook: 'useFormSubmission',
  },
];
