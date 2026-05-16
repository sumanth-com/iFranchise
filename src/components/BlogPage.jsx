import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import BlogCard from './blog/BlogCard';
import BlogCardSkeleton from './blog/BlogCardSkeleton';
import { blogCategories, blogPosts } from './blogData';

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;

// Real-time clock hook
function useRealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });
}

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const currentTime = useRealTimeClock();

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
    <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 text-slate-100">
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300/70">Blog & Insights</p>
          <h1 className="mt-4 max-w-[480px] text-4xl font-black uppercase leading-[1.02] text-white md:text-5xl">
            Stay Updated With Our Latest Blogs
          </h1>
          <p className="mt-8 max-w-[460px] text-base leading-relaxed text-slate-300/90">
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
                  : 'border border-violet-500/25 bg-white/5 text-slate-200 hover:border-violet-400/50 hover:text-white'
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

      {/* PREMIUM BLOG DISCOVERY SECTION */}
      <section className="relative z-10 w-full overflow-hidden bg-transparent py-20 lg:py-28 text-slate-100">
        {/* Subtle Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Soft Purple Gradient Orb Left */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[15%] top-[25%] h-[400px] w-[400px] rounded-full bg-purple-600 blur-[120px]"
          />
          
          {/* Soft Purple Gradient Orb Right */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute right-[15%] bottom-[25%] h-[450px] w-[450px] rounded-full bg-violet-600 blur-[130px]"
          />

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-purple-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Strategic Insights</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Insights That Shape
              <br />
              Franchise Growth
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl"
            >
              Discover market trends, founder strategies, franchise opportunities, and expansion intelligence through expert-driven editorial content.
            </motion.p>
          </div>

          {/* Main Content Layout */}
          <div className="relative mt-20 grid gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* LEFT SIDE - Trending Blog Categories */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-violet-300">
                Trending Blog Categories
              </h3>
              
              {[
                { title: 'Low Investment Franchises', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Food & Beverage Expansion', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Passive Income Models', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Investor Strategy Guides', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Franchise Funding Models', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Retail Scale Systems', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Multi-Unit Ownership', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
              ].map((topic, idx) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl border ${topic.borderColor} bg-gradient-to-br ${topic.color} p-4 backdrop-blur-sm transition-all duration-300 ${topic.hoverBorder} hover:shadow-lg hover:shadow-purple-200/50`}
                >
                  <div className="flex items-center gap-3">
                    {/* Professional SVG Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                      {idx === 0 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {idx === 4 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      )}
                      {idx === 5 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {idx === 6 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-slate-800">{topic.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-100/50 to-purple-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>

            {/* CENTER - iPhone Mockup with Blog Discovery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto w-full max-w-[320px]"
            >
              {/* iPhone Frame - Realistic Device */}
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[3.2rem] border-[3px] border-slate-800 bg-black shadow-[0_25px_80px_rgba(124,58,237,0.4)]">
                {/* Metallic Frame Details */}
                <div className="absolute inset-0 rounded-[3.2rem] border-[1px] border-slate-600/30" />
                
                {/* Volume Buttons */}
                <div className="absolute -left-[3px] top-[120px] h-8 w-1 rounded-l-sm bg-slate-700" />
                <div className="absolute -left-[3px] top-[160px] h-6 w-1 rounded-l-sm bg-slate-700" />
                <div className="absolute -left-[3px] top-[180px] h-6 w-1 rounded-l-sm bg-slate-700" />
                
                {/* Power Button */}
                <div className="absolute -right-[3px] top-[140px] h-12 w-1 rounded-r-sm bg-slate-700" />
                
                {/* Screen Content */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] bg-white">
                  {/* Native iOS Status Bar */}
                  <div className="relative z-30 flex items-center justify-between px-8 pt-4 text-sm font-medium text-slate-900">
                    {/* Real-time Clock */}
                    <motion.span 
                      key={currentTime}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      className="font-semibold tracking-tight"
                    >
                      {currentTime}
                    </motion.span>
                    
                    {/* Right Status Icons */}
                    <div className="flex items-center gap-1.5">
                      {/* Cellular Signal */}
                      <div className="flex items-end gap-0.5">
                        <motion.div 
                          animate={{ height: [3, 4, 3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                          className="w-0.5 rounded-full bg-slate-900" 
                          style={{ height: '3px' }}
                        />
                        <motion.div 
                          animate={{ height: [5, 6, 5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          className="w-0.5 rounded-full bg-slate-900" 
                          style={{ height: '5px' }}
                        />
                        <motion.div 
                          animate={{ height: [7, 8, 7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                          className="w-0.5 rounded-full bg-slate-900" 
                          style={{ height: '7px' }}
                        />
                        <motion.div 
                          animate={{ height: [9, 10, 9] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                          className="w-0.5 rounded-full bg-slate-900" 
                          style={{ height: '9px' }}
                        />
                      </div>
                      
                      {/* WiFi Icon */}
                      <motion.svg 
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="ml-1 h-3.5 w-3.5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.24 0 1 1 0 01-1.415-1.415 5 5 0 017.07 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 112 0 1 1 0 01-2 0z" />
                      </motion.svg>
                      
                      {/* Battery */}
                      <div className="ml-1 flex items-center">
                        <div className="relative h-2.5 w-6 rounded-sm border border-slate-900">
                          <motion.div
                            animate={{ 
                              width: ['75%', '85%', '75%'],
                              backgroundColor: ['#0f172a', '#059669', '#0f172a']
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="h-full rounded-sm"
                          />
                          {/* Charging Bolt */}
                          <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="ml-0.5 h-1.5 w-1 rounded-r-sm bg-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2 z-20 h-7 w-32 -translate-x-1/2 rounded-full bg-slate-900 shadow-lg">
                    {/* Camera Sensor */}
                    <div className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-slate-800" />
                    
                    {/* Live Activity Indicator */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.8, 0.4] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-purple-500"
                    />
                    
                    {/* Subtle Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-700/20 via-slate-600/10 to-slate-700/20" />
                  </div>
                  
                  {/* App Content with Safe Area */}
                  <div className="relative mt-10 h-full px-5 pb-6">
                    {/* App Header - Apple News Style */}
                    <div className="mb-6 flex items-center justify-between border-b border-slate-200/60 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-purple-600">iFRANCHISE</p>
                        <p className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">Trending Now</p>
                      </div>
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 shadow-sm" />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1], 
                            opacity: [0.6, 1, 0.6] 
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-purple-500 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Content Layout - Optimized to Fill Mobile Viewport */}
                    <div className="space-y-3">
                      {/* Attractive Email Subscribe Section - First */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="rounded-xl border border-purple-200/60 bg-gradient-to-br from-purple-50 to-violet-50 p-4 shadow-sm"
                      >
                        <div className="mb-3 text-center">
                          <p className="text-sm font-bold text-purple-900">Get Weekly Insights</p>
                          <p className="text-xs text-purple-700">Latest franchise opportunities & trends</p>
                        </div>
                        
                        <div className="space-y-3">
                          {/* Email Input */}
                          <div className="relative">
                            <input
                              type="email"
                              placeholder="Enter your email"
                              className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Subscribe Button */}
                          <button className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-3 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl">
                            <div className="relative z-10 flex items-center justify-center gap-2">
                              <span className="text-sm font-bold text-white">Subscribe Now</span>
                              <svg className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            </div>
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0"
                            />
                          </button>
                        </div>
                      </motion.div>

                      {/* Larger Blog Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm"
                      >
                        <div className="relative h-28 overflow-hidden bg-gradient-to-br from-orange-100 via-red-50 to-orange-100">
                          {/* Restaurant/Food Franchise Image Simulation */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-400/25" />
                          
                          {/* Restaurant Elements */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500/70 shadow-sm" />
                            <div className="h-2 w-8 rounded-full bg-red-400/60" />
                          </div>
                          
                          {/* Food Icons */}
                          <div className="absolute bottom-3 right-3 flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-orange-600/80" />
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
                            <div className="h-2 w-2 rounded-full bg-orange-500/60" />
                          </div>
                          
                          {/* Overlay Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                        </div>
                        <div className="p-4">
                          <p className="mb-2 text-xs font-bold text-purple-600">TRENDING</p>
                          <p className="text-base font-bold leading-tight text-slate-900">Top 7 Food Franchise Opportunities in India</p>
                          <p className="mt-2 text-xs text-slate-500">5 min read • Expert insights</p>
                        </div>
                      </motion.div>

                      {/* Start Reading CTA - Same Size as Subscribe */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        onClick={() => {
                          if (featuredPost?.slug) {
                            window.location.pathname = `/blog/${featuredPost.slug}`;
                          }
                        }}
                        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-3 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/35"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-white">Start Reading</span>
                          <svg className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-white/25 to-white/0"
                        />
                      </motion.button>
                    </div>

                    {/* iOS Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-slate-900/30" />
                  </div>
                </div>
              </div>

              {/* Enhanced Phone Reflection & Ambient Effects */}
              <div className="absolute inset-0 -z-10">
                {/* Main Reflection */}
                <div className="absolute inset-0 translate-y-6 blur-3xl">
                  <div className="h-full w-full rounded-[3.2rem] bg-gradient-to-b from-purple-400/20 via-violet-400/15 to-purple-400/10" />
                </div>
                
                {/* Ambient Purple Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -inset-8 rounded-full bg-gradient-radial from-purple-500/30 via-violet-500/20 to-transparent blur-2xl"
                />
                
                {/* Floating Light Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-purple-400/40"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE - Featured Strategic Reads */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-violet-300">
                Featured Strategic Reads
              </h3>
              
              {[
                { title: 'Franchise Scaling Frameworks', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Founder Expansion Playbooks', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Market Intelligence Reports', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Category Leadership Blueprints', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Strategic Market Reports', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Franchise Compliance Guides', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
                { title: 'Investor Scaling Blueprints', color: 'from-purple-50 to-violet-50', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400' },
              ].map((read, idx) => (
                <motion.div
                  key={read.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: -5, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl border ${read.borderColor} bg-gradient-to-br ${read.color} p-4 backdrop-blur-sm transition-all duration-300 ${read.hoverBorder} hover:shadow-lg hover:shadow-purple-200/50`}
                >
                  <div className="flex items-center gap-3">
                    {/* Professional SVG Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                      {idx === 0 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )}
                      {idx === 4 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      )}
                      {idx === 5 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {idx === 6 && (
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-slate-800">{read.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-l from-purple-100/0 via-purple-100/50 to-purple-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Brand Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-20 max-w-5xl text-center"
          >
            <p className="text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
              iFranchise transforms knowledge into{' '}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                strategic momentum
              </span>
              {' '}— empowering founders and investors through content that scales.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
