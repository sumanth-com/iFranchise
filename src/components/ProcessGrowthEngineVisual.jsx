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
    { step: '02', tag: 'Evaluate', angle: 30 },
    { step: '03', tag: 'Connect', angle: 150 },
  ],
  Brands: [
    { step: '01', tag: 'List', angle: -90 },
    { step: '02', tag: 'Reach', angle: 30 },
    { step: '03', tag: 'Expand', angle: 150 },
  ],
};

function polarToCartesian(angleDeg, radius = 72, cx = 100, cy = 100) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function buildFlowPath(nodes) {
  const pts = nodes.map((n) => polarToCartesian(n.angle));
  const [a, b, c] = pts;
  const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const m1 = mid(a, b);
  const m2 = mid(b, c);
  const m3 = mid(c, a);
  return [
    `M ${a.x} ${a.y} Q ${m1.x} ${m1.y} ${b.x} ${b.y}`,
    `Q ${m2.x} ${m2.y} ${c.x} ${c.y}`,
    `Q ${m3.x} ${m3.y} ${a.x} ${a.y}`,
  ].join(' ');
}

function orbitPosition(angleDeg, radiusPct = 36) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

function IconDiscover() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function IconEvaluate() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconConnect() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function IconList() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

function IconReach() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
    </svg>
  );
}

const NODE_ICONS = {
  Investors: [IconDiscover, IconEvaluate, IconConnect],
  Brands: [IconList, IconReach, IconExpand],
};

export default function ProcessGrowthEngineVisual({ mode, visible, isLight }) {
  const stats = PROCESS_VISUAL_STATS[mode];
  const orbitNodes = PROCESS_ORBIT_NODES[mode];
  const nodeIcons = NODE_ICONS[mode];
  const isInvestors = mode === 'Investors';
  const panelClass = isLight ? 'process-engine-panel--light' : 'process-engine-panel--dark';
  const flowPath = buildFlowPath(orbitNodes);
  const hubLines = orbitNodes.map((n) => {
    const p = polarToCartesian(n.angle);
    return { x1: 100, y1: 100, x2: p.x, y2: p.y };
  });

  return (
    <div
      className={`process-engine-panel ${panelClass} relative flex h-full min-h-[420px] flex-1 flex-col overflow-hidden rounded-2xl`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        transition: 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="process-engine-mesh pointer-events-none absolute inset-0" aria-hidden>
        <span className="process-engine-mesh-blob process-engine-mesh-blob--a" />
        <span className="process-engine-mesh-blob process-engine-mesh-blob--b" />
      </div>

      <div className="process-live-badge absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="process-engine-live-ping absolute inline-flex h-full w-full rounded-full" />
          <span className="process-engine-live-dot relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="process-live-badge-label text-[10px] font-bold uppercase tracking-wider">
          Growth pipeline
        </span>
      </div>

      <div key={mode} className="process-engine-mode-label absolute top-5 right-5 z-20 rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]">
        {isInvestors ? 'Investor path' : 'Brand path'}
      </div>

      <div className="relative z-[1] flex flex-1 items-center justify-center px-6 pb-2 pt-16">
        <div className="process-engine-stage relative aspect-square w-full max-w-[320px]">
          <svg className="process-engine-svg absolute inset-0 h-full w-full" viewBox="0 0 200 200" fill="none" aria-hidden>
            <defs>
              <linearGradient id="peFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--pe-flow-start)" />
                <stop offset="100%" stopColor="var(--pe-flow-end)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="76" className="process-engine-track" />
            <circle cx="100" cy="100" r="56" className="process-engine-track process-engine-track--inner" />
            {hubLines.map((line, i) => (
              <line key={i} {...line} className="process-engine-spoke" />
            ))}
            <path d={flowPath} className="process-engine-flow-path" />
            <path d={flowPath} className="process-engine-flow-glow" />
          </svg>

          <div className="process-engine-flow-dot" aria-hidden />

          {orbitNodes.map((node, i) => {
            const pos = orbitPosition(node.angle);
            const Icon = nodeIcons[i];
            return (
              <div
                key={`${mode}-${node.step}`}
                className="process-engine-node absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top, animationDelay: `${i * 1.1}s` }}
              >
                <div className="process-engine-node-card">
                  <span className="process-engine-node-icon">
                    <Icon />
                  </span>
                  <span className="process-engine-node-step">{node.step}</span>
                  <span className="process-engine-node-tag">{node.tag}</span>
                </div>
              </div>
            );
          })}

          <div className="process-engine-core absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="process-engine-core-ring" aria-hidden />
            <div className="process-engine-core-disc">
              {isInvestors ? (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.65}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.65}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
            </div>
            <span className="process-engine-core-label">iFranchise</span>
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
