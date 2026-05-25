import { useMemo, useState } from 'react';
import { FRANCHISE_CATEGORY_IMAGES, IMAGE_FALLBACK } from '../data/sectionImages';

const CATEGORY_FALLBACKS = FRANCHISE_CATEGORY_IMAGES;
const DEFAULT_FALLBACK = IMAGE_FALLBACK;

export function getFranchiseCategoryFromName(name = '') {
  const n = name.toLowerCase();
  if (n.includes('kid') || n.includes('play') || n.includes('zone') || n.includes('game') || n.includes('entertainment')) {
    return 'Entertainment';
  }
  if (n.includes('gym') || n.includes('fit') || n.includes('spa') || n.includes('yoga') || n.includes('wellness')) {
    return 'Health & Wellness';
  }
  if (n.includes('clean') || n.includes('repair') || n.includes('care') || n.includes('home')) {
    return 'Home Services';
  }
  if (n.includes('edu') || n.includes('tutor') || n.includes('academy') || n.includes('learn')) {
    return 'Education';
  }
  if (n.includes('tech') || n.includes('code')) {
    return 'Technology';
  }
  if (n.includes('salon') || n.includes('store') || n.includes('mart') || n.includes('retail') || n.includes('shop')) {
    return 'Retail';
  }
  return 'Food & Beverage';
}

export function buildFranchiseImageFallbacks(franchise) {
  const category = getFranchiseCategoryFromName(franchise.name);
  const primary = franchise.image || franchise.logo || franchise.banner || franchise.gallery?.[0];
  const categoryFallback = CATEGORY_FALLBACKS[category] || DEFAULT_FALLBACK;
  return [...new Set([primary, categoryFallback, DEFAULT_FALLBACK].filter(Boolean))];
}

export default function FranchiseSimilarCardImage({ franchise, className }) {
  const fallbacks = useMemo(() => buildFranchiseImageFallbacks(franchise), [franchise]);
  const [index, setIndex] = useState(0);
  const src = fallbacks[Math.min(index, fallbacks.length - 1)];

  return (
    <img
      src={src}
      alt={franchise.name}
      className={`${className} object-cover object-center`}
      loading="lazy"
      decoding="async"
      width={280}
      height={187}
      sizes="(max-width: 640px) 100vw, 280px"
      onError={() => {
        if (index < fallbacks.length - 1) {
          setIndex((i) => i + 1);
        }
      }}
    />
  );
}
