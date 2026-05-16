import { useEffect, useRef } from 'react';

/**
 * Subtle cursor parallax for hero media — desktop only, rAF-throttled.
 */
export function useHeroParallax(enabled, intensity = 10) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduced) return undefined;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * intensity;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * (intensity * 0.6);
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (ref.current) {
        ref.current.style.setProperty('--hero-px', `${currentX.toFixed(2)}px`);
        ref.current.style.setProperty('--hero-py', `${currentY.toFixed(2)}px`);
      }
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled, intensity]);

  return ref;
}
