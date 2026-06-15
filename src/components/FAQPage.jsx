import PremiumFAQItem from './ui/PremiumFAQItem';
import {
  CAREERS_FAQS,
  CONTACT_FAQS,
  HOME_FAQS,
  IFRANCHISE_OVERVIEW_FAQS,
  LIST_YOUR_BRAND_FAQS,
  SERVICES_FAQS,
} from '../data/faqContent.js';

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
      <div className="services-faq-list space-y-4">
        {faqs.map((faq, index) => (
          <PremiumFAQItem
            key={`${idPrefix}-${faq.question}`}
            faq={{
              question: faq.question,
              answer: faq.answer,
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
              idPrefix="overview"
              kicker="About iFranchise"
              title="Platform & services"
              description="What iFranchise is, how we help investors and brand owners, and the franchise consulting services we provide across India."
              faqs={IFRANCHISE_OVERVIEW_FAQS}
            />
            <FaqGroup
              idPrefix="services"
              kicker="Franchise consulting"
              title="Services & industries"
              description="Franchise consulting scope, support for first-time investors, franchise-readiness for brands, and industries covered on the platform."
              faqs={SERVICES_FAQS}
            />
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
