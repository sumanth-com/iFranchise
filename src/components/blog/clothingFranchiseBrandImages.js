import { BRAND_ASSET_MANIFEST, resolveBrandPublicPaths } from '../../data/opportunities/brandAssetManifest.js';

const odetteEntry = BRAND_ASSET_MANIFEST.find((b) => b.slug === 'odette');
const odetteLogoSrc = odetteEntry ? resolveBrandPublicPaths(odetteEntry).logo : '/brands/odette/odette-franchise-logo.webp';

/** Editorial split images for clothing franchise blog brand sections. */
export const CLOTHING_FRANCHISE_BRAND_BLOCKS = [
  {
    heading: 'Kaira',
    file: 'kaira.webp',
    imagePosition: 'right',
    imageFit: 'contain',
    imageTone: 'light',
    alt: 'Kaira — official brand logo',
  },
  {
    heading: 'Zudio',
    file: 'zudio.webp',
    imagePosition: 'left',
    alt: 'Zudio fashion retail store exterior in India',
  },
  {
    heading: 'Odette',
    src: odetteLogoSrc,
    imagePosition: 'right',
    imageFit: 'contain',
    imageTone: 'light',
    alt: 'Odette — official brand logo',
  },
  {
    heading: 'Pantaloons',
    file: 'pantaloons.webp',
    imagePosition: 'left',
    alt: 'Pantaloons fashion retail — official brand imagery',
  },
  {
    heading: 'Being Human',
    file: 'being-human.webp',
    imagePosition: 'right',
    alt: 'Being Human apparel retail store in India',
  },
  {
    heading: 'Van Heusen',
    file: 'van-heusen.webp',
    imagePosition: 'left',
    imageFit: 'contain',
    imageTone: 'dark',
    alt: 'Van Heusen — official brand logo',
  },
  {
    heading: 'Manyavar & Mohey',
    file: 'manyavar.webp',
    imagePosition: 'right',
    imageFit: 'contain',
    imageTone: 'brand',
    alt: 'Manyavar and Mohey — official brand logo',
  },
  {
    heading: 'Aramya',
    file: 'aramya.webp',
    imagePosition: 'left',
    imageFit: 'contain',
    imageTone: 'light',
    alt: 'Aramya — official brand logo',
  },
  {
    heading: 'Raymond',
    file: 'raymond.webp',
    imagePosition: 'right',
    alt: 'Raymond apparel store in Kolkata, India',
  },
];

/** @param {import('../blogData.js').BlogSection[]} sections */
export function applyClothingFranchiseSplitLayouts(sections) {
  const byHeading = Object.fromEntries(
    CLOTHING_FRANCHISE_BRAND_BLOCKS.map((b) => [b.heading, b]),
  );

  return sections.map((section) => {
    const block = byHeading[section.heading];
    if (!block) return section;

    return {
      ...section,
      layout: 'split',
      imagePosition: block.imagePosition,
      image: {
        src: block.src || (block.file ? `/images/blog-clothing/${block.file}` : ''),
        alt: block.alt,
        fit: block.imageFit || 'cover',
        tone: block.imageTone || 'neutral',
      },
    };
  });
}
