import { motion } from 'framer-motion';

import { navigateTo } from '@/lib/navigation';
import { formatDisplayDate } from '../blogData';
import BlogImage, { BLOG_IMAGE_FIT_CLASS, BLOG_IMAGE_FRAME_CLASS } from './BlogImage';

function BlogCard({ post, priority = false }) {
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt.trim() : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="blog-listing-card group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1.5 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(47,13,163,0.28)]"
    >
      <a
        href={`/blogs/${post.slug}`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/blogs/${post.slug}`);
        }}
        className="flex h-full flex-col"
      >
        <BlogImage
          src={post.thumbnail}
          alt={post.imageAlt || post.title}
          variant="card"
          priority={priority}
          wrapperClassName={`${BLOG_IMAGE_FRAME_CLASS} shrink-0`}
          className="w-full"
          imgClassName={`${BLOG_IMAGE_FIT_CLASS} transition duration-300`}
        />
        <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-4">
          <div className="blog-listing-card__meta flex flex-wrap items-center gap-2 text-xs">
            <span className="blog-listing-card__pill rounded-full border border-violet-400/35 bg-violet-500/15 px-2.5 py-1 font-medium">
              {post.category}
            </span>
            <span className="blog-listing-card__dot opacity-50" aria-hidden>
              ·
            </span>
            <span>{post.readTime}</span>
            <span className="blog-listing-card__dot opacity-50" aria-hidden>
              ·
            </span>
            <span>{formatDisplayDate(post.date)}</span>
          </div>
          <h3 className="blog-listing-card__title text-xl font-bold leading-snug sm:text-2xl line-clamp-2">
            {post.title}
          </h3>
          {excerpt ? (
            <p className="blog-listing-card__excerpt mt-auto text-sm leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          ) : null}
        </div>
      </a>
    </motion.article>
  );
}

export default BlogCard;
