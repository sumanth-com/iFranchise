import { motion } from 'framer-motion';

import { navigateTo } from '@/lib/navigation';
import { formatDisplayDate } from '../blogData';
import BlogImage, { BLOG_IMAGE_FIT_CLASS, BLOG_IMAGE_FRAME_CLASS } from './BlogImage';

function BlogCard({ post, priority = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="group overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1.5 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(109,40,217,0.28)]"
    >
      <a
        href={`/blog/${post.slug}`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/blog/${post.slug}`);
        }}
        className="block"
      >
        <BlogImage
          src={post.thumbnail}
          alt={post.imageAlt || post.title}
          variant="card"
          priority={priority}
          wrapperClassName={BLOG_IMAGE_FRAME_CLASS}
          className="h-full w-full"
          imgClassName={`${BLOG_IMAGE_FIT_CLASS} transition duration-500 group-hover:scale-[1.02]`}
        />
        <div className="space-y-3 px-5 pb-6 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/85">
            <span className="rounded-full border border-violet-400/35 bg-violet-500/15 px-2.5 py-1 font-medium text-white">
              {post.category}
            </span>
            <span className="text-white/50">·</span>
            <span>{post.readTime}</span>
            <span className="text-white/50">·</span>
            <span>{formatDisplayDate(post.date)}</span>
          </div>
          <h3
            className="text-xl font-bold leading-tight text-white sm:text-2xl"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/75 line-clamp-2">{post.excerpt}</p>
        </div>
      </a>
    </motion.article>
  );
}

export default BlogCard;
