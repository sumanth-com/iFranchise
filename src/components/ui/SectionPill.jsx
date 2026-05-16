/**
 * Unified section label pill (matches Testimonials style).
 * Light: white bg, slate border, emerald dot, dark text.
 * Dark: frosted panel, white text.
 */
export default function SectionPill({ children, className = '' }) {
  return (
    <span className={`site-section-pill ${className}`.trim()}>
      <span className="site-section-pill__dot" aria-hidden />
      <span className="site-section-pill__text">{children}</span>
    </span>
  );
}
