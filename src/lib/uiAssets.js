/** Navbar / header logos — public /images/ URLs (see siteImageManifest.js). */
import { SITE_IMAGES } from '../data/siteImageManifest.js';
import { buildResponsiveSrc } from './responsiveImage';

export const NAV_LOGO = {
  src: SITE_IMAGES.brandNav,
  ...buildResponsiveSrc(
    { 96: SITE_IMAGES.brandNav96, 192: SITE_IMAGES.brandNav192, 384: SITE_IMAGES.brandNav384 },
    SITE_IMAGES.brandNav,
    '(max-width: 640px) 40px, 48px',
  ),
};

export const HEADER_BRAND_LOGO = {
  src: SITE_IMAGES.brandLogo,
  ...buildResponsiveSrc(
    { 96: SITE_IMAGES.brandLogo96, 192: SITE_IMAGES.brandLogo192 },
    SITE_IMAGES.brandLogo,
    '(max-width: 640px) 48px, 64px',
  ),
};
