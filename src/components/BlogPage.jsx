import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import BlogCard from './blog/BlogCard';
import BlogImage from './blog/BlogImage';
import { BLOG_PAGE_HERO_IMAGE } from './blog/blogImages';
import { blogPosts } from './blogData';
import { navigateTo } from '@/lib/navigation';
import { TYPE, sectionTitleClass } from '../lib/typography.js';

function BlogPage() {
  useEffect(() => {
    const preload = new Image();
    preload.decoding = 'async';
    preload.src = BLOG_PAGE_HERO_IMAGE;
    blogPosts.forEach((post) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = post.thumbnail;
    });
  }, []);

  return (
    <main className="blog-page relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-12 sm:px-6 lg:px-8 text-white">
      <section className="blog-page-hero grid grid-cols-1 gap-0 overflow-hidden rounded-[28px] card-premium-dark md:grid-cols-[1.02fr_0.98fr] md:gap-10 md:p-10">
        <div className="blog-page-hero__media min-h-[280px] w-full overflow-hidden sm:min-h-[300px] md:min-h-[320px] md:rounded-3xl">
          <BlogImage
            src={BLOG_PAGE_HERO_IMAGE}
            alt="Franchise insights and investment guides"
            variant="card"
            priority
            wrapperClassName="blog-page-hero__image-wrap h-full min-h-[inherit] w-full"
            className="blog-page-hero__image h-full w-full"
            imgClassName="object-cover object-[center_15%] md:object-center"
          />
        </div>
        <div className="blog-page-hero__copy flex flex-col justify-center px-5 py-6 sm:px-6 md:px-0 md:py-0">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-200">Franchise Insights</p>
          <h1 className={`mt-4 max-w-[480px] ${TYPE.heroBrand} text-white`}>
            Practical guides for investors and brand owners
          </h1>
          <p className="mt-6 max-w-[460px] text-base leading-relaxed text-white/90">
            Four focused articles on evaluating opportunities, choosing FOFO or FICO, unit economics, and
            where franchise demand is heading in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              icon
              className="h-12 px-6 text-sm font-semibold"
              onClick={() => navigateTo('/franchise-opportunities')}
            >
              Browse opportunities
            </Button>
            <Button
              variant="secondary"
              className="h-12 px-6 text-sm font-semibold"
              onClick={() => navigateTo('/list-your-brand')}
            >
              List your brand
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-8">
          <h2 className={`${sectionTitleClass(true)} text-white`}>Latest articles</h2>
          <p className="mt-2 max-w-xl text-sm text-white/75">
            Written for business owners, franchise investors, and expansion teams.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {blogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index < 2} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}

export default BlogPage;
