import { getLegalLastUpdatedLabel } from '../lib/legalLastUpdated';
import { pageHeroClass } from '../lib/cardThemeStyles';
import LegalContactFooter from './legal/LegalContactFooter';
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONE_DISPLAY,
} from '../data/siteContact';

const sections = [
  {
    title: 'Introduction',
    body: 'REQUIRES LEGAL REVIEW. These Terms & Conditions govern access to and use of the iFranchise website, franchise opportunity discovery, brand enquiry workflows, advisory content, and related website tools. The registered legal entity operating under the iFranchise name must be confirmed before this wording is approved.',
  },
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using iFranchise, you confirm that you are at least 18 years of age, have the legal capacity to enter into binding agreements, and have read, understood, and agreed to these Terms along with our Privacy Policy and any supplemental policies applicable to specific services. If you do not agree, you must discontinue use of the platform immediately.',
  },
  {
    title: 'Platform Description',
    body: 'iFranchise operates as a franchise growth marketplace and consulting ecosystem. We facilitate connections between prospective franchisees and franchise brands, provide advisory resources, and support business evaluation processes. iFranchise does not guarantee investment outcomes, franchise approvals, or the accuracy of brand-provided information listed on the platform.',
  },
  {
    title: 'User Responsibilities',
    body: `REQUIRES LEGAL REVIEW. You should provide accurate and current information when submitting a website form and must not submit another person’s personal data without authority. The current website does not provide user registration or account credentials. Suspected misuse or security issues may be reported to ${SITE_CONTACT_EMAIL}.`,
  },
  {
    title: 'Prohibited Conduct',
    body: 'REQUIRES LEGAL REVIEW. You must not submit fraudulent or misleading information, impersonate another person, harvest personal data without authority, interfere with website security or availability, send automated abuse, introduce malicious content, or use the website for an unlawful purpose. Access may be restricted and appropriate action considered where misuse is detected.',
  },
  {
    title: 'Franchise Information Disclaimer',
    body: 'Franchise listings, investment figures, ROI projections, and brand descriptions on iFranchise are provided for informational and evaluation purposes only. This information is sourced from franchise brands and has not been independently verified by iFranchise. Users should conduct independent due diligence and seek professional legal and financial advice before making any investment decision.',
  },
  {
    title: 'Payments and Transactions',
    body: 'REQUIRES LEGAL REVIEW. No payment-card collection or checkout provider is implemented in the current website code. If a paid service is offered through a separate agreement or external process, the responsible entity, pricing, taxes, refund terms, payment provider and related privacy disclosures must be confirmed at that time.',
  },
  {
    title: 'Personal Data and Privacy',
    body: (
      <>
        REQUIRES LEGAL REVIEW. Personal data submitted through the website is handled as described in the{' '}
        <a className="font-semibold underline" href="/privacy-policy">
          Privacy Notice
        </a>
        . A person submitting information must have authority to provide it and should use the available{' '}
        <a className="font-semibold underline" href="/data-rights-request">
          Data Rights Request form
        </a>{' '}
        for applicable access-related information, correction, erasure, consent-withdrawal or grievance
        requests. iFranchise may need to verify identity or authority before acting on a request and will
        not automatically disclose stored personal data through the website.
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    body: 'All platform content, including but not limited to text, graphics, logos, software, data compilations, and user interface elements, is owned by iFranchise or its licensors and is protected under applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the platform for lawful personal or business evaluation purposes only.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the maximum extent permitted by applicable law, iFranchise and its officers, directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the platform, including losses related to investment decisions, franchise outcomes, third-party conduct, or service interruptions.',
  },
  {
    title: 'Indemnification',
    body: 'You agree to indemnify, defend, and hold harmless iFranchise and its affiliates from any claims, liabilities, damages, losses, and expenses - including reasonable legal fees - arising out of your use of the platform, violation of these Terms, infringement of any third-party rights, or submission of inaccurate information.',
  },
  {
    title: 'Termination',
    body: 'REQUIRES LEGAL REVIEW. iFranchise may restrict access to public website functionality where necessary to address misuse, security concerns, legal requirements, or conduct harmful to the website or its users. The website currently has no user-account termination function.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of competent courts located in Bangalore, Karnataka, India, unless otherwise required by applicable law.',
  },
  {
    title: 'Dispute Resolution',
    body: 'Before initiating formal legal proceedings, both parties agree to attempt resolution through good-faith written negotiation for a period of thirty (30) days from the date of written notice. If unresolved, disputes may be referred to binding arbitration under applicable Indian arbitration law, or to courts of competent jurisdiction as mutually agreed.',
  },
  {
    title: 'Modifications to Terms',
    body: 'We reserve the right to update these Terms at any time. Material changes will be communicated through the platform or via registered contact details with reasonable advance notice. Continued use of iFranchise following any update constitutes your acceptance of the revised Terms.',
  },
  {
    title: 'Contact Information',
    body: `REQUIRES LEGAL REVIEW. For questions about these Terms, contact ${SITE_CONTACT_EMAIL} or ${SITE_CONTACT_PHONE_DISPLAY}. [BUSINESS/LEGAL TO CONFIRM: registered legal entity, formal notice address, and authorised legal contact.] Do not include unnecessary personal or confidential information.`,
  },
];

function TermsConditionsPage() {
  return (
    <LegalPageLayout
      badge="REQUIRES LEGAL REVIEW"
      title="Terms & Conditions"
      subtitle="The rules, rights, and responsibilities that govern your use of the iFranchise platform, services, and franchise marketplace ecosystem."
      sections={sections}
    />
  );
}

export default TermsConditionsPage;

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
