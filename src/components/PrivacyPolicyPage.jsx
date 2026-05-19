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
    body: 'Subject to applicable law, you have the right to access, correct, or request deletion of your personal data. You may also object to certain processing activities, request data portability, or withdraw consent where processing is consent-based. To exercise these rights, contact our compliance team at legal@ifranchise.in. We may require identity verification before processing sensitive requests.',
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
    body: 'For privacy-related inquiries, data access requests, or compliance concerns, please contact our legal and compliance team at legal@ifranchise.in or call +91 98765 43210. Our registered office is located in Bangalore, Karnataka, India.',
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

const LAST_UPDATED = 'April 30, 2026';

function LegalSection({ index, title, body }) {
  return (
    <section className="py-8 border-b border-violet-500/20 last:border-0">
      <div className="flex gap-5 items-baseline mb-3">
        <span className="text-xs font-semibold text-white/60 tabular-nums w-6 shrink-0 pt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">
          {title}
        </h2>
      </div>
      <p className="text-[15px] sm:text-base text-white leading-relaxed pl-11">
        {body}
      </p>
    </section>
  );
}

function LegalPageLayout({ title, subtitle, sections, badge }) {
  return (
    <div className="legal-page min-h-screen relative z-10 text-white">
      {/* Page Header */}
      <div className="border-b border-violet-500/20 card-premium-dark-inner rounded-none border-x-0 border-t-0">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          {badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/80 mb-5">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white leading-relaxed max-w-2xl mb-6">
            {subtitle}
          </p>
          <p className="text-sm text-white">
            Last Updated: <span className="text-white font-medium">{LAST_UPDATED}</span>
          </p>
        </div>
      </div>

      {/* Document Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="card-premium-dark rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          {sections.map((section, i) => (
            <LegalSection
              key={i}
              index={i}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>

        {/* Contact Footer */}
        <div className="mt-14 pt-10 border-t border-violet-500/20">
          <p className="text-sm font-semibold text-white mb-5">Questions about this document?</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="mailto:legal@ifranchise.in"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              legal@ifranchise.in
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 98765 43210
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-white">
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Bangalore, Karnataka, India
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
