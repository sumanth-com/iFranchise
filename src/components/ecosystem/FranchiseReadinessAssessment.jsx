import { useEffect, useMemo, useState } from 'react';
import {
  ASSESSMENT_HOME,
  calculateAssessmentScore,
  getAssessmentBreakdown,
  getAssessmentCategory,
  getAssessmentConfig,
  getStrengthAndWeakAreas,
} from '../../data/ecosystem/readinessAssessment';
import GeoAnswerBlock from './GeoAnswerBlock';
import { getCardBaseStyle, metricBoxStyle } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import { navigateTo } from '../../lib/navigation';
import { HUB_CONTAINER_FOCUS } from './HubStickyBar';

const FLOW_CONTAINER = 'relative z-10 mx-auto w-full max-w-5xl px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8';

function parseAudience() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const value = params.get('audience');
  return value === 'brand' || value === 'investor' ? value : null;
}

function MetaStat({ label, value, isLight }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-center ${isLight ? '' : 'border border-violet-500/20 bg-white/[0.03]'}`}
      style={isLight ? metricBoxStyle(true) : undefined}
    >
      <p className={`text-lg font-extrabold tabular-nums ${isLight ? '!text-black' : 'text-violet-200'}`}>{value}</p>
      <p className={`mt-1 text-xs font-medium ${isLight ? '!text-black' : 'text-slate-400'}`}>{label}</p>
    </div>
  );
}

function AssessmentHomeHero({ isLight }) {
  const ink = isLight ? '!text-black' : 'text-white';

  return (
    <header
      className={`border-b pb-10 pt-10 text-center sm:pb-12 sm:pt-12 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${ink}`}>Professional evaluation</p>
      <h1 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.5rem] ${ink}`}>
        {ASSESSMENT_HOME.title}
      </h1>
      <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${ink}`}>{ASSESSMENT_HOME.subtitle}</p>
      <div
        className={`mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${
          isLight ? 'border-slate-200 bg-slate-50 !text-black' : 'border-violet-500/25 bg-violet-500/10 text-violet-300'
        }`}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ~{ASSESSMENT_HOME.completionMinutes} min to complete
      </div>
    </header>
  );
}

function AudiencePicker({ isLight, onSelect }) {
  const cards = [
    {
      id: 'investor',
      eyebrow: 'For investors',
      title: 'Investor Readiness Assessment',
      description: 'Evaluate capital, risk tolerance, experience, and franchise fit before investing.',
      meta: ASSESSMENT_HOME.investor,
      accent: 'from-violet-500 to-indigo-600',
    },
    {
      id: 'brand',
      eyebrow: 'For brand owners',
      title: 'Brand Readiness Assessment',
      description: 'Assess franchise readiness, systems maturity, and expansion preparedness.',
      meta: ASSESSMENT_HOME.brand,
      accent: 'from-indigo-500 to-violet-600',
    },
  ];

  const ink = isLight ? '!text-black' : 'text-white';

  return (
    <section className="py-10 sm:py-12">
      <div className="mb-8 text-center">
        <h2 className={`text-base font-bold tracking-tight sm:text-lg ${ink}`}>Choose your assessment</h2>
      </div>
      <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onSelect(card.id)}
          className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
            isLight
              ? 'border-slate-200 bg-white !text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-violet-400 hover:shadow-[0_16px_40px_rgba(124,58,237,0.12)]'
              : 'border-violet-500/25 card-premium-dark hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-900/20'
          }`}
        >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} aria-hidden />
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <span className={`text-xs font-bold uppercase tracking-[0.14em] ${isLight ? '!text-black' : 'text-violet-400'}`}>
              {card.eyebrow}
            </span>
            <h2 className={`mt-2 text-xl font-extrabold ${isLight ? '!text-black' : 'text-white'}`}>{card.title}</h2>
            <p className={`mt-2 text-sm leading-relaxed ${isLight ? '!text-black' : 'text-slate-300/90'}`}>
              {card.description}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <MetaStat label="Questions" value={card.meta.questionCount} isLight={isLight} />
              <MetaStat label="Steps" value={card.meta.stepCount} isLight={isLight} />
              <MetaStat label="Categories" value={card.meta.categoriesEvaluated.length} isLight={isLight} />
              <MetaStat label="Result types" value={card.meta.resultTypes.length} isLight={isLight} />
            </div>
            <div className="mt-5">
              <p className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? '!text-black' : 'text-slate-500'}`}>
                Evaluates
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {card.meta.categoriesEvaluated.map((cat) => (
                  <span
                    key={cat}
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      isLight ? 'border-slate-200 bg-slate-50 !text-black' : 'border-violet-500/20 text-slate-400'
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className={`mt-auto flex justify-center border-t pt-6 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <span className="btn-purple-solid inline-flex items-center justify-center gap-2 rounded-lg border-none px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                Begin assessment
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
                </svg>
              </span>
            </div>
          </div>
        </button>
      ))}
      </div>
    </section>
  );
}

function StepIndicator({ steps, currentStepId, completedSteps, isLight }) {
  return (
    <div className="mb-5 hidden md:block">
      <div className="flex items-center justify-between gap-0.5 sm:gap-1">
        {steps.map((step, idx) => {
          const done = completedSteps.includes(step.id);
          const active = step.id === currentStepId;
          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                    done
                      ? isLight
                        ? 'border-emerald-400 bg-emerald-50 text-black'
                        : 'border-emerald-400/60 bg-emerald-500/20 text-emerald-300'
                      : active
                        ? isLight
                          ? 'border-violet-500 bg-violet-50 text-black shadow-sm'
                          : 'border-violet-400 bg-violet-500/30 text-violet-100 shadow-sm shadow-violet-900/30'
                        : isLight
                          ? 'border-slate-200 bg-slate-50 text-black'
                          : 'border-violet-500/25 bg-white/[0.03] text-slate-500'
                  }`}
                >
                  {done ? '✓' : step.id}
                </div>
                <p
                  className={`mt-1.5 max-w-[5.5rem] text-center text-[10px] font-semibold leading-tight sm:max-w-[6.5rem] lg:max-w-[7.5rem] ${
                    isLight ? 'text-black' : active ? 'text-violet-300' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {idx < steps.length - 1 ? (
                <div
                  className={`mx-1 mb-5 h-px flex-1 transition-colors duration-300 ${
                    done ? (isLight ? 'bg-emerald-300' : 'bg-emerald-500/40') : isLight ? 'bg-slate-200' : 'bg-violet-500/20'
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreRing({ score, isLight, compact = false }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className={`relative mx-auto shrink-0 ${compact ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-36 w-36'}`}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={isLight ? 'rgba(124,58,237,0.12)' : 'rgba(139,92,246,0.15)'}
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={`font-extrabold tabular-nums ${compact ? 'text-3xl sm:text-4xl' : 'text-4xl'} ${isLight ? 'text-black' : 'text-white'}`}>
          {score}
        </p>
        <p className={`text-xs ${isLight ? 'text-black' : 'text-slate-400'}`}>/ 100</p>
      </div>
    </div>
  );
}

function BreakdownBar({ item, isLight }) {
  const color = item.level === 'strong' ? 'from-emerald-500 to-teal-400' : item.level === 'moderate' ? 'from-violet-500 to-indigo-400' : 'from-amber-500 to-orange-400';
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-slate-200'}`}>{item.title}</p>
        <p className={`text-sm font-bold tabular-nums ${isLight ? 'text-black' : 'text-violet-300'}`}>{item.score}%</p>
      </div>
      <div className={`mt-2 h-2 overflow-hidden rounded-full ${isLight ? 'bg-slate-100' : 'bg-violet-500/15'}`}>
        <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`} style={{ width: `${item.score}%` }} />
      </div>
    </div>
  );
}

function AssessmentResults({ score, category, audience, breakdown, onRetake, isLight }) {
  const label = audience === 'brand' ? 'Brand' : 'Investor';
  const { strengths, weaknesses } = getStrengthAndWeakAreas(breakdown);
  const panelClass = isLight ? 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6' : 'rounded-2xl border border-violet-500/20 bg-white/[0.02] p-5 sm:p-6';

  return (
    <div className="mt-4 space-y-5">
      <div
        className={`overflow-hidden rounded-2xl border sm:rounded-3xl ${
          isLight ? 'border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]' : 'border-violet-400/30 card-premium-dark'
        }`}
      >
        <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 sm:p-6">
          <ScoreRing score={score} isLight={isLight} compact />
          <div className="text-center lg:text-left">
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${isLight ? 'text-black' : 'text-violet-400'}`}>
              Your {label.toLowerCase()} profile
            </p>
            <p className={`mt-2 text-2xl font-extrabold sm:text-3xl ${isLight ? 'text-black' : 'text-violet-100'}`}>
              {category.label}
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${isLight ? 'text-black' : 'text-slate-300/90'}`}>{category.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className={panelClass}>
          <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-black' : 'text-violet-400'}`}>
            Category breakdown
          </h2>
          <div className="mt-5 space-y-4">
            {breakdown.map((item) => (
              <BreakdownBar key={item.id} item={item} isLight={isLight} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {strengths.length > 0 ? (
            <div
              className={`rounded-2xl border p-5 ${
                isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-500/20 bg-emerald-500/5'
              }`}
            >
              <h3 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-emerald-300'}`}>Strength areas</h3>
              <ul className="mt-3 space-y-1.5">
                {strengths.map((s) => (
                  <li key={s} className={`flex items-center gap-2 text-sm ${isLight ? 'text-black' : 'text-emerald-200/80'}`}>
                    <span className={isLight ? 'text-black' : 'text-emerald-400'}>✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {weaknesses.length > 0 ? (
            <div
              className={`rounded-2xl border p-5 ${
                isLight ? 'border-amber-200 bg-amber-50' : 'border-amber-500/20 bg-amber-500/5'
              }`}
            >
              <h3 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-amber-300'}`}>Areas to strengthen</h3>
              <ul className="mt-3 space-y-1.5">
                {weaknesses.map((w) => (
                  <li key={w} className={`flex items-center gap-2 text-sm ${isLight ? 'text-black' : 'text-amber-200/80'}`}>
                    <span className={isLight ? 'text-black' : 'text-amber-400'}>!</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {audience === 'investor' && category.suggestedModels ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={panelClass}>
            <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-black' : 'text-violet-400'}`}>
              Suitable franchise models
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.suggestedModels.map((m) => (
                <span
                  key={m}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    isLight ? 'border-slate-200 bg-slate-50 text-black' : 'border-violet-400/30 bg-violet-500/15 text-violet-200'
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className={panelClass}>
            <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-black' : 'text-violet-400'}`}>
              Suggested investment categories
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.investmentCategories.map((c) => (
                <span
                  key={c}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    isLight ? 'border-slate-200 bg-slate-50 text-black' : 'border-indigo-400/30 bg-indigo-500/10 text-indigo-200'
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl p-6" style={getCardBaseStyle(isLight)}>
        <h2 className={`text-lg font-extrabold ${isLight ? 'text-black' : 'text-white'}`}>Recommended next steps</h2>
        <ul className="mt-4 space-y-2">
          {category.recommendations.map((rec) => (
            <li key={rec} className={`flex items-start gap-2 text-sm ${isLight ? 'text-black' : 'text-slate-300/90'}`}>
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isLight ? 'bg-violet-600' : 'bg-violet-400'}`} />
              {rec}
            </li>
          ))}
        </ul>
        {category.ctaPath ? (
          <button
            type="button"
            onClick={() => navigateTo(category.ctaPath)}
            className="btn-purple-solid mt-6 rounded-lg border-none px-5 py-2.5 text-sm font-semibold text-white"
          >
            {category.ctaLabel}
          </button>
        ) : null}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onRetake}
          className={`text-sm font-semibold ${isLight ? 'text-black hover:text-black/80' : 'text-violet-300 hover:text-violet-200'}`}
        >
          Retake assessment
        </button>
      </div>
    </div>
  );
}

function AssessmentTopBar({ title, onBack, isLight }) {
  return (
    <div
      className={`sticky top-16 z-40 border-b backdrop-blur-md ${
        isLight ? 'border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5' : 'border-white/[0.08] bg-[#0a0618]/90'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-3 px-3 py-3 sm:px-4 xl:px-6">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors ${
            isLight ? 'text-black hover:text-black/80' : 'text-violet-400 hover:text-violet-300'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All assessments
        </button>
        <span
          className={`max-w-[50%] truncate rounded-full border px-3 py-1 text-xs font-semibold ${
            isLight ? 'border-slate-200 bg-slate-50 text-black' : 'border-violet-500/25 text-violet-300'
          }`}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default function FranchiseReadinessAssessment() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [audience, setAudience] = useState(parseAudience);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setAudience(parseAudience());
  }, []);

  const config = useMemo(() => (audience ? getAssessmentConfig(audience) : null), [audience]);
  const questions = config?.questions ?? [];
  const steps = config?.steps ?? [];
  const currentQuestion = questions[step];
  const isComplete = step >= questions.length;

  const completedSteps = useMemo(() => {
    const done = new Set();
    questions.forEach((q, idx) => {
      if (idx < step && q.step) done.add(q.step);
    });
    if (isComplete) steps.forEach((s) => done.add(s.id));
    return [...done];
  }, [questions, step, isComplete, steps]);

  const handleSelectAudience = (type) => {
    setAudience(type);
    navigateTo(`/franchise-readiness-assessment?audience=${type}`, { replace: true });
  };

  const handleAnswer = (label) => {
    const next = { ...answers, [currentQuestion.id]: label };
    setAnswers(next);
    if (step + 1 >= questions.length) {
      const score = calculateAssessmentScore(next, questions, config.maxPerQuestion);
      const breakdown = getAssessmentBreakdown(next, steps, questions, config.maxPerQuestion);
      setResult({
        score,
        category: getAssessmentCategory(score, config.categories),
        breakdown,
      });
    }
    setStep((s) => s + 1);
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleChangeAudience = () => {
    setAudience(null);
    setStep(0);
    setAnswers({});
    setResult(null);
    navigateTo('/franchise-readiness-assessment', { replace: true });
  };

  const progressPct = questions.length ? Math.round((step / questions.length) * 100) : 0;

  const questionCardClass = isLight
    ? 'mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:rounded-3xl'
    : 'mt-4 overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark sm:rounded-3xl';

  const optionClass = isLight
    ? 'group w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm font-medium text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-50 hover:shadow-md sm:px-4 sm:py-3.5'
    : 'group w-full rounded-xl border border-violet-500/20 bg-white/[0.03] px-3.5 py-3 text-left text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-violet-500/10 hover:shadow-md hover:shadow-violet-900/20 sm:px-4 sm:py-3.5';

  return (
    <main className="relative min-h-screen bg-transparent">
      {audience ? <AssessmentTopBar title={config.title} onBack={handleChangeAudience} isLight={isLight} /> : null}

      <div className={audience ? FLOW_CONTAINER : HUB_CONTAINER_FOCUS}>
        {!audience ? (
          <>
            <AssessmentHomeHero isLight={isLight} />
            <GeoAnswerBlock
              answer="The iFranchise Readiness Assessment offers separate professional evaluation paths for investors and brand owners — scoring preparedness and delivering personalised recommendations for franchise decisions in India."
              variant="subtle"
            />
            <AudiencePicker isLight={isLight} onSelect={handleSelectAudience} />
          </>
        ) : (
          <>
            <GeoAnswerBlock answer={config.geoAnswer} variant="subtle" />

            {!isComplete && !result ? (
              <div className={questionCardClass}>
                <div className={`border-b px-5 py-3.5 sm:px-6 sm:py-4 ${isLight ? 'border-slate-200' : 'border-violet-500/15'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-black' : 'text-violet-400'}`}>
                        Step {currentQuestion?.step ?? step + 1} of {steps.length}
                      </p>
                      <p className={`mt-0.5 text-sm font-semibold ${isLight ? 'text-black' : 'text-violet-200'}`}>
                        {currentQuestion?.stepTitle}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold tabular-nums ${isLight ? 'text-black' : 'text-slate-400'}`}>
                      Q{step + 1}/{questions.length}
                    </span>
                  </div>
                  <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${isLight ? 'bg-slate-100' : 'bg-violet-500/15'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-500 ease-out"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  <StepIndicator
                    steps={steps}
                    currentStepId={currentQuestion?.step}
                    completedSteps={completedSteps}
                    isLight={isLight}
                  />

                  <p className={`md:hidden text-xs font-semibold ${isLight ? 'text-black' : 'text-violet-400'}`}>
                    {currentQuestion?.stepTitle}
                  </p>
                  <h2
                    className={`mt-1.5 text-base font-extrabold leading-snug sm:mt-2 sm:text-lg lg:text-xl ${isLight ? 'text-black' : 'text-white'}`}
                  >
                    {currentQuestion.question}
                  </h2>

                  <div
                    className={`mt-4 gap-2.5 sm:mt-5 sm:gap-3 ${
                      currentQuestion.options.length >= 4 ? 'grid sm:grid-cols-2' : 'space-y-3'
                    }`}
                  >
                    {currentQuestion.options.map((option) => (
                      <button key={option.label} type="button" onClick={() => handleAnswer(option.label)} className={optionClass}>
                        <span className="flex items-center justify-between gap-3">
                          {option.label}
                          <svg
                            className={`h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${
                              isLight ? 'text-violet-600' : 'text-violet-500'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : result ? (
              <AssessmentResults
                score={result.score}
                category={result.category}
                audience={audience}
                breakdown={result.breakdown}
                onRetake={handleRetake}
                isLight={isLight}
              />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
