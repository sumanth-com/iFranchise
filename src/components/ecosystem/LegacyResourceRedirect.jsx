import { useEffect } from 'react';
import { navigateTo } from '../../lib/navigation';
import { getLegacyRedirectTarget } from '../../data/ecosystem/ecosystemRoutes';

export default function LegacyResourceRedirect() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const target = getLegacyRedirectTarget(pathname);

  useEffect(() => {
    if (target) navigateTo(target, { replace: true });
  }, [target]);

  return null;
}
