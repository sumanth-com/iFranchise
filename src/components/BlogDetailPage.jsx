import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import BlogCard from './blog/BlogCard';
import ShareIcons from './blog/ShareIcons';
import { blogPosts, formatDisplayDate, getBlogBySlug, getNextBlogPost, getPrevBlogPost } from './blogData';

function getCurrentSlug() {
  const pieces = window.location.pathname.split('/').filter(Boolean);
  return pieces[1] || '';
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

function HeroMediaBlock({ images, category, title, excerpt }) {
  const [current, setCurrent] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => { setCurrent((c) => (c + 1) % images.length); setOut(false); }, 500);
    }, 4200);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div
      data-reveal
      className="blog-hero-media relative h-[340px] w-full overflow-hidden rounded-3xl border border-violet-500/20 shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:h-[480px] lg:h-[540px]"
    >
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: i === current ? (out ? 0 : 1) : 0,
            transform: i === current ? (out ? 'scale(1.04)' : 'scale(1)') : 'scale(1.04)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0618]/95 via-[#0a0618]/45 to-[#0a0618]/15" />
      <div className="blog-on-media absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
        <span className="blog-hero-category w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">
          {category}
        </span>
        <h1 className="blog-hero-overlay-title mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="blog-hero-overlay-excerpt mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
          {excerpt}
        </p>
      </div>
      <div className="blog-on-media absolute bottom-5 right-5 flex gap-2 sm:bottom-8 sm:right-8">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-white' : 'w-1.5 bg-white/45'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function KeyTakeaways({ items }) {
  if (!items?.length) return null;
  const icons = ['◎', '◈', '◇', '◆'];
  return (
    <section data-reveal className="blog-key-takeaways">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="blog-section-eyebrow text-xs font-bold uppercase tracking-[0.22em]">At a glance</p>
          <h2 className="blog-section-title mt-1 text-2xl font-extrabold md:text-3xl">Key takeaways</h2>
        </div>
        <span className="blog-takeaway-count hidden rounded-full border border-violet-500/25 px-3 py-1 text-xs font-semibold sm:inline-flex">
          {items.length} insights
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={item}
            className="blog-takeaway-card group flex gap-4 rounded-2xl border border-violet-500/20 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300/40 hover:shadow-md"
          >
            <span className="blog-takeaway-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-600/30">
              {icons[i % icons.length]}
            </span>
            <p className="blog-takeaway-text text-[15px] font-medium leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -- Counting animation stat card -- */
function StatCard({ value, label }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const hasAnimated = useRef(false);

  // Extract numeric part for counting animation
  const numMatch = value.match(/[\d.]+/);
  const numericVal = numMatch ? parseFloat(numMatch[0]) : null;
  const prefix = numMatch ? value.slice(0, numMatch.index) : '';
  const suffix = numMatch ? value.slice(numMatch.index + numMatch[0].length) : value;

  useEffect(() => {
    if (!numRef.current || numericVal === null) return;
    const el = numRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 1400;
        const start = performance.now();
        const isInt = Number.isInteger(numericVal);
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * numericVal;
          el.textContent = prefix + (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [numericVal, prefix, suffix]);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    el.style.transform = `perspective(500px) rotateX(${((e.clientY - top) / height - 0.5) * -14}deg) rotateY(${((e.clientX - left) / width - 0.5) * 14}deg) scale(1.05)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="blog-stat-card rounded-2xl border border-violet-500/25 card-premium-dark-inner p-6 text-center shadow-inner"
      style={{ transition: 'transform 0.18s ease', willChange: 'transform' }}>
      <p ref={numRef} className="blog-stat-value text-3xl font-extrabold">{value}</p>
      <p className="blog-stat-label mt-1 text-sm">{label}</p>
    </div>
  );
}

/* -- Double image pair - side by side -- */
function DoubleSectionImage({ src1, src2, alt }) {
  return (
    <div data-reveal className="blog-double-image my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.10)]">
        <img src={src1} alt={alt} loading="lazy"
          className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-[1.04] md:h-[300px]" />
      </div>
      <div className="overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.10)]">
        <img src={src2} alt={alt} loading="lazy"
          className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-[1.04] md:h-[300px]" />
      </div>
    </div>
  );
}

function SectionImageBanner({ src, caption, alt }) {
  return (
    <figure data-reveal className="blog-visual-banner my-10 overflow-hidden rounded-3xl border border-violet-500/20 shadow-lg">
      <img src={src} alt={alt} loading="lazy" className="h-[240px] w-full object-cover md:h-[360px]" />
      {caption && (
        <figcaption className="blog-visual-caption border-t border-violet-500/15 px-5 py-3 text-sm font-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ChecklistPanel({ points }) {
  return (
    <ul className="blog-checklist mt-6 grid gap-3 sm:grid-cols-1">
      {points.map((pt, i) => (
        <li key={pt} className="blog-checklist-item flex items-start gap-3 rounded-xl border border-violet-500/15 bg-violet-50/80 px-4 py-3.5">
          <span className="blog-checklist-num mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="blog-checklist-text text-[15px] leading-relaxed">{pt}</span>
        </li>
      ))}
    </ul>
  );
}

function IntroSection({ section, highlight, image }) {
  return (
    <article data-reveal className="blog-intro-section">
      <div className="blog-intro-highlight mb-8 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-600/15 via-violet-500/10 to-transparent px-6 py-5 md:px-8 md:py-6">
        <p className="blog-intro-highlight-label text-xs font-bold uppercase tracking-[0.2em]">Why this matters</p>
        <p className="blog-intro-highlight-text mt-2 text-lg font-semibold leading-relaxed md:text-xl">{highlight}</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="blog-section-index flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">01</span>
            <h2 id={section.id} className="blog-article-heading scroll-mt-28 text-2xl font-bold leading-tight md:text-3xl">
              {section.heading}
            </h2>
          </div>
          <div className="mt-6 space-y-5">
            {section.body.map((p, pi) => (
              <p key={pi} className={`blog-article-body text-[16.5px] leading-[1.9] ${pi === 0 ? 'text-lg font-medium md:text-xl' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="blog-intro-visual sticky top-28 overflow-hidden rounded-3xl border border-violet-500/20 shadow-xl">
            <img src={image || section.sectionImage} alt={section.heading} loading="lazy" className="h-[280px] w-full object-cover md:h-[340px]" />
            <div className="blog-intro-visual-caption border-t border-violet-500/15 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">Visual summary</p>
              <p className="mt-1 text-sm leading-relaxed">A practical framework you can apply this week - not theory for its own sake.</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ArticleSection({ section, index, isLast }) {
  const sectionNum = String(index + 1).padStart(2, '0');
  const isStrategy = section.id.includes('strategy');
  const isConclusion = section.id.includes('conclusion');

  return (
    <article data-reveal style={{ '--reveal-delay': `${index * 50}ms` }} className="blog-article-section">
      {!isLast && <div className="blog-section-divider mb-12 h-px w-full bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />}

      <div className="flex flex-wrap items-start gap-3 sm:gap-4">
        <span className="blog-section-index flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
          {sectionNum}
        </span>
        <h2 id={section.id} className="blog-article-heading scroll-mt-28 flex-1 text-2xl font-bold leading-tight md:text-3xl">
          {section.heading}
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        {section.body.map((p, pi) => (
          <p key={pi} className="blog-article-body text-[16.5px] leading-[1.9]">{p}</p>
        ))}
      </div>

      {section.points && <ChecklistPanel points={section.points} />}

      {section.insight && (
        <div className="blog-insight-box my-8 rounded-2xl border-l-4 border-violet-500 bg-violet-50 p-6">
          <p className="blog-insight-label text-xs font-bold uppercase tracking-widest">Key insight</p>
          <p className="blog-insight-text mt-2 text-[15.5px] font-medium leading-relaxed">{section.insight}</p>
        </div>
      )}

      {section.quote && (
        <blockquote className="blog-pull-quote my-8 rounded-2xl border border-violet-400/35 bg-violet-500/10 px-6 py-6 text-[18px] italic leading-relaxed">
          &ldquo;{section.quote}&rdquo;
        </blockquote>
      )}

      {section.stats && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {section.stats.map((s) => <StatCard key={s.label} value={s.value} label={s.label} />)}
        </div>
      )}

      {isStrategy && section.sectionImage && (
        <SectionImageBanner src={section.sectionImage} alt={section.heading} caption="Strategy only works when it is visible to the whole team every week." />
      )}

      {section.sectionImage && !isStrategy && (
        <DoubleSectionImage
          src1={section.sectionImage}
          src2={section.sectionImage2 || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80'}
          alt={section.heading}
        />
      )}

      {isConclusion && (
        <div className="blog-action-box mt-8 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/20 to-violet-900/10 p-6 md:p-8">
          <p className="blog-action-box-title text-lg font-bold md:text-xl">Your next step</p>
          <p className="blog-action-box-text mt-2 text-[15px] leading-relaxed">
            Pick one priority for the next 90 days, assign a named owner, and review progress every week. That single habit compounds faster than any new tool or framework.
          </p>
        </div>
      )}
    </article>
  );
}
function OverviewDropdown({ headings, onHeadingClick }) {
  const [open, setOpen] = useState(true);
  const rows = Math.ceil(headings.length / 3);
  const panelHeight = rows * 56 + 40;

  return (
    <div className="blog-overview mb-10 w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="blog-overview-trigger group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-500" />
          </span>
          <span className="blog-overview-title text-base font-bold text-slate-900">Overview</span>
          <span className="blog-overview-badge rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">{headings.length} sections</span>
        </div>
        <svg className={`blog-overview-chevron h-5 w-5 text-slate-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="blog-overview-panel-wrap overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? `${panelHeight}px` : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="blog-overview-panel mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {headings.map((h, i) => (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  onHeadingClick(h.id);
                  setOpen(false);
                }}
                className="blog-overview-item flex items-center gap-2.5 rounded-xl bg-violet-50 px-3 py-2.5 text-left text-sm font-medium text-slate-900 transition hover:bg-violet-100"
              >
                <span className="blog-overview-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="blog-overview-label leading-snug">{h.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthorModal({ author, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const highlights = [
    '10+ years in investment strategy and portfolio management',
    'Advised 200+ founders on wealth-building frameworks',
    'Published in Forbes, Bloomberg, and Financial Times',
    'Speaker at Global Investment Summit 2024 & 2025',
    'Built and exited two fintech startups',
  ];

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '480px', borderRadius: '24px', background: '#12082a', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', animation: 'modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both', margin: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#1e293b 0%,#312e81 50%,#0f172a 100%)', padding: '24px 24px 32px', position: 'relative' }}>
          <button type="button" onClick={onClose}
            style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close">&#x2715;</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
            <img src={author.avatar} alt={author.name}
              style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>About The Author</p>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{author.name}</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600, color: '#a5b4fc' }}>{author.role}</p>
            </div>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.92)', margin: '0 0 20px' }}>{author.bio}</p>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a78bfa', marginBottom: 12 }}>Highlights</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {highlights.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                <span style={{ marginTop: 5, width: 7, height: 7, borderRadius: '50%', background: '#8b5cf6', flexShrink: 0 }} />{item}
              </li>
            ))}
          </ul>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
            {[{ v: '200+', l: 'Clients advised' }, { v: '10yr', l: 'Experience' }, { v: '3M+', l: 'Readers reached' }].map((s) => (
              <div key={s.l} style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff' }}>{s.v}</p>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: '#c4b5fd' }}>{s.l}</p>
              </div>
            ))}
          </div>
          <button type="button" onClick={onClose}
            style={{ width: '100%', padding: 14, borderRadius: 14, background: '#7c3aed', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#8b5cf6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#7c3aed'; }}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function BlogDetailPage() {
  const [slug, setSlug] = useState(getCurrentSlug);
  const [headings, setHeadings] = useState([]);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  useReveal(slug);

  useEffect(() => {
    const onChange = () => { setSlug(getCurrentSlug()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  const article = useMemo(() => getBlogBySlug(slug) || blogPosts[0] || null, [slug]);
  const sections = article?.sections ?? [];
  const author = article?.author ?? null;
  const nextPost = useMemo(() => getNextBlogPost(article?.slug), [article?.slug]);
  const prevPost = useMemo(() => getPrevBlogPost(article?.slug), [article?.slug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allH2 = Array.from(document.querySelectorAll('h2[id]')).map((h) => ({
        id: h.id, label: h.textContent || '',
      }));
      setHeadings(allH2);
    }, 150);
    return () => clearTimeout(timer);
  }, [article?.slug]);

  const overviewItems = useMemo(() => {
    if (headings.length > 0) return headings;
    return sections.map((s) => ({ id: s.id, label: s.heading }));
  }, [headings, sections]);

  const relatedPosts = useMemo(
    () => blogPosts.filter((p) => p?.slug && p.slug !== article?.slug).slice(0, 3),
    [article?.slug]
  );

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
  const heroImages = article.heroImages || [article.image];

  return (
    <main className="blog-detail-page relative z-10 w-full pb-24">

      <div className="mx-auto max-w-[1240px] px-4 pt-8 sm:px-6 lg:px-8">
        <HeroMediaBlock
          images={heroImages}
          category={article.category}
          title={article.title}
          excerpt={article.excerpt}
        />

        <div data-reveal className="blog-detail-hero blog-hero-meta mt-8 border-b border-violet-500/25 pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="blog-meta-chip rounded-full border border-violet-500/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {article.category}
            </span>
            <span className="blog-meta-dot hidden sm:inline"> - </span>
            <span className="blog-meta-value">{article.readTime}</span>
            <span className="blog-meta-dot hidden sm:inline"> - </span>
            <span className="blog-meta-value">{formatDisplayDate(article.date)}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-violet-500/20 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <img src={author?.avatar} alt={author?.name} className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-2 ring-violet-400/40" />
              <div>
                <p className="blog-meta-label text-[11px]">Written by</p>
                <p className="blog-meta-value text-sm font-semibold">{author?.name}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center sm:border-l sm:border-violet-500/15 sm:pl-6">
              <p className="blog-meta-label text-[11px]">Read time</p>
              <p className="blog-meta-value text-sm font-semibold">{article.readTime}</p>
            </div>
            <div className="flex flex-col justify-center sm:border-l sm:border-violet-500/15 sm:pl-6">
              <p className="blog-meta-label text-[11px]">Posted on</p>
              <p className="blog-meta-value text-sm font-semibold">{formatDisplayDate(article.date)}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 border-t border-violet-500/20 pt-6 sm:flex-row">
            <span className="blog-meta-value text-sm font-semibold">Share this post</span>
            <ShareIcons url={articleUrl} title={article.title} variant="light" className="blog-hero-share" />
          </div>
        </div>
      </div>

      <div className="blog-detail-content mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mt-12 space-y-16">
          <KeyTakeaways items={article.takeaways} />
          {overviewItems.length > 0 && (
            <OverviewDropdown headings={overviewItems} onHeadingClick={handleHeadingClick} />
          )}
          {sections.map((section, i) => {
            const isIntro = section.id.endsWith('-introduction');
            if (isIntro) {
              return (
                <IntroSection
                  key={section.id}
                  section={section}
                  highlight={article.introHighlight}
                  image={section.sectionImage}
                />
              );
            }
            return (
              <ArticleSection
                key={section.id}
                section={section}
                index={i}
                isLast={i === sections.length - 1}
              />
            );
          })}
          <blockquote data-reveal className="blog-closing-quote rounded-2xl border border-violet-400/35 bg-violet-500/10 px-8 py-7 text-[19px] italic leading-relaxed shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            &ldquo;{article.quote}&rdquo;
          </blockquote>
        </div>
      </div>
      <div className="mt-16 border-t border-violet-500/25 bg-transparent">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
          {author && (
            <div data-reveal className="flex flex-col gap-6 rounded-3xl border border-violet-500/25 card-premium-dark p-6 sm:flex-row sm:items-center sm:p-8">
              <img src={author.avatar} alt={author.name}
                className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover shadow-lg ring-4 ring-violet-500/25" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/90">About The Author</p>
                <h3 className="mt-1 text-2xl font-extrabold text-white">{author.name}</h3>
                <p className="text-sm font-medium text-white">{author.role}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white">{author.bio}</p>
              </div>
              <button type="button" onClick={() => setShowAuthorModal(true)}
                className="btn-purple-solid flex-shrink-0 self-start rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 sm:self-center">
                More about {author.name.split(' ')[0]}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══ PREV / NEXT - animated attention cards ══ */}
      <div className="border-t border-violet-500/20">
        <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevPost ? (
              <a href={`/blog/${prevPost.slug}`}
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/blog/${prevPost.slug}`); window.dispatchEvent(new PopStateEvent('popstate')); }}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(109,40,217,0.28)]"
              >
                {/* Animated shimmer bar on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img src={prevPost.thumbnail} alt={prevPost.title}
                      className="h-16 w-16 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-400 ring-offset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 text-xs font-semibold text-white transition-colors group-hover:text-white">
                      <span className="transition-transform duration-200 group-hover:-translate-x-1">&#8592;</span> Previous Post
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-violet-100">{prevPost.title}</p>
                  </div>
                </div>
              </a>
            ) : <div />}
            {nextPost ? (
              <a href={`/blog/${nextPost.slug}`}
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', `/blog/${nextPost.slug}`); window.dispatchEvent(new PopStateEvent('popstate')); }}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark p-5 text-right transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(109,40,217,0.28)]"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 origin-right scale-x-0 bg-gradient-to-l from-indigo-500 to-violet-500 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center justify-end gap-4">
                  <div className="min-w-0">
                    <p className="flex items-center justify-end gap-1 text-xs font-semibold text-white transition-colors group-hover:text-white">
                      Next Post <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-violet-100">{nextPost.title}</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <img src={nextPost.thumbnail} alt={nextPost.title}
                      className="h-16 w-16 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-400 ring-offset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </a>
            ) : <div />}
          </div>
        </div>
      </div>

      <div className="blog-insights-banner relative h-[280px] w-full overflow-hidden md:h-[400px]">
        <img src={article.subImage || article.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/65" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="blog-insights-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-violet-200">Keep Reading</p>
            <p className="blog-insights-title mt-3 text-3xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-5xl">Explore More Insights</p>
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="blog-detail-related bg-transparent border-t border-violet-500/20">
          <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
            <div data-reveal>
              <p className="blog-detail-related__eyebrow text-sm font-medium text-white/90">You may also like these</p>
              <h2 className="blog-detail-related__title mt-1 text-4xl font-extrabold tracking-tight text-white">Related Post</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post, i) => (
                <div key={post.slug} data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAuthorModal && author && (
        <AuthorModal author={author} onClose={() => setShowAuthorModal(false)} />
      )}

    </main>
  );
}

export default BlogDetailPage;
