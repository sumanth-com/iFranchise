/**
 * Unified section label pill (matches Testimonials style).
 * Light: white bg, slate border, static violet dot, dark text.
 * Dark: frosted panel, white text + static violet dot.
 */
export default function SectionPill({ children, className = '' }) {
  return (
    <span className={`site-section-pill inline-flex items-center gap-2 ${className}`.trim()}>
      <span className="site-section-pill__dot" aria-hidden="true" />
      <span className="site-section-pill__text">{children}</span>
    </span>
  );
}
