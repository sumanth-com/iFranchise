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
    title: 'Introduction',
    body: 'This Privacy Policy describes how iFranchise ("we", "our", or "us") collects, uses, discloses, and safeguards information when you access our franchise marketplace platform, submit enquiries, engage with advisory services, or interact with any feature of our digital ecosystem. By using iFranchise, you acknowledge the practices described in this document.',
  },
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly - including your name, email address, phone number, business details, and franchise preferences - as well as information generated through your use of the platform such as browsing activity, search queries, device identifiers, IP address, browser type, and interaction patterns. We may also receive information from third-party partners, franchise brands, and referral sources.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use collected information to operate and improve the platform, match users with relevant franchise opportunities, process enquiries and applications, deliver advisory communications, personalize your experience, prevent fraud and abuse, fulfill legal obligations under applicable Indian law, and send service-related notifications. We do not sell personal data to third parties for their independent marketing purposes.',
  },
  {
    title: 'Sharing of Information',
    body: 'Information may be shared with franchise brands you express interest in, verified service partners, payment processors, cloud infrastructure providers, analytics vendors, and legal or regulatory authorities when required by law. All third-party data processors are contractually bound to handle your information in accordance with applicable data protection standards.',
  },
  {
    title: 'Cookies and Tracking Technologies',
    body: 'We use cookies, pixel tags, and similar technologies to maintain session state, remember your preferences, measure platform performance, and deliver relevant content. You may manage cookie preferences through your browser settings. Disabling certain cookies may affect the availability or functionality of specific platform features.',
  },
  {
    title: 'Data Security',
    body: 'We implement administrative, technical, and physical safeguards designed to protect your information from unauthorized access, disclosure, alteration, or destruction. These include encrypted data transmission, access controls, regular security assessments, and internal data handling policies. No system is completely secure, and we encourage users to maintain strong account credentials.',
  },
  {
    title: 'Your Rights and Choices',
    body: `Subject to applicable law, you have the right to access, correct, or request deletion of your personal data. You may also object to certain processing activities, request data portability, or withdraw consent where processing is consent-based. To exercise these rights, contact our compliance team at ${SITE_CONTACT_EMAIL}. We may require identity verification before processing sensitive requests.`,
  },
  {
    title: 'Data Retention',
    body: 'We retain personal information for as long as necessary to provide services, comply with legal obligations, resolve disputes, enforce agreements, and maintain platform security records. When data is no longer required, it is securely deleted or anonymized in accordance with our internal retention schedules.',
  },
  {
    title: 'Third-Party Links and Integrations',
    body: 'Our platform may contain links to external websites, franchise brand portals, and partner services. iFranchise is not responsible for the privacy practices or content of third-party destinations. We encourage you to review the privacy policies of any external services you access through our platform.',
  },
  {
    title: 'Children\'s Privacy',
    body: 'iFranchise is not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has submitted personal data without appropriate consent, we will take steps to delete that information promptly.',
  },
  {
    title: 'Updates to This Policy',
    body: 'We may revise this Privacy Policy periodically to reflect changes in our practices, legal requirements, or platform features. Material updates will be communicated through the platform interface or via registered contact details. Continued use of iFranchise after any update constitutes acceptance of the revised policy.',
  },
  {
    title: 'Contact Us',
    body: `For privacy-related inquiries, data access requests, or compliance concerns, please contact us at ${SITE_CONTACT_EMAIL} or call ${SITE_CONTACT_PHONE_DISPLAY}. Our office is located at ${SITE_CONTACT_ADDRESS}, Bengaluru, Karnataka, India.`,
  },
];

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Privacy Policy"
      subtitle="How iFranchise collects, uses, shares, and protects your information across our franchise marketplace and advisory platform."
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
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          {badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/80 mb-5">
              {badge}
            </span>
          )}
          <h1 className={`${pageHeroClass(false)} mb-5`}>
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white leading-relaxed max-w-2xl mb-6">
            {subtitle}
          </p>
          <p className="text-sm text-white">
            Last Updated: <span className="text-white font-medium">{getLegalLastUpdatedLabel()}</span>
          </p>
        </div>
      </div>

      {/* Document Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="card-premium-dark overflow-hidden rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-8 md:p-10">
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
