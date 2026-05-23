import { useEffect, useRef, useState } from 'react';
import brandLogo from '../assets/BrandNav.png';
import FooterJumpLink from './footer/FooterJumpLink';
import FooterSocialButtons from './footer/FooterSocialButtons';
import { navigateTo } from '../lib/navigation';
import { TYPE } from '../lib/typography.js';

// -- Inline SVG logos ----------------------------------------------------------
const LOGOS = [
  {
    name: 'Quantum',
    svg: (
      <svg viewBox="0 0 96 24" fill="currentColor" className="h-5 w-auto">
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <text x="28" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" letterSpacing="-0.3">Quantum</text>
      </svg>
    ),
  },
  {
    name: 'APEX',
    svg: (
      <svg viewBox="0 0 68 24" fill="currentColor" className="h-5 w-auto">
        <polygon points="12,3 21,21 3,21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <text x="28" y="17" fontSize="13" fontWeight="800" fontFamily="Inter,system-ui,sans-serif" letterSpacing="0.5">APEX</text>
      </svg>
    ),
  },
  {
    name: 'Celestial',
    svg: (
      <svg viewBox="0 0 92 24" fill="currentColor" className="h-5 w-auto">
        <path d="M12 3 L14.5 9.5 L21 12 L14.5 14.5 L12 21 L9.5 14.5 L3 12 L9.5 9.5 Z" />
        <text x="28" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" letterSpacing="-0.3">Celestial</text>
      </svg>
    ),
  },
  {
    name: 'Nexus',
    svg: (
      <svg viewBox="0 0 76 24" fill="currentColor" className="h-5 w-auto">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text x="28" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" letterSpacing="-0.3">Nexus</text>
      </svg>
    ),
  },
  {
    name: 'Orbit',
    svg: (
      <svg viewBox="0 0 70 24" fill="currentColor" className="h-5 w-auto">
        <ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" />
        <text x="28" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" letterSpacing="-0.3">Orbit</text>
      </svg>
    ),
  },
  {
    name: 'Vanta',
    svg: (
      <svg viewBox="0 0 70 24" fill="currentColor" className="h-5 w-auto">
        <path d="M3 5 L12 19 L21 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" letterSpacing="-0.3">Vanta</text>
      </svg>
    ),
  },
];

const LOGO_TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

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

// -- Hiring badge --------------------------------------------------------------
function HiringBadge() {
  return <span className="footer-hiring-badge">Hiring</span>;
}

// -- Footer link columns -------------------------------------------------------
const FOOTER_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  path: '/about',   dot: 'none' },
      { label: 'Contact',   path: '/contact', dot: 'none' },
      { label: 'Careers',   path: '/careers', dot: 'none', badge: true },
    ],
  },
  {
    heading: 'For Investors',
    links: [
      { label: 'Opportunities', path: '/franchise-opportunities', dot: 'none' },
      { label: 'Investment Guide',     path: '/blog',                    dot: 'none' },
      { label: 'Industries',           path: '/franchise-opportunities', dot: 'none' },
    ],
  },
  {
    heading: 'For Brands',
    links: [
      { label: 'List Your Brand',      path: '/list-your-brand', dot: 'none' },
      { label: 'Expansion', path: '/contact', dot: 'none' },
      { label: 'Lead Generation',      path: '/services',         dot: 'none' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog',             path: '/blog',                dot: 'none' },
      { label: 'FAQs',             path: '/#faq',                dot: 'none' },
      { label: 'Franchise Guides', path: '/blog',                dot: 'none' },
      { label: 'Industry Reports', path: '/blog',                dot: 'none' },
    ],
  },
];

// -- Quick Connect -------------------------------------------------------------
const QUICK_CONNECT = [
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Head Office',
    value: '12th Floor, Prestige Tower, MG Road, Bengaluru - 560001',
  },
];

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

          {/* Logo scroll */}
          <div style={{ ...reveal(0.54), overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '52px', width: 'max-content', animation: 'preFooterScroll 26s linear infinite' }}>
              {LOGO_TRACK.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  style={{ color: 'rgba(255,255,255,0.5)', opacity: 1, flexShrink: 0, transition: 'opacity 0.22s ease, color 0.22s ease, transform 0.22s ease', cursor: 'default', userSelect: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {logo.svg}
                </div>
              ))}
            </div>
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

            {/* -- Col 1: Brand + Address -- */}
            <div className="footer-main-grid-brand">
              <div className="footer-brand-lockup">
                <img src={brandLogo} alt="iFranchise" className="footer-brand-logo" width={34} height={34} />
                <span className="footer-brand-name">iFranchise</span>
              </div>
              <div className="footer-brand-address">
                {QUICK_CONNECT.map((item) => (
                  <div key={item.label} className="footer-brand-address__row">
                    <span className="footer-brand-address__icon" aria-hidden>{item.icon}</span>
                    <p className="footer-brand-address__text">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* -- Cols 2 & 3: Link columns -- */}
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
                      {link.badge && <HiringBadge />}
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



