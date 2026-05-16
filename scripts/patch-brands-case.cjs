const fs = require('fs');
const path = require('path');

const brandsPath = path.join(__dirname, '../src/components/sections/BrandsSection.jsx');
let brands = fs.readFileSync(brandsPath, 'utf8');

brands = brands.replace(
  `<motion.div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: \`\${pct}%\` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className={\`h-full rounded-full bg-gradient-to-r \${
            color === 'violet'  ? 'from-violet-400 to-indigo-400' :
            color === 'emerald' ? 'from-emerald-400 to-teal-400'  :
            'from-amber-400 to-orange-400'
          }\`}
        />
      </motion.div>
      <span className="text-[0.58rem] font-bold text-slate-900/50 w-6 text-right tabular-nums">{pct}%</span>`,
  `<motion.div className="flex-1 h-1 rounded-full bg-violet-950/80 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: \`\${pct}%\` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
        />
      </motion.div>
      <span className="text-[0.58rem] font-bold text-violet-200/80 w-6 text-right tabular-nums">{pct}%</span>`
);

brands = brands.replace('text-slate-300 text-[0.88rem]', 'text-violet-100/85 text-[0.88rem]');
brands = brands.replace('text-[0.65rem] text-slate-400 mt-0.5', 'text-[0.65rem] text-violet-200/70 mt-0.5');
brands = brands.replace('w-3 h-3 text-slate-900', 'w-3 h-3 text-white');
brands = brands.replace(
  'bg-violet-600 text-slate-900 text-sm font-bold hover:bg-violet-500',
  'bg-white text-slate-900 text-sm font-bold hover:bg-violet-50'
);
brands = brands.replace(
  'border-b border-slate-100 bg-slate-50/60',
  'border-b border-violet-500/25 bg-violet-950/40'
);
brands = brands.replace('text-[0.72rem] font-bold text-slate-900', 'text-[0.72rem] font-bold text-white');
brands = brands.replace('text-[0.6rem] text-slate-500">Operational', 'text-[0.6rem] text-violet-200/70">Operational');
brands = brands.replace('text-emerald-600 uppercase', 'text-emerald-400 uppercase');
brands = brands.replace(/bg-slate-50 border border-slate-200/g, 'bg-violet-950/50 border border-violet-500/25');
brands = brands.replace(/text-slate-400 mb-2/g, 'text-violet-300/80 mb-2');
brands = brands.replace(/text-slate-700/g, 'text-white/90');
brands = brands.replace(/text-slate-500/g, 'text-violet-200/65');
brands = brands.replace(/text-slate-600/g, 'text-violet-100/80');
brands = brands.replace(/rounded-lg bg-slate-50/g, 'rounded-lg bg-violet-900/30');

fs.writeFileSync(brandsPath, brands);

const casePath = path.join(__dirname, '../src/components/sections/CaseStudiesSection.jsx');
let cs = fs.readFileSync(casePath, 'utf8');

cs = cs.replace(/color: 'orange'/g, "color: 'violet'");
cs = cs.replace(/color: 'emerald'/g, "color: 'violet'");
cs = cs.replace(/color: 'teal'/g, "color: 'violet'");

cs = cs.replace(
  /const COLOR = \{[\s\S]*?\};/,
  `const COLOR = {
  violet: { accent: 'text-violet-300', bg: 'bg-violet-500/15', border: 'border-violet-500/35', dot: 'bg-violet-500', tab: 'bg-violet-500' },
};
const CHART_GREEN = '#22c55e';`
);

cs = cs.replace(
  /function Sparkline\(\{ points, color \}\)[\s\S]*?^\}/m,
  `function Sparkline({ points }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const h = 48;
  const w = 200;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = h - ((p - min) / (max - min || 1)) * h;
    return \`\${x},\${y}\`;
  });
  const polyline = coords.join(' ');
  const area = \`0,\${h} \${polyline} \${w},\${h}\`;

  return (
    <svg viewBox={\`0 0 \${w} \${h}\`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_GREEN} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={CHART_GREEN} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-green)"/>
      <motion.polyline
        points={polyline}
        fill="none"
        stroke={CHART_GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / (max - min || 1)) * h}
        r="3.5"
        fill={CHART_GREEN}
      />
    </svg>
  );
}`
);

cs = cs.replace(/bg-red-50 border border-red-200/g, 'bg-violet-950/50 border border-violet-500/30');
cs = cs.replace(/bg-red-500/g, 'bg-violet-600/60');
cs = cs.replace(/text-red-600/g, 'text-violet-300');
cs = cs.replace(/text-red-700/g, 'text-white');
cs = cs.replace(/text-red-400/g, 'text-violet-200/75');
cs = cs.replace(/border-red-100/g, 'border-violet-500/25');
cs = cs.replace(/bg-red-400/g, 'bg-violet-400');
cs = cs.replace(/bg-white border border-violet-500\/25/g, 'bg-white/5 border border-violet-500/25');
cs = cs.replace(/bg-white\/60 border border-white\/40/g, 'bg-white/10 border border-violet-400/35');
cs = cs.replace(/text-slate-600/g, 'text-violet-100/85');
cs = cs.replace(/text-slate-500/g, 'text-violet-200/70');
cs = cs.replace(/text-slate-400/g, 'text-violet-200/75');
cs = cs.replace(/text-slate-300/g, 'text-violet-100/85');
cs = cs.replace(/bg-slate-900 border border-white\/10/g, 'card-premium-dark border border-violet-500/25');
cs = cs.replace('<Sparkline points={cs.revenuePoints} color={cs.color} />', '<Sparkline points={cs.revenuePoints} />');
cs = cs.replace('from-violet-600 to-indigo-600', 'from-violet-300 to-indigo-300');

fs.writeFileSync(casePath, cs);
console.log('done');
