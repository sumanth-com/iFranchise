import { useEffect, useRef, useState } from 'react';
import {
  franchiseOpportunities,
  getTotalCities,
  getAverageROI,
  calculateGrowthMetrics,
} from '../../data/franchiseData';
import { TYPE } from '../../lib/typography.js';
import { useTheme } from '../../context/ThemeContext';
// --- Market Intelligence Section ---------------------------------------------

function useCountUp(target, active, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);
  return count;
}

// -- Dataset definitions ------------------------------------------------------
const CHART_DATASETS = {
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bars:   [42, 48, 55, 51, 60, 67, 63, 72, 78, 74, 85, 92],
    line:   [30, 36, 44, 40, 52, 58, 55, 65, 70, 67, 80, 88],
  },
  Quarterly: {
    labels: ["Q1'21", "Q2'21", "Q3'21", "Q4'21", "Q1'22", "Q2'22", "Q3'22", "Q4'22", "Q1'23", "Q2'23", "Q3'23", "Q4'23"],
    bars:   [38, 45, 52, 61, 58, 70, 78, 85, 80, 90, 95, 100],
    line:   [28, 35, 42, 50, 48, 58, 65, 72, 68, 80, 88, 96],
  },
  Yearly: {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024E', '2025E'],
    bars:   [28, 36, 30, 52, 68, 82, 90, 100],
    line:   [20, 28, 22, 44, 60, 76, 86, 96],
  },
};

const CATEGORIES = [
  { name: 'Food & Beverage', pct: 25, color: '#7c3aed' }, // 6 out of 24 = 25%
  { name: 'Home Services',   pct: 25, color: '#3b82f6' }, // 6 out of 24 = 25%
  { name: 'Health & Wellness', pct: 21, color: '#10b981' }, // 5 out of 24 = 21%
  { name: 'Retail',          pct: 17, color: '#f97316' }, // 4 out of 24 = 17%
  { name: 'Education',       pct: 12, color: '#f43f5e' }, // 3 out of 24 = 12%
];

const SOURCES = ['IFA', 'KPMG', 'Franchise India', 'Statista', 'Deloitte', 'Industry Reports'];

// -- Donut chart --------------------------------------------------------------
function DonutChart({ active, isLight }) {
  const r = 48; const cx = 64; const cy = 64;
  const circ = 2 * Math.PI * r;
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!active) {
      setFilled(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setFilled(Math.floor(72 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) { frameId = requestAnimationFrame(tick); }
      else { setFilled(72); }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
  const dash = (circ * filled) / 100;
  return (
    <svg viewBox="0 0 128 128" className="market-donut-chart h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" className="market-donut-track" strokeWidth="16" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#dg)"
        strokeWidth="16"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        className="market-donut-pct"
        fill={isLight ? '#000000' : '#ffffff'}
      >
        {filled}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="market-donut-label"
        fill={isLight ? '#000000' : 'rgba(255, 255, 255, 0.9)'}
      >
        FRANCHISE
      </text>
    </svg>
  );
}

// -- Bar + line chart ---------------------------------------------------------
function BarLineChart({ dataset, active }) {
  const [tooltip, setTooltip] = useState(null);
  const { labels, bars, line } = dataset;
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div id="market-intelligence-chart" className="relative h-52 sm:h-56 select-none">
      {/* Y-axis */}
      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pr-1.5">
        {yTicks.map((v) => (
          <span key={v} className="text-[9px] text-white font-medium w-5 text-right leading-none">{v}</span>
        ))}
      </div>

      {/* Grid */}
      <div className="absolute left-7 right-0 top-0 bottom-6 pointer-events-none">
        {yTicks.map((_, i) => (
          <div key={i} className="absolute w-full border-t border-white/8"
            style={{ top: `${(i / (yTicks.length - 1)) * 100}%` }} />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute left-7 right-0 top-0 bottom-6 flex items-end gap-1">
        {bars.map((val, i) => (
          <div key={`${labels[i]}-${i}`}
            className="relative flex-1 flex flex-col items-center group/bar cursor-pointer"
            onMouseEnter={() => setTooltip({ i, val, label: labels[i] })}
            onMouseLeave={() => setTooltip(null)}
          >
            {tooltip?.i === i && (
              <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-20
                bg-[#0b0f19] text-white text-[10px] font-bold px-2 py-1 rounded-lg
                whitespace-nowrap shadow-xl pointer-events-none">
                {labels[i]}: {val}%
                <div className="absolute top-full left-1/2 -translate-x-1/2
                  border-[3px] border-transparent border-t-[#0b0f19]" />
              </div>
            )}
            <div
              className="w-full rounded-t-[3px] bg-gradient-to-t from-violet-500/90 to-violet-400/60
                group-hover/bar:from-violet-600 group-hover/bar:to-violet-500 transition-colors duration-150"
              style={{
                height: active ? `${val}%` : '2px',
                transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* SVG line overlay */}
      <svg className="absolute pointer-events-none overflow-visible"
        style={{ left: '1.75rem', top: 0, width: 'calc(100% - 1.75rem)', height: 'calc(100% - 1.5rem)' }}
        preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <polyline
          points={line.map((v, i) => `${(i / (line.length - 1)) * 100},${100 - v}`).join(' ')}
          fill="none" stroke="url(#lg2)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="220" strokeDashoffset={active ? '0' : '220'}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) 0.25s' }}
        />
        {line.map((v, i) => (
          <circle key={i} cx={(i / (line.length - 1)) * 100} cy={100 - v} r="1.4"
            fill="#8b5cf6" opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.25s ease ${0.25 + i * 0.08}s` }} />
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="absolute left-7 right-0 bottom-0 flex justify-between">
        {labels.map((l) => (
          <span key={l} className="text-[8px] sm:text-[9px] text-white font-medium flex-1 text-center leading-none">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* -- Legacy sub-components kept for reference but replaced above -- */
function NodeGraph({ active }) {
  const nodes = [
    { x: 50, y: 50, r: 7, delay: 0 },
    { x: 20, y: 25, r: 4, delay: 0.3 },
    { x: 78, y: 22, r: 5, delay: 0.6 },
    { x: 15, y: 68, r: 4, delay: 0.9 },
    { x: 82, y: 65, r: 6, delay: 0.4 },
    { x: 50, y: 85, r: 4, delay: 0.7 },
    { x: 35, y: 48, r: 3, delay: 1.1 },
    { x: 65, y: 42, r: 3, delay: 0.2 },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,6],[2,7],[3,5],[4,5],
  ];
  return (
    <div className="relative w-full h-36">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.25"
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 3} fill="#7c3aed" fillOpacity="0.08">
              {active && (
                <animate attributeName="r" values={`${n.r+3};${n.r+6};${n.r+3}`}
                  dur="2.4s" begin={`${n.delay}s`} repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#ng)" />
          </g>
        ))}
        {/* Travelling pulse dot */}
        {active && (
          <circle r="1.8" fill="#a78bfa">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50,50 L20,25 L78,22 L82,65 L50,85 L15,68 L50,50" />
          </circle>
        )}
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      {/* Signal badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-full px-2.5 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
        </span>
        <span className="text-[10px] font-bold text-violet-700">+34% Growth Signal</span>
      </div>
    </div>
  );
}

/* Card 2 ? Opportunity Gauge */
function OpportunityGauge({ active }) {
  const [angle, setAngle] = useState(0);
  const targetAngle = 210; // ~70% of 300deg arc
  useEffect(() => {
    if (!active) return;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setAngle(Math.floor(targetAngle * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);

  // Arc from -150deg to +150deg (300deg total), needle at `angle` from start
  const cx = 60; const cy = 62; const r = 44;
  const startDeg = -210; // left end
  const needleDeg = startDeg + angle;
  const toRad = (d) => (d * Math.PI) / 180;
  const nx = cx + (r - 6) * Math.cos(toRad(needleDeg));
  const ny = cy + (r - 6) * Math.sin(toRad(needleDeg));

  const arcPath = (start, end, radius) => {
    const s = { x: cx + radius * Math.cos(toRad(start)), y: cy + radius * Math.sin(toRad(start)) };
    const e = { x: cx + radius * Math.cos(toRad(end)),   y: cy + radius * Math.sin(toRad(end)) };
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const zones = [
    { label: 'Saturated', color: '#f43f5e', start: -210, end: -110 },
    { label: 'Emerging',  color: '#f59e0b', start: -110, end: -10  },
    { label: 'High Demand', color: '#10b981', start: -10, end: 90  },
  ];

  return (
    <div className="relative w-full h-36 flex flex-col items-center">
      <svg viewBox="0 0 120 80" className="w-full h-28" preserveAspectRatio="xMidYMid meet">
        {/* Zone arcs */}
        {zones.map((z) => (
          <path key={z.label} d={arcPath(z.start, z.end, 44)}
            fill="none" stroke={z.color} strokeWidth="6" strokeOpacity="0.25" strokeLinecap="round" />
        ))}
        {/* Active arc */}
        <path d={arcPath(-210, startDeg + angle, 44)}
          fill="none" stroke="url(#gaugeGrad)" strokeWidth="6" strokeLinecap="round" />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3" fill="#7c3aed" />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {/* Zone labels */}
      <div className="flex items-center gap-3 -mt-2">
        {zones.map((z) => (
          <div key={z.label} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: z.color }} />
            <span className="text-[9px] font-semibold text-white">{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 3 ? Benchmark Speedometer bars */
function BenchmarkBars({ active }) {
  const segments = [
    { label: 'Food & Bev',  score: 88, color: '#7c3aed' },
    { label: 'Retail',      score: 72, color: '#3b82f6' },
    { label: 'Education',   score: 65, color: '#10b981' },
    { label: 'Wellness',    score: 58, color: '#f97316' },
  ];
  return (
    <div className="w-full space-y-2.5 pt-1">
      {segments.map((s, i) => (
        <div key={s.label}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] font-semibold text-white">{s.label}</span>
            <span className="text-[11px] font-bold text-slate-800">{s.score}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-200"
              style={{
                width: active ? `${s.score}%` : '0%',
                background: s.color,
                transitionDelay: `${0.3 + i * 0.12}s`,
              }}
            />
          </div>
        </div>
      ))}
      {/* Dial indicator */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-white font-medium">Scalability Index</span>
        <span className="text-[11px] font-bold text-violet-600">
          {active ? '? Optimised' : '?'}
        </span>
      </div>
    </div>
  );
}

/* Card 4 ? Investor Signal Stream */
function InvestorSignals({ active }) {
  const signals = [
    {
      icon: (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      text: 'Retail interest rising in Pune',
      time: '2m ago',
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Food demand trending in Tier 2',
      time: '5m ago',
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      text: 'Education sector gaining traction',
      time: '9m ago',
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      text: 'Wellness brands expanding fast',
      time: '14m ago',
      color: 'bg-violet-50 border-violet-100',
      iconBg: 'bg-violet-100',
    },
  ];
  return (
    <div className="w-full space-y-2 pt-1">
      {signals.map((s, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${s.color} transition-all duration-200`}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(-12px)',
            transitionDelay: `${0.2 + i * 0.15}s`,
          }}
        >
          <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
            {s.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug truncate">{s.text}</p>
            <p className="text-[10px] text-white">{s.time}</p>
          </div>
          <span className="relative shrink-0 flex h-2 w-2">
            {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        </div>
      ))}
    </div>
  );
}

// -- Main section -------------------------------------------------------------
function MarketIntelligenceSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ink = isLight ? '!text-black' : 'text-white';
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState('Quarterly');

  const kpiTileStyle = isLight
    ? { background: '#f8fafc', border: '1px solid #e2e8f0' }
    : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' };
  const dashShellStyle = isLight
    ? { background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(15, 23, 42, 0.06)' }
    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' };
  const tabWrapStyle = isLight
    ? { background: '#f1f5f9', border: '1px solid #e2e8f0' }
    : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' };
  const sourcePillStyle = isLight
    ? { background: '#f8fafc', border: '1px solid #e2e8f0', color: '#000000' }
    : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' };
  const gridLine = isLight ? 'border-slate-200' : 'border-white/8';
  const divider = isLight ? 'border-slate-200' : 'border-white/10';
  const sectorTrack = isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)';

  // Calculate REAL data from franchise opportunities
  const totalFranchises = franchiseOpportunities.length;
  const totalCities = getTotalCities(); // 8
  const avgROI = getAverageROI(); // Average ROI
  const growthMetrics = calculateGrowthMetrics(); // Recent growth

  const marketSize = useCountUp(totalFranchises, active, 1800);
  const cagr       = useCountUp(avgROI,  active, 1400); // Real: Average ROI
  const cities     = useCountUp(totalCities, active, 1600); // Real: 8 cities
  const investors  = useCountUp(growthMetrics.growthRate,  active, 1500); // Real: Growth rate

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        // Toggle active on every enter/leave ? animations replay each time
        setActive(e.isIntersecting);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const kpis = [
    { label: 'Total Franchises',     value: `${marketSize}`, sub: 'Verified opportunities',   dotColor: '#7c3aed' },
    { label: 'Average ROI',     value: `${cagr}%`,             sub: 'Across all brands',   dotColor: '#10b981' },
    { label: 'Active Cities', value: `${cities}`,            sub: 'Pan India coverage', dotColor: '#3b82f6' },
    { label: 'Recent Growth',  value: `${investors}%`,         sub: 'Last 3 months',  dotColor: '#f97316' },
  ];

  const dataset = CHART_DATASETS[tab];

  // Build smooth cubic bezier SVG path
  const buildPath = (pts, close = false) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * 0.4;
      const cp1y = pts[i - 1].y;
      const cp2x = pts[i].x - (pts[i].x - pts[i - 1].x) * 0.4;
      const cp2y = pts[i].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i].x} ${pts[i].y}`;
    }
    if (close) {
      d += ` L ${pts[pts.length - 1].x} 100 L ${pts[0].x} 100 Z`;
    }
    return d;
  };

  const linePoints = dataset.line.map((v, i) => ({
    x: (i / (dataset.line.length - 1)) * 100,
    y: 100 - v,
  }));

  return (
    <section
      ref={ref}
      className={`market-intel-section w-full ${isLight ? 'market-intel-section--light bg-white' : 'market-intel-section--dark'}`}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-6 lg:px-8">

        {/* Compact Header */}
        <div className="mb-6 text-center">
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${ink}`}>
              India Franchise Market Intelligence
            </span>
          </div>
          <h2 className={`${TYPE.sectionCompact} ${ink}`}>Inside India&apos;s Franchise Growth Engine</h2>
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${ink}`}>
            Real-time market insights, investor patterns, and expansion trends shaping India&apos;s franchise future.
          </p>
        </div>

        {/* Compact KPI stat tiles */}
        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="rounded-xl px-4 py-3"
              style={{
                ...kpiTileStyle,
                opacity: active ? 1 : 0.4,
                transform: active ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              <p className={`mb-1.5 text-[9px] font-bold uppercase tracking-widest ${ink}`}>{k.label}</p>
              <div className="mb-0.5 flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: k.dotColor }} />
                <p className={`text-xl font-extrabold tabular-nums leading-none ${ink}`}>{k.value}</p>
              </div>
              <p className={`text-[10px] ${ink}`}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Main dashboard card */}
        <div
          className={`overflow-hidden rounded-2xl ${isLight ? '' : 'theme-dark-surface'}`}
          style={dashShellStyle}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_280px]">

            {/* LEFT — Chart panel */}
            <div className={`border-b p-5 lg:border-b-0 lg:border-r ${divider}`}>

              {/* Chart header row */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={`mb-0.5 text-[10px] font-semibold uppercase tracking-widest ${ink}`}>Revenue Growth Index</p>
                  <p className={`text-sm font-extrabold ${ink}`}>India Franchise Market Expansion</p>
                </div>
                <div className="market-intel-tabs flex shrink-0 items-center gap-1 rounded-xl p-1" style={tabWrapStyle}>
                  {['Monthly', 'Quarterly', 'Yearly'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`market-intel-tab-btn rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
                        tab === t
                          ? 'is-active bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-md'
                          : isLight
                            ? '!text-black hover:bg-white'
                            : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Professional Chart area with clear labels */}
              <div className="relative h-52 select-none">
                {/* Y-axis with percentage labels */}
                <div className="pointer-events-none absolute bottom-8 left-0 top-0 flex flex-col justify-between pr-2">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v} className={`w-7 text-right text-[10px] font-medium leading-none ${ink}`}>{v}%</span>
                  ))}
                </div>

                {/* Grid lines */}
                <div className="pointer-events-none absolute bottom-8 left-9 right-0 top-0">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`absolute w-full border-t ${gridLine}`} style={{ top: `${(i / 4) * 100}%` }} />
                  ))}
                  {dataset.labels.map((_, i) => (
                    <div
                      key={`vline-${i}`}
                      className={`absolute h-full border-l ${isLight ? 'border-slate-100' : 'border-white/5'}`}
                      style={{ left: `${(i / (dataset.labels.length - 1)) * 100}%` }}
                    />
                  ))}
                </div>

                {/* SVG chart - Stock-style realistic line */}
                <svg
                  className="absolute top-0 pointer-events-none"
                  style={{ left: '2.25rem', width: 'calc(100% - 2.25rem)', height: 'calc(100% - 2rem)' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* 3D Pipe gradients ? white/silver */}
                    <linearGradient id="miBarGrad3D" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                      <stop offset="15%" stopColor="#cbd5e1" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.5" />
                    </linearGradient>
                    {/* Top ellipse gradient - bright white reflection */}
                    <radialGradient id="miBarTop" cx="50%" cy="30%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.85" />
                    </radialGradient>
                    {/* Bottom ellipse gradient - darker silver for depth */}
                    <radialGradient id="miBarBottom" cx="50%" cy="70%">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#475569" stopOpacity="0.7" />
                    </radialGradient>
                    <linearGradient id="miAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    {/* Enhanced shadow filter for stronger 3D depth */}
                    <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/>
                      <feOffset dx="1" dy="2" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    {/* Inner shadow for depth */}
                    <filter id="innerShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
                      <feOffset dx="0" dy="1"/>
                      <feComposite operator="out" in="SourceGraphic"/>
                    </filter>
                  </defs>

                  {/* Premium 3D Pipe Bars with Enhanced Depth */}
                  {dataset.bars.map((val, i) => {
                    const bw = 100 / dataset.bars.length;
                    const x = i * bw + bw * 0.22;
                    const w = bw * 0.56;
                    const barH = active ? val : val * 0.3;
                    const topY = 100 - barH;
                    const ellipseRy = w * 0.18; // Larger ellipse for more 3D effect
                    
                    return (
                      <g key={`${tab}-bar-${i}`}>
                        {/* Bottom ellipse (base) - creates 3D bottom cap */}
                        <ellipse
                          cx={x + w / 2}
                          cy={100}
                          rx={w / 2}
                          ry={ellipseRy * 0.8}
                          fill="url(#miBarBottom)"
                          opacity="0.6"
                        />
                        
                        {/* Main pipe body with enhanced shadow */}
                        <g filter="url(#barShadow)">
                          {/* Pipe body with cylindrical gradient */}
                          <rect
                            x={x} 
                            y={topY + ellipseRy} 
                            width={w} 
                            height={barH - ellipseRy}
                            fill="url(#miBarGrad3D)"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong highlight on left edge - light reflection */}
                          <rect
                            x={x + w * 0.08}
                            y={topY + ellipseRy}
                            width={w * 0.2}
                            height={barH - ellipseRy}
                            fill="white"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong shadow on right edge - depth */}
                          <rect
                            x={x + w - w * 0.22}
                            y={topY + ellipseRy}
                            width={w * 0.22}
                            height={barH - ellipseRy}
                            fill="black"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* 3D Top cap (ellipse) with radial gradient */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy}
                            rx={w / 2}
                            ry={ellipseRy}
                            fill="url(#miBarTop)"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Top highlight - glossy effect */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy * 0.7}
                            rx={w / 3}
                            ry={ellipseRy * 0.5}
                            fill="white"
                            opacity="0.3"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                        </g>
                      </g>
                    );
                  })}

                  {/* Subtle area fill under line */}
                  <path d={buildPath(linePoints, true)} fill="url(#miAreaGrad)" />

                  {/* Realistic stock-style trend line - Clean green */}
                  <path
                    key={`${tab}-line`}
                    d={buildPath(linePoints)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset={active ? '0' : '200'}
                    style={{ 
                      transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
                    }}
                  />

                  {/* Small dots on line - Stock style */}
                  {linePoints.map((pt, i) => (
                    <circle
                      key={`${tab}-dot-${i}`}
                      cx={pt.x} cy={pt.y} r="1.5"
                      fill="#10b981"
                      opacity={active ? 0.6 : 0}
                      style={{ 
                        transition: `opacity 0.3s ease ${0.6 + i * 0.08}s`,
                      }}
                    />
                  ))}
                </svg>

                {/* X-axis labels - Clear and visible */}
                <div className="absolute bottom-0 left-9 right-0 flex justify-between px-1">
                  {dataset.labels.map((l) => (
                    <span key={l} className={`flex-1 text-center text-[10px] font-semibold ${ink}`}>{l}</span>
                  ))}
                </div>
              </div>

              <div className={`mt-3 border-t pt-3 ${divider}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-sm" style={{ background: 'linear-gradient(to top, #7c3aed, #a78bfa)' }} />
                      <span className={`text-[10px] font-medium ${ink}`}>Market Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-0.5 w-4 rounded bg-emerald-500" />
                      <span className={`text-[10px] font-medium ${ink}`}>CAGR Trend</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                    style={{ background: isLight ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.15)' }}
                  >
                    <svg className="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-[10px] font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      +{avgROI}% Avg Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Donut + category bars */}
            <div className={`flex flex-col divide-y ${isLight ? 'divide-slate-200' : 'divide-white/10'}`}>

              <div className="p-4">
                <p className={`mb-0.5 text-[9px] font-bold uppercase tracking-widest ${ink}`}>Investor Preference</p>
                <p className={`mb-3 text-xs font-bold ${ink}`}>Franchise vs Independent</p>
                <div className="flex items-center gap-3">
                  <div className="h-[75px] w-[75px] shrink-0">
                    <DonutChart active={active} isLight={isLight} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Franchise Model', pct: '72%', color: '#7c3aed' },
                      { label: 'Independent', pct: '28%', color: isLight ? '#94a3b8' : '#e2e8f0' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
                        <div>
                          <p className={`text-[10px] font-semibold leading-tight ${ink}`}>{s.label}</p>
                          <p className={`text-[9px] ${ink}`}>{s.pct}</p>
                        </div>
                      </div>
                    ))}
                    <p className={`text-[9px] italic ${ink}`}>3&times; since 2020</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4">
                <p className={`mb-0.5 text-[9px] font-bold uppercase tracking-widest ${ink}`}>Top Sectors</p>
                <p className={`mb-3 text-xs font-bold ${ink}`}>Fastest Growing Categories</p>
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat, i) => (
                    <div key={cat.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className={`text-[10px] font-semibold ${ink}`}>{cat.name}</span>
                        <span className={`market-intel-sector-pct text-[10px] font-bold ${ink}`}>{cat.pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: sectorTrack }}>
                        <div
                          className="h-full rounded-full transition-all duration-200"
                          style={{
                            width: active ? `${cat.pct}%` : `${cat.pct * 0.25}%`,
                            background: cat.color,
                            transitionDelay: `${0.4 + i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${ink}`}>Verified Sources:</span>
            {SOURCES.map((s) => (
              <span key={s} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={sourcePillStyle}>
                {s}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <svg className={`h-3 w-3 ${ink}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className={`text-[11px] font-medium ${ink}`}>AI + Market Intelligence Powered</p>
          </div>
        </div>



      </div>
    </section>
  );
}

export default MarketIntelligenceSection;

