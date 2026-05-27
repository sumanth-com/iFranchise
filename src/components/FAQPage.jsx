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
      'We are preparing our next hiring wave across strategy, product, growth, and operations. Follow us on LinkedIn for announcements, or email careers@ifranchise.in if you want to introduce yourself early.',
  },
  {
    question: 'Can I reach out before a role is posted?',
    answer:
      'Yes. Send a short note and your background to careers@ifranchise.in. We review thoughtful introductions as we plan upcoming hires.',
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

// Page-level shell: left + right columns (brand/investor vs careers).
export default function FAQPage() {
  const pageHeadingClass = 'text-2xl font-extrabold tracking-tight text-white sm:text-3xl';
  const sectionHeadingClass = 'text-xl font-extrabold tracking-tight text-white sm:text-2xl';
  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col gap-10 px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* Left + right FAQ columns */}
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Left column: brand & investor FAQs */}
          <section className="w-full lg:w-1/2 space-y-8">
            <header className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                Frequently asked questions
              </p>
              <h1 className={pageHeadingClass}>
                Franchise expansion & investment FAQs
              </h1>
              <p className="max-w-xl text-sm text-slate-300/90">
                Central place for all the questions founders and investors ask across iFranchise – from costs and
                models to readiness, timelines, and support.
              </p>
            </header>

            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Investing & opportunities
                </h2>
                <div className="space-y-3">
                  {HOME_FAQS.map((faq, index) => (
                    <PremiumFAQItem key={`home-${faq.question}`} faq={faq} index={index} />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Contact & next steps
                </h2>
                <div className="space-y-3">
                  {CONTACT_FAQS.map((faq, index) => (
                    <PremiumFAQItem key={`contact-${faq.question}`} faq={faq} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right column: brand founders + careers & culture FAQs */}
          <aside className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              For brand founders
            </p>
            <h2 className={sectionHeadingClass}>
              Brand expansion FAQs
            </h2>
            <p className="max-w-xl text-sm text-slate-300/90">
              Quick answers for founders listing a brand, becoming franchise-ready, and matching with the right investors.
            </p>
          </div>

          <div className="space-y-3">
            {LIST_YOUR_BRAND_FAQS.map((faq, index) => (
              <PremiumFAQItem key={`lyb-${faq.question}`} faq={faq} index={index} />
            ))}
          </div>

            <header className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                Working with iFranchise
              </p>
              <h2 className={sectionHeadingClass}>
                Careers, culture & ways of working
              </h2>
              <p className="max-w-xl text-sm text-slate-300/90">
                Answers to common questions from future team members about remote work, growth, and how to get in
                touch before roles go live.
              </p>
            </header>

            <div className="space-y-3">
              {CAREERS_FAQS.map((faq, index) => (
                <PremiumFAQItem
                  // PremiumFAQItem expects { question, answer, number? }; adapt field names.
                  key={`careers-${faq.question}`}
                  faq={{
                    question: faq.question || faq.q,
                    answer: faq.answer || faq.a,
                    number: String(index + 1).padStart(2, '0'),
                  }}
                  index={index}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

