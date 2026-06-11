import '../styles/leadership-linkedin-3d.css';
import { motion } from 'framer-motion';
import { sectionTitleClass } from '../lib/cardThemeStyles';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function FounderLetterCard({
  greeting,
  paragraphs,
  quote,
  quoteAccent = 'violet',
  name,
  title,
  cardDelay = 0,
}) {
  const quoteIconClass = quoteAccent === 'indigo' ? 'text-indigo-400' : 'text-violet-400';
  const quoteBorderClass =
    quoteAccent === 'indigo' ? 'border-indigo-400/35' : 'border-violet-400/35';
  const quoteBgClass =
    quoteAccent === 'indigo'
      ? 'from-indigo-500/5 to-violet-500/5'
      : 'from-violet-500/5 to-indigo-500/5';
  const accentBarClass = quoteAccent === 'indigo' ? 'bg-indigo-400' : 'bg-violet-400';
  const hoverGradientClass =
    quoteAccent === 'indigo'
      ? 'from-indigo-500/5 via-transparent to-violet-500/5'
      : 'from-violet-500/5 via-transparent to-indigo-500/5';
  const hoverBorderClass = quoteAccent === 'indigo' ? 'border-violet-400/30' : 'border-violet-200/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: cardDelay }}
      className="leadership-founder-card group relative mx-auto mb-6 w-full max-w-[40rem] overflow-hidden rounded-2xl border border-violet-500/20 bg-transparent shadow-[0_6px_32px_rgba(0,0,0,0.35)] transition-all duration-500 last:mb-0 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(109,40,217,0.22)] card-premium-dark lg:max-w-none"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute inset-0 bg-gradient-to-br ${hoverGradientClass}`} />
      </div>

      <div className="relative p-5 sm:p-6 lg:p-9 xl:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: cardDelay + 0.2 }}
          className="leadership-founder-card__content"
        >
          <div className="leadership-founder-card__greeting flex items-center gap-3">
            <span className={`h-8 w-0.5 shrink-0 rounded-full ${accentBarClass}`} aria-hidden />
            <p className="text-base font-bold text-white sm:text-lg">{greeting}</p>
          </div>

          <div className="leadership-founder-card__paragraphs mt-4 space-y-3 sm:mt-5 sm:space-y-3.5 lg:mt-6 lg:space-y-4">
            {paragraphs.map((text) => (
              <p
                key={text.slice(0, 48)}
                className="text-[13px] leading-[1.65] text-white/92 sm:text-sm sm:leading-[1.7] lg:text-[15px] lg:leading-[1.75]"
              >
                {text}
              </p>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.005 }}
            className={`leadership-founder-card__quote relative mt-5 overflow-hidden rounded-xl border ${quoteBorderClass} bg-violet-500/10 shadow-md backdrop-blur-sm sm:mt-6`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${quoteBgClass}`} />
            <div className="leadership-founder-card__quote-inner relative p-4 sm:p-5 lg:p-6">
              <div className="leadership-founder-card__quote-body">
                <svg
                  className={`mb-2 h-4 w-4 lg:mb-2.5 lg:h-5 lg:w-5 ${quoteIconClass}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm font-semibold italic leading-[1.65] text-white sm:text-[15px] sm:leading-[1.7] lg:text-base lg:leading-[1.75]">
                  {quote}
                </p>
              </div>

              <div className="leadership-founder-card__sign-off">
                <p
                  className="leadership-founder-card__signature text-white"
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                >
                  {name}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                  {title}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute inset-0 rounded-2xl border ${hoverBorderClass}`} />
      </div>
    </motion.div>
  );
}

function LeadershipSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent" />

        <motion.div
          animate={reducedMotion ? false : { y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="leadership-atmospheric-orb absolute left-[20%] top-[30%] h-32 w-32 rounded-full bg-violet-400/10 blur-3xl"
        />
        <motion.div
          animate={reducedMotion ? false : { y: [0, 25, 0], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="leadership-atmospheric-orb absolute bottom-[40%] right-[15%] h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[44rem] px-4 sm:px-6 lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center lg:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-violet-50">
              From Our Founders
            </span>
          </div>
          <h2 className={`mt-4 ${sectionTitleClass(false)}`}>What iFranchise Means to Us</h2>
        </motion.div>

        <FounderLetterCard
          greeting="Hello, I'm Abdul"
          paragraphs={[
            "I started iFranchise with a simple belief: every entrepreneur deserves a fair shot at building something extraordinary. Too many brilliant business ideas die not from lack of potential, but from lack of the right guidance, capital, and strategic support.",
            "We're not just connecting brands with investors - we're building dreams into empires. Every franchise we validate, every partnership we forge, and every expansion we architect is driven by one mission: turning your vision into a legacy that outlasts us all.",
            "Your success is our legacy. Let's build something India will remember.",
          ]}
          quote="We're not building a marketplace. We're building the operating system for India's next generation of business empires."
          name="Syed Abdul Khader"
          title="Founder & Director"
        />

        <FounderLetterCard
          greeting="Hello, I'm Abrar"
          paragraphs={[
            "I've spent over a decade watching businesses fail not because their ideas weren't good enough, but because they lacked the operational backbone to scale. That's what drives me every single day at iFranchise.",
            "Scaling isn't just about opening more locations. It's about building systems so strong that your brand can thrive in 100 cities without losing its soul. It's about creating frameworks that turn chaos into clarity, and ambition into achievement.",
            "We don't just advise - we roll up our sleeves and build alongside you. From market validation to operational excellence, we're in the trenches with every partner, ensuring no detail is overlooked and no opportunity is wasted.",
            "Your growth is our obsession. Let's turn your brand into an unstoppable force.",
          ]}
          quote="Excellence isn't an accident. It's a system. And we're here to build that system with you."
          quoteAccent="indigo"
          name="Mohammad Abrar"
          title="Co-Founder"
          cardDelay={0.2}
        />
      </div>
    </section>
  );
}

export default LeadershipSection;
