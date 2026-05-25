import { FiArrowRight } from 'react-icons/fi';
import SectionPill from './ui/SectionPill';
import { OUR_SERVICES_ITEMS } from '../data/ourServices';
import {
  getCardBaseStyle,
  cardHoverHandlers,
  serviceIconStyle,
  sectionTitleClass,
  sectionSubtitleClass,
  cardTitleClass,
  cardBodyClass,
  cardListClass,
} from '../lib/cardThemeStyles';

const SERVICE_ICONS = {
  onboarding: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  documentation: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'investor-acquisition': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  branding: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  expansion: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  'investor-onboarding': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

function bindServiceIconHover(el, isLight) {
  if (!el || el.dataset.hoverBound === '1') return;
  el.dataset.hoverBound = '1';
  const card = el.closest('.group');
  if (!card) return;
  const base = serviceIconStyle(isLight);
  const hoverBg = isLight ? 'rgba(124,58,237,0.18)' : 'rgba(139,92,246,0.35)';
  const onEnter = () => {
    el.style.transform = 'scale(1.15) rotate(6deg)';
    el.style.background = hoverBg;
    el.style.boxShadow = '0 0 20px rgba(139,92,246,0.4)';
  };
  const onLeave = () => {
    el.style.transform = 'scale(1) rotate(0deg)';
    el.style.background = base.background;
    el.style.boxShadow = 'none';
  };
  card.addEventListener('mouseenter', onEnter);
  card.addEventListener('mouseleave', onLeave);
}

/**
 * @param {{
 *   isLight: boolean;
 *   cta?: 'view-all' | 'contact' | null;
 *   onViewAllServices?: () => void;
 *   onContact?: () => void;
 *   className?: string;
 * }} props
 */
export default function OurServicesSection({
  isLight,
  cta = null,
  onViewAllServices,
  onContact,
  className = '',
}) {
  return (
    <div className={`relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-16 pb-12 ${className}`}>
      <div className="text-center mb-14">
        <SectionPill className="mb-5">Our Services</SectionPill>
        <h2 className={sectionTitleClass(isLight)}>
          Complete Franchise Growth &amp; Expansion Services
        </h2>
        <p className={sectionSubtitleClass(isLight)}>
          End-to-end franchise services — from strategy and documentation to investor onboarding and brand positioning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OUR_SERVICES_ITEMS.map((s, i) => (
          <div
            key={s.title}
            id={s.anchorId}
            className={`group relative overflow-hidden rounded-2xl flex flex-col theme-light-card ${s.anchorId ? 'scroll-mt-28' : ''}`}
            style={getCardBaseStyle(isLight, {
              opacity: 0,
              transform: 'translateY(24px)',
              animation: `cardReveal 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.07 + 0.1}s forwards`,
              minHeight: '260px',
            })}
            {...cardHoverHandlers(isLight, -6)}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }}
            />
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                transition: 'transform 0.7s ease',
              }}
            />
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  ...serviceIconStyle(isLight),
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, box-shadow 0.3s ease',
                  animation: `iconPulse 3s ease-in-out infinite ${i * 0.4}s`,
                }}
                ref={(el) => bindServiceIconHover(el, isLight)}
              >
                {SERVICE_ICONS[s.id]}
              </div>
              <h3 className={`text-[1rem] font-bold mb-2 leading-snug tracking-[-0.01em] ${cardTitleClass(isLight)}`}>
                {s.title}
              </h3>
              <p className={`text-[0.78rem] leading-relaxed mb-5 ${cardBodyClass(isLight)}`}>{s.desc}</p>
              <ul className="space-y-2 flex-1 mt-auto">
                {s.points.map((p) => (
                  <li key={p} className={`flex items-center gap-2.5 text-[0.76rem] font-medium leading-snug ${cardListClass(isLight)}`}>
                    <span className="flex-shrink-0 w-1 h-1 rounded-full bg-violet-400/60" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {cta === 'view-all' && (
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={onViewAllServices}
            className="group/btn relative overflow-hidden inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)',
              boxShadow: '0 4px 24px rgba(109,40,217,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(109,40,217,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(109,40,217,0.4)';
            }}
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            />
            <span className="relative z-10">View All Services</span>
            <span className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-1">
              <FiArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      )}

      {cta === 'contact' && (
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={onContact}
            className="group/btn relative overflow-hidden inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)',
              boxShadow: '0 4px 24px rgba(109,40,217,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(109,40,217,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(109,40,217,0.4)';
            }}
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            />
            <span className="relative z-10">Get Started with Our Services</span>
            <span className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-1">
              <FiArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
