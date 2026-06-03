import { useEffect, useState } from 'react';

/** Avoid importing framer-motion on the critical path (Navbar / ThemeToggle). */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
