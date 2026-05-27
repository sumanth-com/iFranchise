import { useEffect, useState } from 'react';

/**
 * Detects low-end / mobile hardware to reduce animation cost without changing layout.
 */
export function useLowPowerDevice() {
  const [lowPower, setLowPower] = useState(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.matchMedia('(max-width: 767px)').matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigator.deviceMemory ?? 8;
    const saveData = navigator.connection?.saveData === true;
    return saveData || (coarse && narrow) || cores <= 4 || memory <= 4;
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const cores = navigator.hardwareConcurrency ?? 8;
      const memory = navigator.deviceMemory ?? 8;
      setLowPower(
        navigator.connection?.saveData === true ||
          (coarse && mq.matches) ||
          cores <= 4 ||
          memory <= 4,
      );
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return lowPower;
}
