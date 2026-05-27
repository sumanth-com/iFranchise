/** Navbar / header logos — responsive WebP (see scripts/optimize-ui-assets.mjs). */
import brandNav from '../assets/BrandNav.webp';
import brandNav96 from '../assets/BrandNav-96w.webp';
import brandNav192 from '../assets/BrandNav-192w.webp';
import brandNav384 from '../assets/BrandNav-384w.webp';

import brandLogo from '../assets/BrandLogo.webp';
import brandLogo96 from '../assets/BrandLogo-96w.webp';
import brandLogo192 from '../assets/BrandLogo-192w.webp';

import { buildResponsiveSrc } from './responsiveImage';

export const NAV_LOGO = {
  src: brandNav,
  ...buildResponsiveSrc(
    { 96: brandNav96, 192: brandNav192, 384: brandNav384 },
    brandNav,
    '(max-width: 640px) 40px, 48px',
  ),
};

export const HEADER_BRAND_LOGO = {
  src: brandLogo,
  ...buildResponsiveSrc(
    { 96: brandLogo96, 192: brandLogo192 },
    brandLogo,
    '(max-width: 640px) 48px, 64px',
  ),
};
