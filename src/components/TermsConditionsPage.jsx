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
    body: 'These Terms & Conditions ("Terms") govern your access to and use of the iFranchise platform, including franchise opportunity discovery, brand engagement workflows, advisory services, and all related digital tools and content made available through our website and applications. Please read these Terms carefully before using our services.',
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
    body: `You agree to provide accurate, current, and complete information during registration and throughout your use of the platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. Any unauthorized access or suspected security breach must be reported to us immediately at ${SITE_CONTACT_EMAIL}.`,
  },
  {
    title: 'Prohibited Conduct',
    body: 'You agree not to misuse platform content, submit fraudulent or misleading franchise applications, reverse-engineer any part of the platform, scrape or harvest data without authorization, interfere with system security or availability, impersonate any person or entity, or use the platform for any unlawful purpose. Violations may result in immediate account suspension and legal action.',
  },
  {
    title: 'Franchise Information Disclaimer',
    body: 'Franchise listings, investment figures, ROI projections, and brand descriptions on iFranchise are provided for informational and evaluation purposes only. This information is sourced from franchise brands and has not been independently verified by iFranchise. Users should conduct independent due diligence and seek professional legal and financial advice before making any investment decision.',
  },
  {
    title: 'Payments and Transactions',
    body: 'Certain advisory services, premium listings, or platform features may involve fees. All pricing, applicable taxes, refund eligibility, and payment timelines are governed by the specific service agreement presented at the point of purchase or onboarding. iFranchise uses third-party payment processors and does not store full payment card details on its servers.',
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
    body: 'iFranchise reserves the right to suspend or permanently terminate your access to the platform at any time, with or without notice, for violations of these Terms, security concerns, legal requirements, or conduct deemed harmful to the platform or its users. You may discontinue use of the platform at any time, subject to any outstanding obligations.',
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
    body: `For legal notices, compliance inquiries, or questions about these Terms, please contact us at ${SITE_CONTACT_EMAIL} or ${SITE_CONTACT_PHONE_DISPLAY}. Please include your account information and a clear description of your inquiry for prompt resolution.`,
  },
];

function TermsConditionsPage() {
  return (
    <LegalPageLayout
      badge="Legal"
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

        <LegalContactFooter />
      </div>
    </div>
  );
}
