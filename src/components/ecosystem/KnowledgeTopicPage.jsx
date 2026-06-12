import { parseKnowledgeTopicPath } from '../../data/ecosystem/ecosystemRoutes';
import { getTopicByHubAndSlug } from '../../data/ecosystem/knowledgeHub';
import { getHubConfig } from '../../data/ecosystem/hubAudienceConfig';
import { navigateTo } from '../../lib/navigation';
import GeoAnswerBlock from './GeoAnswerBlock';
import HubStickyBar, { HUB_CONTAINER, HUB_PROSE } from './HubStickyBar';
import { BulletList, FaqSection } from './EducationalSections';
import CitationsSection from './CitationsSection';
import { getCardBaseStyle, cardHoverHandlers } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';

function TopicSection({ title, children, isLight }) {
  return (
    <section className="scroll-mt-28 py-8 sm:py-10">
      <div className="mb-5 border-l-2 border-violet-500 pl-5">
        <h2 className={`text-lg font-semibold tracking-tight sm:text-xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function RelatedLinkCard({ link, isLight }) {
  return (
    <button
      type="button"
      onClick={() => navigateTo(link.path)}
      className="group flex w-full items-center justify-between gap-3 rounded-xl p-4 text-left sm:p-5"
      style={getCardBaseStyle(isLight)}
      {...cardHoverHandlers(isLight, -2)}
    >
      <span className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{link.label}</span>
      <svg
        className={`h-4 w-4 shrink-0 transition-colors group-hover:text-violet-500 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </button>
  );
}

export default function KnowledgeTopicPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const parsed = parseKnowledgeTopicPath(pathname);
  if (!parsed) return null;

  const topic = getTopicByHubAndSlug(parsed.hub, parsed.slug);
  if (!topic) return null;

  const hubConfig = getHubConfig(parsed.hub);
  const hubPath = `/resources/knowledge-hub/${parsed.hub}`;
  const bodyClass = `text-sm leading-relaxed sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-300/90'}`;

  return (
    <main className="relative min-h-screen bg-transparent">
      <HubStickyBar
        crumbs={[
          { label: 'Knowledge Hub', path: '/resources/knowledge-hub' },
          { label: hubConfig.centerLabel, path: hubPath },
          { label: topic.title },
        ]}
      />

      <div className={HUB_CONTAINER}>
        <header
          className={`border-b pb-10 pt-8 text-center sm:pb-12 sm:pt-10 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-500">{hubConfig.centerLabel}</p>
          <h1
            className={`mx-auto mt-5 max-w-3xl text-[1.75rem] font-semibold leading-[1.2] tracking-tight sm:text-3xl lg:text-4xl ${isLight ? 'text-slate-900' : 'text-white'}`}
          >
            {topic.title}
          </h1>
          <p
            className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed lg:text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
          >
            {topic.excerpt}
          </p>
        </header>

        <GeoAnswerBlock answer={topic.geoAnswer} variant="subtle" />

        <div className={`mx-auto ${HUB_PROSE}`}>
          {topic.sections.map((section) => (
            <TopicSection key={section.heading} title={section.heading} isLight={isLight}>
              <div className="space-y-4">
                {section.body.map((para) => (
                  <p key={para.slice(0, 48)} className={bodyClass}>
                    {para}
                  </p>
                ))}
              </div>
            </TopicSection>
          ))}

          {topic.checklist?.length ? (
            <TopicSection
              title={parsed.hub === 'investor' ? 'Actionable checklist' : 'Implementation checklist'}
              isLight={isLight}
            >
              <BulletList items={topic.checklist} isLight={isLight} />
            </TopicSection>
          ) : null}

          {topic.insights?.length ? (
            <TopicSection title="Industry insights" isLight={isLight}>
              <BulletList items={topic.insights} isLight={isLight} />
            </TopicSection>
          ) : null}

          {topic.caseExamples?.length ? (
            <TopicSection title="Case-study examples" isLight={isLight}>
              <ul className="grid gap-3 sm:gap-4">
                {topic.caseExamples.map((example) => (
                  <li
                    key={example}
                    className="rounded-xl p-4 sm:p-5"
                    style={getCardBaseStyle(isLight)}
                  >
                    <p className={bodyClass}>{example}</p>
                  </li>
                ))}
              </ul>
            </TopicSection>
          ) : null}
        </div>

        {topic.faqs?.length ? (
          <div className={`mt-4 ${HUB_PROSE}`}>
            <FaqSection faqs={topic.faqs} title="Frequently asked questions" />
          </div>
        ) : null}

        {topic.citations?.length ? (
          <div className={`mt-10 sm:mt-12 ${HUB_PROSE}`}>
            <CitationsSection citations={topic.citations} />
          </div>
        ) : null}

        {topic.relatedLinks?.length ? (
          <section className="mt-10 sm:mt-12">
            <div className="mb-6 border-l-2 border-violet-500 pl-5">
              <h2 className={`text-lg font-semibold tracking-tight sm:text-xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Related resources
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {topic.relatedLinks.map((link) => (
                <RelatedLinkCard key={link.path} link={link} isLight={isLight} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
