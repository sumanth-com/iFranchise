import { formatDisplayDate } from '../blogData';
import ShareIcons from './ShareIcons';

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function BlogSidebar({ headings, activeHeadingId, onHeadingClick, shareUrl, shareTitle, relatedPosts = [], className = '' }) {
  return (
    <aside className={`w-full ${className}`}>
      <div className="space-y-4">

        {/* Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
          <ul className="mt-3 space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  type="button"
                  onClick={() => onHeadingClick(heading.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    activeHeadingId === heading.id
                      ? 'bg-slate-900 font-medium text-white'
                      : 'text-white hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {heading.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Share */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Share this post</h3>
          <ShareIcons url={shareUrl} title={shareTitle} />
        </div>

        {/* Subscribe */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm leading-relaxed text-white">
            Join 1,000,000+ subscribers receiving expert tips on earning more, investing smarter and living better, all in our free newsletter.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="name@email.com"
              className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <button
              type="submit"
              className="h-10 flex-shrink-0 rounded-lg bg-[#0b1f3b] px-4 text-sm font-semibold text-white transition duration-200 hover:bg-[#08152b]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* More to read — fills remaining right-column space */}
        {relatedPosts.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">More to read</h3>
            <ul className="mt-3 divide-y divide-slate-100">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/blog/${post.slug}`);
                    }}
                    className="group flex gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      className="h-14 w-14 flex-shrink-0 rounded-lg object-cover transition duration-300 group-hover:opacity-80"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-[13px] font-medium leading-snug text-slate-800 transition group-hover:text-white">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[11px] text-white">
                        {post.category} · {formatDisplayDate(post.date)}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </aside>
  );
}

export default BlogSidebar;
