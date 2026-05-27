/**
 * Lazy-loaded Lenis smooth scroll (desktop + touch).
 * Keeps the main bundle smaller and respects reduced-motion.
 */

let scrollPersistRaf = null;

function persistScrollPosition() {
  if (scrollPersistRaf) return;
  scrollPersistRaf = requestAnimationFrame(() => {
    scrollPersistRaf = null;
    try {
      sessionStorage.setItem(
        `ifr:scroll:${window.location.pathname}${window.location.search}`,
        String(window.scrollY),
      );
    } catch {
      /* ignore quota / private mode */
    }
  });
}

function isLowPowerDevice() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 767px)').matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;
  const saveData = navigator.connection?.saveData === true;
  return saveData || (coarse && narrow && cores <= 6) || memory <= 3;
}

export async function initLenisScroll() {
  if (typeof window === 'undefined') return null;

  const isMobile =
    window.matchMedia('(max-width: 767px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || isMobile || isLowPowerDevice()) return null;

  const { default: Lenis } = await import('@studio-freight/lenis');

  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isNarrow = window.matchMedia('(max-width: 1279px)').matches;

  const lenis = new Lenis({
    duration: isCoarsePointer ? 0.85 : 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: isCoarsePointer,
    touchMultiplier: isCoarsePointer ? 1.15 : 1.4,
    wheelMultiplier: isNarrow ? 0.95 : 0.85,
    lerp: isCoarsePointer ? 0.12 : 0.1,
    autoResize: true,
  });

  window.__lenis = lenis;
  document.documentElement.classList.add('lenis', 'lenis-smooth');

  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lenis.on('scroll', persistScrollPosition);

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(raf);
      lenis.resize();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionChange = (e) => {
    if (!e.matches) return;
    cancelAnimationFrame(rafId);
    document.removeEventListener('visibilitychange', onVisibility);
    mq.removeEventListener('change', onMotionChange);
    lenis.destroy();
    window.__lenis = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
  };
  mq.addEventListener('change', onMotionChange);

  return () => {
    cancelAnimationFrame(rafId);
    if (scrollPersistRaf) cancelAnimationFrame(scrollPersistRaf);
    document.removeEventListener('visibilitychange', onVisibility);
    mq.removeEventListener('change', onMotionChange);
    lenis.destroy();
    window.__lenis = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
  };
}

export function scheduleLenisInit() {
  const run = () => {
    void initLenisScroll().catch(() => {
      window.__lenis = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 1200 });
  } else {
    setTimeout(run, 80);
  }
}
