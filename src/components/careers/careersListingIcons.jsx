/** Consistent line icons for job listing cards (same size & stroke as reference mockup). */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const CAREERS_LISTING_ICONS = {
  Design: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Growth: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M3 17l6-6 4 4 8-10M21 7v6h-6" />
    </svg>
  ),
  Marketing: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Sales: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path {...stroke} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};
