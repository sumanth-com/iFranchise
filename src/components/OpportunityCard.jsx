import { navigateTo } from '@/lib/navigation';

function getModelPill(model) {
  if (model === 'FOCO') {
    return {
      label: 'Passive',
      className: 'bg-violet-500/25 text-violet-100 border border-violet-400/35',
    };
  }
  if (model === 'FOFO') {
    return {
      label: 'Owner-Op',
      className: 'bg-emerald-500/25 text-emerald-100 border border-emerald-400/35',
    };
  }
  return {
    label: 'Hybrid',
    className: 'bg-violet-500/25 text-violet-100 border border-violet-400/35',
  };
}

export default function OpportunityCard({ opportunity }) {
  const handleViewDetails = () => {
    navigateTo(`/franchise-details?id=${opportunity.id}`);
  };

  const modelPill = getModelPill(opportunity.model);
  const brandBg = opportunity.cardBackground || '#12082a';
  const brandAccent = opportunity.cardAccent || brandBg;
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
        className="fo-opportunity-card__media relative h-52 w-full shrink-0 overflow-hidden"
        style={{ backgroundColor: brandBg }}
      >
        <img
          src={opportunity.logo || opportunity.image}
          alt={opportunity.brandName}
          className="fo-opportunity-card__img"
          loading="lazy"
          decoding="async"
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

      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs text-white/90 font-medium mb-1">{opportunity.category}</div>

        <h3 className="mb-3 text-lg font-bold leading-snug text-white line-clamp-2">
          {opportunity.brandName}
        </h3>

        <div className="mb-4 flex-1 space-y-3">
          <div className="flex items-start text-sm">
            <svg className="w-4 h-4 text-white mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="shrink-0 text-white">Investment:</span>
            <span className="ml-2 font-semibold text-white line-clamp-2">{opportunity.investment}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg className="w-4 h-4 text-white mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-white">Model:</span>
            <span className="font-semibold text-white ml-2">{opportunity.model}</span>
          </div>
          <div className="flex items-start text-sm">
            <svg className="w-4 h-4 text-white mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="shrink-0 text-white">Locations:</span>
            <span className="ml-2 min-h-[2.5rem] flex-1 font-semibold leading-snug text-white line-clamp-2">
              {opportunity.locations}
            </span>
          </div>
        </div>

        <div className="mb-4 flex min-h-[1.75rem] flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${modelPill.className}`}
          >
            {modelPill.label}
          </span>
          <span className="inline-flex items-center rounded-full border border-emerald-400/35 bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-100">
            {opportunity.roi} ROI
          </span>
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
