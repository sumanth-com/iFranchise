import { useId, useState } from 'react';

/**
 * @param {{ groups: import('../../data/opportunities/brandLocations.js').BrandLocationGroup[] }} props
 */
const MODEL_ORDER = { FOFO: 0, FICO: 1 };

function sortLocationGroups(groups) {
  return [...groups].sort(
    (a, b) => (MODEL_ORDER[a.model] ?? 99) - (MODEL_ORDER[b.model] ?? 99)
  );
}

export default function FranchiseLocationsPanel({ groups }) {
  const baseId = useId();
  const [openKeys, setOpenKeys] = useState(() => new Set());
  const orderedGroups = sortLocationGroups(groups);

  const toggle = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="fd-locations grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {orderedGroups.map((group) => (
        <section key={group.model} className="fd-locations-group">
          <div className="fd-locations-group__head mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`fd-locations-model inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                group.model === 'FICO' ? 'fd-locations-model--fico' : 'fd-locations-model--fofo'
              }`}
            >
              {group.model}
            </span>
            <p className="fd-copy text-sm text-slate-600">
              {group.items.reduce((sum, item) => sum + item.count, 0)} target locations across{' '}
              {group.items.length} {group.items.length === 1 ? 'region' : 'regions'}
            </p>
          </div>

          <ul className="fd-locations-list space-y-2">
            {group.items.map((item, index) => {
              const key = `${group.model}-${index}`;
              const panelId = `${baseId}-${key}`;
              const isOpen = openKeys.has(key);
              const hasSublist = Boolean(item.cities?.length);
              const placeLabel = item.count === 1 ? 'place' : 'places';

              return (
                <li
                  key={key}
                  className={`fd-locations-item overflow-hidden rounded-xl border transition-colors ${
                    isOpen
                      ? 'border-violet-200 bg-violet-50/40'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <button
                    type="button"
                    id={`${panelId}-trigger`}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-panel`}
                    onClick={() => toggle(key)}
                    className="fd-locations-item__trigger flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/80"
                  >
                    <span className="fd-copy min-w-0 flex-1 text-sm font-semibold text-[#0b0f19] sm:text-base">
                      {item.name}
                    </span>
                    <span className="fd-locations-count shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      {item.count} {placeLabel}
                    </span>
                    <svg
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    id={`${panelId}-panel`}
                    role="region"
                    aria-labelledby={`${panelId}-trigger`}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-200/80 px-4 pb-4 pt-3">
                        {hasSublist ? (
                          <>
                            <p className="fd-copy mb-2.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                              Cities &amp; towns
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.cities.map((city) => (
                                <span
                                  key={city}
                                  className="fd-copy rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                                >
                                  {city}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className="fd-copy text-sm leading-relaxed text-slate-600">
                            {item.count} franchise locations planned across {item.name}. Contact the brand
                            team for catchment-level site availability.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
