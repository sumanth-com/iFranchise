import { useEffect, useMemo } from 'react';
import { resolvePageSeo } from '../../seo/resolvePageSeo';
import { applyPageHead, applyStructuredData } from '../../seo/applyHead';
import { buildSchemasForRoute } from '../../seo/structuredData';
import { THEME_COLORS } from '../../seo/config';
import { getBlogBySlug } from '../blogData';
import { ROLES } from '../careersData';
import { franchiseOpportunities } from '../../data/franchiseData';

function getThemeColor() {
  if (typeof document === 'undefined') return THEME_COLORS.dark;
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? THEME_COLORS.light
    : THEME_COLORS.dark;
}

function getSeoContext(logicalPathname) {
  if (typeof window === 'undefined') return {};

  const pathname = window.location.pathname;
  const search = window.location.search;

  if (logicalPathname === '/blog-detail') {
    const slug = pathname.split('/').filter(Boolean)[1];
    return { blogPost: getBlogBySlug(slug) };
  }

  if (logicalPathname === '/career-detail') {
    const roleId = pathname.split('/').filter(Boolean)[1];
    return { careerRole: ROLES.find((r) => r.id === roleId) };
  }

  if (logicalPathname === '/franchise-details') {
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const franchise = franchiseOpportunities.find((f) => String(f.id) === String(id));
    return { franchiseBrand: franchise?.brandName };
  }

  return {};
}

/**
 * Centralized per-route SEO — updates document head on navigation (no UI changes).
 */
export default function PageSEO({ pathname: logicalPathname }) {
  const locationKey =
    typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.search}`
      : logicalPathname;

  const seo = useMemo(
    () =>
      resolvePageSeo(logicalPathname, {
        pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
        search: typeof window !== 'undefined' ? window.location.search : '',
      }),
    [logicalPathname, locationKey],
  );

  useEffect(() => {
    applyPageHead(seo, { themeColor: getThemeColor() });

    const context = getSeoContext(logicalPathname);
    applyStructuredData(buildSchemasForRoute(seo, context));
  }, [seo, logicalPathname]);

  useEffect(() => {
    const root = document.documentElement;
    const syncThemeColor = () => {
      applyPageHead(seo, { themeColor: getThemeColor() });
    };

    const observer = new MutationObserver(syncThemeColor);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [seo]);

  return null;
}
