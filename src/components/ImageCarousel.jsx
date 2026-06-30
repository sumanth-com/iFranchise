import { useEffect, useMemo, useState, useRef } from 'react';
import { CAROUSEL_CATEGORY_IMAGES } from '../data/sectionImages';

const CATEGORY_FALLBACKS = CAROUSEL_CATEGORY_IMAGES;

const CATEGORY_FALLBACK_ROTATION = [
  CATEGORY_FALLBACKS.food,
  CATEGORY_FALLBACKS.retail,
  CATEGORY_FALLBACKS.entertainment,
  CATEGORY_FALLBACKS.fitness,
  CATEGORY_FALLBACKS.education,
  CATEGORY_FALLBACKS.service,
  CATEGORY_FALLBACKS.default,
];

function fallbackForSlide(category, idx) {
  const primary = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
  if (idx === 0) return primary;
  return CATEGORY_FALLBACK_ROTATION[idx % CATEGORY_FALLBACK_ROTATION.length] || primary;
}

function Chevron({ direction = 'left' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-6 lg:w-6">
      <path
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isBundledSrc(src) {
  return typeof src === 'string' && src.length > 0 && !/^https?:\/\//i.test(src);
}

function markImageLoaded(setLoaded, idx) {
  setLoaded((prev) => {
    if (prev[idx]) return prev;
    const next = [...prev];
    next[idx] = true;
    return next;
  });
}

function alternateBundledSrc(src) {
  if (!isBundledSrc(src)) return null;
  if (/\.webp$/i.test(src)) return src.replace(/\.webp$/i, '.png');
  if (/\.(png|jpe?g)$/i.test(src)) return src.replace(/\.(png|jpe?g)$/i, '.webp');
  return null;
}

export default function ImageCarousel({
  images,
  alt,
  category = 'default',
  heightClassName = 'h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]',
  showThumbnails = false,
  fillParent = false,
  className = '',
  imageFit = 'cover',
  galleryBackground,
  /** Preload every slide (brand detail galleries) so prev/next always show real photos */
  preloadAll = false,
  /** When true, never substitute Unsplash/category stock photos on missing or failed loads */
  brandAssetsOnly = false,
  imageSizes = '(max-width: 1023px) 100vw, 42vw',
  /** When set, this slide uses contain so the brand logo is fully visible as the first frame. */
  logoSrc = null,
}) {
  const safeImages = useMemo(() => {
    const list = (images || []).filter(Boolean);
    const unique = Array.from(new Set(list));
    if (unique.length) return unique;
    if (brandAssetsOnly) return [];
    const fallback = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
    return [fallback];
  }, [images, category, brandAssetsOnly]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState(() => safeImages.map(() => false));
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  const objectFitClass = imageFit === 'contain' ? 'object-contain' : 'object-cover';

  const slideObjectFitClass = (src) => {
    if (logoSrc && src === logoSrc) return 'object-contain p-1 sm:p-2';
    return objectFitClass;
  };

  const activeSrc = safeImages[activeIdx];
  const isLogoSlide = Boolean(logoSrc && activeSrc === logoSrc);

  useEffect(() => {
    setActiveIdx(0);
    setLoaded(safeImages.map(() => false));
    imageRefs.current = [];
  }, [safeImages]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      imageRefs.current.forEach((img, idx) => {
        if (img?.complete && img.naturalWidth > 0) {
          markImageLoaded(setLoaded, idx);
        }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [safeImages]);

  useEffect(() => {
    const img = imageRefs.current[activeIdx];
    if (img?.complete && img.naturalWidth > 0) {
      markImageLoaded(setLoaded, activeIdx);
    }
  }, [activeIdx, safeImages]);

  useEffect(() => {
    if (!preloadAll || safeImages.length === 0) return undefined;

    let cancelled = false;
    safeImages.forEach((src, idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!cancelled) markImageLoaded(setLoaded, idx);
      };
      img.onerror = () => {
        if (!cancelled) markImageLoaded(setLoaded, idx);
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [preloadAll, safeImages]);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const nextIdx = (activeIdx + 1) % safeImages.length;
    const prevIdx = (activeIdx - 1 + safeImages.length) % safeImages.length;
    [nextIdx, prevIdx].forEach((idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = safeImages[idx];
    });
  }, [activeIdx, safeImages]);

  const goPrev = () => setActiveIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % safeImages.length);

  // Touch gesture support
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  return (
    <div className={fillParent ? `flex h-full min-h-0 flex-col ${className}` : `space-y-4 ${className}`}>
      <div
        ref={containerRef}
        className={`group relative w-full overflow-hidden ${fillParent ? 'min-h-0 flex-1 rounded-none' : 'rounded-2xl lg:rounded-3xl'} ${heightClassName}`}
        style={
          isLogoSlide
            ? { backgroundColor: '#ffffff' }
            : galleryBackground
              ? { backgroundColor: galleryBackground }
              : undefined
        }
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!loaded[activeIdx] ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-200/80 via-slate-100 to-slate-200/80 animate-pulse"
            aria-hidden
          />
        ) : null}

        {safeImages.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            ref={(el) => {
              imageRefs.current[idx] = el;
            }}
            src={src}
            alt={`${alt} - Image ${idx + 1}`}
            width={1200}
            height={800}
            loading={preloadAll ? 'eager' : idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={idx === activeIdx ? 'high' : 'low'}
            sizes={imageSizes}
            draggable={false}
            className={`absolute inset-0 h-full w-full ${slideObjectFitClass(src)} transition-opacity duration-300 ${
              idx === activeIdx
                ? `z-[2] ${loaded[idx] ? 'opacity-100' : 'opacity-90'}`
                : 'z-0 opacity-0 pointer-events-none'
            }`}
            onLoad={() => markImageLoaded(setLoaded, idx)}
            onError={(e) => {
              const img = e.currentTarget;
              const src = safeImages[idx];

              if (isBundledSrc(src) && img.dataset.extFallback !== '1') {
                const alternate = alternateBundledSrc(src);
                if (alternate && img.src !== alternate) {
                  img.dataset.extFallback = '1';
                  img.src = alternate;
                  return;
                }
              }

              if (!brandAssetsOnly) {
                const fallback = fallbackForSlide(category, idx);
                if (img.dataset.fallbackTried !== '1' && img.src !== fallback) {
                  img.dataset.fallbackTried = '1';
                  img.src = fallback;
                  return;
                }
              }

              img.onerror = null;
              markImageLoaded(setLoaded, idx);
            }}
          />
        ))}

        {/* Navigation Controls */}
        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="ic-gallery-nav-btn absolute left-1.5 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-1.5 pointer-events-auto transition-all duration-300 sm:left-2.5 sm:p-2 lg:left-6 lg:p-4 lg:hover:scale-110"
              aria-label="Previous image"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="ic-gallery-nav-btn absolute right-1.5 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-1.5 pointer-events-auto transition-all duration-300 sm:right-2.5 sm:p-2 lg:right-6 lg:p-4 lg:hover:scale-110"
              aria-label="Next image"
            >
              <Chevron direction="right" />
            </button>

            {/* Dot indicators */}
            <div className="ic-gallery-dots absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 text-white backdrop-blur-md sm:bottom-3 sm:gap-2 sm:px-3 sm:py-2 lg:bottom-6 lg:gap-2 lg:px-5 lg:py-3">
              {safeImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx(idx);
                  }}
                  className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-all duration-300 sm:h-2 sm:w-2 lg:h-3 lg:w-3 ${
                    idx === activeIdx ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Image counter */}
            <div className="ic-gallery-counter absolute right-2 top-2 z-10 rounded-full bg-black/45 px-2 py-0.5 text-[0.625rem] font-medium text-white backdrop-blur-md sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs lg:right-6 lg:top-6 lg:px-4 lg:py-2 lg:text-sm">
              {activeIdx + 1} / {safeImages.length}
            </div>
          </>
        ) : null}
      </div>

      {/* Optional thumbnail strip */}
      {showThumbnails && safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:gap-4">
          {safeImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 lg:h-20 lg:w-32 ${
                idx === activeIdx 
                  ? 'ring-4 ring-[#0B1220] ring-offset-2 scale-105' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

