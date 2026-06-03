import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

export function useIsMobileViewport() {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return mobile;
}
