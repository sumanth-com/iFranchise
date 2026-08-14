import { getLegalLastUpdatedLabel } from '../lib/legalLastUpdated';
import { pageHeroClass } from '../lib/cardThemeStyles';
import LegalContactFooter from './legal/LegalContactFooter';
import {
  SITE_CONTACT_ADDRESS,
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONE_DISPLAY,
} from '../data/siteContact';

const sections = [
  {
    title: 'Status of this notice',
    body:
      'REQUIRES LEGAL REVIEW. This notice is a technical draft based on processing visible in the website code. It is not a legal certification. The registered legal entity operating under the iFranchise name, the applicable processing grounds, retention schedule, grievance contact, processor contracts, cross-border processing details, and the commencement of applicable DPDP Act and Rules provisions require confirmation.',
  },
  {
    title: 'Where this notice applies',
    body:
      'This notice describes personal-data handling visible on the iFranchise website when a person submits an enquiry, requests a franchise brochure, expresses interest in a franchise, applies to list a brand, applies for a role, requests data-principal assistance, or chooses to use analytics preferences and external contact links.',
  },
  {
    title: 'Personal data collected',
    body:
      'Depending on the form, the website may collect a name, email address, telephone number, company or brand details, state, city, preferred location, franchise or investment interests, enquiry message, job role, resume link, portfolio link, and request details. The form pipeline also attaches the source page, page URL, path, referrer, and submission timestamp. The website does not currently provide user accounts, collect passwords, accept direct resume uploads, or implement a payment-card form.',
  },
  {
    title: 'Purposes visible in the implementation',
    body:
      'The collected information is used to receive and respond to contact and advisory enquiries, evaluate brand applications, handle interest in a named franchise, provide requested brochures, evaluate job applications, receive data-rights requests, prevent basic form abuse, operate the website, and measure website and form performance when analytics is permitted. Any additional use, including promotional email, SMS, telephone or WhatsApp marketing, requires business and legal confirmation and an appropriate separate choice where required.',
  },
  {
    title: 'How form data is handled',
    body:
      'Submitted form information is validated and sanitised in the browser and sent over HTTPS to a Google Apps Script endpoint that appends it to a form-specific Google Sheets tab. When lead notifications are enabled in the deployment configuration, a Vercel serverless endpoint and Resend may also process a copy for an internal notification email. Google Sheet ownership, authorised users, email recipients, access-review procedures, backup practices, and storage regions are not established by this code and require business confirmation.',
  },
  {
    title: 'Franchise enquiries and other recipients',
    body:
      'A franchise enquiry identifies the franchise in which the person expressed interest. The code stores that context with the enquiry. Whether identifiable enquiry data is subsequently shared with the relevant franchise brand, and under what controls, is an operational fact requiring business and legal confirmation. The code also contains user-initiated links to WhatsApp/Meta, Cal.com, Google Maps, telephone, email and social-sharing services; information entered after leaving the website is handled under the selected service’s own terms and privacy practices.',
  },
  {
    title: 'Analytics, cookies and device storage',
    body:
      'The website uses first-party local or session storage for theme preference, scroll restoration, knowledge-hub progress, and the analytics-consent choice. Google Tag Manager and Google Analytics are intended to receive page and conversion events only after analytics consent. The exact tags in the live GTM container, GA4 settings, cookie names, retention settings, advertising features, and any additional pixels require a live configuration review. Analytics consent can be changed using the “Privacy choices” control in the website footer.',
  },
  {
    title: 'Retention',
    body:
      'REQUIRES LEGAL REVIEW. The code does not define or enforce a retention period for Google Sheets rows, internal notification emails, data-rights requests, analytics data, or third-party services. No automated deletion or anonymisation job exists. The business must approve a purpose-specific retention schedule and operational deletion procedure before a definite period can be stated here.',
  },
  {
    title: 'Security controls and limitations',
    body:
      'The implementation uses HTTPS endpoint validation, client-side field validation, payload sanitisation, honeypot fields, size limits, duplicate in-flight submission controls, and selected HTTP security headers. Access controls for Google Sheets and vendor systems are operational rather than defined in this repository. No internet service can be represented as completely secure, and this draft does not claim that security assessments, encryption at rest, or processor controls have been independently verified.',
  },
  {
    title: 'Data-principal requests',
    body: (
      <>
        REQUIRES LEGAL REVIEW. Subject to applicable and commenced law, a person may request information
        about processing, access-related information, correction, completion or updating, erasure,
        withdrawal of consent where consent applies, and grievance handling. Submit a request through the{' '}
        <a className="font-semibold underline" href="/data-rights-request">
          Data Rights Request form
        </a>{' '}
        or contact {SITE_CONTACT_EMAIL}. Identity and request authority may need to be verified before any
        personal data is disclosed, changed or erased. The website does not automatically expose stored
        personal data.
      </>
    ),
  },
  {
    title: 'Withdrawing consent',
    body:
      'REQUIRES LEGAL REVIEW. Analytics consent can be rejected or withdrawn through the website privacy choices. For a previously submitted form, use the Data Rights Request form or the contact details below and identify the form or enquiry involved. Withdrawal does not itself determine whether information must be retained for another confirmed legal requirement; that assessment requires an internal verified process.',
  },
  {
    title: 'Children',
    body:
      'REQUIRES LEGAL REVIEW. The website and franchise investment services are presented for adults, and the Terms state an age threshold of 18. The forms do not currently perform age or parental-authority verification. The business and counsel must confirm whether any child-data processing is possible and what prevention or verifiable-consent controls are required.',
  },
  {
    title: 'Grievance and privacy contact',
    body: `REQUIRES LEGAL REVIEW. The website currently provides ${SITE_CONTACT_EMAIL}, ${SITE_CONTACT_PHONE_DISPLAY}, and ${SITE_CONTACT_ADDRESS}, Bengaluru, Karnataka, India as general contact details. [BUSINESS/LEGAL TO CONFIRM: name or role of the person responsible for personal-data queries and grievances, approved contact channel, and response process.] Until confirmed, the general contact channel may receive privacy queries but must not be represented as an appointed Grievance Officer or Data Protection Officer.`,
  },
  {
    title: 'Changes to this notice',
    body:
      'REQUIRES LEGAL REVIEW. This notice should be versioned when processing or legal requirements change. Material changes affecting consent should be presented for a fresh choice where required. A legal effective date must be approved rather than inferred solely from the website deployment date.',
  },
];

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="REQUIRES LEGAL REVIEW"
      title="Privacy Notice"
      subtitle="A technical draft describing personal-data handling currently visible in the iFranchise website implementation."
      sections={sections}
    />
  );
}

export default PrivacyPolicyPage;

// -- Inlined LegalPageLayout --
/**
 * LegalPageLayout
 * Shared layout for Privacy Policy, Terms & Conditions, and Licenses pages.
 * Apple / Google documentation style - single-column, clean, enterprise-grade.
 */

function LegalSection({ index, title, body }) {
  return (
    <section className="border-b border-violet-500/20 py-6 last:border-0 sm:py-8">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
        <span className="w-6 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-white/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
          {title}
        </h2>
      </div>
      <p className="text-[15px] leading-relaxed text-white sm:pl-11 sm:text-base">
        {body}
      </p>
    </section>
  );
}

function LegalPageLayout({ title, subtitle, sections, badge }) {
  return (
    <div className="legal-page relative z-10 min-h-screen overflow-x-hidden text-white">
      {/* Page Header */}
      <div className="border-b border-violet-500/20 card-premium-dark-inner rounded-none border-x-0 border-t-0">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
          {badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/80 mb-5">
              {badge}
            </span>
          )}
          <h1 className={`${pageHeroClass(false)} mb-5`}>
            {title}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            {subtitle}
          </p>
          <p className="text-sm text-white">
            Last Updated: <span className="text-white font-medium">{getLegalLastUpdatedLabel()}</span>
          </p>
        </div>
      </div>

      {/* Document Body */}
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="card-premium-dark overflow-hidden rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-8 md:p-10 lg:p-12">
          {sections.map((section, i) => (
            <LegalSection
              key={i}
              index={i}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>

        <LegalContactFooter />
      </div>
    </div>
  );
}
