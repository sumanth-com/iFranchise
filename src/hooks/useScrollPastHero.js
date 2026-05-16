import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 767;

function getMobileScrollThreshold(pathname) {
  if (pathname === '/') {
    const heroHeight = window.innerHeight - 80;
    return Math.max(heroHeight * 0.72, 280);
  }
  return 100;
}

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

/**
 * Desktop: show assistant immediately (including over home hero).
 * Mobile: show only after scrolling past the hero on homepage (or slightly on other pages).
 */
export function useScrollPastHero(pathname, enabled = true) {
  const [showAssistant, setShowAssistant] = useState(() => {
    if (!enabled) return false;
    if (typeof window === 'undefined') return false;
    return !isMobileViewport();
  });

  useEffect(() => {
    if (!enabled) {
      setShowAssistant(false);
      return undefined;
    }

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

    const update = () => {
      if (!mq.matches) {
        setShowAssistant(true);
        return;
      }
      setShowAssistant(window.scrollY >= getMobileScrollThreshold(pathname));
    };

    update();
    mq.addEventListener('change', update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname, enabled]);

  return showAssistant;
}
