import { useEffect, useRef, useState } from 'react';

// ── Navigation helper ─────────────────────────────────────────────────────────
function navigateTo(path) {
  // Save scroll position before navigating away from home
  if (window.location.pathname === '/') {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ── Inline SVG logos ──────────────────────────────────────────────────────────
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

// ── Link dot indicator ────────────────────────────────────────────────────────
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

// ── Hiring badge ──────────────────────────────────────────────────────────────
function HiringBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 7px',
        borderRadius: '999px',
        backgroundColor: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
        fontSize: '10px',
        fontWeight: 700,
        color: '#ef4444',
        letterSpacing: '0.04em',
        animation: 'footerHiringBreath 2s ease-in-out infinite',
        flexShrink: 0,
      }}
    >
      Hiring
    </span>
  );
}

// ── Footer link columns ───────────────────────────────────────────────────────
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
      { label: 'Browse Opportunities', path: '/franchise-opportunities', dot: 'none' },
      { label: 'Investment Guide',     path: '/blog',                    dot: 'none' },
      { label: 'Industries',           path: '/franchise-opportunities', dot: 'none' },
    ],
  },
  {
    heading: 'For Brands',
    links: [
      { label: 'List Your Brand',      path: '/list-your-brand', dot: 'none' },
      { label: 'Franchise Expansion',  path: '/contact', dot: 'none' },
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

// ── Social icons ──────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

// ── Quick Connect ─────────────────────────────────────────────────────────────
const QUICK_CONNECT = [
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Head Office',
    value: '12th Floor, Prestige Tower, MG Road, Bengaluru – 560001',
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function PreFooterCTA() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>

      {/* ── Unified card ── */}
      <div
        ref={ref}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(139,92,246,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Inner gradient shimmer */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 50%, rgba(99,102,241,0.06) 100%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* ══════════════════════════════════════════
            TOP — CTA
        ══════════════════════════════════════════ */}
        <div
          style={{
            padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px) 60px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Heading — staggered transition reveal */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: '#ffffff', margin: '0 0 6px', ...reveal(0.05) }}>
              Ready to Build, Invest, or Expand?
            </h2>
          </div>

          {/* Description */}
          <p style={{ maxWidth: '620px', margin: '0 auto 28px', fontSize: '16px', lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', ...reveal(0.28) }}>
            Whether you are exploring franchise investment opportunities or planning to scale your business, iFranchise helps you move forward with clarity, confidence, and the right connections.
          </p>

          {/* Status */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: '28px', ...reveal(0.36) }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)', display: 'inline-block', flexShrink: 0 }} />
            Trusted by 1,200+ founders.
          </div>

          {/* Buttons - Both Black with Premium Animations */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '44px', ...reveal(0.44) }}>
            {/* Primary — Explore Opportunities */}
            <button
              onClick={() => navigateTo('/franchise-opportunities')}
              className="cta-button-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', borderRadius: '16px',
                backgroundColor: '#0B1220', color: '#fff',
                fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#1a2332';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(11,15,25,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#0B1220';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(11,15,25,0.25)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '10px' }}>
                Explore Opportunities
                <span style={{ 
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                  width: '20px', height: '20px', borderRadius: '50%', 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }} className="arrow-circle">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
                  </svg>
                </span>
              </span>
            </button>

            {/* Secondary — Book Strategic Call (Changed from List Your Brand) */}
            <button
              onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}
              className="cta-button-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', borderRadius: '16px',
                backgroundColor: '#0B1220', color: '#fff',
                fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 4px 20px rgba(11,15,25,0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#1a2332';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(11,15,25,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#0B1220';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(11,15,25,0.25)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '10px' }}>
                Book Strategic Call
                <span style={{ 
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                  width: '20px', height: '20px', borderRadius: '50%', 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }} className="arrow-circle">
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
            BOTTOM — FOOTER CONTENT
        ══════════════════════════════════════════ */}
        <div
          style={{
            borderTop: '1px solid rgba(139,92,246,0.2)',
            padding: 'clamp(36px, 5vw, 52px) clamp(24px, 6vw, 80px) 0',
            position: 'relative', 
            zIndex: 1,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px 32px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>

            {/* ── Col 1: Brand + Address ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '9px', backgroundColor: '#0b0f19', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '14px' }}>iF</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: '17px', color: '#ffffff', letterSpacing: '-0.02em' }}>iFranchise</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {QUICK_CONNECT.map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Cols 2 & 3: Link columns ── */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>{col.heading}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {col.links.map((link) => (
                    <li key={link.label} style={{ display: 'inline-flex' }}>
                      <a
                        href={link.path}
                        onClick={(e) => { e.preventDefault(); navigateTo(link.path); }}
                        style={{ fontSize: '14px', color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '7px' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#8b5cf6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#475569';
                        }}
                      >
                        {link.label}
                        {link.dot !== 'none' && <LinkDot type={link.dot} color={link.dotColor} />}
                        {link.badge && <span style={{ marginLeft: '4px' }}><HiringBadge /></span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ── Col 4: Socials ── */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: '16px', textAlign: 'center' }}>Follow Us</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', flexShrink: 0 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                      e.currentTarget.style.backgroundColor = 'rgba(139,92,246,0.8)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(11,15,25,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>


          {/* ── Bottom bar ── */}
          <div style={{ 
            borderTop: '1px solid rgba(139,92,246,0.2)', 
            padding: '18px 0 24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '12px',
            position: 'relative',
            zIndex: 1,
          }}
          className="footer-bottom-bar"
          >
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }} className="footer-copyright">@ 2026 iFranchise. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="footer-links">
              {[
                { label: 'Privacy Policy',   path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-and-conditions' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#8b5cf6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '32px' }} />
    </div>
  );
}



