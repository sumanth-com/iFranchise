/** Shared surface card styles for Hero / franchise grids (dark + light). */

const DARK = {
  bg: 'linear-gradient(145deg, #12082a 0%, #0e0620 50%, #0a0618 100%)',
  border: 'rgba(139,92,246,0.18)',
  shadow: '0 4px 24px rgba(0,0,0,0.4)',
  shadowHover: '0 20px 50px rgba(109,40,217,0.3)',
  borderHover: 'rgba(139,92,246,0.45)',
};

const LIGHT = {
  bg: '#ffffff',
  border: '#e2e8f0',
  shadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  shadowHover: '0 12px 32px rgba(124, 58, 237, 0.14)',
  borderHover: '#c4b5fd',
};

export function getCardSurface(isLight) {
  return isLight ? LIGHT : DARK;
}

export function getCardBaseStyle(isLight, extra = {}) {
  const s = getCardSurface(isLight);
  return {
    background: s.bg,
    border: `1px solid ${s.border}`,
    boxShadow: s.shadow,
    transition:
      'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
    ...extra,
  };
}

export function cardHoverHandlers(isLight, liftPx = -6) {
  const s = getCardSurface(isLight);
  return {
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = `translateY(${liftPx}px)`;
      e.currentTarget.style.boxShadow = s.shadowHover;
      e.currentTarget.style.borderColor = s.borderHover;
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = s.shadow;
      e.currentTarget.style.borderColor = s.border;
    },
  };
}

export function metricBoxStyle(isLight) {
  return isLight
    ? { background: '#f8fafc', border: '1px solid #e2e8f0' }
    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' };
}

export function tagVioletStyle(isLight) {
  return isLight
    ? { background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#5b21b6' }
    : { background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', color: '#ffffff' };
}

export function tagNeutralStyle(isLight) {
  return isLight
    ? { background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#334155' }
    : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff' };
}

export function serviceIconStyle(isLight) {
  return isLight
    ? { background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#7c3aed' }
    : { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' };
}

export function pillBadgeStyle(isLight) {
  return isLight
    ? {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        backdropFilter: 'none',
      }
    : {
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(8px)',
      };
}

export function imageCornerTagStyle(isLight) {
  return isLight
    ? {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        color: '#6d28d9',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.08)',
        backdropFilter: 'none',
      }
    : {
        background: 'rgba(109, 40, 217, 0.75)',
        border: '1px solid rgba(167, 139, 250, 0.3)',
        color: '#ffffff',
        backdropFilter: 'blur(10px)',
      };
}

export function sectionHeadingClass(isLight) {
  return isLight ? 'text-slate-900' : 'text-white';
}

/** @deprecated Prefer sectionTitleClass from typography.js */
export function sectionBodyClass(isLight) {
  return isLight ? 'text-slate-600' : 'text-white';
}

export {
  sectionTitleClass,
  sectionSubtitleClass,
  pageHeroClass,
  heroDisplayClass,
  cardTitleTypoClass,
} from './typography.js';

export function sectionBadgeTextClass(isLight) {
  return isLight ? 'text-slate-900' : 'text-white';
}

export function cardTitleClass(isLight) {
  return isLight ? 'text-slate-900' : 'text-white';
}

export function cardBodyClass(isLight) {
  return isLight ? 'text-slate-700' : 'text-white';
}

export function cardListClass(isLight) {
  return isLight ? 'text-slate-700' : 'text-white';
}
