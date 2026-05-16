/**
 * Fixed full-viewport violet gradient + drifting orbs.
 * GPU-friendly transforms; reduced blur/motion on mobile and prefers-reduced-motion.
 */
export default function AnimatedSiteBackdrop() {
  return (
    <div
      className="site-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="site-backdrop__gradient absolute inset-0" />
      <div className="site-backdrop__orbs absolute inset-0">
        <div className="site-backdrop__orb site-backdrop__orb--a" />
        <div className="site-backdrop__orb site-backdrop__orb--b" />
        <div className="site-backdrop__orb site-backdrop__orb--c" />
        <div className="site-backdrop__orb site-backdrop__orb--d" />
        <div className="site-backdrop__orb site-backdrop__orb--e" />
      </div>
      <div className="site-backdrop__grid absolute inset-0 opacity-[0.14]" />
    </div>
  );
}
