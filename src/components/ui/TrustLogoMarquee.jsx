import { getPartnerBrandLogos } from '../../data/franchiseData';

const DEFAULT_PARTNERS = getPartnerBrandLogos(10);

/**
 * Infinite logo rail — uniform slots using real franchise brand assets.
 */
export function TrustLogoMarquee({
  partners = DEFAULT_PARTNERS,
  animationClass = 'animate-marquee-right',
  variant = 'hero',
  className = '',
}) {
  const track = [...partners, ...partners];
  const isHero = variant === 'hero';

  if (!partners.length) return null;

  return (
    <div
      className={
        isHero
          ? `trust-marquee trust-marquee--hero relative overflow-hidden rounded-2xl ${className}`
          : `trust-marquee trust-marquee--franchise relative overflow-hidden ${className}`
      }
    >
      <div
        className={`flex w-max items-center will-change-transform ${animationClass} ${
          isHero ? 'trust-marquee-track trust-marquee-track--hero' : 'trust-marquee-track trust-marquee-track--franchise gap-4'
        }`}
      >
        {track.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className={`trust-logo-card flex shrink-0 items-stretch justify-center ${isHero ? 'trust-logo-card--hero' : 'lyb-trust-logo-card trust-logo-card--franchise'}`}
          >
            <img
              src={partner.src}
              alt={partner.name || partner.label}
              className="trust-logo-img h-full w-full"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustLogoMarquee;
