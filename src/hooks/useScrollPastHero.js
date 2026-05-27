import { useEffect, useState, useRef } from 'react';

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

  const rafRef = useRef(null);
  const lastScrollRef = useRef(-1);

  useEffect(() => {
    if (!enabled) {
      setShowAssistant(false);
      return undefined;
    }

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

    const measure = () => {
      if (!mq.matches || showsAssistantImmediately(pathname)) {
        setShowAssistant(true);
        return;
      }
      const y = window.scrollY;
      if (y === lastScrollRef.current) return;
      lastScrollRef.current = y;
      setShowAssistant(y >= getMobileScrollThreshold(pathname));
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        measure();
      });
    };

    schedule();
    mq.addEventListener('change', schedule);
    window.addEventListener('scroll', schedule, { passive: true });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(schedule, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      mq.removeEventListener('change', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname, enabled]);

  return showAssistant;
}
