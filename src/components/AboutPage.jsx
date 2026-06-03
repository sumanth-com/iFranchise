import { motion } from 'framer-motion';
import { useState } from 'react';
import AboutHero from './about/AboutHero';
import IfranchiseAcronymSection from './about/IfranchiseAcronymSection';
import LeadershipSection from './LeadershipSection';
import CtaButton from './ui/CtaButton';
import { sectionTitleClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';

// Set to true when ready to show the team section on About Us
const SHOW_TEAM_SECTION = false;

// Import actual images
import aboutUsImage from '../assets/aboutus.webp';
import { ABOUT_PAGE_TESTIMONIALS } from '../data/testimonials.js';

// Premium Team Card Component with In-Card Popup
function PremiumTeamCard({ member }) {
  const [showDetails, setShowDetails] = useState(false);

  // CARD HEIGHT - Same for both states
  const CARD_HEIGHT = 'h-[480px]';

  if (showDetails) {
    // EXPANDED VIEW - Same height, scrollable content
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative ${CARD_HEIGHT} w-full overflow-hidden rounded-3xl border border-violet-400/45 card-premium-dark shadow-2xl flex flex-col`}
      >
        <button
          onClick={() => setShowDetails(false)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/25 text-white shadow-lg transition-colors hover:bg-violet-500/40"
        >
          ✕
        </button>

        {/* Fixed Image Header */}
        <div className="relative h-32 w-full flex-shrink-0 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover"
            width={320}
            height={320}
            decoding="async"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0618] via-[#0a0618]/85 to-transparent" />
          <div className="absolute bottom-2 left-4">
            <h3 className="text-lg font-black text-white">{member.name}</h3>
            <p className="mt-0.5 text-xs font-semibold text-white">{member.role}</p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div
          className="flex-1 overflow-y-auto p-5"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="space-y-4">
            <div>
              <p className="text-base font-bold text-white">{member.intro}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">About</h4>
              <p className="mt-2 text-sm leading-relaxed text-white">
                {member.about}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Expertise</h4>
              <ul className="mt-2 space-y-1 text-sm text-white">
                {member.expertise.map((item, idx) => (
                  <li key={idx}>- {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Education</h4>
              <p className="mt-2 text-sm text-white">{member.education}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Awards & Recognition</h4>
              <ul className="mt-2 space-y-1 text-sm text-white">
                {member.awards.map((award, idx) => (
                  <li key={idx}>- {award}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 pb-2">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-full bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-violet-500"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // DEFAULT VIEW - Normal card
  return (
    <div className={`group relative ${CARD_HEIGHT} w-full overflow-hidden rounded-3xl border border-violet-500/25 card-premium-dark shadow-lg transition-all duration-300 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(109,40,217,0.35)] flex flex-col`}>
      <div className="relative h-[320px] w-full flex-shrink-0 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-all duration-200 group-hover:scale-105"
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-white">{member.role}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between gap-3">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          
          <button 
            onClick={() => setShowDetails(true)}
            className="btn-purple-solid flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}

const teamMembers = [
  { 
    name: 'Neha Sharma', 
    role: 'Head of HR & Culture', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    intro: "Hello, I'm Neha Sharma",
    about: "I believe that great companies are built by great people. My mission is to create a workplace where every team member feels valued, empowered, and inspired to bring their best selves to work every single day.",
    expertise: ['Talent Acquisition & Development', 'Organizational Culture Building', 'Employee Engagement & Retention', 'Leadership Development Programs'],
    education: 'MBA - Human Resources | B.A. - Psychology',
    awards: ['HR Leader of the Year 2023', 'Best Workplace Culture Award', 'Top 50 HR Professionals in India']
  },
  { 
    name: 'Vikram Singh', 
    role: 'Chief Technology Officer', 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    intro: "Hello, I'm Vikram Singh",
    about: "Technology isn't just about code - it's about solving real problems and creating experiences that transform businesses. I'm passionate about building scalable systems that empower franchise growth through innovation and intelligence.",
    expertise: ['Platform Architecture & Development', 'AI & Data Analytics', 'System Integration & Automation', 'Technology Strategy & Innovation'],
    education: 'M.Tech - Computer Science | B.Tech - Software Engineering',
    awards: ['Tech Innovator of the Year', 'Best Digital Transformation Leader', 'Excellence in Software Architecture']
  },
  { 
    name: 'Priya Mehta', 
    role: 'Head of Franchise Strategy', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    intro: "Hello, I'm Priya Mehta",
    about: "Every franchise has a unique story waiting to be told. My passion lies in uncovering that story and crafting strategies that turn potential into performance, helping brands scale with purpose and precision.",
    expertise: ['Franchise Development & Expansion', 'Market Research & Analysis', 'Brand Positioning Strategy', 'Investor Relations Management'],
    education: 'MBA - Strategy & Marketing | B.Com - Business Management',
    awards: ['Franchise Strategist of the Year', 'Excellence in Business Development', 'Top 40 Under 40 Business Leaders']
  },
  { 
    name: 'Kiran Rao', 
    role: 'Operations Director', 
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=80',
    intro: "Hello, I'm Kiran Rao",
    about: "Operations excellence isn't about perfection - it's about consistency, adaptability, and relentless focus on delivering value. I thrive on building systems that make complex processes feel effortless.",
    expertise: ['Operational Process Optimization', 'Multi-Location Management', 'Quality Assurance & Compliance', 'Supply Chain & Logistics'],
    education: 'MBA - Operations Management | B.E. - Industrial Engineering',
    awards: ['Operations Excellence Award', 'Process Innovation Leader', 'Best Operations Director 2023']
  },
  { 
    name: 'Sneha Kapoor', 
    role: 'Marketing & Brand Director', 
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80',
    intro: "Hello, I'm Sneha Kapoor",
    about: "Great brands don't just sell products - they create movements. I'm driven by the challenge of building brand identities that resonate deeply with audiences and stand the test of time.",
    expertise: ['Brand Strategy & Positioning', 'Digital Marketing & Growth', 'Content Strategy & Storytelling', 'Customer Experience Design'],
    education: 'MBA - Marketing | B.A. - Mass Communication',
    awards: ['Marketing Leader of the Year', 'Best Brand Campaign Award', 'Digital Marketing Excellence']
  },
  { 
    name: 'Rajesh Kumar', 
    role: 'Financial Controller', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    intro: "Hello, I'm Rajesh Kumar",
    about: "Numbers tell stories that words cannot. My expertise lies in translating financial data into strategic insights that drive smart decisions and sustainable growth for every franchise partner.",
    expertise: ['Financial Planning & Analysis', 'Investment Strategy & ROI', 'Risk Management & Compliance', 'Franchise Financial Modeling'],
    education: 'CA (Chartered Accountant) | MBA - Finance',
    awards: ['CFO of the Year', 'Excellence in Financial Management', 'Best Financial Strategist Award']
  },
  { 
    name: 'Aisha Patel', 
    role: 'Legal & Compliance Head', 
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    intro: "Hello, I'm Aisha Patel",
    about: "In the complex world of franchising, legal clarity isn't just protection - it's empowerment. I ensure every partnership is built on solid legal foundations, giving our clients the confidence to scale fearlessly.",
    expertise: ['Franchise Law & Agreements', 'Regulatory Compliance', 'Contract Negotiation', 'Intellectual Property Protection'],
    education: 'LLM - Corporate Law | LLB - National Law School',
    awards: ['Legal Excellence Award', 'Best Corporate Counsel 2023', 'Top Legal Advisor - Franchise Sector']
  },
  { 
    name: 'Rohan Desai', 
    role: 'Customer Success Director', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    intro: "Hello, I'm Rohan Desai",
    about: "Success isn't measured by deals closed - it's measured by dreams realized. My team ensures every client receives personalized support, strategic guidance, and unwavering commitment throughout their franchise journey.",
    expertise: ['Client Relationship Management', 'Success Strategy Planning', 'Onboarding & Training', 'Performance Optimization'],
    education: 'MBA - Customer Experience | B.Tech - Management',
    awards: ['Customer Success Leader of the Year', 'Excellence in Client Relations', 'Best Support Team Award']
  },
  { 
    name: 'Meera Iyer', 
    role: 'Data Analytics Manager', 
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    intro: "Hello, I'm Meera Iyer",
    about: "Data is the language of modern business. I transform complex datasets into actionable insights that help our clients make smarter decisions, identify opportunities, and stay ahead of market trends.",
    expertise: ['Business Intelligence & Analytics', 'Predictive Modeling', 'Market Trend Analysis', 'Performance Metrics & KPIs'],
    education: 'M.Sc - Data Science | B.Tech - Computer Science',
    awards: ['Data Innovation Award', 'Analytics Excellence Recognition', 'Best BI Implementation 2023']
  },
];

function AboutPage() {
  return (
    <main className="about-page relative z-10 w-full bg-transparent text-theme-primary">
      <AboutHero />

      <IfranchiseAcronymSection />

      {/* HISTORY + 4 GRID CARDS SECTION */}
      <section id="about-our-story" className="w-full py-16 scroll-mt-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-200/40 via-purple-100/30 to-indigo-200/40 blur-3xl opacity-70" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <img
                  src={aboutUsImage}
                  alt="iFranchise franchise development and expansion journey in India"
                  title="About iFranchise franchise consulting"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
              className="theme-section-on-light space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Our Story</span>
              </div>

              <h2 className={sectionTitleClass(false)}>
                iFranchise History
              </h2>

              <div className="space-y-4 text-white leading-relaxed">
                <p className="text-lg">
                  Founded with a vision to revolutionize India's franchise ecosystem, iFranchise emerged from a critical gap in the market - the absence of a structured, transparent, and intelligence-driven platform connecting ambitious entrepreneurs with verified franchise opportunities.
                </p>
                <p>
                  What started as a mission to bring clarity to franchise investments has evolved into India's most trusted franchise growth engine. We've built proprietary systems that analyze market trends, validate brand performance, and match investors with opportunities that align with their goals and capabilities.
                </p>
                <p>
                  Today, iFranchise powers franchise expansion for leading brands while helping thousands of investors make informed, data-backed decisions. We don't just list franchises - we engineer growth infrastructure.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Our Foundation', desc: 'Built on transparency, data intelligence, and strategic execution to transform franchise growth.', bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50', textColor: 'text-violet-600' },
              { num: '02', title: 'Our Approach', desc: 'Data-driven matching, rigorous brand validation, and investor-first advisory for sustainable growth.', bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50', textColor: 'text-indigo-600' },
              { num: '03', title: 'Our Edge', desc: 'Proprietary intelligence systems, verified opportunities, and end-to-end franchise expansion support.', bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50', textColor: 'text-purple-600' },
              { num: '04', title: 'Vision & Mission', desc: "To become India's most trusted franchise intelligence platform, powering 10,000+ success stories.", bgColor: 'bg-gradient-to-br from-violet-500/20 to-indigo-500/10', textColor: 'text-white' },
            ].map((card, idx) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl card-premium-dark border border-violet-500/20 p-6 transition-all duration-300 hover:border-violet-400/45 hover:shadow-[0_20px_50px_rgba(109,40,217,0.35)] hover:-translate-y-1"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor} text-lg font-bold ${card.textColor}`}>
                  {card.num}
                </div>
                <h3 className={`${TYPE.h3} text-white mb-3`}>{card.title}</h3>
                <p className="text-sm leading-relaxed text-white">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & VISION SECTION */}
      <LeadershipSection />

      {/* TEAM SECTION. hidden until SHOW_TEAM_SECTION is true */}
      {SHOW_TEAM_SECTION && (
      <section className="relative w-full overflow-hidden bg-transparent py-24">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">Our Team</span>
            </div>

            <h2 className={`mt-4 ${sectionTitleClass(false)}`}>
              Meet Our Strategic Leadership Team
            </h2>

            <p className="mt-6 mx-auto max-w-3xl text-lg leading-relaxed text-white">
              With over a decade in business, we've empowered countless dreams and transformed them into tangible realities for hundreds of our clients. We're not just consultants - we're your partners in building something extraordinary. It's time for you to join the tribe of digitally empowered, strategically positioned, and unstoppable franchise businesses.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <PremiumTeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* OUR ADVANTAGES SECTION */}
      <section className="relative w-full overflow-hidden bg-transparent py-24">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Our Advantages</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className={`mt-6 ${sectionTitleClass(false)}`}
            >
              Benefits That Define the
              <br />
              iFranchise Advantage
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 text-lg leading-relaxed text-white sm:text-xl"
            >
              We don't just connect brands and investors - we deliver intelligence, systems, and strategic infrastructure that accelerate franchise expansion.
            </motion.p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Verified Franchise Intelligence', desc: 'Access thoroughly evaluated franchise opportunities backed by trust, transparency, and strategic validation.' },
              { title: 'Founder-Investor Ecosystem', desc: 'Bridge ambitious founders with expansion-ready investors through a unified strategic growth network.' },
              { title: 'Scalable Expansion Systems', desc: 'Leverage operational frameworks, business scaling tools, and market-entry systems built for long-term category growth.' },
              { title: 'Category Leadership Positioning', desc: 'Transform opportunities into dominant market presence through data-backed visibility and expansion intelligence.' },
            ].map((card, idx) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl card-premium-dark border border-violet-500/20 p-8 shadow-lg transition-all duration-300 hover:border-violet-400/45 hover:shadow-[0_24px_60px_rgba(109,40,217,0.35)]"
              >
                <div className="relative z-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-white shadow-inner border border-violet-400/25">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className={`mt-6 ${TYPE.h3} text-white`}>{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-16 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              Built for founders. Trusted by investors. Designed for scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CUSTOMERS SECTION */}
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <section className="pb-12 lg:pb-16">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Customers
            </p>
            <h2 className={`mt-4 ${sectionTitleClass(false)}`}>Our customers love us</h2>
            <p className="mt-4 text-base leading-relaxed text-white">
              Real feedback from teams and individuals who rely on iFranchise to power growth with practical analytics.
            </p>
          </div>

          <div className="mt-10 overflow-hidden">
            <div className="animate-marquee-left flex w-max items-stretch gap-5 py-2" style={{ animationDuration: '30s' }}>
              {[...ABOUT_PAGE_TESTIMONIALS, ...ABOUT_PAGE_TESTIMONIALS].map((testimonial, idx) => (
                <article
                  key={`${testimonial.id}-${idx}`}
                  className="w-[420px] rounded-3xl card-premium-dark border border-violet-500/25 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                >
                  <div className="testimonial-card__header">
                    <p className="text-2xl font-semibold tracking-tight text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/80">{testimonial.company}</p>
                  </div>
                  <div className="mt-4 border-t border-violet-500/25 pt-4">
                    <p className="text-base leading-relaxed text-white">{testimonial.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-white/90">
            Over 15,725+ people gave us review
          </p>
        </section>
      </div>

    </main>
  );
}

export default AboutPage;

