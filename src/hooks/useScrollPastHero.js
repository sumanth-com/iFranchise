import { useEffect, useState } from 'react';

function getScrollThreshold(pathname) {
  if (pathname === '/') {
    const heroHeight = window.innerHeight - 80;
    return Math.max(heroHeight * 0.72, 280);
  }
  return 100;
}

/**
 * Show floating UI only after the user scrolls past the hero (homepage) or slightly on other pages.
 */
export function useScrollPastHero(pathname, enabled = true) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setPastHero(false);
      return undefined;
    }

    const update = () => {
      setPastHero(window.scrollY >= getScrollThreshold(pathname));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname, enabled]);

  return pastHero;
}
