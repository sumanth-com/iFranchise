const PROCESS_VISUAL_STATS = {
  Investors: [
    { label: 'Opportunities', value: '500+' },
    { label: 'Avg. match time', value: '14d' },
    { label: 'Verified brands', value: '120+' },
  ],
  Brands: [
    { label: 'Investor reach', value: '50K+' },
    { label: 'Markets mapped', value: '28' },
    { label: 'Launch support', value: '360°' },
  ],
};

const PROCESS_ORBIT_NODES = {
  Investors: [
    { step: '01', tag: 'Discover', angle: -90 },
    { step: '02', tag: 'Evaluate', angle: 18 },
    { step: '03', tag: 'Connect', angle: 138 },
  ],
  Brands: [
    { step: '01', tag: 'List', angle: -90 },
    { step: '02', tag: 'Reach', angle: 18 },
    { step: '03', tag: 'Expand', angle: 138 },
  ],
};

function orbitPosition(angleDeg, radiusPct = 38) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

export default function ProcessGrowthEngineVisual({ mode, visible, isLight }) {
  const stats = PROCESS_VISUAL_STATS[mode];
  const orbitNodes = PROCESS_ORBIT_NODES[mode];
  const isInvestors = mode === 'Investors';
  const panelClass = isLight ? 'process-engine-panel--light' : 'process-engine-panel--dark';

  return (
    <div
      className={`process-engine-panel ${panelClass} relative flex h-full min-h-[420px] flex-1 flex-col overflow-hidden rounded-2xl`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
        transition: 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="process-engine-aurora pointer-events-none absolute inset-0" aria-hidden>
        <span className="process-engine-aurora-blob process-engine-aurora-blob--1" />
        <span className="process-engine-aurora-blob process-engine-aurora-blob--2" />
        <span className="process-engine-aurora-blob process-engine-aurora-blob--3" />
      </div>
      <div className="process-engine-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="process-engine-scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="process-live-badge absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">Live growth engine</span>
      </div>

      <div key={mode} className="process-engine-mode-label absolute top-5 right-5 z-20 rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]">
        {isInvestors ? 'Investor path' : 'Brand path'}
      </div>

      <div className="relative z-[1] flex flex-1 items-center justify-center px-6 pb-2 pt-16">
        <div className="process-engine-stage relative aspect-square w-full max-w-[340px]">
          <svg className="process-engine-svg pointer-events-none absolute inset-[6%]" viewBox="0 0 200 200" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="78" className="process-engine-orbit-ring process-engine-orbit-ring--outer" />
            <circle cx="100" cy="100" r="58" className="process-engine-orbit-ring process-engine-orbit-ring--mid" />
            <circle cx="100" cy="100" r="38" className="process-engine-orbit-ring process-engine-orbit-ring--inner" />
            <path d="M 100 22 A 78 78 0 1 1 99.5 22" className="process-engine-energy-arc" />
            <path d="M 100 42 A 58 58 0 0 1 172 88" className="process-engine-energy-arc process-engine-energy-arc--delay" />
            <path d="M 100 62 A 38 38 0 0 0 62 100" className="process-engine-energy-arc process-engine-energy-arc--delay2" />
          </svg>

          <div className={`process-engine-fx ${isInvestors ? 'process-engine-fx--radar' : 'process-engine-fx--network'}`} aria-hidden>
            {isInvestors ? (
              <span className="process-engine-radar-sweep" />
            ) : (
              <>
                <span className="process-engine-network-pulse" />
                <span className="process-engine-network-pulse process-engine-network-pulse--2" />
                <span className="process-engine-network-pulse process-engine-network-pulse--3" />
              </>
            )}
          </div>

          <div className="process-engine-ring-spinner process-engine-ring-spinner--a" aria-hidden />
          <div className="process-engine-ring-spinner process-engine-ring-spinner--b" aria-hidden />
          <div className="process-engine-ring-spinner process-engine-ring-spinner--c" aria-hidden />

          <div className="process-engine-packets" aria-hidden>
            <span className="process-engine-packet process-engine-packet--1" />
            <span className="process-engine-packet process-engine-packet--2" />
            <span className="process-engine-packet process-engine-packet--3" />
          </div>

          {orbitNodes.map((node, i) => {
            const pos = orbitPosition(node.angle);
            return (
              <div
                key={`${mode}-${node.step}`}
                className="process-engine-node absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top, animationDelay: `${i * 0.35}s` }}
              >
                <div className="process-engine-node-card">
                  <span className="process-engine-node-step">{node.step}</span>
                  <span className="process-engine-node-tag">{node.tag}</span>
                </div>
                <span className="process-engine-node-glow" aria-hidden />
              </div>
            );
          })}

          <div className="process-engine-core absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="process-engine-core-hex">
              <div className="process-engine-core-inner">
                {isInvestors ? (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
              </div>
            </div>
            <span className="process-engine-core-orbit" aria-hidden />
          </div>

          <div className="process-engine-sparkles pointer-events-none absolute inset-0" aria-hidden>
            {[8, 22, 38, 55, 72, 88].map((left, i) => (
              <span
                key={i}
                className="process-engine-sparkle"
                style={{ left: `${left}%`, top: `${12 + (i * 13) % 76}%`, animationDelay: `${i * 0.45}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="process-engine-stats relative z-10 grid grid-cols-3 gap-2 px-5 py-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="process-engine-stat text-center" style={{ animationDelay: `${i * 0.08}s` }}>
            <p className="process-engine-stat-value text-sm font-extrabold">{stat.value}</p>
            <p className="process-engine-stat-label mt-0.5 text-[9px] font-semibold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
