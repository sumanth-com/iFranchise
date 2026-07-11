import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { navigateTo, NAVIGATE_EVENT, restoreScrollWithRetry } from '@/lib/navigation';
import { TYPE } from '../lib/typography.js';
import ImageCarousel from './ImageCarousel';
import CtaButton from './ui/CtaButton';
import FranchiseInquiryLauncher from './FranchiseInquiryLauncher';
import FranchiseInquiryStickyPanel from './FranchiseInquiryStickyPanel';
import FranchiseWhatsAppFab from './FranchiseWhatsAppFab';
import FranchiseSimilarCardImage from './FranchiseSimilarCardImage';
import {
  getFranchiseDetailById,
  getSimilarFranchiseDetails,
} from '../data/franchiseData';
import {
  getFranchiseDetailPath,
  resolveFranchiseIdFromLocation,
  canonicalizeFranchiseUrl,
} from '../lib/franchisePaths';
import { getCarouselCategory, resolveDetailGalleryImages } from '../data/opportunities/brandImages';
import { buildFranchiseWhatsAppUrl } from '../data/siteContact';
import { formatReturnsDisplay } from '../data/opportunities/opportunityUtils.js';
import { FRANCHISE_DETAILS_SHELL } from '../lib/franchiseOpportunitiesShell.js';
import { franchiseBrandAlt } from '../seo/imageAlt.js';
import { linkifyContent } from '../lib/linkifyContent.jsx';

const FRANCHISE_MODEL_PATHS = {
  FOFO: '/fofo-model',
  FOCO: '/foco-model',
  FICO: '/fico-model',
};

const getSelectedFranchiseId = () =>
  resolveFranchiseIdFromLocation(window.location.pathname, window.location.search);

const FRANCHISE_STAT_ITEMS = [
  { label: 'Investment', key: 'investment' },
  { label: 'Agreement Term', key: 'agreementTerm' },
  { label: 'Outlets', key: 'outlets' },
];

function formatMetricDisplay(key, value) {
  const text = String(value ?? '');
  if (key !== 'space') return text;
  if (text.includes('\n')) return text.trim();
  return text
    .replace(/\s*\/\s*/g, '\n')
    .replace(/\s+(?=(?:PREMIUM|BREW|CLASSIC)(?!\s*\())/gi, '\n')
    .replace(/\n+/g, '\n')
    .trim();
}

function StatCardValue({ value, note, multiline = false }) {
  const spaceMultiline = multiline && String(value).includes('\n');
  return (
    <>
      <p
        className={`fd-copy fd-body-text mt-1.5 w-full leading-tight ${
          spaceMultiline
            ? 'whitespace-pre-line text-sm leading-snug sm:text-base'
            : 'text-base font-medium sm:text-lg'
        }`}
      >
        {value}
      </p>
      {note ? (
        <p className="fd-copy mt-1 w-full text-[0.6875rem] font-semibold leading-snug text-slate-500">
          {note}
        </p>
      ) : null}
    </>
  );
}

function HeroStatCard({ label, value, note, multiline = false, title, className = '' }) {
  return (
    <article
      className={`fd-stat-card fd-about-stat-card flex min-h-[92px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm ${className}`.trim()}
      title={title || undefined}
    >
      <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">{label}</p>
      <StatCardValue value={value} note={note} multiline={multiline} />
    </article>
  );
}

/** Same stat cards as About section (right column on detail page). */
function FranchiseStatGrid({ franchise, className = '', hideExpansion = false }) {
  const agreementItems = franchise?.agreementDetails || [];
  const agreementTermValue = agreementItems.find((item) => item.label === 'Agreement Term')?.value || '';
  const modelValue = franchise.franchiseModels?.map((m) => m.name).join(' · ') || '';
  const expansionValue =
    franchise.expansionDisplay ||
    franchise.locationsSummary ||
    franchise.locations?.slice(0, 3).join(' · ') ||
    '';

  return (
    <div className={`fd-about-stats grid grid-cols-2 gap-3 ${className}`.trim()}>
      {FRANCHISE_STAT_ITEMS.map((item) => {
        const rawValue =
          item.key === 'agreementTerm' ? agreementTermValue : franchise.keyInfo[item.key];
        const value = formatMetricDisplay(item.key, rawValue);
        const note = item.key === 'investment' ? franchise.keyInfo.investmentNote : '';
        if (item.key === 'agreementTerm' && !value) return null;
        return (
          <HeroStatCard key={item.key} label={item.label} value={value} note={note} />
        );
      })}
      {modelValue ? <HeroStatCard key="model" label="Model" value={modelValue} /> : null}
      {!hideExpansion && expansionValue ? (
        <HeroStatCard
          key="expansion"
          label="Expansion"
          value={expansionValue}
          title={franchise.expansionDetail || undefined}
          className="fd-stat-card--full col-span-2"
        />
      ) : null}
    </div>
  );
}

function parseSimilarStatValue(kind, raw) {
  const text = String(raw || '').trim();
  if (!text || /^on request$/i.test(text)) {
    return { primary: '—', unit: '' };
  }

  if (kind === 'roi') {
    const match = text.match(/(\d+(?:\.\d+)?%)/);
    return { primary: match ? match[1] : text, unit: '' };
  }

  if (kind === 'payback') {
    const withUnit = text.match(/^(.+?)\s+(months?|years?|yrs?\.?)$/i);
    if (withUnit) {
      return {
        primary: withUnit[1].replace(/\s*-\s*/g, '–').trim(),
        unit: withUnit[2].toLowerCase().replace(/\.$/, ''),
      };
    }
    return { primary: text.replace(/\s*-\s*/g, '–'), unit: '' };
  }

  return { primary: text, unit: '' };
}

function SimilarStatCard({ label, kind, value }) {
  const { primary, unit } = parseSimilarStatValue(kind, value);

  return (
    <div className="fd-similar-stat fd-tab-surface-card flex min-h-[4.75rem] flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <p className="fd-tab-surface-label fd-copy text-xs font-medium leading-none text-slate-500">{label}</p>
      <div className="fd-similar-stat__value mt-auto pt-2">
        <p className="fd-similar-stat__primary fd-copy text-lg font-semibold leading-none text-slate-900">
          {primary}
        </p>
        {unit ? (
          <p className="fd-similar-stat__unit fd-copy mt-1 text-xs font-medium leading-none text-slate-500">
            {unit}
          </p>
        ) : (
          <span className="fd-similar-stat__unit-spacer mt-1 block h-3" aria-hidden />
        )}
      </div>
    </div>
  );
}

function truncateText(text, maxLen = 150) {
  const cleaned = String(text || '').trim();
  if (!cleaned || cleaned.length <= maxLen) return cleaned;
  const slice = cleaned.slice(0, maxLen);
  const lastPeriod = slice.lastIndexOf('.');
  if (lastPeriod > 56) return slice.slice(0, lastPeriod + 1);
  return `${slice.trim()}…`;
}

function isNearDuplicate(a, b) {
  const left = String(a || '').trim().toLowerCase();
  const right = String(b || '').trim().toLowerCase();
  if (!left || !right) return false;
  return left.includes(right.slice(0, 28)) || right.includes(left.slice(0, 28));
}

function getAboutBrandBody(franchise) {
  const dedicated = String(franchise.brandAbout || '').trim();
  if (dedicated) return dedicated;

  const overview = String(franchise.overview || '').trim();
  if (!overview) return '';

  return truncateText(overview, 480);
}

function AboutBrandSection({ franchise }) {
  const headingId = `fd-about-${franchise.slug || franchise.id}-heading`;
  const tagline = String(franchise.tagline || '').trim();
  const aboutBody = getAboutBrandBody(franchise);
  const showAbout = aboutBody && !isNearDuplicate(tagline, aboutBody);

  return (
    <>
      <h2 id={headingId} className={`fd-about-heading fd-heading fd-copy ${TYPE.h3}`}>
        About {franchise.name}
      </h2>
      <p className="fd-about-summary fd-copy mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] sm:leading-7">
        {tagline ? <span className="block font-semibold text-slate-900">{tagline}</span> : null}
        {showAbout ? (
          <span className={tagline ? 'mt-2 block' : 'block'}>{aboutBody}</span>
        ) : !tagline ? (
          <span className="block">{`${franchise.name} franchise opportunity in India.`}</span>
        ) : null}
      </p>
    </>
  );
}

function SupportProvidedHeading({ className = '', id, headingLevel }) {
  const Tag = headingLevel || 'div';

  return (
    <Tag
      id={id}
      className={`fd-support-provided-heading flex items-center gap-2.5 text-left font-bold leading-snug text-slate-900 ${className}`.trim()}
    >
      <span
        className="fd-support-provided-heading__icon-wrap inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700"
        aria-hidden
      >
        <svg
          className="h-[1.125rem] w-[1.125rem]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </span>
      Support Provided
    </Tag>
  );
}

function BrandSupportList({ items, fallback }) {
  if (!items?.length) {
    return fallback ? (
      <p className="fd-copy fd-body-text text-sm leading-relaxed sm:leading-7">{fallback}</p>
    ) : null;
  }

  return (
    <div className="fd-support-grid fd-invest-grid grid grid-cols-2 gap-3 sm:gap-3.5">
      {items.map((item) => (
        <article
          key={item}
          className="fd-support-card fd-invest-card fd-stat-card fd-about-stat-card flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-3 text-center shadow-sm sm:min-h-[5rem] sm:px-3 sm:py-3.5"
        >
          <p className="fd-support-card__text fd-copy fd-body-text line-clamp-2 w-full text-[0.6875rem] font-medium leading-snug sm:text-xs">
            {item}
          </p>
        </article>
      ))}
    </div>
  );
}

const INVESTMENT_OVERVIEW_LABELS = {
  'Franchise fee': 'Franchise Fee',
  'Space (Sq.ft)': 'Space Required',
  Returns: 'Returns',
  Payback: 'Payback Period',
  'Lock-in Period': 'Lock-in Period',
  'Franchise types': 'Franchise Types',
};

function upsertOverviewRow(rows, { label, value }, { after, before } = {}) {
  if (!value) return;
  const displayValue =
    label === 'Space (Sq.ft)' ? formatMetricDisplay('space', value) : String(value).trim();
  if (!displayValue) return;

  const existingIdx = rows.findIndex((item) => item.label === label);
  if (existingIdx >= 0) {
    rows[existingIdx] = { ...rows[existingIdx], value: displayValue };
    return;
  }

  const anchorIdx = after
    ? rows.findIndex((item) => after.test(item.label))
    : before
      ? rows.findIndex((item) => before.test(item.label))
      : -1;
  const row = { label, value: displayValue };
  if (after && anchorIdx >= 0) rows.splice(anchorIdx + 1, 0, row);
  else if (before && anchorIdx >= 0) rows.splice(anchorIdx, 0, row);
  else rows.push(row);
}

function formatInvestmentOverviewValue(item) {
  if (item.returnsStructured) {
    const { primary, connector, secondary } = item.returnsStructured;
    return [primary, connector, secondary].filter(Boolean).join(' ');
  }
  return item.value;
}

function InvestmentOverviewValue({ item, singleLine = false }) {
  if (item.returnsStructured) {
    const { primary, connector, secondary, footnote } = item.returnsStructured;
    if (singleLine) {
      const text = [primary, connector, secondary, footnote].filter(Boolean).join(' ');
      return <span className="whitespace-nowrap">{text}</span>;
    }

    const firstLine = [primary, connector].filter(Boolean).join(' ');

    return (
      <span className="fd-investment-overview__returns-stack">
        {firstLine ? <span className="block">{firstLine}</span> : null}
        {secondary ? <span className="block">{secondary}</span> : null}
        {footnote ? (
          <span className="mt-0.5 block text-[0.6875rem] font-semibold leading-snug opacity-80">
            {footnote}
          </span>
        ) : null}
      </span>
    );
  }

  const value = formatInvestmentOverviewValue(item);
  const text = String(value ?? '').replace(/\s*\n+\s*/g, ' ').trim();
  if (singleLine && text) {
    return <span className="whitespace-nowrap">{text}</span>;
  }
  if (text.includes('\n')) {
    return <span className="whitespace-pre-line">{text}</span>;
  }
  return text;
}

function getFranchiseTypesLabel(franchiseStructure = [], models = []) {
  const structure = (franchiseStructure || []).map((s) => String(s).trim()).filter(Boolean);
  const hasMaster = structure.some((s) => s.toLowerCase().includes('master'));
  const hasUnit = structure.some((s) => s.toLowerCase().includes('unit'));
  const typeLabels = [
    hasMaster ? 'Master Franchise' : null,
    hasUnit ? 'Unit Franchise' : null,
    (models || []).length > 1 ? 'Multi-Model' : null,
  ].filter(Boolean);

  return typeLabels.join(' · ');
}

function getInvestmentOverviewRows({
  items,
  franchiseStructure = [],
  models = [],
  space = '',
  payback = '',
  lockIn = '',
  includeFranchiseTypes = true,
}) {
  const franchiseTypesValue = getFranchiseTypesLabel(franchiseStructure, models);
  const franchiseTypesItem = franchiseTypesValue
    ? {
        label: 'Franchise types',
        value: franchiseTypesValue,
      }
    : null;

  const rows = [...(items || [])];
  if (includeFranchiseTypes && franchiseTypesItem) {
    const spaceIdx = rows.findIndex((item) => /space/i.test(item.label));
    if (spaceIdx >= 0) rows.splice(spaceIdx + 1, 0, franchiseTypesItem);
    else rows.push(franchiseTypesItem);
  }
  upsertOverviewRow(rows, { label: 'Space (Sq.ft)', value: space }, { after: /franchise fee/i });
  upsertOverviewRow(rows, { label: 'Payback', value: payback }, { after: /returns/i });
  upsertOverviewRow(rows, { label: 'Lock-in Period', value: lockIn }, { after: /payback/i });
  return rows;
}

function buildDesktopHeroOverviewRows(franchise) {
  const lockIn =
    franchise.agreementDetails?.find((item) => item.label === 'Lock-in Period')?.value?.trim() || '';

  const headerRows = [
    franchise.keyInfo?.investment ? { label: 'Investment', value: franchise.keyInfo.investment } : null,
  ].filter(Boolean);

  const detailRows = getInvestmentOverviewRows({
    items: franchise.investorInvestment || franchise.investmentDetails,
    franchiseStructure: franchise.franchiseStructure,
    models: franchise.franchiseModels,
    space: franchise.keyInfo?.space,
    payback: franchise.keyInfo?.payback,
    lockIn,
    includeFranchiseTypes: false,
  });

  return [...headerRows, ...detailRows];
}

function InvestmentOverviewList({
  items,
  franchiseStructure = [],
  models = [],
  space = '',
  payback = '',
  lockIn = '',
  className = '',
  rowClassName = '',
}) {
  const rows = getInvestmentOverviewRows({
    items,
    franchiseStructure,
    models,
    space,
    payback,
    lockIn,
  });

  return (
    <dl className={`fd-investment-overview ${className}`.trim()}>
      {rows.map((item) => (
        <div
          key={item.label}
          className={`fd-investment-overview__row flex items-start justify-between gap-4 border-b border-slate-100 py-3.5 last:border-b-0 sm:py-4 ${rowClassName}`.trim()}
        >
          <dt className="fd-investment-overview__label fd-copy shrink-0 text-sm text-slate-500">
            {INVESTMENT_OVERVIEW_LABELS[item.label] || item.label}:
          </dt>
          <dd className="fd-investment-overview__value fd-copy max-w-[58%] text-right text-sm font-bold leading-snug text-slate-900 sm:max-w-[62%] sm:text-base">
            {item.returnsStructured || item.label === 'Returns' || item.label === 'Payback' || item.label === 'Lock-in Period' ? (
              <InvestmentOverviewValue item={item} />
            ) : (
              String(item.value ?? '')
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function buildPartnershipInsights(franchise) {
  const insights = [];
  const investmentItems = franchise.investorInvestment || franchise.investmentDetails || [];
  const primaryModel = franchise.franchiseModels?.[0];

  if (primaryModel?.description) {
    insights.push({
      title: `${primaryModel.name} partnership`,
      body: primaryModel.description,
    });
  } else if (franchise.businessModelDisplay) {
    insights.push({
      title: 'Franchise model',
      body: franchise.businessModelDisplay,
    });
  }

  const returnsRow = investmentItems.find((row) => /returns/i.test(row.label));
  if (returnsRow?.value && returnsRow.value !== 'On request') {
    insights.push({
      title: 'How you earn',
      body: returnsRow.value,
    });
  } else if (franchise.operationsReturns?.roi) {
    insights.push({
      title: 'Returns profile',
      body: franchise.operationsReturns.roi,
    });
  }

  const locationProfile = franchise.requirements?.find((row) => row.label === 'Location Profile')?.value;
  const expansion = franchise.expansionDisplay || franchise.expansionVision;
  if (locationProfile || expansion) {
    const parts = [locationProfile, expansion].filter(
      (value, index, list) => value && list.indexOf(value) === index,
    );
    insights.push({
      title: 'Where stores work best',
      body: parts.join(' — '),
    });
  }

  const involvement = franchise.operationsReturns?.hours || franchise.idealInvestorProfile;
  if (involvement) {
    insights.push({
      title: 'Best suited for',
      body: involvement,
    });
  }

  if (insights.length < 2 && franchise.aboutInsights?.length) {
    franchise.aboutInsights.slice(0, 3).forEach((item) => {
      if (item.title && item.body) {
        insights.push({ title: item.title, body: truncateText(item.body, 180) });
      }
    });
  }

  return insights.slice(0, 4);
}

function FranchisePartnershipSection({ franchise }) {
  const insights = buildPartnershipInsights(franchise);
  if (!insights.length) return null;

  const sectionId = `fd-partnership-${franchise.slug || franchise.id}-heading`;

  return (
    <section
      className="fd-partnership-section fd-about-section rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7"
      aria-labelledby={sectionId}
    >
      <h2 id={sectionId} className={`fd-section-heading fd-heading fd-copy ${TYPE.h3}`}>
        Partnership at a glance
      </h2>
      <p className="fd-partnership-desc fd-copy mx-auto mt-2 max-w-2xl text-center text-xs leading-snug text-slate-600 sm:mt-3 sm:text-sm">
        What to know about partnering with {franchise.name}
      </p>

      <ul className="fd-partnership-insights mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
        {insights.map((item) => (
          <li
            key={item.title}
            className="fd-partnership-item flex gap-3 rounded-xl border border-slate-100 bg-slate-50/90 px-3.5 py-3 sm:px-4 sm:py-3.5"
          >
            <span
              className="fd-partnership-item__icon flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:h-6 sm:w-6"
              aria-hidden
            >
              <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div className="min-w-0 text-left">
              <h3 className="fd-partnership-item__title fd-copy text-[0.8125rem] font-bold leading-snug text-slate-900 sm:text-sm">
                {item.title}
              </h3>
              <p className="fd-partnership-item__body fd-copy mt-1 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-sm">
                {linkifyContent(item.body, {
                  skip: franchise.franchiseModels?.map((model) => model.name) || [],
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center sm:mt-5">
        <CtaButton
          type="button"
          onClick={() => navigateTo('/franchise-readiness-assessment')}
          className="!px-4 !py-2 text-sm"
        >
          Check your readiness
        </CtaButton>
      </div>
    </section>
  );
}

function AgreementDetailCard({ label, value, className = '' }) {
  return (
    <article
      className={`fd-mini-card fd-agreement-detail-card flex flex-col items-center justify-center px-4 py-4 text-center sm:py-5 ${className}`.trim()}
    >
      <p className="fd-copy fd-field-label text-[0.65rem] font-semibold uppercase tracking-[0.12em]">{label}</p>
      <p className="fd-copy fd-body-text mt-2 text-base font-semibold leading-snug sm:text-lg">{value}</p>
    </article>
  );
}

function formatOutletsMeta(outlets) {
  const text = String(outlets || '').trim();
  if (!text) return '';
  return /outlet/i.test(text) ? text : `${text} Outlets`;
}

function getDesktopHeroModelLabel(franchise) {
  const model = franchise.franchiseModels?.[0]?.name;
  if (model) return `Model: ${model}`;
  const structure = franchise.franchiseStructure?.find((entry) => /unit|master/i.test(entry));
  return structure ? `Model: ${structure}` : '';
}

function buildDesktopHeroStatCards(franchise, location) {
  const cards = [];

  if (location) {
    cards.push({ key: 'location', label: location });
  }

  const model = getDesktopHeroModelLabel(franchise);
  if (model) {
    cards.push({ key: 'model', label: model });
  }

  const agreementTerm =
    franchise.agreementDetails?.find((item) => item.label === 'Agreement Term')?.value?.trim() || '';
  if (agreementTerm) {
    cards.push({ key: 'agreement', label: `Agreement Term: ${agreementTerm}` });
  }

  const outlets = formatOutletsMeta(franchise.keyInfo?.outlets);
  if (outlets) {
    cards.push({ key: 'outlets', label: outlets });
  }

  const franchiseTypes = getFranchiseTypesLabel(franchise.franchiseStructure, franchise.franchiseModels);
  if (franchiseTypes) {
    cards.push({
      key: 'franchise-types',
      label: `Franchise Types: ${franchiseTypes}`,
      wide: true,
    });
  }

  return cards;
}

function DesktopHeroMetaIcon({ type }) {
  if (type === 'location') {
    return (
      <svg className="fd-desktop-hero-banner__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  if (type === 'agreement') {
    return (
      <svg className="fd-desktop-hero-banner__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (type === 'outlets') {
    return (
      <svg className="fd-desktop-hero-banner__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }
  if (type === 'franchise-types') {
    return (
      <svg className="fd-desktop-hero-banner__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    );
  }
  return (
    <svg className="fd-desktop-hero-banner__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function DesktopFranchiseHeroBanner({ franchise, onRequestInfo }) {
  const location = getMobileHeroLocation(franchise);
  const statCards = buildDesktopHeroStatCards(franchise, location);
  const overviewRows = buildDesktopHeroOverviewRows(franchise);
  const headingId = `fd-desktop-hero-${franchise.slug || franchise.id}-heading`;

  return (
    <section className="fd-desktop-hero-banner hidden lg:block" aria-labelledby={headingId}>
      <div className="fd-desktop-hero-banner__grid">
        <div className="fd-desktop-hero-banner__brand">
          {franchise.industryBadge || franchise.industry ? (
            <span className="fd-desktop-hero-banner__badge">
              {franchise.industryBadge || franchise.industry}
            </span>
          ) : null}
          <div className="fd-desktop-hero-banner__identity">
            {franchise.logo ? (
              <div className="fd-desktop-hero-banner__logo-wrap">
                <img
                  src={franchise.logo}
                  alt=""
                  role="presentation"
                  className="fd-desktop-hero-banner__logo"
                  decoding="async"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ) : null}
            <h1 id={headingId} className="fd-desktop-hero-banner__title fd-heading">
              {franchise.name}
            </h1>
          </div>
          {statCards.length ? (
            <ul className="fd-desktop-hero-banner__stat-grid">
              {statCards.map((item) => (
                <li
                  key={item.key}
                  className={`fd-desktop-hero-banner__stat-card${item.wide ? ' fd-desktop-hero-banner__stat-card--wide' : ''}`}
                >
                  <DesktopHeroMetaIcon type={item.key} />
                  <span className="fd-desktop-hero-banner__stat-label">{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="fd-desktop-hero-banner__card">
          <h2 className="fd-desktop-hero-banner__card-title fd-heading">Investment Overview</h2>
          <dl className="fd-desktop-hero-banner__list">
            {overviewRows.map((row) => (
              <div key={row.label} className="fd-desktop-hero-banner__row">
                <dt className="fd-desktop-hero-banner__label">
                  {INVESTMENT_OVERVIEW_LABELS[row.label] || row.label}
                </dt>
                <dd className="fd-desktop-hero-banner__value">
                  {row.returnsStructured || row.label === 'Returns' || row.label === 'Payback' || row.label === 'Lock-in Period' ? (
                    <InvestmentOverviewValue item={row} singleLine />
                  ) : (
                    <span className="whitespace-nowrap">{String(row.value ?? '')}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={onRequestInfo}
            className="fd-desktop-hero-banner__cta btn-purple-solid"
          >
            Request Information
          </button>
        </div>
      </div>
    </section>
  );
}

function DesktopFranchiseGallery({
  franchise,
  galleryImages,
  carouselCategory,
  galleryImageFit,
  galleryKey,
  galleryAlt,
}) {
  return (
    <div
      className="fd-desktop-hero-gallery relative hidden min-h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:block xl:min-h-[420px]"
      style={franchise.cardBackground ? { backgroundColor: franchise.cardBackground } : undefined}
    >
      <ImageCarousel
        key={galleryKey}
        images={galleryImages}
        alt={galleryAlt}
        category={carouselCategory}
        brandAssetsOnly
        showThumbnails={false}
        fillParent
        preloadAll
        imageFit={galleryImageFit}
        imageSizes="(max-width: 1279px) 100vw, 48vw"
        galleryBackground={franchise.cardBackground}
        logoSrc={franchise.logo || null}
        className="absolute inset-0 z-0 h-full w-full"
        heightClassName="h-full min-h-[380px] w-full xl:min-h-[420px]"
      />
    </div>
  );
}

/** Left: Agreement Term + Lock-in; right: Currency (equal column width, currency full height). */
function getMobileHeroLocation(franchise) {
  const candidates = [
    franchise.locationsSummary,
    franchise.expansionDisplay,
    franchise.locations?.slice(0, 2).join(', '),
    franchise.requirements?.find((item) => item.label === 'Target Markets')?.value,
  ];
  return candidates.map((value) => String(value || '').trim()).find(Boolean) || 'India';
}

function MobileFranchiseHero({
  franchise,
  onRequestInfo,
  heroRef,
  galleryImages,
  carouselCategory,
  galleryImageFit,
  galleryBackground,
  galleryKey,
  galleryAlt,
}) {
  const location = getMobileHeroLocation(franchise);

  return (
    <div className="fd-mobile-hero lg:hidden" ref={heroRef}>
      <div className="fd-mobile-hero__banner">
        {franchise.industryBadge || franchise.industry ? (
          <span className="fd-mobile-hero__badge">{franchise.industryBadge || franchise.industry}</span>
        ) : null}
        <h1 className="fd-mobile-hero__title">{franchise.name}</h1>
        <p className="fd-mobile-hero__location">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
      </div>

      <div className="fd-mobile-hero__card">
        <h2 className="fd-mobile-hero__card-title">Highlights</h2>
        <FranchiseStatGrid
          franchise={franchise}
          hideExpansion
          className="fd-mobile-hero__highlights fd-hero-metrics w-full"
        />
        <div className="fd-mobile-hero__cta-wrap">
          <button type="button" onClick={onRequestInfo} className="fd-mobile-hero__cta btn-purple-solid">
            Request Information
          </button>
        </div>
      </div>

      <div
        className="fd-mobile-gallery fd-mobile-gallery--logo relative min-h-[min(60vw,400px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:min-h-[420px]"
      >
        <ImageCarousel
          key={galleryKey}
          images={galleryImages}
          alt={galleryAlt}
          category={carouselCategory}
          brandAssetsOnly
          showThumbnails={false}
          fillParent
          preloadAll
          imageFit={galleryImageFit}
          imageSizes="100vw"
          galleryBackground={galleryBackground}
          logoSrc={franchise.logo || null}
          className="absolute inset-0 z-0 h-full w-full"
          heightClassName="h-full min-h-[min(60vw,400px)] w-full sm:min-h-[420px]"
        />
      </div>
    </div>
  );
}

function MobileInvestmentOverviewSection({ franchise }) {
  const headingId = `fd-mobile-investment-${franchise.slug || franchise.id}-heading`;

  return (
    <section
      className="fd-mobile-investment-overview lg:hidden"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="fd-mobile-investment-overview__title fd-heading">
        Investment Overview
      </h2>
      <InvestmentOverviewList
        items={franchise.investorInvestment || franchise.investmentDetails}
        franchiseStructure={franchise.franchiseStructure}
        models={franchise.franchiseModels}
        space={franchise.keyInfo?.space}
        payback={franchise.keyInfo?.payback}
        lockIn={
          franchise.agreementDetails?.find((item) => item.label === 'Lock-in Period')?.value
        }
      />
    </section>
  );
}

function AgreementDetailsContent({ items }) {
  const agreementTerm = items.find((item) => item.label === 'Agreement Term');
  const lockInPeriod = items.find((item) => item.label === 'Lock-in Period');
  const currency = items.find((item) => item.label === 'Currency');
  const leftItems = [agreementTerm, lockInPeriod].filter(Boolean);

  return (
    <div className="fd-agreement-details-layout grid min-h-[11rem] flex-1 grid-cols-2 gap-2.5 sm:gap-3">
      <div className="fd-agreement-details-layout__left flex min-h-0 flex-col gap-2.5">
        {leftItems.map((item) => (
          <AgreementDetailCard key={item.label} label={item.label} value={item.value} className="flex-1" />
        ))}
      </div>
      {currency && (
        <AgreementDetailCard
          label={currency.label}
          value={currency.value}
          className="fd-agreement-details-layout__currency h-full min-h-0"
        />
      )}
    </div>
  );
}

function FranchiseDetailsPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const heroObserverRef = useRef(null);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(getSelectedFranchiseId);
  const selectedFranchise = useMemo(
    () => getFranchiseDetailById(selectedFranchiseId),
    [selectedFranchiseId]
  );

  const galleryImages = useMemo(
    () => resolveDetailGalleryImages(selectedFranchise),
    [selectedFranchise]
  );

  const galleryImageFit = 'cover';

  const carouselCategory = useMemo(
    () => getCarouselCategory(selectedFranchise?.industry),
    [selectedFranchise?.industry]
  );

  const similarFranchises = useMemo(
    () => getSimilarFranchiseDetails(selectedFranchiseId, 3),
    [selectedFranchiseId],
  );

  useEffect(() => {
    restoreScrollWithRetry(0);
  }, [selectedFranchiseId]);

  const setHeroRef = useCallback((node) => {
    heroObserverRef.current?.disconnect();
    heroObserverRef.current = null;

    if (!node) return;

    setHeroInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(node);
    heroObserverRef.current = observer;
  }, []);

  useEffect(
    () => () => {
      heroObserverRef.current?.disconnect();
    },
    [],
  );

  useEffect(() => {
    const syncFromLocation = () => {
      canonicalizeFranchiseUrl();
      setSelectedFranchiseId(getSelectedFranchiseId());
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener(NAVIGATE_EVENT, syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener(NAVIGATE_EVENT, syncFromLocation);
    };
  }, []);

  const handleRelatedDetails = (id) => {
    const nextId = String(id);
    setSelectedFranchiseId(nextId);
    navigateTo(getFranchiseDetailPath(nextId));
  };

  if (!selectedFranchise) {
    return (
      <main className={`franchise-details-page py-10 sm:py-12 lg:py-14 ${FRANCHISE_DETAILS_SHELL}`}>
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Franchise not found</h1>
          <p className="mt-2 text-sm text-slate-600">This franchise opportunity is unavailable or the link may be incorrect.</p>
          <button
            type="button"
            onClick={() => navigateTo('/franchise-opportunities')}
            className="btn-purple-solid mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            Browse opportunities
          </button>
        </div>
      </main>
    );
  }

  const scrollToInquiryForm = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      document.getElementById('fd-sticky-inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setInquiryOpen(true);
  };

  return (
    <main className="franchise-details-page pb-10 pt-0 sm:pb-12 lg:pb-14 lg:pt-0">
      <FranchiseInquiryLauncher
        franchise={{ id: selectedFranchise.id, name: selectedFranchise.name, logo: selectedFranchise.logo }}
        franchiseStructure={selectedFranchise.franchiseStructure}
        className="fd-inquiry-side-rail"
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        hideOnDesktop
        hideSideRail={heroInView}
        whatsappUrl={buildFranchiseWhatsAppUrl(selectedFranchise.name)}
      />
      <FranchiseWhatsAppFab franchiseName={selectedFranchise.name} />
      <div className="fd-page-body">
        <MobileFranchiseHero
          franchise={selectedFranchise}
          onRequestInfo={scrollToInquiryForm}
          heroRef={setHeroRef}
          galleryImages={galleryImages}
          carouselCategory={carouselCategory}
          galleryImageFit={galleryImageFit}
          galleryBackground={selectedFranchise.cardBackground}
          galleryKey={`mobile-${selectedFranchiseId}`}
          galleryAlt={franchiseBrandAlt(selectedFranchise.name, selectedFranchise.industry)}
        />

        <div className={`mt-0 space-y-6 sm:space-y-8 lg:mt-6 ${FRANCHISE_DETAILS_SHELL}`}>
        <section className="space-y-6">
          <DesktopFranchiseHeroBanner
            franchise={selectedFranchise}
            onRequestInfo={scrollToInquiryForm}
          />

          <div className="fd-sticky-form-region">
              <div className="fd-sticky-form-region__main space-y-6">
                <DesktopFranchiseGallery
                  franchise={selectedFranchise}
                  galleryImages={galleryImages}
                  carouselCategory={carouselCategory}
                  galleryImageFit={galleryImageFit}
                  galleryKey={selectedFranchiseId}
                  galleryAlt={franchiseBrandAlt(selectedFranchise.name, selectedFranchise.industry)}
                />

                <section
                  className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7"
                  aria-labelledby={`fd-about-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                >
                  <AboutBrandSection franchise={selectedFranchise} />
                </section>

                <MobileInvestmentOverviewSection franchise={selectedFranchise} />

                <FranchisePartnershipSection franchise={selectedFranchise} />

                <section
                  className="fd-brand-support-compact rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:hidden"
                  aria-labelledby={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-mobile-heading`}
                >
                  <SupportProvidedHeading
                    id={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-mobile-heading`}
                    className={`fd-heading fd-copy justify-center text-base sm:text-[1.0625rem] ${TYPE.h3}`}
                  />
                </section>

                <section
                  className="fd-about-section hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:block lg:p-7"
                  aria-labelledby={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                >
                  <SupportProvidedHeading
                    id={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                    headingLevel="h2"
                    className={`fd-section-heading fd-heading fd-copy ${TYPE.h3}`}
                  />
                  <div className="fd-section-body mt-5">
                    <BrandSupportList
                      items={selectedFranchise.trainingSupport}
                      fallback={selectedFranchise.idealInvestorProfile}
                    />
                  </div>
                </section>
              </div>

              <aside className="fd-sticky-form-region__aside hidden lg:block" aria-label="Franchise enquiry form">
                <FranchiseInquiryStickyPanel
                  franchise={{
                    id: selectedFranchise.id,
                    name: selectedFranchise.name,
                    logo: selectedFranchise.logo,
                  }}
                  franchiseStructure={selectedFranchise.franchiseStructure}
                />
              </aside>
            </div>

          <section className="fd-similar-section rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className={`fd-copy fd-heading ${TYPE.subsection}`}>Explore Similar Opportunities</h3>
                <p className="fd-copy mt-1 text-sm text-slate-600">
                  Other brands in a similar category and investment range. Tap a card to view full details.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarFranchises.map((franchise) => (
                <article
                  key={franchise.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => handleRelatedDetails(franchise.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRelatedDetails(franchise.id);
                    }
                  }}
                  className="fd-similar-card group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <FranchiseSimilarCardImage
                      franchise={franchise}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      {franchise.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className={`fd-copy ${TYPE.cardTitle}`}>{franchise.name}</h4>
                    <p className="fd-copy mt-2 line-clamp-3 text-sm leading-relaxed">{franchise.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="fd-similar-badge rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {franchise.keyInfo.investment}
                      </span>
                      <span className="fd-similar-badge fd-copy rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                        {franchise.franchiseModels[0]?.name || 'FOFO'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <SimilarStatCard label="ROI" kind="roi" value={franchise.keyInfo.roi} />
                      <SimilarStatCard label="Payback" kind="payback" value={franchise.keyInfo.payback} />
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRelatedDetails(franchise.id);
                      }}
                      className="btn-purple-solid mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
        </div>
      </div>
    </main>
  );
}

export default FranchiseDetailsPage;
