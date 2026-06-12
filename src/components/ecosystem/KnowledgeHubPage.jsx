import { motion } from 'framer-motion';
import { navigateTo } from '../../lib/navigation';
import GeoAnswerBlock from './GeoAnswerBlock';
import MarketIntelligenceSection from './MarketIntelligenceSection';
import { HUB_CONTAINER_FOCUS } from './HubStickyBar';
import { useTheme } from '../../context/ThemeContext';

const PATHS = [
  {
    id: 'investor',
    subtitle: 'Investor Intelligence Center',
    title: 'I Am An Investor',
    description:
      'Evaluate FOFO, FOCO, and FICO models, capital requirements, ROI, risk, and industry growth before allocating ₹25L–₹1Cr+.',
    path: '/resources/knowledge-hub/investor',
    modules: '8 modules',
    accent: 'from-violet-600 via-violet-500 to-indigo-500',
    glow: 'bg-violet-500/10',
    iconBg: 'from-violet-100 to-indigo-50',
  },
  {
    id: 'brand',
    subtitle: 'Franchise Expansion Center',
    title: 'I Am A Brand Owner',
    description:
      'Assess franchise readiness, build operations systems, recruit franchisees, and plan national rollout across India.',
    path: '/resources/knowledge-hub/brand',
    modules: '8 modules',
    accent: 'from-indigo-600 via-violet-600 to-purple-500',
    glow: 'bg-indigo-500/10',
    iconBg: 'from-indigo-100 to-violet-50',
  },
];

const cardMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PathIcon({ type }) {
  if (type === 'investor') {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5m4 14V9m4 10V3m4 16v-6" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6" />
    </svg>
  );
}

function PathCard({ index, id, title, subtitle, description, path, modules, accent, glow, iconBg, isLight }) {
  const ink = isLight ? 'text-black' : 'text-white';
  const inkSoft = isLight ? 'text-black' : 'text-slate-300';

  return (
    <motion.button
      type="button"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardMotion}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
      whileTap={{ scale: 0.985 }}
      onClick={() => navigateTo(path)}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left ${
        isLight
          ? 'border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-violet-400 hover:shadow-[0_20px_40px_rgba(124,58,237,0.12)]'
          : 'border-violet-500/20 bg-[#0e0620] shadow-lg hover:border-violet-400/40'
      }`}
    >
      <motion.div
        className={`h-1 w-full bg-gradient-to-r ${accent}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${glow} opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <motion.span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} ${ink} shadow-sm`}
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            aria-hidden
          >
            <PathIcon type={id} />
          </motion.span>
          <motion.span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-violet-500 group-hover:bg-violet-600 group-hover:text-white ${
              isLight ? 'border-slate-200 text-black' : 'border-violet-500/30 text-slate-300'
            }`}
            whileHover={{ x: 2, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-hidden
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.span>
        </div>

        <span className={`mt-6 text-[10px] font-bold uppercase tracking-[0.16em] ${ink}`}>{subtitle}</span>
        <span className={`mt-2 text-xl font-bold leading-snug tracking-tight sm:text-2xl ${ink}`}>{title}</span>
        <span className={`mt-3 flex-1 text-sm leading-relaxed ${inkSoft}`}>{description}</span>

        <div className={`mt-auto flex flex-col items-center gap-4 border-t pt-5 sm:flex-row sm:justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isLight ? 'bg-slate-100 text-black' : 'bg-white/10 text-slate-200'}`}>
            {modules}
          </span>
          <span className="btn-purple-solid pointer-events-none inline-flex items-center justify-center gap-2 rounded-lg border-none px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
            Enter hub
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function KnowledgeHubPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ink = isLight ? 'text-black' : 'text-white';

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className={HUB_CONTAINER_FOCUS}>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`border-b pb-10 pt-12 text-center sm:pb-12 sm:pt-14 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
        >
          <h1 className={`text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl lg:whitespace-nowrap ${ink}`}>
            Franchise Intelligence Hub
          </h1>
          <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-[15px] ${ink}`}>
            Decision-grade research for investors allocating capital
            <span className="mx-2.5">|</span>
            founders scaling brands across India
          </p>
        </motion.header>

        <GeoAnswerBlock
          answer="The iFranchise Knowledge Hub is a franchise intelligence platform with dedicated paths for investors evaluating opportunities and brand owners planning national expansion across India."
          variant="subtle"
        />

        <section className="py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className={`text-base font-bold tracking-tight sm:text-lg ${ink}`}>Who are you?</h2>
          </motion.div>
          <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
            {PATHS.map((path, index) => (
              <PathCard key={path.path} index={index} isLight={isLight} {...path} />
            ))}
          </div>
        </section>
      </div>

      <section
        className={`w-full border-t ${isLight ? 'border-slate-200 bg-white' : 'border-white/[0.08] bg-transparent'}`}
        aria-label="Franchise market intelligence"
      >
        <MarketIntelligenceSection />
      </section>
    </main>
  );
}
