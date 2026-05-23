import { useMemo, useState } from 'react';

const CATEGORY_FALLBACKS = {
  'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
  Education: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  Technology: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  Retail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
  Entertainment: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80';

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
      onError={() => {
        if (index < fallbacks.length - 1) {
          setIndex((i) => i + 1);
        }
      }}
    />
  );
}
