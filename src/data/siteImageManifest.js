/**
 * Site UI images: src/assets → public/images/ with readable filenames (no Vite content hashes).
 * Run via scripts/copy-site-images.mjs on dev/build.
 */

/** @param {string} filename */
export function siteImageUrl(filename) {
  return `/images/${filename}`;
}

/** @typedef {{ dest: string, src: string }} SiteImageEntry */

/** @type {SiteImageEntry[]} */
export const SITE_IMAGE_MANIFEST = [
  // Industry cards (home, services, brand owners)
  { dest: 'Retail-and-Jewelry.webp', src: 'Retail & Jewelry.webp' },
  { dest: 'Food-and-Beverage.webp', src: 'Food & Beverage.webp' },
  { dest: 'Healthcare-and-Wellness.webp', src: 'Healthcare & Wellness.webp' },
  { dest: 'Education-and-Training.webp', src: 'Education & Training.webp' },
  { dest: 'Logistics-and-Infrastructure.webp', src: 'Logistics & Infrastructure.webp' },
  { dest: 'Beauty-and-Lifestyle.webp', src: 'Beauty & Lifestyle.webp' },

  // Pages
  { dest: 'about-us.webp', src: 'aboutus.webp' },
  { dest: 'careers-hero.webp', src: 'carrer.webp' },
  { dest: '404.webp', src: '404.webp' },

  // Team
  { dest: 'abdul.webp', src: 'abdul.webp' },
  { dest: 'abrar.webp', src: 'abrar.webp' },

  // Blog
  { dest: 'blog-fallback.webp', src: 'Blog.webp' },
  { dest: 'blog-hero.webp', src: 'bloghero.webp' },
  { dest: 'blog-post-1.webp', src: 'Blog1.webp' },
  { dest: 'blog-post-2.webp', src: 'Blog2.webp' },
  { dest: 'blog-post-3.webp', src: 'Blog3.webp' },
  { dest: 'blog-post-4.webp', src: 'Blog4.webp' },

  // Logos (navbar / header)
  { dest: 'BrandNav.webp', src: 'BrandNav.webp' },
  { dest: 'BrandNav-96w.webp', src: 'BrandNav-96w.webp' },
  { dest: 'BrandNav-192w.webp', src: 'BrandNav-192w.webp' },
  { dest: 'BrandNav-384w.webp', src: 'BrandNav-384w.webp' },
  { dest: 'BrandLogo.webp', src: 'BrandLogo.webp' },
  { dest: 'BrandLogo-96w.webp', src: 'BrandLogo-96w.webp' },
  { dest: 'BrandLogo-192w.webp', src: 'BrandLogo-192w.webp' },

  // Services reviews
  { dest: 'review-1.webp', src: 'R1.webp' },
  { dest: 'review-2.webp', src: 'R2.webp' },
  { dest: 'review-3.webp', src: 'R3.webp' },
  { dest: 'review-4.webp', src: 'R4.webp' },

  // Home hero responsive (desktop srcset; mobile uses /hero/lcp-*.webp)
  { dest: 'hero/home-hero-480w.webp', src: 'HomeHero-480w.webp' },
  { dest: 'hero/home-hero-768w.webp', src: 'HomeHero-768w.webp' },
  { dest: 'hero/home-hero-1024w.webp', src: 'HomeHero-1024w.webp' },
  { dest: 'hero/home-hero-1280w.webp', src: 'HomeHero-1280w.webp' },
  { dest: 'hero/home-hero-1536w.webp', src: 'HomeHero-1536w.webp' },
  { dest: 'hero/home-hero-light-480w.webp', src: 'HomeHero2-480w.webp' },
  { dest: 'hero/home-hero-light-768w.webp', src: 'HomeHero2-768w.webp' },
  { dest: 'hero/home-hero-light-1024w.webp', src: 'HomeHero2-1024w.webp' },
  { dest: 'hero/home-hero-light-1280w.webp', src: 'HomeHero2-1280w.webp' },
  { dest: 'hero/home-hero-light-1536w.webp', src: 'HomeHero2-1536w.webp' },
];

/** Resolved public paths keyed by logical id (for imports across the app). */
export const SITE_IMAGES = {
  retailJewelry: siteImageUrl('Retail-and-Jewelry.webp'),
  foodBeverage: siteImageUrl('Food-and-Beverage.webp'),
  healthcareWellness: siteImageUrl('Healthcare-and-Wellness.webp'),
  educationTraining: siteImageUrl('Education-and-Training.webp'),
  logisticsInfrastructure: siteImageUrl('Logistics-and-Infrastructure.webp'),
  beautyLifestyle: siteImageUrl('Beauty-and-Lifestyle.webp'),

  aboutUs: siteImageUrl('about-us.webp'),
  careersHero: siteImageUrl('careers-hero.webp'),
  notFound: siteImageUrl('404.webp'),

  abdul: siteImageUrl('abdul.webp'),
  abrar: siteImageUrl('abrar.webp'),

  blogFallback: siteImageUrl('blog-fallback.webp'),
  blogHero: siteImageUrl('blog-hero.webp'),
  blogPost1: siteImageUrl('blog-post-1.webp'),
  blogPost2: siteImageUrl('blog-post-2.webp'),
  blogPost3: siteImageUrl('blog-post-3.webp'),
  blogPost4: siteImageUrl('blog-post-4.webp'),

  brandNav: siteImageUrl('BrandNav.webp'),
  brandNav96: siteImageUrl('BrandNav-96w.webp'),
  brandNav192: siteImageUrl('BrandNav-192w.webp'),
  brandNav384: siteImageUrl('BrandNav-384w.webp'),
  brandLogo: siteImageUrl('BrandLogo.webp'),
  brandLogo96: siteImageUrl('BrandLogo-96w.webp'),
  brandLogo192: siteImageUrl('BrandLogo-192w.webp'),

  review1: siteImageUrl('review-1.webp'),
  review2: siteImageUrl('review-2.webp'),
  review3: siteImageUrl('review-3.webp'),
  review4: siteImageUrl('review-4.webp'),
};

export { siteImageUrl as siteImage };
