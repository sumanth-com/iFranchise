import { useEffect, useRef, useState } from 'react';
import brandLogo from '../assets/BrandNav.png';
import FooterJumpLink from './footer/FooterJumpLink';
import FooterSocialButtons from './footer/FooterSocialButtons';
import { getPartnerBrandLogos } from '../data/franchiseData';
import { navigateTo } from '../lib/navigation';
import { TYPE } from '../lib/typography.js';
import { SITE_CONTACT_ADDRESS, SITE_CONTACT_MAPS_URL } from '../data/siteContact';

const PARTNER_BRAND_NAMES = getPartnerBrandLogos(12).map((p) => p.name);
const BRAND_NAME_TRACK =
  PARTNER_BRAND_NAMES.length > 0
    ? [...PARTNER_BRAND_NAMES, ...PARTNER_BRAND_NAMES]
    : [];

// -- Link dot indicator --------------------------------------------------------
function LinkDot({ type, color }) {
  if (!type || type === 'none') return null;
  return (
    <span
      style={{
        display: 'inline-block',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: color || '#22c55e',
        flexShrink: 0,
        animation: type === 'blink' ? 'footerDotBlink 1s ease-in-out infinite' : 'none',
      }}
    />
  );
}

// -- Footer link columns -------------------------------------------------------
const FOOTER_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  path: '/about',   dot: 'none' },
      { label: 'Contact',   path: '/contact', dot: 'none' },
      { label: 'Careers',   path: '/careers', dot: 'none' },
    ],
  },
  {
    heading: 'For Investors',
    links: [
      { label: 'Opportunities', path: '/franchise-opportunities', dot: 'none' },
      { label: 'Industries', path: '/franchise-opportunities', dot: 'none' },
    ],
  },
  {
    heading: 'For Brands',
    links: [{ label: 'List Your Brand', path: '/list-your-brand', dot: 'none' }],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', path: '/blog', dot: 'none' },
      { label: 'FAQs', path: '/#faq', dot: 'none' },
    ],
  },
];

const FOOTER_LOCATION_ICON = (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

function scrollToCareerApply() {
  const el = document.getElementById('career-apply');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const CTA_CONTENT = {
  default: {
    heading: 'Ready to Build, Invest, or Expand?',
    description:
      'Whether you are exploring franchise investment opportunities or planning to scale your business, iFranchise helps you move forward with clarity, confidence, and the right connections.',
    trust: 'Trusted by 1,200+ founders.',
    primary: { label: 'Explore Opportunities', action: () => navigateTo('/franchise-opportunities') },
    secondary: { label: 'Book Strategic Call', action: () => window.open('https://cal.com/ifranchise/30min', '_blank') },
  },
  'careers-detail': {
    heading: 'Ready to Join Our Team?',
    description:
      "Help us build India's franchise intelligence platform. Submit your application above, or explore other open roles across design, growth, engineering, and operations.",
    trust: 'We read every application - Response within 5 business days.',
    primary: { label: 'Apply for This Role', action: scrollToCareerApply },
    secondary: { label: 'View All Open Roles', action: () => navigateTo('/careers') },
  },
};

// -- Main component ------------------------------------------------------------
export default function PreFooterCTA({ variant = 'default', shellClassName = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const cta = CTA_CONTENT[variant] || CTA_CONTENT.default;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Small delay so element is definitely off-screen on first load
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold: 0.06 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Stagger delays for each reveal element
  const reveal = (delay = 0) => ({
    opacity: 0,
    transform: 'translateY(22px)',
    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    ...(visible && { opacity: 1, transform: 'translateY(0)' }),
  });

  const usesContentShell = Boolean(shellClassName);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>

      <div className={usesContentShell ? shellClassName : undefined}>
      {/* -- Unified card -- */}
      <div
        ref={ref}
        className="prefooter-unified-card"
        style={{
          maxWidth: usesContentShell ? '100%' : '1200px',
          margin: usesContentShell ? undefined : '0 auto',
          padding: usesContentShell ? 0 : '0 16px',
          width: usesContentShell ? '100%' : undefined,
          borderRadius: '28px',
          border: '1px solid',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Inner gradient shimmer */}
        <div
          aria-hidden="true"
          className="prefooter-unified-card__shimmer"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />

        {/* ══════════════════════════════════════════
            TOP - CTA
        ══════════════════════════════════════════ */}
        <div
          style={{
            padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px) 60px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Heading - staggered transition reveal */}
          <div style={{ marginBottom: '20px' }}>
            <h2 className={`${TYPE.ctaTitle} text-white`} style={{ margin: '0 0 6px', ...reveal(0.05) }}>
              {cta.heading}
            </h2>
          </div>

          {/* Description */}
          <p style={{ maxWidth: '620px', margin: '0 auto 28px', fontSize: '16px', lineHeight: 1.65, color: '#ffffff', ...reveal(0.28) }}>
            {cta.description}
          </p>

          {/* Status */}
          <div className="prefooter-trust-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 500, marginBottom: '28px', ...reveal(0.36) }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)', display: 'inline-block', flexShrink: 0 }} />
            {cta.trust}
          </div>

          {/* Pre-footer CTAs - black buttons, white text */}
          <div className="prefooter-cta-row" style={reveal(0.44)}>
            {/* Primary - Explore Opportunities */}
            <button
              type="button"
              onClick={cta.primary.action}
              className="prefooter-cta-btn"
            >
              <span className="prefooter-cta-btn__inner">
                {cta.primary.label}
                <span className="prefooter-cta-btn__arrow" aria-hidden>
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
                  </svg>
                </span>
              </span>
            </button>

            {/* Secondary - Book Strategic Call (Changed from List Your Brand) */}
            <button
              type="button"
              onClick={cta.secondary.action}
              className="prefooter-cta-btn"
            >
              <span className="prefooter-cta-btn__inner">
                {cta.secondary.label}
                <span className="prefooter-cta-btn__arrow" aria-hidden>
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Franchise brand names — text rail (no image logos) */}
          <div className="prefooter-brand-names" style={reveal(0.54)}>
            <p className="prefooter-brand-names__label">
              Trusted by franchise brands on the iFranchise network
            </p>
            {BRAND_NAME_TRACK.length > 0 && (
              <div className="prefooter-brand-names__mask">
                <div className="prefooter-brand-names__track animate-marquee-right">
                  {BRAND_NAME_TRACK.map((name, i) => (
                    <span key={`${name}-${i}`} className="prefooter-brand-names__item">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM - FOOTER CONTENT
        ══════════════════════════════════════════ */}
        <div
          style={{
            borderTop: '1px solid rgba(139,92,246,0.2)',
            padding: 'clamp(36px, 5vw, 52px) clamp(24px, 6vw, 80px) 0',
            position: 'relative', 
            zIndex: 1,
          }}
        >
          <div className="footer-main-grid">

            {/* -- Col 1: Brand + office address (footer only) -- */}
            <div className="footer-main-grid-brand">
              <div className="footer-brand-lockup">
                <img src={brandLogo} alt="iFranchise" className="footer-brand-logo" width={34} height={34} />
                <span className="footer-brand-name">iFranchise</span>
              </div>
              <div className="footer-brand-address">
                <div className="footer-brand-address__row">
                  <span className="footer-brand-address__icon" aria-hidden>
                    {FOOTER_LOCATION_ICON}
                  </span>
                  <a
                    href={SITE_CONTACT_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-brand-address__text footer-brand-address__link"
                  >
                    {SITE_CONTACT_ADDRESS}
                  </a>
                </div>
              </div>
            </div>

            {/* -- Link columns -- */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="footer-main-grid-col">
                <p className="footer-col-heading">{col.heading}</p>
                <ul className="footer-links-list">
                  {col.links.map((link) => (
                    <li key={link.label} className="footer-links-list__item">
                      <FooterJumpLink
                        href={link.path}
                        onClick={(e) => { e.preventDefault(); navigateTo(link.path); }}
                      >
                        {link.label}
                      </FooterJumpLink>
                      {link.dot !== 'none' && <LinkDot type={link.dot} color={link.dotColor} />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>


          {/* -- Bottom bar -- */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright">@ 2026 iFranchise. All rights reserved.</p>
            <div className="footer-bottom-right">
              <div className="footer-follow-block">
                <p className="footer-follow-heading">Follow Us</p>
                <FooterSocialButtons />
              </div>
              <div className="footer-legal-links">
                {[
                  { label: 'Privacy Policy', path: '/privacy-policy' },
                  { label: 'Terms of Service', path: '/terms-and-conditions' },
                ].map((item) => (
                  <FooterJumpLink
                    key={item.label}
                    href={item.path}
                    className="footer-jump-link--legal"
                    onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                  >
                    {item.label}
                  </FooterJumpLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div style={{ height: '32px' }} />
    </div>
  );
}



