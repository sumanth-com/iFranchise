const authors = [
  {
    name: 'Luke Roberts',
    role: 'Investment Strategy Lead',
    bio: 'Luke helps founders and operators build long-term wealth plans backed by data and risk control.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Linda Grey',
    role: 'Product Growth Consultant',
    bio: 'Linda advises teams on shipping products faster while preserving quality and retention.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Samuel Green',
    role: 'Market Analyst',
    bio: 'Samuel tracks macro trends and translates complex market moves into practical action plans.',
    avatar: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Mia Varon',
    role: 'Crypto Research Editor',
    bio: 'Mia writes about digital assets, blockchain adoption, and responsible portfolio allocation.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
];

const basePosts = [
  {
    slug: 'real-estate-the-timeless-investment-opportunity',
    title: 'Real Estate: The Timeless Investment Opportunity',
    category: 'Invest',
    date: '2026-04-21',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Why real estate continues to outperform for patient investors in uncertain market cycles.',
    quote: 'Asset classes evolve, but disciplined ownership of productive property remains a durable edge.',
  },
  {
    slug: 'the-power-of-alternative-investments',
    title: 'The Power of Alternative Investments',
    category: 'Invest',
    date: '2026-04-18',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    excerpt: 'How to diversify beyond stocks and bonds without losing control of risk and liquidity.',
    quote: 'Smart diversification is not collecting assets, it is combining return streams with different cycles.',
  },
  {
    slug: 'smart-investing-in-a-changing-world',
    title: 'Smart Investing in a Changing World',
    category: 'News',
    date: '2026-04-17',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
    excerpt: 'A practical response plan for interest rate shifts, inflation cycles, and evolving demand.',
    quote: 'Markets reward investors who adapt early, not those who react late.',
  },
  {
    slug: 'why-product-led-growth-drives-retention',
    title: 'Why Product-Led Growth Drives Retention',
    category: 'Product',
    date: '2026-04-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Activation-focused product journeys are now the strongest predictor of long-term customer value.',
    quote: 'Retention starts before conversion, in the first minute of product experience.',
  },
  {
    slug: 'how-to-launch-features-without-breaking-trust',
    title: 'How to Launch Features Without Breaking Trust',
    category: 'Product',
    date: '2026-04-14',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    excerpt: 'A rollout framework for feature flags, communication timing, and support-readiness.',
    quote: 'Shipping fast matters, but shipping predictably builds confidence.',
  },
  {
    slug: 'crypto-risk-management-for-new-investors',
    title: 'Crypto Risk Management for New Investors',
    category: 'Crypto',
    date: '2026-04-12',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Position sizing, custody hygiene, and volatility planning for sustainable digital-asset investing.',
    quote: 'In crypto, survival through volatility is the foundation of long-term upside.',
  },
  {
    slug: 'bitcoin-halving-what-business-investors-should-know',
    title: 'Bitcoin Halving: What Business Investors Should Know',
    category: 'Crypto',
    date: '2026-04-11',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1639322537231-2f206e06af84?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1639322537231-2f206e06af84?auto=format&fit=crop&w=900&q=80',
    excerpt: 'A plain-language breakdown of supply mechanics and how they can influence long-cycle valuation.',
    quote: 'Narratives move price today, but scarcity mechanics shape price over time.',
  },
  {
    slug: 'weekly-market-roundup-growth-sectors',
    title: 'Weekly Market Roundup: Growth Sectors to Watch',
    category: 'News',
    date: '2026-04-09',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
    excerpt: "This week's strongest momentum came from logistics tech, healthcare infra, and AI tooling.",
    quote: 'Consistent market awareness turns uncertainty into informed decision windows.',
  },
  {
    slug: 'how-to-build-an-investment-thesis-you-can-defend',
    title: 'How to Build an Investment Thesis You Can Defend',
    category: 'Invest',
    date: '2026-04-08',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Turn vague conviction into clear assumptions, downside planning, and measurable milestones.',
    quote: 'If you cannot explain your thesis clearly, you cannot manage it confidently.',
  },
  {
    slug: 'product-roadmap-prioritization-that-scales',
    title: 'Product Roadmap Prioritization That Scales',
    category: 'Product',
    date: '2026-04-06',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    excerpt: 'A simple scoring method that balances customer impact, execution effort, and strategic fit.',
    quote: 'Good roadmaps reduce arguments by making trade-offs visible.',
  },
  {
    slug: 'crypto-regulation-signals-to-follow-in-2026',
    title: 'Crypto Regulation Signals to Follow in 2026',
    category: 'Crypto',
    date: '2026-04-05',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1644361566696-3d6f7a095e94?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1644361566696-3d6f7a095e94?auto=format&fit=crop&w=900&q=80',
    excerpt: 'The compliance indicators that will matter most for institutions and retail participants this year.',
    quote: 'Regulation does not remove innovation; it changes where trustworthy innovation concentrates.',
  },
  {
    slug: 'breaking-news-india-franchise-demand-rises',
    title: 'Breaking News: Franchise Demand in India Continues to Rise',
    category: 'News',
    date: '2026-04-03',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Franchise inquiries rose again this quarter as investors seek asset-backed expansion opportunities.',
    quote: 'Demand acceleration is strongest where operators offer repeatable systems and clear economics.',
  },
  {
    slug: 'investing-checklist-before-signing-any-deal',
    title: 'Investing Checklist Before Signing Any Deal',
    category: 'Invest',
    date: '2026-04-02',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Use this pre-commit checklist to avoid avoidable risk before committing capital.',
    quote: 'Most costly mistakes are visible before you sign, if you know where to look.',
  },
  {
    slug: 'product-analytics-metrics-that-actually-matter',
    title: 'Product Analytics: Metrics That Actually Matter',
    category: 'Product',
    date: '2026-03-30',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Replace vanity dashboards with decision metrics that improve retention and conversion.',
    quote: 'Metrics should trigger action, not decoration.',
  },
  {
    slug: 'crypto-portfolio-allocation-for-long-term-builders',
    title: 'Crypto Portfolio Allocation for Long-Term Builders',
    category: 'Crypto',
    date: '2026-03-28',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=900&q=80',
    excerpt: 'An allocation model for balancing conviction assets, stable reserves, and tactical exposure.',
    quote: 'Allocation is your strategy made visible.',
  },
];

const secondaryImages = [
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80',
];

const makeSections = (slug) => [
  {
    id: `${slug}-introduction`,
    heading: 'Introduction',
    body: [
      'Long-term growth comes from combining strategic clarity with consistent execution. The strongest teams avoid chasing noise and instead build conviction through measurable progress. In a world where information moves faster than decisions, the ability to filter signal from noise is the single most valuable skill any investor or operator can develop.',
      'This article breaks down how to evaluate opportunities with discipline, align teams quickly, and convert strategy into visible outcomes. We will walk through the core frameworks used by top-performing organizations to stay focused, move fast, and compound results over time.',
      'Whether you are managing a portfolio, leading a product team, or building a business from scratch, the principles here apply universally. The difference between those who succeed and those who stall is rarely intelligence - it is the quality of their systems and the consistency of their execution.',
    ],
    sectionImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: `${slug}-problem`,
    heading: 'The Core Problem',
    body: [
      'Most organizations fail in execution, not planning. They spread focus too thin, react late to market changes, and operate without a clear review cadence. The result is a culture of busyness that produces very little actual progress.',
      'When decision ownership is vague, strategy degrades into activity. Teams stay busy while results stall. Meetings multiply, dashboards grow, and everyone feels productive - but the needle barely moves. This is the execution trap, and it catches even the most talented teams.',
      'The root cause is almost always the same: too many priorities competing for the same limited resources. When everything is important, nothing is. The organizations that break out of this pattern are the ones that learn to say no - loudly, consistently, and without apology.',
    ],
    points: [
      'No clear prioritization framework across teams.',
      'Inconsistent review rhythm leads to drift.',
      'Too much focus on lagging metrics that cannot be influenced.',
      'Decision ownership is shared, which means it belongs to no one.',
      'Strategy documents exist but are not connected to daily work.',
    ],
    insight: 'Key Insight: Clarity in ownership and review rhythm removes most execution bottlenecks before they become crises.',
  },
  {
    id: `${slug}-strategy`,
    heading: 'Building the Right Strategy',
    body: [
      'Define a 90-day strategy around one core objective, three supporting outcomes, and clear leading indicators. This constraint forces prioritization and creates a shared language for the entire team. When everyone knows the one thing that matters most, alignment happens naturally.',
      'Document assumptions and risk triggers in advance so teams can respond quickly when market conditions shift. Most strategies fail not because the plan was wrong, but because the team was not prepared for the moment when reality diverged from the plan.',
      'The best strategies are living documents. They are reviewed weekly, updated when assumptions change, and shared transparently across the organization. Secrecy in strategy creates silos. Transparency creates alignment.',
      'Think of your strategy as a series of bets. Each bet has a thesis, a time horizon, and a clear signal that tells you whether the bet is working. When the signal turns negative, you adjust - not because you failed, but because you are paying attention.',
    ],
    points: [
      'Pick one primary outcome and defend focus relentlessly.',
      'Use weekly checkpoints with written decision logs.',
      'Align capital and team bandwidth to highest-return initiatives.',
      'Build in explicit review triggers for when to pivot.',
    ],
    sectionImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: `${slug}-execution`,
    heading: 'Execution That Compounds',
    body: [
      'Execution quality improves when plans are broken into weekly deliverables with named owners and measurable milestones. Vague goals produce vague results. Specific commitments produce specific outcomes.',
      'Use compact dashboards to monitor momentum, quality, and conversion impact in one place. The goal is not to track everything - it is to track the three to five numbers that tell you whether you are winning or losing this week.',
      'The compounding effect of consistent execution is dramatic. A team that ships 10% better every quarter does not just get 40% better in a year - it gets exponentially better because each improvement builds on the last. This is why execution discipline is the highest-leverage investment any organization can make.',
      'Accountability is the engine of execution. Not blame - accountability. The difference is that accountability is forward-looking. It asks: what will you do differently next week? Blame is backward-looking and produces defensiveness, not improvement.',
    ],
    points: [
      'Weekly owner-based delivery plan with clear acceptance criteria.',
      'Bi-weekly risk review and documented corrective actions.',
      'Monthly calibration with leadership on resource allocation.',
      'Quarterly retrospective to update the strategy based on learnings.',
    ],
    insight: 'Key Insight: Strong execution beats perfect planning every time. A good plan executed brilliantly outperforms a brilliant plan executed poorly.',
  },
  {
    id: `${slug}-case-insight`,
    heading: 'Real-World Case Insight',
    body: [
      'One growth-stage team improved conversion by 28% in one quarter after narrowing roadmap scope and introducing a strict execution cadence. Before the change, they had 14 active initiatives. After, they had three. The reduction in context-switching alone accounted for a significant portion of the improvement.',
      'The biggest gains came from fewer priorities, faster feedback loops, and clearer accountability across product and marketing. The team went from monthly reviews to weekly standups with written outcomes. Every decision was logged. Every assumption was tested.',
      'What surprised the leadership team most was not the performance improvement - it was the cultural shift. People stopped hedging. They started making clear commitments and following through. Trust increased. Morale improved. The best performers, who had been quietly frustrated by the lack of focus, became visibly energized.',
      'This pattern repeats across industries and company sizes. The constraint of focus does not limit what teams can achieve - it amplifies it. When you remove the noise, the signal gets louder.',
    ],
    quote: 'When teams align around one measurable objective and review progress weekly, performance compounds quickly. The math of focus is not additive - it is multiplicative.',
    stats: [
      { value: '28%', label: 'Conversion lift in 90 days' },
      { value: '3×', label: 'Faster decision cycles' },
      { value: '14->3', label: 'Active initiatives reduced' },
      { value: '92%', label: 'Team retention improvement' },
    ],
  },
  {
    id: `${slug}-market-dynamics`,
    heading: 'Understanding Market Dynamics',
    body: [
      'No strategy exists in a vacuum. The market is always moving, and the teams that win are the ones that build systems for sensing and responding to change - not just executing against a static plan.',
      'Market dynamics shift in three ways: gradually, then suddenly. The gradual shifts are visible to anyone paying attention. The sudden shifts catch everyone off guard. The difference between organizations that survive sudden shifts and those that do not is almost always the quality of their sensing systems.',
      'Build a regular cadence of market intelligence into your operating rhythm. This does not mean reading every report or attending every conference. It means identifying the three to five signals that matter most for your specific context and monitoring them consistently.',
    ],
    sectionImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Identify your leading indicators before you need them.',
      'Build competitor monitoring into your weekly rhythm.',
      'Create a signal library that the whole team can contribute to.',
    ],
  },
  {
    id: `${slug}-conclusion`,
    heading: 'Conclusion',
    body: [
      'Great outcomes are produced by repeatable systems, not occasional bursts of effort. Build a rhythm that can survive changing market cycles, leadership transitions, and the inevitable moments of uncertainty that every organization faces.',
      'If you want durable growth, keep decisions simple, execution visible, and learning cycles short. The organizations that compound over time are not the ones with the best ideas - they are the ones with the best systems for turning ideas into outcomes.',
      'Start with one change. Pick the single most important initiative for the next 90 days. Assign a clear owner. Define what success looks like. Review progress every week. That is the entire system. Everything else is detail.',
      'The gap between knowing and doing is where most strategies die. Close that gap, and everything else becomes possible.',
    ],
  },
];

const takeawayPool = [
  ['Focus beats breadth - narrow to one 90-day objective', 'Weekly review rhythm prevents strategy drift', 'Leading indicators surface problems early', 'Named owners turn plans into outcomes'],
  ['Document assumptions before you commit capital', 'Build downside triggers into every thesis', 'Liquidity planning is part of return planning', 'Diversification works when cycles differ'],
  ['Activation quality predicts long-term retention', 'Ship in small batches with clear acceptance criteria', 'Customer feedback loops should be weekly, not quarterly', 'Metrics must drive a decision or they are noise'],
  ['Position size matters more than entry timing', 'Custody and compliance are non-negotiable foundations', 'Volatility is a feature - plan for it in advance', 'Conviction assets need explicit allocation caps'],
];

export const blogPosts = basePosts.map((post, index) => ({
  ...post,
  readTime: ['12 min read', '14 min read', '11 min read', '13 min read'][index % 4],
  sections: makeSections(post.slug),
  author: authors[index % authors.length],
  subImage: secondaryImages[index % secondaryImages.length],
  takeaways: takeawayPool[index % takeawayPool.length],
  introHighlight: 'The teams that compound results are not the busiest - they are the most deliberate about focus, ownership, and review cadence.',
  heroImages: [
    post.image,
    secondaryImages[index % secondaryImages.length],
    secondaryImages[(index + 1) % secondaryImages.length],
    secondaryImages[(index + 2) % secondaryImages.length],
  ],
}));

export const blogCategories = ['All', 'News', 'Product', 'Invest', 'Crypto'];

export const getBlogBySlug = (slug) => blogPosts.find((post) => post.slug === slug);

export const getNextBlogPost = (slug) => {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
  if (currentIndex < 0) return blogPosts[0] ?? null;
  return blogPosts[(currentIndex + 1) % blogPosts.length] ?? null;
};

export const getPrevBlogPost = (slug) => {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
  if (currentIndex <= 0) return blogPosts[blogPosts.length - 1] ?? null;
  return blogPosts[currentIndex - 1] ?? null;
};

export const formatDisplayDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
