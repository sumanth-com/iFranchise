import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { IMAGE_FALLBACK } from '../data/sectionImages';

function IndustryCardImg({ src, alt, isLight, priority }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="industry-card-img-loader absolute inset-0 flex items-center justify-center" aria-hidden>
          <div
            className={`h-8 w-8 animate-spin rounded-full border-2 ${
              isLight ? 'border-violet-200 border-t-violet-600' : 'border-violet-500/25 border-t-violet-400'
            }`}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = IMAGE_FALLBACK;
          setLoaded(true);
        }}
        className={`industry-card-img transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-100 industry-card-img--loaded' : 'opacity-0'
        }`}
      />
    </>
  );
}

export default function IndustryCard({
  label,
  desc,
  img,
  accent,
  onExplore,
  className = '',
  priority = false,
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`industry-card theme-light-card industry-card--clear industry-card--uniform relative flex h-full min-h-[22.5rem] flex-col overflow-hidden rounded-2xl ${className}`}
      style={accent ? { '--ind-accent': accent } : undefined}
    >
      <div className="industry-card-media industry-card-media--clear relative shrink-0">
        <div className="industry-card-img-wrap">
          <IndustryCardImg src={img} alt={label} isLight={isLight} priority={priority} />
        </div>
        <div className="industry-card-media-accent" aria-hidden />
        <div className="industry-card-media-shine" aria-hidden />
      </div>
      <div className="industry-card-body flex min-h-[9.5rem] flex-1 flex-col p-5">
        <h3 className="industry-card-title mb-1.5 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug">
          {label}
        </h3>
        <p className="industry-card-desc mb-0 line-clamp-3 min-h-[3.75rem] flex-1 text-[0.78rem] leading-relaxed">
          {desc}
        </p>
        <button type="button" className="industry-card-explore mt-auto shrink-0" onClick={onExplore}>
          Explore opportunities <FiArrowRight className="industry-card-explore-icon h-3 w-3 shrink-0" />
        </button>
      </div>
    </div>
  );
}
