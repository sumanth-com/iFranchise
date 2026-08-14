import { useMemo, useState } from 'react';
import EcosystemHero from './EcosystemHero';
import GeoAnswerBlock from './GeoAnswerBlock';
import { PageCtaSection } from './EducationalSections';
import CtaButton from '../ui/CtaButton';
import HoneypotField from '../forms/HoneypotField';
import FormSuccessState from '../forms/FormSuccessState';
import ProcessingConsentField from '../forms/ProcessingConsentField';
import { useFormSubmission, withHoneypot } from '../../hooks/useFormSubmission';
import { HONEYPOT_FIELD, submitContactForm } from '@/lib/forms';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from '../forms/PhoneInput';
import StateLocationFields from '../forms/StateLocationFields';
import { getCardBaseStyle } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import { navigateTo } from '../../lib/navigation';

function formatInr(value) {
  if (!Number.isFinite(value)) return '—';
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

function calculateRoi({ investment, monthlyRevenue, monthlyExpenses, royaltyPct, growthPct, months = 36 }) {
  const inv = Number(investment) || 0;
  const rev = Number(monthlyRevenue) || 0;
  const exp = Number(monthlyExpenses) || 0;
  const royalty = (Number(royaltyPct) || 0) / 100;
  const growth = (Number(growthPct) || 0) / 100;

  let cumulativeProfit = 0;
  let paybackMonth = null;
  const projections = [];

  for (let m = 1; m <= months; m += 1) {
    const growthFactor = Math.pow(1 + growth / 12, m - 1);
    const monthRev = rev * growthFactor;
    const royaltyCost = monthRev * royalty;
    const netProfit = monthRev - exp - royaltyCost;
    cumulativeProfit += netProfit;
    if (paybackMonth == null && cumulativeProfit >= inv && inv > 0) {
      paybackMonth = m;
    }
    if (m % 12 === 0 || m === months) {
      projections.push({ month: m, cumulativeProfit, annualizedRevenue: monthRev * 12 });
    }
  }

  const roi = inv > 0 ? (cumulativeProfit / inv) * 100 : 0;
  const annualizedRoi = inv > 0 ? (roi / months) * 12 : 0;

  return {
    roi: Math.round(annualizedRoi),
    paybackMonths: paybackMonth,
    totalProfit: cumulativeProfit,
    yearThreeProfit: cumulativeProfit,
    projections,
  };
}

function LeadCaptureForm({ resultsSummary }) {
  const { values, setField, handleSubmit, isSubmitting, isSuccess, submitError, fieldErrors } =
    useFormSubmission({
      initialValues: withHoneypot({
        fullName: '',
        email: '',
        contactNumber: createEmptyPhoneValue(),
        company: '',
        state: '',
        city: '',
        message: `Franchise ROI Calculator results: ${resultsSummary}`,
      }),
      onSubmit: (vals, { signal }) =>
        submitContactForm(vals, 'franchise_roi_calculator', { signal }),
      formKey: 'franchise_roi_calculator',
    });

  if (isSuccess) {
    return (
      <FormSuccessState
        title="Thank you"
        message="Our advisors will review your ROI projection and reach out with relevant franchise opportunities."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-violet-400/20 p-6 card-premium-dark">
      <h3 className="text-base font-extrabold text-white">Get expert validation on your projection</h3>
      <HoneypotField value={values[HONEYPOT_FIELD]} onChange={setField} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          value={values.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          className="rounded-xl border border-violet-500/20 bg-white/5 px-4 py-2.5 text-sm text-white"
          required
        />
        <PhoneInput
          id="roi-calculator-phone"
          required
          variant="dark"
          value={values.contactNumber}
          onChange={(value) => setField('contactNumber', value)}
          error={fieldErrors.contactNumber}
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => setField('email', e.target.value)}
        className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-2.5 text-sm text-white"
        required
      />
      <StateLocationFields
        layout="row"
        variant="dark"
        stateValue={values.state}
        cityValue={values.city}
        onStateChange={(value) => setField('state', value)}
        onCityChange={(value) => setField('city', value)}
        stateError={fieldErrors.state}
        cityError={fieldErrors.city}
        stateId="roi-calculator-state"
        cityId="roi-calculator-city"
      />
      {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}
      {fieldErrors.fullName || fieldErrors.email || fieldErrors.contactNumber ? (
        <p className="text-sm text-red-400">Please complete all fields correctly.</p>
      ) : null}
      <ProcessingConsentField
        value={values.privacyConsent}
        onChange={setField}
        purpose="respond about this ROI projection and related franchise advisory enquiry"
        error={fieldErrors.privacyConsent}
        variant="dark"
        id="roi-calculator-privacy-consent"
      />
      <CtaButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Connect With Franchise Experts'}
      </CtaButton>
    </form>
  );
}

export default function FranchiseRoiCalculator() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [inputs, setInputs] = useState({
    investment: 2500000,
    monthlyRevenue: 400000,
    monthlyExpenses: 280000,
    royaltyPct: 6,
    growthPct: 8,
  });
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  const inputClass =
    'w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500';

  const resultsSummary = calculated
    ? `ROI ~${results.roi}%, Payback ${results.paybackMonths ?? 'N/A'} months, 3yr profit ${formatInr(results.totalProfit)}`
    : '';

  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <EcosystemHero
          eyebrow="Calculator Tool"
          title="Franchise ROI Calculator"
          subtitle="Model your franchise investment returns — estimate ROI, payback period, and profit projections before you commit capital."
        />

        <GeoAnswerBlock
          answer="The iFranchise Franchise ROI Calculator estimates annual ROI, payback period, and multi-year profit based on investment amount, monthly revenue, expenses, royalty percentage, and growth rate — for franchise investors in India."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl p-6" style={getCardBaseStyle(isLight)}>
            <h2 className="text-lg font-extrabold text-white">Inputs</h2>
            <div className="mt-4 space-y-4">
              {[
                { key: 'investment', label: 'Investment Amount (₹)', step: 100000 },
                { key: 'monthlyRevenue', label: 'Monthly Revenue (₹)', step: 10000 },
                { key: 'monthlyExpenses', label: 'Monthly Expenses (₹)', step: 10000 },
                { key: 'royaltyPct', label: 'Royalty (%)', step: 0.5 },
                { key: 'growthPct', label: 'Expected Annual Growth (%)', step: 1 },
              ].map(({ key, label, step }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">{label}</label>
                  <input
                    type="number"
                    min="0"
                    step={step}
                    value={inputs[key]}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            <CtaButton type="button" className="mt-6 w-full" onClick={() => setCalculated(true)}>
              Calculate ROI
            </CtaButton>
          </div>

          <div className="rounded-2xl p-6" style={getCardBaseStyle(isLight)}>
            <h2 className="text-lg font-extrabold text-white">Results</h2>
            {calculated ? (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-violet-500/10 p-4 text-center">
                    <p className="text-xs font-semibold uppercase text-violet-300">Est. Annual ROI</p>
                    <p className="mt-1 text-2xl font-extrabold text-white">{results.roi}%</p>
                  </div>
                  <div className="rounded-xl bg-violet-500/10 p-4 text-center">
                    <p className="text-xs font-semibold uppercase text-violet-300">Payback Period</p>
                    <p className="mt-1 text-2xl font-extrabold text-white">
                      {results.paybackMonths ? `${results.paybackMonths} mo` : '36+ mo'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-violet-500/10 p-4 text-center col-span-2">
                    <p className="text-xs font-semibold uppercase text-violet-300">3-Year Profit Projection</p>
                    <p className="mt-1 text-2xl font-extrabold text-white">{formatInr(results.totalProfit)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-violet-300">Growth forecast</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300/90">
                    {results.projections.map((p) => (
                      <li key={p.month}>
                        Month {p.month}: cumulative profit {formatInr(p.cumulativeProfit)}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-500">
                  Projections are illustrative. Validate with franchisor unit economics and iFranchise advisors.
                </p>
                <LeadCaptureForm resultsSummary={resultsSummary} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">Enter your numbers and click Calculate ROI to see projections.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigateTo('/high-roi-franchise-opportunities')}
            className="text-sm font-semibold text-violet-300 hover:text-violet-200"
          >
            Browse high-ROI opportunities →
          </button>
          <button
            type="button"
            onClick={() => navigateTo('/franchise-readiness-assessment')}
            className="text-sm font-semibold text-violet-300 hover:text-violet-200"
          >
            Take readiness assessment →
          </button>
        </div>

        <PageCtaSection />
      </div>
    </main>
  );
}
