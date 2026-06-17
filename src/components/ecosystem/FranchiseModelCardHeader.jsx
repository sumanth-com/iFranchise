export default function FranchiseModelCardHeader({ code, accentColor, modelKey }) {
  return (
    <div
      className="fm-model-banner"
      data-model={modelKey}
      style={{ '--fm-accent': accentColor, '--fo-card-accent': accentColor }}
    >
      <div className="fm-model-banner__glow" aria-hidden />
      <div className="fm-model-banner__grid" aria-hidden />
      <span className="fm-model-banner__code">{code}</span>
      <div className="fo-opportunity-card__sheen pointer-events-none" aria-hidden />
    </div>
  );
}
