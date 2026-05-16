import { useEffect, useRef } from 'react';
import SectionPill from '../ui/SectionPill';
import { useTheme } from '../../context/ThemeContext';

const WHY_CARDS = [
  {
    title: 'Verified Opportunities',
    desc: 'Every opportunity is reviewed and structured to provide clarity and transparency.',
    delay: 0,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Faster Brand Expansion',
    desc: 'We help brands connect with the right investors to scale faster across markets.',
    delay: 0.07,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Investor-Focused Discovery',
    desc: 'Simplified franchise discovery experience designed around business goals and investment intent.',
    delay: 0.14,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Data-Driven Marketplace',
    desc: 'Industry-focused insights and structured business information help users make better decisions.',
    delay: 0.21,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cinematic-scroll-reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function WhyCard({ card, isLight }) {
  const iconBase = isLight
    ? { background: 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)', border: '1px solid #5b21b6', color: '#ffffff', boxShadow: '0 8px 24px rgba(109,40,217,0.25)' }
    : { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', boxShadow: 'none' };

  return (
    <Reveal delay={card.delay} className="h-full">
      <div
        className="theme-light-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(109,40,217,0.3)';
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)';
        }}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl transition-transform duration-700 group-hover:translate-x-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
        />

        <div className="relative flex h-44 items-center justify-center overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
          />
          <div
            className="why-feature-icon relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 [&_svg]:text-current"
            style={iconBase}
          >
            {card.icon}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-2">
          <h3 className="why-card-title mb-2 text-[1rem] font-bold leading-snug">{card.title}</h3>
          <p className="why-card-desc text-[0.8rem] leading-relaxed">{card.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function WhyIFranchiseSection({ className = '' }) {
  const { isLight } = useTheme();

  return (
    <section className={`why-ifranchise-section relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 ${className}`.trim()}>
      <div className="section-container relative z-10">
        <div className="theme-section-on-light mb-8 text-center sm:mb-10">
          <SectionPill className="mb-4">Why iFranchise</SectionPill>
          <h2 className="why-section-heading mx-auto mb-3 max-w-3xl px-4 text-[clamp(1.5rem,4.5vw,2.25rem)] font-extrabold leading-[1.15] tracking-tight">
            Why Investors and Brands Choose iFranchise
          </h2>
          <p className="why-section-subtitle mx-auto max-w-2xl px-4 text-sm leading-relaxed">
            Built to simplify franchise discovery, expansion, and investment through structured business intelligence.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card) => (
            <WhyCard key={card.title} card={card} isLight={isLight} />
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, '', '/franchise-opportunities');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="why-section-cta group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)', boxShadow: '0 4px 20px rgba(109,40,217,0.35)' }}
          >
            Explore Franchise Opportunities
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
