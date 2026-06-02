// --- Shared careers data -----------------------------------------------------
// Shared careers content (culture page; role listings reserved for future hiring).

/** Set true when live roles are published on CareersPage. */
export const HIRING_ACTIVE = true;

export const CAREERS_APPLY_EMAIL = 'hr@ifranchise.in';

import React from 'react';

export const DEPT_COLORS = {
  Design: 'bg-violet-100 text-violet-800 border border-violet-200',
  Growth: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  Marketing: 'bg-sky-100 text-sky-800 border border-sky-200',
  Sales: 'bg-orange-100 text-orange-800 border border-orange-200',
};

export const MODE_COLORS = {
  Remote: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  Hybrid: 'bg-sky-50 text-sky-800 border border-sky-200',
  Onsite: 'bg-amber-50 text-amber-800 border border-amber-200',
};

/** Dark mode - readable pills on career detail hero */
export const DEPT_COLORS_DARK = {
  Design: 'bg-violet-500/30 text-violet-100 border border-violet-400/45',
  Growth: 'bg-emerald-500/30 text-emerald-100 border border-emerald-400/45',
  Marketing: 'bg-sky-500/30 text-sky-100 border border-sky-400/45',
  Sales: 'bg-orange-500/30 text-orange-100 border border-orange-400/45',
};

export const MODE_COLORS_DARK = {
  Remote: 'bg-emerald-500/30 text-emerald-100 border border-emerald-400/45',
  Hybrid: 'bg-sky-500/30 text-sky-100 border border-sky-400/45',
  Onsite: 'bg-amber-500/30 text-amber-100 border border-amber-400/45',
};

export const ROLE_TOOLS = {
  Design: ['Figma', 'Adobe CC', 'After Effects', 'Notion', 'Slack'],
  Growth: ['HubSpot', 'Notion', 'Google Analytics', 'Slack', 'Linear'],
  Marketing: ['Notion', 'Google Workspace', 'SEMrush', 'Slack', 'Canva'],
  Sales: ['HubSpot CRM', 'Notion', 'Google Workspace', 'Slack', 'LinkedIn Sales Nav'],
};

export const HIRING_STEPS = [
  { step: '01', title: 'Application Review', desc: 'We review every application within 5 business days.' },
  { step: '02', title: 'Intro Call', desc: '20-minute call with the hiring manager to align on fit and expectations.' },
  { step: '03', title: 'Skills / Strategy Round', desc: 'A focused assessment - portfolio review, case study, or live task depending on the role.' },
  { step: '04', title: 'Leadership Round', desc: 'Final conversation with a founder or department head.' },
  { step: '05', title: 'Offer', desc: 'Fast turnaround. We move quickly for the right people.' },
];

export const ROLES = [
  {
    id: 'social-media-content-creator-intern',
    active: true,
    title: 'Social Media & Content Creator Intern',
    dept: 'Marketing',
    type: 'Internship',
    mode: 'Remote',
    location: 'Bengaluru, Karnataka (Remote)',
    duration: '6–12 Months',
    stipend: 'Competitive Stipend',
    workingDays: 'Monday – Saturday',
    workingHours: '10:00 AM – 7:00 PM',
    tagline:
      'Turn ideas into scroll-stopping content for LinkedIn, Instagram, and the iFranchise brand story.',
    reportsTo: 'Head of Marketing',
    experience: 'Internship',
    openings: '1',
    joining: 'Rolling basis',
    rounds: '2–3 Rounds',
    applyEmail: CAREERS_APPLY_EMAIL,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    opportunityPrompts: [
      'Do you find yourself analyzing why a post went viral?',
      'Do you save content ideas before going to sleep?',
      'Do you instantly think of better captions when scrolling LinkedIn or Instagram?',
    ],
    keySkills: [
      'Creating SEO-friendly content (blogs, website copy, and discoverable posts)',
      'Handling social media content across LinkedIn and Instagram',
      'Writing scripts for short-form video and campaign storytelling',
    ],
    whyJoin:
      'Work on real-world content that reaches thousands of people. Learn from experienced marketers, build a portfolio that stands out, and get exposure to branding, franchise growth, and business storytelling—with a potential full-time path based on performance.',
    about:
      'iFranchise is a fast-growing franchise consulting firm helping brands scale and enabling entrepreneurs to discover the right business opportunities. We work with ambitious brands across industries, helping them grow through strategic expansion, powerful storytelling, and impactful marketing. As we continue to grow, we need creative minds who can help us tell stories that educate, inspire, and engage thousands of people online.',
    aboutRole:
      'We are looking for a Social Media & Content Creator Intern who can turn ideas into engaging content, spot trends before they become mainstream, and create content that people actually want to consume. This is not a traditional writing internship—we are looking for creators, storytellers, and idea generators.',
    responsibilities: [
      'Create scroll-stopping content for LinkedIn, Instagram, and other platforms',
      'Write powerful hooks, captions, posts, blogs, and website content',
      'Brainstorm content ideas that drive engagement and brand awareness',
      'Research trends, competitors, and audience interests',
      'Assist in content planning and campaign execution',
      'Collaborate with marketing and design teams',
      'Turn complex business concepts into simple, engaging content',
      'Help build the digital presence of fast-growing brands',
    ],
    requirements: [
      'Love social media and understand what captures attention',
      'Enjoy storytelling and creative writing',
      'Constantly come up with new content ideas',
      'Strong communication skills',
      'Curious, creative, and eager to learn',
      'Can think from the audience’s perspective',
      'Content samples, portfolio, blog, page, or personal projects (preferred)',
    ],
    applyNote:
      'Send your resume along with your best content samples, portfolio, social media handles, or any creative work you are proud of. Show us what you have created—we would love to see it.',
  },
  {
    id: 'creative-director',
    active: false,
    title: 'Creative Director',
    dept: 'Design',
    type: 'Full Time',
    mode: 'Hybrid',
    location: 'Bangalore',
    salary: 'Rs.9L - Rs.12L / yr',
    tagline: "Lead iFranchise's visual ecosystem and brand creative direction.",
    reportsTo: 'Head of Brand & Creative',
    experience: '5+ Years',
    openings: '1',
    joining: 'Immediate / 30 Days',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    whyJoin: "At iFranchise, the Creative Director role is not a support function - it's a founding-level creative seat. You will shape how an entire category of franchise brands is perceived across India. Your work will be seen by thousands of investors, entrepreneurs, and brand partners every month.",
    about: 'We are looking for a Creative Director to own the visual identity of iFranchise across all touchpoints - digital, print, and motion. You will set the creative standard, mentor the design team, and collaborate directly with founders on brand strategy.',
    responsibilities: [
      'Define and evolve the iFranchise visual identity and design system',
      'Lead a team of designers and motion artists across projects',
      'Collaborate with marketing, product, and growth teams on campaigns',
      'Own brand guidelines, typography, color, and motion standards',
      'Review and approve all outgoing creative assets',
      'Present creative concepts to leadership and stakeholders',
    ],
    requirements: [
      '5+ years of experience in creative direction or senior design roles',
      'Strong portfolio demonstrating brand identity and digital design',
      'Proficiency in Figma, Adobe Creative Suite, and motion tools',
      'Experience leading and mentoring design teams',
      'Excellent communication and presentation skills',
      'Startup or agency background preferred',
    ],
  },
  {
    id: 'motion-designer',
    active: false,
    title: 'Motion Designer',
    dept: 'Design',
    type: 'Full Time',
    mode: 'Remote',
    location: 'India',
    salary: 'Rs.6L - Rs.9L / yr',
    tagline: 'Bring the iFranchise brand to life through world-class motion and animation.',
    reportsTo: 'Creative Director',
    experience: '2-4 Years',
    openings: '1',
    joining: 'Immediate / 30 Days',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    whyJoin: "Motion at iFranchise is not an afterthought. We believe animation and motion are core to how premium brands communicate. You'll have creative freedom, a supportive team, and the opportunity to build a motion language from the ground up.",
    about: 'As a Motion Designer at iFranchise, you will create compelling animations, video content, and interactive motion experiences that elevate our brand across social, web, and pitch decks. You will work closely with the Creative Director and content team.',
    responsibilities: [
      'Design and produce motion graphics for social media, web, and presentations',
      'Create animated explainer videos and brand reels',
      'Collaborate with the design team on UI micro-interactions',
      'Maintain consistency with brand motion guidelines',
      'Deliver assets optimized for multiple platforms and formats',
    ],
    requirements: [
      '2+ years of motion design or animation experience',
      'Proficiency in After Effects, Lottie, and Figma',
      'Strong understanding of timing, easing, and visual storytelling',
      'Portfolio with diverse motion work across digital formats',
      'Ability to work independently in a remote-first environment',
    ],
  },
  {
    id: 'franchise-growth-strategist',
    active: false,
    title: 'Franchise Growth Strategist',
    dept: 'Growth',
    type: 'Full Time',
    mode: 'Onsite',
    location: 'Bangalore',
    salary: 'Rs.7L - Rs.10L / yr',
    tagline: 'Drive franchise expansion strategy and brand partner growth across India.',
    reportsTo: 'Head of Expansion',
    experience: '2-4 Years',
    openings: '2',
    joining: 'Immediate',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    whyJoin: "This role sits at the intersection of strategy and execution. You'll work directly with founders, have access to real market data, and see the direct impact of your work as brands scale nationally through iFranchise.",
    about: 'The Franchise Growth Strategist will own the end-to-end growth pipeline for franchise brand partnerships. You will identify expansion opportunities, build relationships with franchise brands, and develop go-to-market strategies that drive platform growth.',
    responsibilities: [
      'Identify and onboard new franchise brands to the iFranchise marketplace',
      'Develop and execute growth strategies for existing brand partners',
      'Analyze market data to identify high-potential franchise categories',
      'Build and maintain relationships with franchise decision-makers',
      'Collaborate with marketing on lead generation campaigns',
      'Report on growth KPIs and pipeline metrics to leadership',
    ],
    requirements: [
      '3+ years in business development, growth, or franchise consulting',
      'Strong understanding of the Indian franchise market',
      'Excellent relationship-building and negotiation skills',
      'Data-driven mindset with experience in CRM tools',
      'Willingness to travel for brand meetings and events',
    ],
  },
  {
    id: 'ui-ux-designer',
    active: false,
    title: 'UI/UX Designer',
    dept: 'Design',
    type: 'Full Time',
    mode: 'Hybrid',
    location: 'Bangalore',
    salary: 'Rs.6L - Rs.9L / yr',
    tagline: 'Design intuitive, premium digital experiences for the iFranchise platform.',
    reportsTo: 'Head of Brand & Creative',
    experience: '2-4 Years',
    openings: '1',
    joining: 'Immediate / 30 Days',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    whyJoin: "You'll be designing for a platform that thousands of entrepreneurs use to make life-changing investment decisions. The design quality here directly affects trust, conversion, and brand perception - your work will matter.",
    about: 'We are hiring a UI/UX Designer to craft beautiful, functional interfaces for the iFranchise web platform and marketing pages. You will work closely with the product and engineering teams to translate user needs into elegant design solutions.',
    responsibilities: [
      'Design user flows, wireframes, and high-fidelity prototypes in Figma',
      'Conduct user research and usability testing to inform design decisions',
      'Maintain and evolve the iFranchise design system',
      'Collaborate with developers to ensure pixel-perfect implementation',
      'Design landing pages, dashboards, and onboarding experiences',
    ],
    requirements: [
      '2+ years of UI/UX design experience for web or mobile products',
      'Expert-level Figma skills with a strong portfolio',
      'Understanding of accessibility standards and responsive design',
      'Experience working in agile product teams',
      'Strong visual design sensibility and attention to detail',
    ],
  },
  {
    id: 'content-strategist',
    active: false,
    title: 'Content Strategist',
    dept: 'Marketing',
    type: 'Full Time',
    mode: 'Remote',
    location: 'India',
    salary: 'Rs.5L - Rs.8L / yr',
    tagline: 'Build the editorial voice and content engine that powers iFranchise growth.',
    reportsTo: 'Head of Marketing',
    experience: '2-4 Years',
    openings: '1',
    joining: 'Immediate / 30 Days',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    whyJoin: "iFranchise is building the definitive content resource for franchise growth in India. As Content Strategist, you'll own that narrative - from SEO to thought leadership to brand storytelling.",
    about: "The Content Strategist will own iFranchise's editorial calendar, blog, social content, and thought leadership output. You will develop content that educates prospective franchisees, builds brand authority, and drives organic growth.",
    responsibilities: [
      'Develop and execute a comprehensive content strategy across channels',
      'Write and edit long-form blog posts, guides, and case studies',
      'Manage the editorial calendar and content production pipeline',
      'Collaborate with SEO, design, and growth teams on content campaigns',
      'Analyze content performance and optimize based on data',
      'Develop brand voice guidelines and ensure consistency',
    ],
    requirements: [
      '2+ years of content strategy or editorial experience',
      'Exceptional writing and editing skills in English',
      'Understanding of SEO principles and content marketing',
      'Experience with CMS platforms and analytics tools',
      'Knowledge of the franchise or business ecosystem is a plus',
    ],
  },
  {
    id: 'business-development-lead',
    active: false,
    title: 'Business Development Lead',
    dept: 'Sales',
    type: 'Full Time',
    mode: 'Hybrid',
    location: 'Mumbai / Bangalore',
    salary: 'Rs.8L - Rs.12L / yr',
    tagline: 'Own the revenue pipeline and build strategic partnerships for iFranchise.',
    reportsTo: 'Head of Revenue',
    experience: '4+ Years',
    openings: '2',
    joining: 'Immediate',
    rounds: '3 Rounds',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    whyJoin: "You'll be closing deals that directly shape the iFranchise brand portfolio. With direct access to founders and a fast-moving pipeline, this role offers the kind of ownership and impact that most BD roles never provide.",
    about: "The Business Development Lead will drive iFranchise's revenue growth by identifying new business opportunities, closing strategic partnerships, and expanding our network of franchise brands and investors. You will work directly with the founding team.",
    responsibilities: [
      'Identify, qualify, and close new business opportunities',
      'Build and manage a pipeline of franchise brand and investor partnerships',
      'Develop proposals, pitch decks, and partnership agreements',
      'Represent iFranchise at industry events and franchise expos',
      'Collaborate with marketing on demand generation strategies',
      'Report on revenue metrics and pipeline health to leadership',
    ],
    requirements: [
      '4+ years in business development, sales, or strategic partnerships',
      'Proven track record of closing deals and exceeding targets',
      'Strong network in the franchise, retail, or startup ecosystem',
      'Excellent communication, negotiation, and presentation skills',
      'Self-starter with high ownership and accountability',
    ],
  },
];

export function getOpenRoles() {
  if (!HIRING_ACTIVE) return [];
  return ROLES.filter((role) => role.active);
}

export function getRoleById(id) {
  return ROLES.find((role) => role.id === id) ?? null;
}

export function getRoleIdFromPathname(pathname = '') {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'careers' || parts.length !== 2) return '';
  return parts[1];
}
