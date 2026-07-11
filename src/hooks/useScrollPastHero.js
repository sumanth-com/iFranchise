import { useEffect, useState, useRef } from 'react';

const MOBILE_MAX_WIDTH = 767;
const LYB_HERO_ID = 'lyb-hero-section';

function showsAssistantImmediately(pathname) {
  return (
    pathname === '/' ||
    pathname === '/contact-us' ||
    pathname === '/franchise-opportunities' ||
    pathname === '/franchise-details'
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
 * Mobile: show immediately on home, contact, and opportunities; list-your-brand after hero scroll; others on scroll.
 */
export function useScrollPastHero(pathname, enabled = true) {
  const [showAssistant, setShowAssistant] = useState(() => {
    if (!enabled) return false;
    if (typeof window === 'undefined') return false;
    if (pathname === '/list-your-brand') return false;
    if (showsAssistantImmediately(pathname)) return true;
    if (isMobileViewport()) return true;
    return true;
  });

  const rafRef = useRef(null);
  const lastScrollRef = useRef(-1);

  useEffect(() => {
    if (!enabled || pathname !== '/list-your-brand') return undefined;

    const attachObserver = () => {
      const hero = document.getElementById(LYB_HERO_ID);
      if (!hero) return null;

      const whySection = document.querySelector('.list-your-brand-page .lyb-why-section');

      const updateFromHero = () => {
        const { bottom } = hero.getBoundingClientRect();
        setShowAssistant(bottom <= 64);
      };

      const onScroll = () => {
        if (whySection) {
          const { top } = whySection.getBoundingClientRect();
          setShowAssistant(top < window.innerHeight * 0.85);
        } else {
          updateFromHero();
        }
      };

      onScroll();

      const observers = [];

      const heroObserver = new IntersectionObserver(onScroll, {
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 1],
      });
      heroObserver.observe(hero);
      observers.push(heroObserver);

      if (whySection) {
        const whyObserver = new IntersectionObserver(
          ([entry]) => {
            setShowAssistant(entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.85);
          },
          { threshold: 0, rootMargin: '0px' },
        );
        whyObserver.observe(whySection);
        observers.push(whyObserver);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        observers.forEach((observer) => observer.disconnect());
      };
    };

    let detach = attachObserver();
    let retryId;
    let attempts = 0;

    const tryAttach = () => {
      if (detach) return;
      detach = attachObserver();
      if (!detach && attempts < 50) {
        attempts += 1;
        retryId = window.setTimeout(tryAttach, 120);
      }
    };

    if (!detach) {
      tryAttach();
    }

    const onMqChange = () => {
      detach?.();
      detach = null;
      attempts = 0;
      if (retryId) window.clearTimeout(retryId);
      detach = attachObserver();
      if (!detach) tryAttach();
    };
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    mq.addEventListener('change', onMqChange);

    return () => {
      mq.removeEventListener('change', onMqChange);
      detach?.();
      if (retryId) window.clearTimeout(retryId);
    };
  }, [pathname, enabled]);

  useEffect(() => {
    if (!enabled) {
      setShowAssistant(false);
      return undefined;
    }

    if (pathname === '/list-your-brand') {
      return undefined;
    }

    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

    const measure = () => {
      if (!mq.matches || showsAssistantImmediately(pathname)) {
        setShowAssistant(true);
        return;
      }
      if (mq.matches) {
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
