import PremiumFAQItem from './ui/PremiumFAQItem';

// Centralized FAQ content aggregated from across the site.
const HOME_FAQS = [
  {
    number: '01',
    question: 'How much does it cost to start a franchise?',
    answer:
      'Franchise investment varies by industry. Low-cost franchises (₹2–10 lakhs), mid-range (₹10–50 lakhs), premium (₹50 lakhs+). FOCO models often require 30–40% less capital than FOFO models.',
  },
  {
    number: '02',
    question: "What's the difference between FOCO, FOFO & COCO?",
    answer:
      'FOCO: You invest, company operates. FOFO: You own and operate. COCO: Company owned and operated. Each offers different risk-reward profiles and involvement levels.',
  },
  {
    number: '03',
    question: 'Is franchise business profitable in India?',
    answer:
      'Successful franchises typically achieve 15–25% net margins after stabilization. F&B shows ~18–30% gross margins, retail 25–40%, services 35–50% depending on brand strength and execution.',
  },
  {
    number: '04',
    question: 'What legal documents are required?',
    answer:
      'Core documents include FDD, Franchise Agreement, Trademark License, Operations Manual, and Territory Rights, along with GST registration, FSSAI license (for F&B), and local permits.',
  },
  {
    number: '05',
    question: 'How long does it take to launch a franchise?',
    answer:
      'Most brands go from agreement to launch in 3–6 months, including due diligence, documentation, site selection, fit-out, training, and soft launch preparation.',
  },
];

const CONTACT_FAQS = [
  {
    question: 'What is the typical investment range?',
    answer:
      'Most opportunities on our platform start around ₹20L and can go beyond ₹2.5Cr depending on brand category, ticket size, and market depth.',
  },
  {
    question: 'How long does it take to break even?',
    answer:
      'Break-even timelines vary by sector, but many franchise models we work with target 12–24 months with disciplined execution and working capital planning.',
  },
  {
    question: 'Do I need prior business experience?',
    answer:
      'Not necessarily. Many successful partners are first-time operators who rely on structured onboarding, SOPs, and advisory support from the brand and iFranchise.',
  },
  {
    question: 'What support does iFranchise provide?',
    answer:
      'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.',
  },
  {
    question: 'Can I operate multiple franchise units?',
    answer:
      'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.',
  },
];

const CAREERS_FAQS = [
  {
    question: 'What kind of people do well at iFranchise?',
    answer:
      'Self-driven builders who care about outcomes. If you like ownership, clear communication, and work that connects brands with serious investors, you will fit our culture.',
  },
  {
    question: 'Is remote or hybrid work available?',
    answer:
      'Yes, for many future roles. We focus on quality of work and clear collaboration, not where your desk sits.',
  },
  {
    question: 'When will roles open, and how do I hear about them?',
    answer:
      'We are preparing our next hiring wave across strategy, product, growth, and operations. Follow us on LinkedIn for announcements, or email hr@ifranchise.in if you want to introduce yourself early.',
  },
  {
    question: 'Can I reach out before a role is posted?',
    answer:
      'Yes. Send a short note and your background to hr@ifranchise.in. We review thoughtful introductions as we plan upcoming hires.',
  },
  {
    question: 'What does growth look like here?',
    answer:
      'We are a growing company, so responsibilities evolve quickly. We promote from within where it makes sense and invest in people who want to build with us long term.',
  },
];

const LIST_YOUR_BRAND_FAQS = [
  {
    question: 'What types of brands can list on iFranchise?',
    answer:
      'Brands with a proven model and at least one operational unit – across F&B, wellness, education, retail, tech, and more.',
  },
  {
    question: 'How long does it take to become franchise-ready?',
    answer:
      'Most brands are franchise-ready within ~30 days including model design, legal documents, SOPs, and investor materials.',
  },
  {
    question: 'How does investor matching work?',
    answer:
      'We match your opportunity to 1,800+ pre-screened investors filtered by sector, ticket size, geography, and intent.',
  },
  {
    question: 'What franchise models do you support?',
    answer:
      'We support FOFO, FOCO, and FICO models and help you choose based on operations complexity, capital requirements, and investor profile.',
  },
  {
    question: 'Is there support after launch?',
    answer:
      'Yes – 90-day post-launch support plus ongoing advisory for multi-city expansion and performance tracking.',
  },
];

const KICKER_CLASS = 'text-xs font-semibold uppercase tracking-[0.25em] text-violet-400';
const GROUP_TITLE_CLASS = 'text-xl font-extrabold tracking-tight text-white sm:text-2xl';
const GROUP_DESC_CLASS = 'text-sm leading-relaxed text-slate-300/90 min-h-[4.5rem]';

function FaqGroup({ kicker, title, description, faqs, idPrefix }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        <p className={KICKER_CLASS}>{kicker}</p>
        <h2 className={GROUP_TITLE_CLASS}>{title}</h2>
        <p className={GROUP_DESC_CLASS}>{description}</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <PremiumFAQItem
            key={`${idPrefix}-${faq.question}`}
            faq={{
              question: faq.question,
              answer: faq.answer,
              number: faq.number || String(index + 1).padStart(2, '0'),
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl space-y-3 text-center lg:mb-12">
          <p className={KICKER_CLASS}>Frequently asked questions</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Helpful franchise questions & answers
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/90">
            Everything founders, investors, and future team members need to know about franchise growth on
            iFranchise.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <section className="flex flex-col gap-10">
            <FaqGroup
              idPrefix="home"
              kicker="For investors"
              title="Expansion & investment"
              description="Costs, models, profitability, legal requirements, and launch timelines for franchise investors and buyers evaluating opportunities in India."
              faqs={HOME_FAQS}
            />
            <FaqGroup
              idPrefix="contact"
              kicker="Get in touch"
              title="Contact & next steps"
              description="Investment ranges, break-even expectations, experience requirements, platform support, and multi-unit expansion after you connect with our team."
              faqs={CONTACT_FAQS}
            />
          </section>

          <section className="flex flex-col gap-10">
            <FaqGroup
              idPrefix="lyb"
              kicker="For brand founders"
              title="Brand expansion"
              description="Who can list, franchise-readiness timelines, investor matching, supported models, and post-launch support for brands scaling through franchising."
              faqs={LIST_YOUR_BRAND_FAQS}
            />
            <FaqGroup
              idPrefix="careers"
              kicker="Working with iFranchise"
              title="Careers & culture"
              description="Who thrives here, remote and hybrid work, upcoming roles, early outreach, and growth paths for people joining India's franchise growth platform."
              faqs={CAREERS_FAQS}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
