# DPDP Technical Compliance-Readiness Audit

> **REQUIRES LEGAL REVIEW**
>
> This document is a technical compliance-readiness audit based on the repository and its current implementation. It is not legal advice, a legal certification, or a statement that iFranchise is fully compliant with the Digital Personal Data Protection Act, 2023 or any rules made under it.

## Audit status

- Branch: `compliance/dpdp`
- Started: 13 August 2026
- Current phase: Implementation and verification complete; external decisions remain
- Push status: Not pushed
- Legal sources to validate before publication:
  - Digital Personal Data Protection Act, 2023 (official MeitY/Gazette text)
  - Digital Personal Data Protection Rules, 2025 and their phased commencement notifications
- Important: applicability, commencement dates, legal basis, statutory response periods, and notification deadlines require confirmation by qualified Indian privacy counsel.

## 1. Executive summary

The application is a public franchise marketplace and lead-generation website with no user-account or authentication system. Personal data is collected through contact, franchise, brochure, brand-application, career, and intended ROI lead forms. The primary storage path is Google Apps Script to separate Google Sheets tabs. An optional Vercel/Resend path emails lead details internally.

The implementation now adds a fact-based technical Privacy Notice, specific unticked form choices, versioned consent evidence, analytics opt-in/withdrawal, a minimal data-rights intake, stricter Apps Script validation, spreadsheet-formula neutralisation, safer response handling, additional security headers, and an incident runbook. Existing controls also include payload sanitisation, honeypots, HTTPS endpoint validation and duplicate in-flight submission guards.

Material gaps remain: no technical retention enforcement, an unauthenticated public Apps Script write architecture, a client-exposed notification-secret design if notifications are enabled, no distributed abuse protection/CAPTCHA, unverified Sheet/vendor access and contracts, and unresolved legal/business decisions. Overall status: **not ready for a claim of full DPDP compliance.**

## 2. Data inventory

| Data category | Examples found | Primary sources | Storage/recipient |
|---|---|---|---|
| Identity and contact | Name, email, phone | Contact, brand, franchise, brochure, career forms | Google Sheets; optional Resend email |
| Location | State, city, preferred city | Contact, franchise, brochure, career forms | Google Sheets; optional Resend email |
| Enquiry and lead context | Company, message, franchise name/type, brand, industry, investment preferences | Contact, franchise and brand forms | Google Sheets; optional Resend email |
| Employment | Role, resume link, portfolio link, message | Career application | Google Sheets; optional careers email |
| Technical/source metadata | Source page, page URL, path, referrer, submitted timestamp | Central form pipeline | Payload; notification email where enabled |
| Analytics/event data | Page path/title, route, form-success and click event names | GTM/GA4 integration | Google analytics services; live GTM configuration unverified |
| Browser preferences | Theme, scroll position, knowledge-hub progress | Local/session storage | User browser only |

No direct file upload, payment flow, login, account, password, authentication token, or first-party user profile database was found.

## 3. Collection points

| Collection point | Personal data | Demonstrated purpose | Storage / recipients | Marketing evidence | Existing consent | Retention evidence | Correction / erasure capability |
|---|---|---|---|---|---|---|---|
| `/contact-us` | Name, email, phone, company, state, city, message | Respond to general franchise/advisory enquiry | `Contact_Leads`; optional Resend internal email | No separate marketing flow found | Required specific checkbox; versioned record | Append-only Sheet; no duration | Manual Sheet/email process only; no API |
| Homepage contact | Same contact fields; UI also asks website URL | Respond to homepage enquiry | `Contact_Leads`; optional Resend | No separate marketing flow found | Required specific checkbox; versioned record | Same as contact | Same as contact |
| `/list-your-brand` | Brand name, contact name/email/phone, industry, state, city, vision and generated application fields | Evaluate brand listing/expansion enquiry | `Brand_Applications`; optional Resend | No separate marketing flow found | Required specific checkbox; versioned record | Append-only; unknown duration | Manual only |
| Franchise enquiry modal/sticky form | Name, email, phone, state, city, message, franchise name/id/type | Respond to interest in a named franchise | `Franchise_Inquiries`; optional Resend; actual downstream brand-sharing process is not in code | Follow-up is implied; independent marketing not evidenced | Required brand-specific checkbox; versioned record | Append-only; unknown duration | Manual only |
| Brochure download infrastructure (currently not rendered by an active page) | Name, email, phone, state, city, franchise name/id | Deliver brochure and record franchise interest if re-enabled | `Brochure_Downloads`; optional Resend | Follow-up copy exists; separate marketing not evidenced | Required brochure-specific checkbox; versioned record | Append-only; unknown duration | Manual only |
| Career application | Name, email, phone, state, city, role, resume link, portfolio link, message | Evaluate job application | `Career_Applications`; optional Resend to careers recipient | None found | Required role-specific checkbox; versioned record | Append-only; unknown duration | Manual Sheet/email/Drive-link process |
| ROI calculator lead infrastructure (legacy URL redirects to a guide) | Name, email, phone, state, city and generated ROI message if re-enabled | Request follow-up on a projection | Intended `Contact_Leads` | None found | Required ROI-specific checkbox; mapping repaired | No active collection on current route | Manual only if re-enabled and stored |
| Latent chatbot pipelines | Brand/investment preferences, contact name/phone/email, scheduling details | Legacy lead and strategy-call flows | `Chatbot_*` tabs if re-enabled | Unknown | No current UI | Unknown | Manual only |
| `/data-rights-request` | Name, email, request category, details, verification acknowledgment | Receive access/correction/erasure/withdrawal/grievance requests | `Data_Rights_Requests`; notification email disabled | None | Verification acknowledgment and specific processing checkbox | Unknown pending legal/business schedule | Internal verified workflow; no automatic frontend data exposure |
| WhatsApp / phone / email | Phone number and user-authored communication after click | User-initiated contact | Meta/WhatsApp, telco or email provider | Unknown outside code | User initiates external action | Controlled by external service/business inbox | External/manual |
| Cal.com | Information entered on external booking page | Book a strategy call | Cal.com (off-site) | Unknown | Controlled by Cal.com | Unknown | Controlled by Cal.com/business account |
| GTM / GA4 | Page URL/path/title, route and conversion event names; platform-level device/IP data may be processed by Google | Measure page and conversion performance | Google analytics services | GTM may contain advertising tags; container not available in repo | Optional analytics choice defaults off; footer withdrawal | GA/GTM settings unknown | Website withdrawal stops events, sets GA disable flag and removes common GA cookies |

### Data-flow observations

- No login, account, authentication, profile, password, payment-card collection, or first-party personal-data database exists.
- Careers collect links to externally hosted resumes; the site does not upload files.
- Form payloads include `source_page`, current URL/path and browser referrer. Sheets do not currently persist every metadata field, but optional notification emails may include them.
- Current Sheets handling is append-only. No scheduled purge, anonymisation, export, correction, deletion or consent-withdrawal automation exists.
- Existing manual contact at `contact@ifranchise.in` is the only demonstrated rights/query channel; responsibility and operating procedure require confirmation.

## 4. Third-party services

| Service | Evidence-based role | Current status / unknowns |
|---|---|---|
| Google Apps Script and Google Sheets | Form receipt and lead storage | Active; ownership, access list, retention and data region require business confirmation |
| Vercel | Website hosting and lead-notification API | Active hosting; production logging/settings require confirmation |
| Resend | Optional internal lead email | Code exists; production enablement, recipients, DPA and region require confirmation |
| Google Tag Manager / GA4 | Page and conversion analytics | Consent-gated in code; GTM container contents, custom tags, Consent Mode and GA settings require external review |
| WhatsApp / Meta | User-initiated messaging | Opens only on user action |
| Cal.com | User-initiated strategy-call booking | Opens only on user action; collected fields/retention require vendor/business confirmation |
| Google Drive / Docs | User-hosted career resume/portfolio links | Link supplied by applicant; sharing controls are applicant/Google controlled |
| Google Maps | External location link | User-initiated |
| Unsplash / pravatar.cc | Remote image delivery on some pages | May receive IP/referrer; replacement or disclosure to be assessed |

No active payment processor or CRM integration was found in application code. Any off-code/manual use requires business confirmation.

## 5. Existing compliance controls

- Client-side validators for active forms
- Outbound payload sanitisation and size caps
- Honeypot anti-spam mechanism with canonical field bindings
- HTTPS-only Google Apps Script endpoint validation
- In-flight duplicate submission guard
- PII-minimised application logging
- HTML escaping in lead-notification emails
- Privacy Policy and Terms routes with general contact information
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, and legacy `X-XSS-Protection`
- No automatic frontend exposure of stored personal data

## 6. Changes implemented

- Created local branch `compliance/dpdp`.
- Created this progress register.
- Replaced unsupported generic privacy claims with a fact-based technical Privacy Notice.
- Added prominent `REQUIRES LEGAL REVIEW` labelling, retention unknowns, actual processor disclosures, rights/withdrawal route references, and a grievance-contact placeholder.
- Removed unsupported account and payment-processor assertions from the Terms and added a data-protection clause marked `REQUIRES LEGAL REVIEW`.
- Added unticked, form-specific processing checkboxes to active contact, homepage, brand, franchise, brochure, career and ROI lead forms.
- Added central enforcement and a versioned consent record containing purpose, status, timestamp, notice version and source.
- Extended the Google Sheets backend to append consent-evidence columns without shifting existing data.
- Removed unconditional GTM and noscript loading. Analytics now defaults off, starts only after acceptance, can be rejected, and can be changed later from the footer.
- Added a versioned first-party analytics preference record; withdrawal sets the GA disable flag, removes common GA cookies and reloads once to unload GTM-managed listeners.
- Added a standalone, noindex `/data-rights-request` intake route for access/information, correction, erasure, consent withdrawal and grievance requests.
- Data-rights requests are routed to a dedicated `Data_Rights_Requests` Sheet tab and are deliberately excluded from lead-notification email.
- The rights flow records verification acknowledgment and processing consent but never returns stored personal data through the frontend.
- Hardened Apps Script routing so a form type can write only to its mapped Sheet tab; GET writes and arbitrary existing-tab fallback were removed.
- Added server-side payload limits, required-field/email/rights/consent checks, spreadsheet-formula neutralisation, fail-closed locking and generic public errors.
- Fixed canonical honeypot state bindings and repaired the ROI lead form to use the central contact schema.
- Made brochure delivery depend on confirmed lead storage and made malformed/non-JSON form responses fail closed.
- Hardened notification CORS and form-type validation and added best-effort per-instance burst limiting.
- Added `Referrer-Policy`, `Permissions-Policy`, and HSTS deployment headers. CSP remains open pending live dependency validation.
- Created `BREACH_RUNBOOK.md` covering detection, triage, containment, evidence preservation, affected-data assessment, escalation, recovery and notification decision templates without inventing a deadline.

## 7. Security findings

| ID | Severity | Finding | Evidence | Status |
|---|---|---|---|---|
| SEC-01 | Critical | Google Apps Script is designed as an unauthenticated public write endpoint | `google-apps-script-backend.js`, deployment docs, `public/forms-endpoint.json` | Open; architecture decision required |
| SEC-02 | Critical | `VITE_LEAD_NOTIFY_SECRET` is embedded in client bundles when enabled and cannot be treated as confidential authentication | `src/lib/forms/utils/leadNotification.js`, `.env.example` | Open; example configuration now defaults notifications off, but server-side redesign is required |
| SEC-03 | High | No CAPTCHA/bot-verification control | No implementation found | Open; vendor/config decision required |
| SEC-04 | High | No distributed server-side rate limiting protects the public Apps Script endpoint | Apps Script backend | Open; notification API now has best-effort per-instance limiting only |
| SEC-05 | High | Backend validation was materially weaker than frontend validation | `google-apps-script-backend.js` | Remediated with form/sheet allowlists, required fields, type/size/email/consent checks |
| SEC-06 | High | Spreadsheet formula injection was not neutralised | Apps Script row mapping/append | Remediated before all Sheet writes |
| SEC-07 | High | Google Sheet access control is operational and not represented in code | Google Sheets storage design | Business verification required |
| SEC-08 | Medium | Non-JSON HTTP 200 responses could be treated as success | form response handler | Remediated; responses fail closed unless `success: true` |
| SEC-09 | Medium | Brochure download could report success after lead-storage failure | brochure modal | Remediated; download starts only after confirmed storage |
| SEC-10 | Medium | ROI and honeypot form wiring was inconsistent | ROI, Contact, Hero and brand components | Remediated; canonical honeypot key and ROI contact fields now used |
| SEC-11 | Medium | Lock acquisition failure in Apps Script was fail-open | Apps Script backend | Remediated; busy response is fail-closed |
| SEC-12 | Medium | Notify CORS allowlist could fail open when unset and used prefix matching | notify request validation | Remediated; exact origins and required configuration |
| SEC-13 | Medium | Notify form-type allowlist was not enforced | notify request validation | Remediated; rights requests explicitly excluded |
| SEC-14 | Medium | Internal Apps Script errors were returned to anonymous callers | Apps Script backend | Remediated with generic client errors; details remain in server logs |
| SEC-15 | Medium | No CSP, Referrer-Policy or Permissions-Policy in Vercel config | `vercel.json` | Partially remediated with Referrer, Permissions and HSTS headers; enforced CSP remains open pending live validation |

No evidence of SQL injection was found because no SQL database is used. Classic session-cookie CSRF is not the primary risk because forms do not use authenticated sessions; public endpoint abuse is the relevant risk. No `dangerouslySetInnerHTML` use was found in application source.

## 8. Legal/business decisions required

- Registered legal entity name and corporate identifiers
- Data Fiduciary role and whether Significant Data Fiduciary obligations apply
- Named grievance contact/officer and approved contact channel
- Processing basis for each form and analytics activity
- Marketing use of leads and any optional marketing purposes
- Retention schedule per Google Sheet tab, email inbox and vendor
- Google Sheet ownership, access list, backup and deletion process
- Whether and how leads are shared with franchise brands
- Production Resend enablement and recipients
- Full GTM container tag list and GA4 settings
- Processor contracts/DPAs and cross-border processing facts
- Whether minors are permitted to submit any form and required age controls
- Data-rights response and identity-verification procedure

## 9. Items requiring lawyer review

All user-facing privacy, consent, cookie, grievance, rights and terms wording is marked or must be treated as **REQUIRES LEGAL REVIEW**. Counsel must also confirm:

- Applicable and commenced DPDP Act/Rules provisions on the relevant deployment date
- Consent versus permitted legitimate-use analysis
- Notice content and consent withdrawal method
- Rights and grievance process/timelines
- Child-data treatment
- Retention and erasure obligations
- Cross-border processing restrictions
- Personal-data breach notification recipients, content and deadlines

## 10. Remaining open items

- Obtain legal/business confirmations listed above
- Deploy the updated Apps Script and run its `setupSheets()`/header migration against the intended production Sheet
- Replace the public direct-write Apps Script architecture or add an approved server-side abuse-control layer
- Redesign/disable client-triggered Resend notifications so no public `VITE_` value is treated as authentication
- Select and configure distributed rate limiting and bot verification without adding an unapproved processor
- Approve and implement purpose-specific retention, correction, export and deletion procedures
- Inventory the live GTM container, GA4 property, cookies and vendor settings
- Validate and enforce a CSP after testing all required image/script/style/connect sources
- Repair the pre-existing ESLint dependency/lockfile mismatch, then rerun `npm run lint`
- Perform production smoke tests after deployment without inserting synthetic records into live Sheets

## 11. Files changed

- `DPDP_PROGRESS.md` — added
- `src/components/PrivacyPolicyPage.jsx` — fact-based technical privacy notice and legal/business placeholders
- `src/components/TermsConditionsPage.jsx` — corrected unsupported claims and added data-protection terms
- `src/components/forms/ProcessingConsentField.jsx` — reusable required processing-choice UI
- `src/lib/forms/privacyConsent.js` — purpose registry and versioned consent records
- `src/lib/forms/utils/submitPipeline.js` — central consent enforcement and attachment
- `src/hooks/useFormSubmission.js` — consent defaults unticked
- `src/components/ContactPage.jsx`, `src/components/Hero.jsx`, `src/components/ForBrandOwnersPage.jsx` — specific form choices
- `src/components/FranchiseInquiryModal.jsx`, `src/components/BrochureDownloadModal.jsx`, `src/components/careers/CareerApplyForm.jsx` — specific form choices
- `src/components/ecosystem/FranchiseRoiCalculator.jsx` — ROI processing choice
- `google-apps-script-backend.js` — consent evidence columns
- `index.html` — removed unconditional GTM and noscript iframe
- `src/lib/analytics/analyticsConsent.js` — analytics preference record
- `src/lib/analytics/gtm.js`, `src/lib/analytics/ga4.js` — consent-gated loading/events and withdrawal handling
- `src/components/AnalyticsConsentBanner.jsx` — accept/reject/manage UI
- `src/App.jsx`, `src/components/PreFooterCTA.jsx` — global banner and footer privacy choices
- `src/components/DataRightsRequestPage.jsx` — minimal rights/grievance intake
- `src/lib/forms/validators/dataRightsRequestValidator.js`, `src/lib/forms/transformers/dataRightsRequestTransformer.js`, `src/lib/forms/submitters/dataRightsRequestSubmitter.js` — rights form pipeline
- `src/lib/forms/constants/formTypes.js`, `src/lib/forms/constants/formEndpoints.js`, `src/lib/forms/FORM_REGISTRY.js`, `src/lib/forms/index.js`, `src/lib/forms/formEngine.js` — rights form registration
- `src/lib/routes.js`, `src/lib/navigation.js`, `src/lib/routePrefetch.js`, `src/seo/staticPages.js`, `src/seo/schema/routeSchemas.js` — route and SEO wiring
- `src/lib/forms/utils/leadNotification.js` — rights-request email suppression pending approved recipient
- `src/components/forms/HoneypotField.jsx`, `src/components/ContactPage.jsx`, `src/components/Hero.jsx`, `src/components/ForBrandOwnersPage.jsx` — canonical honeypot binding
- `src/components/ecosystem/FranchiseRoiCalculator.jsx` — repaired central contact-form mapping
- `src/components/BrochureDownloadModal.jsx` — fail-closed storage/download sequencing
- `src/lib/forms/utils/responseHandler.js` — strict success-response parsing
- `api/lib/validateNotifyRequest.js` — exact CORS allowlist, form allowlist, payload bounds and burst limit
- `.env.example` — analytics-consent note and notification architecture warning/default-off
- `vercel.json` — additional safe security headers
- `BREACH_RUNBOOK.md` — operational personal-data breach response draft with legal/business placeholders
- `public/route-seo-boot.js`, `public/sitemap.xml` — regenerated by the successful production build

## 12. Tests performed and results

- `npm run build` — **passed**; 681 modules transformed, data-rights chunk emitted, sitemap and route SEO regenerated.
- `npm run lint` — **blocked before linting source** by a pre-existing dependency mismatch: `zod-validation-error` requests `zod/v4/core` while installed/locked `zod` does not export it. IDE diagnostics for edited files report no lint errors.
- `git diff --check` — **passed**; only Windows LF/CRLF conversion warnings.
- `node --check google-apps-script-backend.js` and `node --check api/lib/validateNotifyRequest.js` — **passed**.
- Focused Node checks — **passed** for rights validation, consent record generation and fail-closed response parsing.
- Apps Script VM checks — **passed** for valid rights payload, strict sheet-tab rejection and formula neutralisation.
- Notification API checks — **passed** for exact allowed origin, malicious prefix rejection and rights-form notification rejection.
- Browser, analytics unknown — **passed**: no Google analytics script, no consent record and no data-layer events before a choice.
- Browser, reject — **passed**: denied record persisted and no Google analytics script loaded.
- Browser, accept — **passed**: GTM/GA loaded only after acceptance and page-view event appeared.
- Browser, withdrawal — **passed**: denied record persisted, GA disable flag set, common analytics cookies removed, and navigation with consent denied did not initiate a new analytics load.
- Browser routes — **passed** for Privacy Notice, Terms, footer privacy choices and `/data-rights-request`.
- Browser form UI — **passed** for unticked required consent on contact, homepage/brand infrastructure, franchise enquiry, career application and rights intake. Brochure and ROI components are latent in the current navigation and were validated by build/code checks rather than a live entry point.
- Empty rights-form validation — **passed** without a network submission; no synthetic personal-data record was written to the configured Sheet.
- No repository unit or end-to-end test suite exists.

## 13. Overall technical compliance-readiness assessment

**Current assessment: Improved technical readiness; material external and architectural work remains.**

The codebase now provides a technical notice draft, demonstrable versioned form-consent records, analytics choice/withdrawal, a rights intake, safer backend validation and an incident runbook. It still lacks technical retention enforcement and complete public-endpoint abuse protection, and operational controls outside the repository remain unverified. Legal wording, legal bases, roles, deadlines, processor arrangements and deployment practices require qualified review. This assessment must not be represented as legal certification or “fully DPDP compliant.”
