import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

function IndustryCardImg({ src, alt, isLight }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="industry-card-img-loader industry-card-img-loader--living absolute inset-0 flex items-center justify-center" aria-hidden>
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
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`industry-card-img transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}

function IndustryCardLivingStage({ accent }) {
  return (
    <div className="industry-card-living-stage pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="industry-card-live-mesh" />
      <span
        className="industry-card-live-orb industry-card-live-orb--1"
        style={accent ? { '--ind-accent': accent } : undefined}
      />
      <span className="industry-card-live-orb industry-card-live-orb--2" />
      <span className="industry-card-live-orb industry-card-live-orb--3" />
      <span className="industry-card-live-shimmer" />
      <span className="industry-card-live-spark industry-card-live-spark--1" />
      <span className="industry-card-live-spark industry-card-live-spark--2" />
      <span className="industry-card-live-spark industry-card-live-spark--3" />
      <div className="industry-card-live-vignette" />
    </div>
  );
}

export default function IndustryCard({
  label,
  desc,
  img,
  accent,
  onExplore,
  className = '',
  mediaHeight = 'h-52',
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`industry-card theme-light-card industry-card--living relative flex flex-col overflow-hidden rounded-2xl ${className}`}>
      <div className={`industry-card-media industry-card-media--living relative overflow-hidden ${mediaHeight}`}>
        <IndustryCardLivingStage accent={accent} />
        <div className="industry-card-img-wrap">
          <IndustryCardImg src={img} alt={label} isLight={isLight} />
        </div>
      </div>
      <div className="industry-card-body flex flex-1 flex-col p-5">
        <h3 className="industry-card-title mb-1.5 text-base font-bold leading-snug">{label}</h3>
        <p className="industry-card-desc flex-1 text-[0.78rem] leading-relaxed">{desc}</p>
        <button type="button" className="industry-card-explore" onClick={onExplore}>
          Explore opportunities <FiArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
