import { navigateTo } from '@/lib/navigation';
import { getFranchiseDetailPath } from '@/lib/franchisePaths';
import { unsplashSrcSet } from '@/lib/unsplashResponsive';

export default function OpportunityCard({ opportunity }) {
  const handleViewDetails = () => {
    navigateTo(getFranchiseDetailPath(opportunity));
  };

  const seoPill = opportunity.seoLabel || 'Franchise Opportunity';
  const metricPill = opportunity.paybackPill || 'Payback On Request';
  const brandBg = opportunity.cardBackground || '#12082a';
  const brandAccent = opportunity.cardAccent || brandBg;
  const cardFit = opportunity.cardFit || 'fill';
  const cardImage = opportunity.logo || opportunity.image;
  const isRemote = typeof cardImage === 'string' && /^https?:\/\//i.test(cardImage);
  const remoteSet = isRemote ? unsplashSrcSet(cardImage, [280, 400, 560], '(max-width: 640px) 92vw, 280px') : null;
  const objectFit = cardFit === 'contain' ? 'contain' : 'cover';
  return (
    <article
      onClick={handleViewDetails}
      className="fo-opportunity-card card-premium-dark group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl"
      style={{
        '--fo-card-bg': brandBg,
        '--fo-card-accent': brandAccent,
      }}
    >
      <div
        className="fo-opportunity-card__media relative aspect-[3/2] w-full shrink-0 overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:h-52"
        data-card-fit={cardFit}
        style={{ backgroundColor: brandBg }}
      >
        <img
          src={remoteSet?.src ?? cardImage}
          srcSet={remoteSet?.srcSet}
          alt={`${opportunity.brandName} franchise business opportunity in India`}
          title={`${opportunity.brandName} franchise`}
          className="fo-opportunity-card__img"
          loading="lazy"
          decoding="async"
          sizes={remoteSet?.sizes ?? '(max-width: 640px) 92vw, 280px'}
          style={{ objectFit, objectPosition: 'center' }}
          width={280}
          height={187}
          onError={(e) => {
            const img = e.target;
            if (img.dataset.fallbackTried === '1') return;
            img.dataset.fallbackTried = '1';
            img.onerror = null;
            const alternate = opportunity.image && img.src !== opportunity.image ? opportunity.image : '';
            if (alternate) img.src = alternate;
          }}
        />
        <div className="fo-opportunity-card__sheen pointer-events-none" aria-hidden="true" />
      </div>

      <div className="fo-opportunity-card__body flex flex-1 flex-col p-4 sm:p-5">
        <div className="fo-card-category text-xs font-medium mb-1">{opportunity.category}</div>

        <h3 className="fo-card-title mb-3 text-lg font-bold leading-snug line-clamp-2">
          {opportunity.brandName}
        </h3>

        <div className="fo-card-meta mb-4 flex-1 space-y-3">
          <div className="fo-card-meta__row flex items-start text-sm">
            <svg className="fo-card-meta__icon mr-2 mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="fo-card-meta__label shrink-0">Investment:</span>
            <span className="fo-card-meta__value ml-2 font-semibold line-clamp-2">{opportunity.investment}</span>
          </div>
          <div className="fo-card-meta__row flex items-center text-sm">
            <svg className="fo-card-meta__icon mr-2 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="fo-card-meta__label">Model:</span>
            <span className="fo-card-meta__value ml-2 font-semibold">
              {opportunity.models?.length ? opportunity.models.join(', ') : opportunity.model}
            </span>
          </div>
          <div className="fo-card-meta__row flex items-start text-sm">
            <svg className="fo-card-meta__icon mr-2 mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="fo-card-meta__label shrink-0">Returns:</span>
            <span className="fo-card-meta__value ml-2 min-h-0 flex-1 font-semibold leading-snug line-clamp-2">
              {opportunity.returns || 'On request'}
            </span>
          </div>
        </div>

        <div className="fo-card-pills mb-4 flex min-h-[1.75rem] flex-wrap items-center gap-2">
          <span className="fo-card-pill fo-card-pill--hybrid">{seoPill}</span>
          <span className="fo-card-pill fo-card-pill--roi">{metricPill}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="btn-purple-solid mt-auto w-full rounded-lg border-none py-2 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
