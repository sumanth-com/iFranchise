import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import BlogImage, { BLOG_IMAGE_FIT_CLASS, BLOG_IMAGE_FRAME_CLASS } from './blog/BlogImage';
import ShareIcons from './blog/ShareIcons';
import BlogCard from './blog/BlogCard';
import { blogPosts, formatDisplayDate, getBlogBySlug } from './blogData';
import { navigateTo, NAVIGATE_EVENT } from '@/lib/navigation';
import { TYPE } from '../lib/typography.js';

function getCurrentSlug() {
  const pieces = window.location.pathname.split('/').filter(Boolean);
  return pieces[1] || '';
}

/** Article section h2 ids only — exclude explore-more and other non-article headings. */
const OVERVIEW_EXCLUDED_IDS = new Set(['blog-explore-heading']);

function isOverviewNavHeading(id, label = '') {
  if (!id || OVERVIEW_EXCLUDED_IDS.has(id)) return false;
  if (/explore more insights/i.test(label.trim())) return false;
  return true;
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function BlogDetailHero({
  category,
  title,
  excerpt,
  readTime,
  dateLabel,
  image,
  imageAlt,
  overviewItems,
  onHeadingClick,
  articleUrl,
  shareTitle,
}) {
  return (
    <div
      data-reveal
      className="blog-detail-hero-split flex w-full flex-col overflow-hidden rounded-3xl border border-violet-500/20 shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:flex-row lg:items-stretch"
    >
      <div className="blog-detail-hero-split__content relative z-10 flex w-full flex-col justify-center gap-3.5 rounded-t-3xl border-b border-violet-500/20 bg-white p-6 sm:gap-4 sm:p-7 lg:w-1/2 lg:min-h-0 lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-br-none lg:border-b-0 lg:border-r lg:p-8 xl:gap-4 xl:p-9">
        <span className="blog-hero-category inline-flex w-fit rounded-full border border-violet-400/35 bg-violet-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
          {category}
        </span>
        <h1 className={`blog-detail-hero-split__title ${TYPE.pageHero} lg:text-[1.65rem] lg:leading-[1.2] xl:text-[1.85rem]`}>
          {title}
        </h1>
        <p className="blog-detail-hero-split__excerpt text-[15px] leading-relaxed sm:text-base">
          {excerpt}
        </p>
        <div className="blog-detail-hero-split__meta flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span>{readTime}</span>
          <span className="blog-detail-hero-split__meta-dot opacity-40" aria-hidden>
            ·
          </span>
          <span>{dateLabel}</span>
        </div>

        {overviewItems.length > 0 ? (
          <OverviewDropdown
            headings={overviewItems}
            onHeadingClick={onHeadingClick}
            embedded
          />
        ) : null}

        <div className="blog-detail-hero-split__share flex flex-wrap items-center gap-2 border-t border-violet-500/15 pt-3.5">
          <span className="blog-detail-hero-split__share-label text-sm font-semibold">Share</span>
          <ShareIcons url={articleUrl} title={shareTitle} variant="brand" className="blog-hero-share" />
        </div>
      </div>

      <div className="blog-detail-hero-split__media w-full shrink-0 overflow-hidden rounded-b-3xl lg:w-1/2 lg:rounded-bl-none lg:rounded-r-3xl lg:rounded-tl-none">
        <BlogImage
          src={image}
          alt={imageAlt || title}
          variant="hero"
          priority
          className="h-full w-full"
          wrapperClassName={`blog-detail-hero-image ${BLOG_IMAGE_FRAME_CLASS}`}
          imgClassName={BLOG_IMAGE_FIT_CLASS}
        />
      </div>
    </div>
  );
}

function IntroCallout({ text }) {
  return (
    <div
      data-reveal
      className="blog-intro-callout rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-5 sm:px-6 sm:py-6"
    >
      <p className="blog-intro-highlight-label text-xs font-bold uppercase tracking-[0.2em]">Why this matters</p>
      <p className="blog-intro-highlight-text mt-2 text-base font-semibold leading-relaxed sm:text-lg">{text}</p>
    </div>
  );
}

function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <blockquote
      data-reveal
      className="blog-quote-card rounded-2xl border border-violet-500/25 px-5 py-5 sm:px-7 sm:py-6"
    >
      <p className="blog-quote-card__text text-center text-[17px] italic leading-relaxed sm:text-lg md:text-[18px]">
        &ldquo;{quote}&rdquo;
      </p>
    </blockquote>
  );
}

function SectionHeader({ sectionNum, section }) {
  return (
    <div className="flex items-start gap-3">
      <span className="blog-pill blog-section-index flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold !text-white shadow-md shadow-violet-600/25">
        {sectionNum}
      </span>
      <h2 id={section.id} className={`blog-article-heading scroll-mt-28 min-w-0 flex-1 pt-1 ${TYPE.subsection}`}>
        {section.heading}
      </h2>
    </div>
  );
}

function SectionBodyContent({ section }) {
  return (
    <>
      <div className="mt-5 space-y-4">
        {section.body.map((p, pi) => (
          <p key={pi} className="blog-article-body text-[16px] leading-relaxed md:text-[16.5px] md:leading-[1.85]">
            {p}
          </p>
        ))}
      </div>

      {section.quote ? (
        <blockquote className="blog-pull-quote mt-6 border-l-[3px] border-violet-400/60 py-1 pl-5 text-[17px] italic leading-relaxed md:text-lg">
          &ldquo;{section.quote}&rdquo;
        </blockquote>
      ) : null}
    </>
  );
}

function ArticleSection({ section, index }) {
  const sectionNum = String(index + 1).padStart(2, '0');

  return (
    <article
      data-reveal
      style={{ '--reveal-delay': `${index * 40}ms` }}
      className={`blog-flow-section ${index > 0 ? 'border-t border-violet-500/15 pt-10 md:pt-12' : 'mt-8 md:mt-10'}`}
    >
      <SectionHeader sectionNum={sectionNum} section={section} />
      <SectionBodyContent section={section} />
    </article>
  );
}

function ExploreMoreSection({ currentSlug }) {
  const related = useMemo(
    () => blogPosts.filter((post) => post.slug !== currentSlug),
    [currentSlug]
  );

  if (!related.length) return null;

  return (
    <section data-reveal className="blog-explore-more mt-12 pt-4 md:mt-14 md:pt-6" aria-labelledby="blog-explore-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="blog-explore-eyebrow text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Keep reading</p>
          <h2 id="blog-explore-heading" className={`blog-explore-title mt-2 ${TYPE.subsection}`}>
            Explore more insights
          </h2>
        </div>
        <a
          href="/blog"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/blog');
          }}
          className="blog-explore-link inline-flex items-center gap-1 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
        >
          View all articles
          <span aria-hidden>→</span>
        </a>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post, i) => (
          <BlogCard key={post.slug} post={post} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
function OverviewDropdown({ headings, onHeadingClick, embedded = false }) {
  const [open, setOpen] = useState(false);
  const [menuRect, setMenuRect] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updateMenuRect = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 8;
    const maxMenuHeight = 280;
    const spaceBelow = window.innerHeight - rect.bottom - gap - 12;
    const spaceAbove = rect.top - gap - 12;
    const openUpward = spaceBelow < 160 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(maxMenuHeight, openUpward ? spaceAbove : spaceBelow);

    setMenuRect({
      left: rect.left,
      width: rect.width,
      top: openUpward ? undefined : rect.bottom + gap,
      bottom: openUpward ? window.innerHeight - rect.top + gap : undefined,
      maxHeight: Math.max(120, maxHeight),
    });
  }, []);

  useLayoutEffect(() => {
    if (open) updateMenuRect();
    else setMenuRect(null);
  }, [open, updateMenuRect]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      const inTrigger = triggerRef.current?.contains(e.target);
      const inMenu = menuRef.current?.contains(e.target);
      if (!inTrigger && !inMenu) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', updateMenuRect);
    window.addEventListener('scroll', updateMenuRect, true);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', updateMenuRect);
      window.removeEventListener('scroll', updateMenuRect, true);
    };
  }, [open, updateMenuRect]);

  const triggerClass = embedded
    ? `blog-overview-trigger blog-overview-trigger--embedded group flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
        open
          ? 'border-violet-400/50 bg-violet-500/20 ring-2 ring-violet-400/25'
          : 'border-violet-500/25 bg-violet-500/10 hover:border-violet-400/40 hover:bg-violet-500/15'
      }`
    : `blog-overview-trigger group flex w-full items-center justify-between rounded-2xl border bg-white px-6 py-4 shadow-sm transition hover:border-violet-200 hover:shadow-md ${
        open ? 'border-violet-300 ring-2 ring-violet-200/60' : 'border-slate-200'
      }`;

  const menuClass = embedded
    ? 'blog-overview-menu blog-overview-menu--embedded overflow-y-auto rounded-xl border border-violet-200 bg-white py-1.5 shadow-[0_20px_48px_rgba(15,23,42,0.22)]'
    : 'blog-overview-menu overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.15)]';

  const itemClass =
    'blog-overview-item flex w-full items-start gap-3 px-4 py-2.5 text-left text-sm font-medium leading-snug text-slate-800 transition hover:bg-violet-50';

  const menu =
    open && menuRect
      ? createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label="Article sections"
            className={menuClass}
            style={{
              position: 'fixed',
              left: menuRect.left,
              width: menuRect.width,
              top: menuRect.top,
              bottom: menuRect.bottom,
              maxHeight: menuRect.maxHeight,
              zIndex: 10050,
            }}
          >
            {headings.map((h, i) => (
              <button
                key={h.id}
                type="button"
                role="option"
                onClick={() => {
                  onHeadingClick(h.id);
                  setOpen(false);
                }}
                className={itemClass}
              >
                <span className="blog-pill blog-overview-num mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold !text-white">
                  {i + 1}
                </span>
                <span className="blog-overview-label min-w-0 flex-1 text-[15px] leading-snug">{h.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <div className={`blog-overview w-full ${embedded ? '' : 'mb-10'}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {open ? (
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
            ) : (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
              </>
            )}
          </span>
          <span className="blog-overview-title truncate text-sm font-bold sm:text-base">Overview</span>
          <span
            className={`blog-overview-badge shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              embedded ? 'bg-violet-100 text-violet-800' : 'bg-violet-100 text-violet-700'
            }`}
          >
            {headings.length} sections
          </span>
        </div>
        <svg
          className={`blog-overview-chevron h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
            embedded ? 'text-violet-200' : 'text-violet-700'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {menu}
    </div>
  );
}

function BlogDetailPage() {
  const [slug, setSlug] = useState(getCurrentSlug);
  const [headings, setHeadings] = useState([]);
  useReveal(slug);

  useEffect(() => {
    const article = getBlogBySlug(slug);
    const heroSrc = article?.thumbnail || article?.image;
    if (!heroSrc) return undefined;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroSrc;
    document.head.appendChild(link);
    return () => link.remove();
  }, [slug]);

  useEffect(() => {
    const onChange = () => setSlug(getCurrentSlug());
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);

  const article = useMemo(() => getBlogBySlug(slug) || blogPosts[0] || null, [slug]);
  const sections = article?.sections ?? [];
  useEffect(() => {
    const timer = setTimeout(() => {
      const allH2 = Array.from(document.querySelectorAll('h2[id]'))
        .filter((h) => isOverviewNavHeading(h.id, h.textContent || ''))
        .map((h) => ({
          id: h.id,
          label: h.textContent || '',
        }));
      setHeadings(allH2);
    }, 150);
    return () => clearTimeout(timer);
  }, [article?.slug]);

  const overviewItems = useMemo(() => {
    if (headings.length > 0) {
      return headings.filter((h) => isOverviewNavHeading(h.id, h.label));
    }
    return sections.map((s) => ({ id: s.id, label: s.heading }));
  }, [headings, sections]);

  const handleHeadingClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = (document.querySelector('header')?.offsetHeight || 80) + 20;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  };

  if (!article) {
    return (
      <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-24 pt-8 sm:px-6 lg:px-8 text-white">
        <div className="rounded-2xl border border-violet-500/25 card-premium-dark p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Blog post unavailable</h1>
        </div>
      </main>
    );
  }

  const articleUrl = `${window.location.origin}/blog/${article.slug}`;

  return (
    <main className="blog-detail-page relative z-10 w-full min-h-0 bg-transparent pb-24">
      <div className="blog-detail-shell mx-auto w-full max-w-[1240px] px-4 pt-8 sm:px-6 lg:px-8">
        <BlogDetailHero
          category={article.category}
          title={article.title}
          excerpt={article.excerpt}
          readTime={article.readTime}
          dateLabel={formatDisplayDate(article.date)}
          image={article.thumbnail || article.image}
          imageAlt={article.imageAlt || article.title}
          overviewItems={overviewItems}
          onHeadingClick={handleHeadingClick}
          articleUrl={articleUrl}
          shareTitle={article.title}
        />

        <div className="blog-detail-content blog-article-flow mt-10 space-y-8 md:mt-12 md:space-y-10">
          <IntroCallout text={article.introHighlight} />
          <QuoteCard quote={article.quote} />

          {sections.map((section, i) => (
            <ArticleSection key={section.id} section={section} index={i} />
          ))}
        </div>

        <ExploreMoreSection currentSlug={article.slug} />
      </div>
    </main>
  );
}

export default BlogDetailPage;
