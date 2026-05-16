import { useEffect, useState } from 'react';

/**
 * Defer mounting non-critical UI until the main thread is idle.
 */
export function useDeferredMount(timeoutMs = 2500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mount = () => setReady(true);

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(mount, { timeout: timeoutMs });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(mount, Math.min(timeoutMs, 1200));
    return () => window.clearTimeout(timer);
  }, [timeoutMs]);

  return ready;
}
