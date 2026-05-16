import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import BlogCard from './blog/BlogCard';
import BlogCardSkeleton from './blog/BlogCardSkeleton';
import { blogCategories, blogPosts } from './blogData';

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const featuredPost = blogPosts[0] ?? null;
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);
  const visiblePosts = useMemo(() => filteredPosts.slice(0, visibleCount), [filteredPosts, visibleCount]);
  const canLoadMore = visibleCount < filteredPosts.length;

  const onCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const onLoadMore = () => {
    if (!canLoadMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    requestAnimationFrame(() => {
      setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPosts.length));
      setIsLoadingMore(false);
    });
  };

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 text-white">
      <section className="grid gap-10 rounded-[28px] card-premium-dark p-6 md:grid-cols-[1.02fr_0.98fr] md:p-10">
        <div className="overflow-hidden rounded-3xl">
          {featuredPost ? (
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-full min-h-[360px] w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <div className="h-full min-h-[360px] w-full bg-violet-950/40" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white">Blog & Insights</p>
          <h1 className="mt-4 max-w-[480px] text-4xl font-black uppercase leading-[1.02] text-white md:text-5xl">
            Stay Updated With Our Latest Blogs
          </h1>
          <p className="mt-8 max-w-[460px] text-base leading-relaxed text-white">
            We provide expert financial guidance, strategic planning, and business consulting insights to help
            companies grow with confidence.
          </p>
          <div className="mt-9">
            <Button
              variant="primary"
              icon
              className="h-14 px-7 text-sm font-semibold"
              onClick={() => {
                window.location.pathname = '/contact';
              }}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-7 flex flex-wrap gap-3">
          {blogCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                activeCategory === category
                  ? 'bg-violet-600 text-white shadow-[0_10px_24px_rgba(124,58,237,0.35)]'
                  : 'border border-violet-500/25 bg-white/5 text-white hover:border-violet-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visiblePosts.filter(post => post?.slug).map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index < 3} />
            ))}
          </AnimatePresence>

          {isLoadingMore
            ? Array.from({ length: Math.min(LOAD_MORE_COUNT, filteredPosts.length - visiblePosts.length) }).map(
                (_, index) => <BlogCardSkeleton key={`skeleton-${index}`} />
              )
            : null}
        </motion.div>

        {canLoadMore ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="group inline-flex min-w-[180px] items-center justify-center gap-3 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.24)] disabled:cursor-not-allowed disabled:opacity-80"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/45 bg-white/15 text-lg text-white transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                →
              </span>
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default BlogPage;
