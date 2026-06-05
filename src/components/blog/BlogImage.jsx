import { useEffect, useRef, useState } from 'react';
import { BLOG_FALLBACK, BLOG_IMG_SIZES } from './blogImages';

/** Shared frame + fit for blog cards and detail hero (full image, no awkward crop). */
export const BLOG_IMAGE_FRAME_CLASS = 'aspect-[16/9] w-full overflow-hidden bg-white';
export const BLOG_IMAGE_FIT_CLASS = 'h-full w-full object-cover object-center';

/**
 * Optimized blog image with skeleton and fade-in.
 */
export default function BlogImage({
  src,
  alt = '',
  variant = 'card',
  priority = false,
  className = '',
  imgClassName = 'object-cover',
  wrapperClassName = '',
}) {
  const imgRef = useRef(null);
  const [displaySrc, setDisplaySrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setDisplaySrc(src);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
      setFailed(false);
    }
  }, [displaySrc]);

  const markLoaded = () => {
    setLoaded(true);
    setFailed(false);
  };

  const handleError = () => {
    if (displaySrc !== BLOG_FALLBACK) {
      setDisplaySrc(BLOG_FALLBACK);
      setLoaded(false);
      return;
    }
    setFailed(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-200/80 ${wrapperClassName} ${className}`}>
      {!loaded && !failed ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-200/40 via-slate-200/50 to-violet-100/40"
          aria-hidden
        />
      ) : null}
      {failed ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-300/60 px-4 text-center text-xs font-medium text-slate-600"
          aria-hidden
        >
          Image unavailable
        </div>
      ) : (
        <img
          ref={imgRef}
          src={displaySrc}
          alt={alt}
          title={alt || undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={BLOG_IMG_SIZES[variant] || BLOG_IMG_SIZES.card}
          draggable={false}
          onLoad={markLoaded}
          onError={handleError}
          className={`h-full w-full transition-opacity duration-300 ${imgClassName} ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
