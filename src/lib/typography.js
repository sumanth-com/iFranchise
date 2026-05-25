/**
 * Typography class helpers. use with theme color utilities from cardThemeStyles.
 */

export const TYPE = {
  sectionTitle: 'section-title',
  sectionTitleTight: 'section-title section-title--tight',
  sectionCompact: 'type-section-compact',
  sectionSubtitle: 'section-subtitle',
  sectionBody: 'type-section-body',
  pageHero: 'type-page-hero',
  heroDisplay: 'type-hero-display',
  heroListing: 'type-hero-listing',
  heroBrand: 'type-hero-brand',
  heroCinematic: 'hero-cinematic-title type-hero-cinematic',
  heroCinematicLead: 'hero-cinematic-lead type-hero-cinematic-lead',
  subsection: 'type-subsection-title',
  h3: 'type-h3',
  h3Semibold: 'type-h3--semibold',
  cardTitle: 'type-card-title',
  cardTitleSm: 'type-card-title--sm',
  cardTitleXs: 'type-card-title--xs',
  modalTitle: 'type-modal-title',
  formTitle: 'type-form-title',
  ctaTitle: 'type-cta-title',
  sectionBand: 'type-section-band',
  body: 'type-body',
  bodySm: 'type-body-sm',
  lead: 'type-lead',
  muted: 'type-muted',
  label: 'type-label',
  caption: 'type-caption',
  eyebrow: 'type-eyebrow',
  mobileSteps: 'mobile-steps-centered',
  mobileStepsList: 'mobile-steps-centered__list',
  mobileStepsItem: 'mobile-steps-centered__item',
  mobileStepsConnector: 'mobile-steps-centered__connector',
  mobileStatsGrid: 'mobile-stats-centered',
};

/** Standard H2 section heading + theme text color */
export function sectionTitleClass(isLight, { tight = false, extra = '' } = {}) {
  const base = tight ? TYPE.sectionTitleTight : TYPE.sectionTitle;
  const color = isLight ? 'text-slate-900' : 'text-white';
  return [base, color, extra].filter(Boolean).join(' ');
}

/** Section subtitle / body under heading */
export function sectionSubtitleClass(isLight, extra = '') {
  const color = isLight ? 'text-slate-600' : 'text-white/80';
  return [TYPE.sectionSubtitle, TYPE.sectionBody, color, extra].filter(Boolean).join(' ');
}

export function pageHeroClass(isLight, extra = '') {
  const color = isLight ? 'text-slate-900' : 'text-white';
  return [TYPE.pageHero, color, extra].filter(Boolean).join(' ');
}

export function heroDisplayClass(isLight, { black = false, extra = '' } = {}) {
  const color = isLight ? 'text-slate-900' : 'text-white';
  const weight = black ? 'type-hero-display--black' : '';
  return [TYPE.heroDisplay, weight, color, extra].filter(Boolean).join(' ');
}

export function cardTitleTypoClass(isLight, size = 'default', extra = '') {
  const sizeClass =
    size === 'sm' ? TYPE.cardTitleSm : size === 'xs' ? TYPE.cardTitleXs : TYPE.cardTitle;
  const color = isLight ? 'text-slate-900' : 'text-white';
  return [sizeClass, color, extra].filter(Boolean).join(' ');
}
