import { useEffect, useMemo, useState, useRef } from 'react';

// Category-based fallback images from Unsplash
const CATEGORY_FALLBACKS = {
  food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  kids: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
  service: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80',
  default: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=80',
};

function Chevron({ direction = 'left' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
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

export default function ImageCarousel({ 
  images, 
  alt, 
  category = 'default',
  heightClassName = 'h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]',
  showThumbnails = false,
  fillParent = false,
  className = '',
}) {
  const safeImages = useMemo(() => {
    const list = (images || []).filter(Boolean);
    const unique = Array.from(new Set(list));
    const fallback = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
    return unique.length ? unique : [fallback];
  }, [images, category]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState(() => safeImages.map(() => false));
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setActiveIdx(0);
    setLoaded(safeImages.map(() => false));
  }, [safeImages]);

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
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Loading skeleton */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 animate-pulse" />

        {/* Images */}
        {safeImages.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt={`${alt} - Image ${idx + 1}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === activeIdx ? (loaded[idx] ? 'opacity-100' : 'opacity-0') : 'opacity-0'
            }`}
            onLoad={(e) => {
              setLoaded((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              const fallback = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
              e.currentTarget.src = fallback;
              setLoaded((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }}
          />
        ))}

        {/* Navigation Controls */}
        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-3 text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl lg:left-6 lg:p-4"
              aria-label="Previous image"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-3 text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl lg:right-6 lg:p-4"
              aria-label="Next image"
            >
              <Chevron direction="right" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-4 py-2.5 backdrop-blur-md lg:bottom-6 lg:px-5 lg:py-3">
              {safeImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 lg:h-3 lg:w-3 ${
                    idx === activeIdx ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Image counter */}
            <div className="absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md lg:right-6 lg:top-6 lg:px-4 lg:py-2 lg:text-sm">
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

