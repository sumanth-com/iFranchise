import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 767;

function showsAssistantImmediately(pathname) {
  return (
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/franchise-opportunities'
  );
}

function getMobileScrollThreshold(pathname) {
  if (pathname === '/') {
    return Math.max(window.innerHeight * 0.92, 320);
  }
  return 100;
}

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

/**
 * Desktop: show assistant immediately (including over home hero).
 * Mobile: show immediately on home, contact, and opportunities; other pages after a short scroll.
 */
export function useScrollPastHero(pathname, enabled = true) {
  const [showAssistant, setShowAssistant] = useState(() => {
    if (!enabled) return false;
    if (typeof window === 'undefined') return false;
    if (showsAssistantImmediately(pathname)) return true;
    return !isMobileViewport();
  });

  useEffect(() => {
    if (!enabled) {
      setShowAssistant(false);
      return undefined;
    }

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

    const update = () => {
      if (!mq.matches || showsAssistantImmediately(pathname)) {
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
