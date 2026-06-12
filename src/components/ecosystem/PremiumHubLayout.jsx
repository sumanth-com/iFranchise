import { useEffect, useMemo, useState } from 'react';
import { navigateTo } from '../../lib/navigation';
import { getCardBaseStyle, cardHoverHandlers, metricBoxStyle } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import GeoAnswerBlock from './GeoAnswerBlock';
import HubStickyBar, { HUB_CONTAINER } from './HubStickyBar';

function useHubProgress(hub, topicSlugs) {
  const storageKey = `ifr-kh-progress-${hub}`;
  const [visited, setVisited] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(visited));
    } catch {
      /* ignore */
    }
  }, [visited, storageKey]);

  const count = topicSlugs.filter((s) => visited.includes(s)).length;
  return {
    visited,
    count,
    markVisited: (slug) => setVisited((prev) => (prev.includes(slug) ? prev : [...prev, slug])),
  };
}

function HubHero({ config, progressCount, totalModules }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <header
      className={`border-b pb-10 pt-8 text-center sm:pb-12 sm:pt-10 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isLight ? 'text-black' : 'text-violet-500'}`}
      >
        {config.centerLabel}
      </p>
      <h1
        className={`mx-auto mt-5 max-w-4xl text-[1.75rem] font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-[2.5rem] ${isLight ? 'text-black' : 'text-white'}`}
      >
        {config.title}
      </h1>
      <p
        className={`mx-auto mt-5 max-w-3xl text-base leading-relaxed lg:text-lg ${isLight ? 'text-black' : 'text-slate-400'}`}
      >
        {config.subtitle}
      </p>

      <dl className="mx-auto mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {config.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl px-5 py-4"
            style={metricBoxStyle(isLight)}
          >
            <dt className={`text-[11px] font-medium uppercase tracking-wide ${isLight ? 'text-black' : 'text-slate-500'}`}>
              {stat.label}
            </dt>
            <dd
              className={`mt-1.5 text-xl font-semibold tabular-nums tracking-tight sm:text-2xl ${isLight ? 'text-black' : 'text-white'}`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {totalModules > 0 ? (
        <p className={`mt-6 text-center text-xs ${isLight ? 'text-black' : 'text-slate-500'}`}>
          {progressCount} of {totalModules} modules reviewed
          {progressCount > 0 ? (
            <span className={`ml-2 inline-block h-1 w-20 align-middle rounded-full ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
              <span
                className="block h-full rounded-full bg-violet-500 transition-all duration-500"
                style={{ width: `${Math.round((progressCount / totalModules) * 100)}%` }}
              />
            </span>
          ) : null}
        </p>
      ) : null}
    </header>
  );
}

function ResourceCard({ index, title, description, path, isVisited, onNavigate, isLight, category }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(path)}
      className="group flex h-full w-full flex-col rounded-xl p-5 text-left sm:p-6"
      style={getCardBaseStyle(isLight)}
      {...cardHoverHandlers(isLight, -3)}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums ${
            isLight ? 'bg-violet-50 text-black' : 'bg-violet-500/15 text-violet-300'
          }`}
        >
          {String(index).padStart(2, '0')}
        </span>
        <span
          className={`shrink-0 transition-opacity group-hover:opacity-70 ${isLight ? 'text-black' : 'text-slate-500'}`}
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
      {category ? (
        <span className={`mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] ${isLight ? 'text-black' : 'text-violet-500'}`}>
          {category}
        </span>
      ) : null}
      <span
        className={`font-semibold leading-snug ${category ? 'mt-1.5' : 'mt-4'} ${
          isLight ? 'text-black' : 'text-white'
        }`}
      >
        {title}
      </span>
      {description ? (
        <span className={`mt-2 flex-1 text-sm leading-relaxed ${isLight ? 'text-black' : 'text-slate-400'}`}>
          {description}
        </span>
      ) : null}
      {isVisited ? (
        <span
          className={`mt-4 w-fit rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            isLight ? 'bg-emerald-50 text-black' : 'bg-emerald-500/15 text-emerald-400'
          }`}
        >
          Read
        </span>
      ) : null}
    </button>
  );
}

const GRID_CLASS = 'grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3';

function SectionBlock({ title, description, children, isLight }) {
  return (
    <section className="py-10 sm:py-12">
      <div className="mb-6 border-l-2 border-violet-500 pl-5">
        <h2 className={`text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl ${isLight ? 'text-black' : 'text-white'}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-2 max-w-3xl text-sm leading-relaxed lg:text-base ${isLight ? 'text-black' : 'text-slate-400'}`}>
            {description}
          </p>
        ) : null}
      </div>
      <div className={GRID_CLASS}>{children}</div>
    </section>
  );
}

function BrandRoadmapStrip({ roadmap, isLight }) {
  return (
    <section className={`border-t py-10 sm:py-12 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}>
      <div className="mb-8 max-w-2xl border-l-2 border-violet-500 pl-5">
        <h2 className={`text-lg font-semibold tracking-tight sm:text-xl ${isLight ? 'text-black' : 'text-white'}`}>
          Expansion roadmap
        </h2>
        <p className={`mt-2 text-sm ${isLight ? 'text-black' : 'text-slate-400'}`}>
          A phased path from foundation to national scale.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {roadmap.map((phase, idx) => (
          <div key={phase.stage} className="rounded-xl p-5 sm:p-6" style={getCardBaseStyle(isLight)}>
            <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${isLight ? 'text-black' : 'text-violet-500'}`}>
              Phase {idx + 1}
            </p>
            <p className={`mt-2 font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{phase.stage}</p>
            <ul className="mt-3 space-y-2">
              {phase.items.map((item) => (
                <li key={item} className={`text-sm leading-relaxed ${isLight ? 'text-black' : 'text-slate-400'}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PremiumHubLayout({ hub, config, topics }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const topicSlugs = useMemo(() => topics.map((t) => t.slug), [topics]);
  const topicMap = useMemo(() => Object.fromEntries(topics.map((t) => [t.slug, t])), [topics]);
  const { visited, count, markVisited } = useHubProgress(hub, topicSlugs);

  const handleNavigate = (path, slug) => {
    if (slug) markVisited(slug);
    navigateTo(path);
  };

  const featuredTopicSlugs = useMemo(
    () =>
      new Set(
        config.featured
          .map((c) => c.path.split('/').pop())
          .filter((slug) => topicMap[slug]),
      ),
    [config.featured, topicMap],
  );

  const curriculumSections = useMemo(
    () =>
      config.quickNav
        .map((nav) => ({
          ...nav,
          topics: (config.navTopicMap?.[nav.id] ?? [])
            .map((slug) => topicMap[slug])
            .filter((t) => t && !featuredTopicSlugs.has(t.slug)),
        }))
        .filter((s) => s.topics.length > 0),
    [config, topicMap, featuredTopicSlugs],
  );

  let rowIndex = 0;

  return (
    <main className="relative min-h-screen bg-transparent">
      <HubStickyBar
        crumbs={[
          { label: 'Knowledge Hub', path: '/resources/knowledge-hub' },
          { label: config.centerLabel },
        ]}
      />

      <div className={HUB_CONTAINER}>
        <HubHero config={config} progressCount={count} totalModules={topics.length} />

        <GeoAnswerBlock answer={config.geoAnswer} variant="subtle" />

        <SectionBlock
          isLight={isLight}
          title="Priority frameworks"
          description={
            hub === 'brand'
              ? 'Start here — the foundations for scaling your brand through franchising.'
              : 'Start here — the decisions that shape every franchise investment.'
          }
        >
          {config.featured.map((card) => {
            rowIndex += 1;
            const slug = card.path.split('/').pop();
            return (
              <ResourceCard
                key={card.title}
                index={rowIndex}
                title={card.title}
                description={card.excerpt}
                path={card.path}
                isVisited={visited.includes(slug)}
                isLight={isLight}
                onNavigate={(path) => handleNavigate(path, slug)}
              />
            );
          })}
        </SectionBlock>

        {curriculumSections.some((s) => s.topics.length > 0) ? (
          <SectionBlock isLight={isLight} title="Research modules" description="Deep-dive guides organised by decision area.">
            {curriculumSections.flatMap((section) =>
              section.topics.map((topic) => {
                rowIndex += 1;
                const path = `/resources/knowledge-hub/${hub}/${topic.slug}`;
                return (
                  <ResourceCard
                    key={topic.slug}
                    index={rowIndex}
                    title={topic.title}
                    description={topic.excerpt}
                    path={path}
                    category={section.label}
                    isVisited={visited.includes(topic.slug)}
                    isLight={isLight}
                    onNavigate={(p) => handleNavigate(p, topic.slug)}
                  />
                );
              }),
            )}
          </SectionBlock>
        ) : null}

        {hub === 'brand' && config.roadmap ? <BrandRoadmapStrip roadmap={config.roadmap} isLight={isLight} /> : null}
      </div>
    </main>
  );
}
