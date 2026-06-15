import PremiumFAQItem from '../ui/PremiumFAQItem';
import CtaButton from '../ui/CtaButton';
import { navigateTo } from '../../lib/navigation';
import { useTheme } from '../../context/ThemeContext';
import { sectionTitleClass } from '../../lib/cardThemeStyles';

const SECTION_HEADING = 'text-lg font-extrabold tracking-tight text-white sm:text-xl';
const BODY_CLASS = 'text-sm leading-relaxed text-slate-300/90';

export function ContentSection({ title, children, id }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className={`${SECTION_HEADING} mb-4`}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function BulletList({ items, isLight }) {
  const textClass = isLight
    ? 'text-sm leading-relaxed text-slate-600 sm:text-base'
    : BODY_CLASS;
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 ${textClass}`}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ComparisonTable({ rows, columns }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const thClass = isLight
    ? 'px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600'
    : 'px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-violet-300';
  const tdClass = isLight
    ? 'px-4 py-3 text-sm text-slate-700'
    : 'px-4 py-3 text-sm text-slate-200';

  return (
    <div className="overflow-x-auto rounded-2xl border border-violet-500/20 card-premium-dark">
      <table className="min-w-full divide-y divide-violet-500/15">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} scope="col" className={thClass}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-violet-500/10">
          {rows.map((row) => (
            <tr key={row.model || row.bestFor || JSON.stringify(row)}>
              {columns.map((col) => (
                <td key={col} className={tdClass}>
                  {row[col.toLowerCase()] ?? row[col] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions' }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  if (!faqs?.length) return null;
  return (
    <section className="scroll-mt-24">
      <h2 className={`${sectionTitleClass(isLight, { tight: true })} mb-6 text-center`}>{title}</h2>
      <div className="services-faq-list mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <PremiumFAQItem
            key={faq.question}
            faq={{
              question: faq.question,
              answer: faq.answer,
            }}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export function PageCtaSection({
  heading = 'Ready to take the next step?',
  description = 'Connect with iFranchise advisors for personalised guidance on franchise investment and expansion.',
  primaryLabel = 'Connect With Franchise Experts',
  primaryPath = '/contact-us',
  secondaryLabel = 'Schedule a Growth Consultation',
  secondaryHref = 'https://cal.com/ifranchise.in/30min',
}) {
  return (
    <section className="mt-14 rounded-3xl border border-violet-400/30 card-premium-dark p-8 text-center sm:p-10">
      <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{heading}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300/90">{description}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CtaButton type="button" onClick={() => navigateTo(primaryPath)}>
          {primaryLabel}
        </CtaButton>
        <button
          type="button"
          onClick={() => window.open(secondaryHref, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center justify-center rounded-full border border-violet-400/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-violet-300 hover:bg-violet-500/10"
        >
          {secondaryLabel}
        </button>
      </div>
    </section>
  );
}

export function InternalLinksSection({ links, title = 'Related resources' }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  if (!links?.length) return null;
  return (
    <nav aria-label={title} className="mt-10">
      <h2
        className={`mb-4 text-sm font-bold uppercase tracking-wider ${isLight ? 'text-violet-700' : 'text-violet-300'}`}
      >
        {title}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <button
              type="button"
              onClick={() => navigateTo(link.path)}
              className="btn-purple-solid rounded-full border-none px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
