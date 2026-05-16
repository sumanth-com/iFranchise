/**
 * LegalPageLayout
 * Shared layout for Privacy Policy, Terms & Conditions, and Licenses pages.
 * Apple / Google documentation style — single-column, clean, enterprise-grade.
 */

const LAST_UPDATED = 'April 30, 2026';

function LegalSection({ index, title, body }) {
  return (
    <section className="py-8 border-b border-violet-500/20 last:border-0">
      <div className="flex gap-5 items-baseline mb-3">
        <span className="text-xs font-semibold text-violet-300/60 tabular-nums w-6 shrink-0 pt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">
          {title}
        </h2>
      </div>
      <p className="text-[15px] sm:text-base text-slate-300/90 leading-relaxed pl-11">
        {body}
      </p>
    </section>
  );
}

function LegalPageLayout({ title, subtitle, sections, badge }) {
  return (
    <div className="min-h-screen relative z-10 text-slate-100">
      {/* Page Header */}
      <div className="border-b border-violet-500/20 card-premium-dark-inner rounded-none border-x-0 border-t-0">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          {badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-300/80 mb-5">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-6">
            {subtitle}
          </p>
          <p className="text-sm text-slate-400">
            Last Updated: <span className="text-violet-200/80 font-medium">{LAST_UPDATED}</span>
          </p>
        </div>
      </div>

      {/* Document Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="card-premium-dark rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          {sections.map((section, i) => (
            <LegalSection
              key={i}
              index={i}
              title={section.title}
              body={section.body}
            />
          ))}
        </div>

        {/* Contact Footer */}
        <div className="mt-14 pt-10 border-t border-violet-500/20">
          <p className="text-sm font-semibold text-white mb-5">Questions about this document?</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="mailto:legal@ifranchise.in"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-violet-300 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              legal@ifranchise.in
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-violet-300 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 98765 43210
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-4 h-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Bangalore, Karnataka, India
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalPageLayout;
