const fs = require('fs');
const path = 'src/components/ExpansionAssistant.jsx';
let s = fs.readFileSync(path, 'utf8');

const paletteBlock = `import { useTheme } from '../context/ThemeContext';

const AssistantPaletteContext = createContext(null);

function getAssistantPalette(siteIsLight) {
  if (siteIsLight) {
    return {
      mode: 'dark',
      panel: '#0f172a',
      header: '#1e293b',
      text: '#f8fafc',
      textMuted: '#cbd5e1',
      textSoft: '#94a3b8',
      border: 'rgba(255,255,255,0.12)',
      inputBg: 'rgba(255,255,255,0.08)',
      inputBorder: 'rgba(255,255,255,0.18)',
      inputFocusBorder: 'rgba(167,139,250,0.55)',
      inputFocusBg: 'rgba(124,58,237,0.12)',
      chipBg: 'rgba(255,255,255,0.06)',
      chipBgHover: 'rgba(255,255,255,0.11)',
      chipBorder: 'rgba(255,255,255,0.14)',
      chipSelectedBg: 'rgba(124,58,237,0.32)',
      chipSelectedBorder: 'rgba(167,139,250,0.55)',
      chipText: '#e2e8f0',
      chipSelectedText: '#ede9fe',
      progressTrack: 'rgba(255,255,255,0.12)',
      closeBg: 'rgba(255,255,255,0.08)',
      closeBorder: 'rgba(255,255,255,0.14)',
      closeColor: '#cbd5e1',
      liveLabel: '#e2e8f0',
      livePillBg: 'rgba(34,197,94,0.12)',
      livePillBorder: 'rgba(34,197,94,0.28)',
      btnDisabledBg: 'rgba(124,58,237,0.4)',
      btnDisabledText: 'rgba(255,255,255,0.7)',
      btnEnabledBg: 'linear-gradient(135deg,#7c3aed,#6366f1)',
      btnEnabledText: '#ffffff',
      flowHeaderBg: '#1e293b',
      summaryBg: 'rgba(124,58,237,0.16)',
      summaryBorder: 'rgba(167,139,250,0.32)',
      dateColor: '#94a3b8',
      timeColor: '#e9d5ff',
      timePillBg: 'rgba(124,58,237,0.28)',
      timePillBorder: 'rgba(167,139,250,0.42)',
      globeTileBg: '#1e293b',
      globeTileBorder: 'rgba(167,139,250,0.45)',
    };
  }
  return {
    mode: 'light',
    panel: 'rgba(255,255,255,0.99)',
    header: 'rgba(248,249,252,1)',
    text: '#0f172a',
    textMuted: '#475569',
    textSoft: '#64748b',
    border: 'rgba(0,0,0,0.08)',
    inputBg: '#f8fafc',
    inputBorder: 'rgba(0,0,0,0.12)',
    inputFocusBorder: 'rgba(124,58,237,0.45)',
    inputFocusBg: 'rgba(124,58,237,0.04)',
    chipBg: 'rgba(0,0,0,0.04)',
    chipBgHover: 'rgba(0,0,0,0.07)',
    chipBorder: 'rgba(0,0,0,0.1)',
    chipSelectedBg: 'rgba(124,58,237,0.1)',
    chipSelectedBorder: 'rgba(124,58,237,0.4)',
    chipText: '#475569',
    chipSelectedText: '#5b21b6',
    progressTrack: 'rgba(0,0,0,0.08)',
    closeBg: '#ffffff',
    closeBorder: 'rgba(0,0,0,0.1)',
    closeColor: '#64748b',
    liveLabel: '#334155',
    livePillBg: 'rgba(34,197,94,0.1)',
    livePillBorder: 'rgba(34,197,94,0.25)',
    btnDisabledBg: 'rgba(124,58,237,0.3)',
    btnDisabledText: 'rgba(255,255,255,0.75)',
    btnEnabledBg: 'linear-gradient(135deg,#7c3aed,#6366f1)',
    btnEnabledText: '#ffffff',
    flowHeaderBg: 'rgba(248,249,252,1)',
    summaryBg: 'rgba(124,58,237,0.06)',
    summaryBorder: 'rgba(124,58,237,0.18)',
    dateColor: '#64748b',
    timeColor: '#5b21b6',
    timePillBg: 'rgba(124,58,237,0.1)',
    timePillBorder: 'rgba(124,58,237,0.22)',
    globeTileBg: '#ffffff',
    globeTileBorder: 'rgba(124,58,237,0.38)',
  };
}

function useAssistantPalette() {
  return useContext(AssistantPaletteContext) || getAssistantPalette(false);
}

`;

s = s.replace(
  "import { useState, useEffect, useCallback, useRef } from 'react';",
  "import { useState, useEffect, useCallback, useRef, createContext, useContext, useMemo } from 'react';"
);
s = s.replace(
  "import { submitChatbotLead } from '../lib/forms';\n",
  `import { submitChatbotLead } from '../lib/forms';\n${paletteBlock}`
);

s = s.replace(
  `function formatDeskTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return \`\${pad(date.getHours())}:\${pad(date.getMinutes())}\`;
}`,
  `function formatDeskTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}`
);

const datetimeOld = `/** Live date (DD-MM-YYYY) and clock for panel header */
function AssistantDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <motion.div>
      <motion.div className="assistant-desk-datetime-row">
        <span className="assistant-desk-date">{formatDeskDate(now)}</span>
        <span className="assistant-desk-time-pill">{formatDeskTime(now)}</span>
      </motion.div>
      <motion.div style={{ marginTop: 6 }}>
        <LiveStatusPulse />
      </motion.div>
    </motion.div>
  );
}`;

const datetimeNew = `/** Compact date + AM/PM time */
function AssistantDateTime() {
  const p = useAssistantPalette();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);
  return (
    <motion.div className="assistant-desk-datetime-row">
      <span className="assistant-desk-date" style={{ color: p.dateColor, fontSize: 11, fontWeight: 600 }}>{formatDeskDate(now)}</span>
      <span className="assistant-desk-time-pill" style={{ color: p.timeColor, background: p.timePillBg, border: \`1px solid \${p.timePillBorder}\`, fontSize: 10, fontWeight: 600, padding: '2px 8px' }}>{formatDeskTime(now)}</span>
    </motion.div>
  );
}`;

// fix datetime block - use div not motion
const datetimeOld2 = datetimeOld.replace(/motion\./g, 'div');
const datetimeNew2 = datetimeNew.replace(/motion\./g, 'motion.').replace(/<motion\.div/g, '<div').replace(/<\/motion\.motion.div>/g, '</div>');
const datetimeNew3 = `/** Compact date + AM/PM time */
function AssistantDateTime() {
  const p = useAssistantPalette();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);
  return (
    <motion.div className="assistant-desk-datetime-row">
      <span className="assistant-desk-date" style={{ color: p.dateColor, fontSize: 11, fontWeight: 600 }}>{formatDeskDate(now)}</span>
      <span className="assistant-desk-time-pill" style={{ color: p.timeColor, background: p.timePillBg, border: '1px solid ' + p.timePillBorder, fontSize: 10, fontWeight: 600, padding: '2px 8px' }}>{formatDeskTime(now)}</span>
    </motion.div>
  );
}`;
const datetimeNew4 = datetimeNew3.replace(/<motion\.div/g, '<div').replace(/<\/motion\.motion.div>/g, '</div>');

s = s.replace(datetimeOld2, datetimeNew4);

// LiveStatusPulse
s = s.replace(
  'function LiveStatusPulse({ label = \'Live\' }) {\n  return (\n    <motion.div style={{ display: \'flex\', alignItems: \'center\', gap: 8 }}>',
  'function LiveStatusPulse({ label = \'Live\' }) {\n  const p = useAssistantPalette();\n  return (\n    <div className="assistant-live-pill" style={{ display: \'flex\', alignItems: \'center\', gap: 6, padding: \'4px 8px\', borderRadius: 999, background: p.livePillBg, border: `1px solid ${p.livePillBorder}` }}>'
);
s = s.replace(
  "style={{ color: '#334155', fontSize: 11, fontWeight: 700",
  "style={{ color: p.liveLabel, fontSize: 10, fontWeight: 700"
);
s = s.replace(
  '      </motion.span>\n    </motion.div>\n  );\n}\n\n/** Header tile',
  '      </motion.span>\n    </motion.div>\n  );\n}\n\n/** Header tile'
);
// fix LiveStatusPulse closing - change outer closing from div to div
s = s.replace(
  /function LiveStatusPulse[\s\S]*?      <\/motion\.span>\n    <\/div>\n  \);\n}\n\n\/\*\* Header tile/,
  (m) => m.replace('    </motion.div>\n  );', '    </motion.div>\n  );').replace('    </motion.div>', '    </motion.div>')
);

// Glyph tile
s = s.replace(
  'function AssistantGlyphTile({ dimension = 34 }) {\n  const glyph = Math.round(dimension * 0.58);',
  'function AssistantGlyphTile({ dimension = 34 }) {\n  const p = useAssistantPalette();\n  const glyph = Math.round(dimension * 0.58);'
);
s = s.replace(
  '        color: PURPLE_BRAND,\n      }}\n    >\n      <RotatingGlobeIcon size={glyph} />',
  '        color: PURPLE_BRAND,\n        background: p.globeTileBg,\n        border: `1px solid ${p.globeTileBorder}`,\n      }}\n    >\n      <RotatingGlobeIcon size={glyph} />'
);

// TextInput - critical fix placeholder
s = s.replace(
  'function TextInput({ placeholder, value, onChange, type = \'text\' }) {\n  return (',
  'function TextInput({ placeholder, value, onChange, type = \'text\' }) {\n  const p = useAssistantPalette();\n  return ('
);
s = s.replace(
  'className="mt-3.5 w-full box-border rounded-[10px] px-[14px] py-2.5 text-[13px] text-slate-900/90 outline-none transition-all duration-150 placeholder:text-white/90"',
  'className="ea-text-input mt-3.5 w-full box-border rounded-[10px] px-[14px] py-2.5 text-[13px] outline-none transition-all duration-150"'
);
s = s.replace(
  "      style={{\n        border: '1px solid rgba(0,0,0,0.1)',\n        background: 'rgba(0,0,0,0.03)',\n      }}\n      onFocus={(e) => {\n        e.target.style.border = '1px solid rgba(124,58,237,0.4)';\n        e.target.style.background = 'rgba(124,58,237,0.03)';\n      }}\n      onBlur={(e) => {\n        e.target.style.border = '1px solid rgba(0,0,0,0.1)';\n        e.target.style.background = 'rgba(0,0,0,0.03)';\n      }}",
  "      style={{ border: `1px solid ${p.inputBorder}`, background: p.inputBg, color: p.text }}\n      onFocus={(e) => { e.target.style.border = `1px solid ${p.inputFocusBorder}`; e.target.style.background = p.inputFocusBg; }}\n      onBlur={(e) => { e.target.style.border = `1px solid ${p.inputBorder}`; e.target.style.background = p.inputBg; }}"
);

// ContinueBtn
s = s.replace(
  'function ContinueBtn({ onClick, disabled, label = \'Continue\' }) {\n  return (',
  'function ContinueBtn({ onClick, disabled, label = \'Continue\' }) {\n  const p = useAssistantPalette();\n  return ('
);
s = s.replace(
  "        background: disabled ? 'rgba(124,58,237,0.2)' : 'linear-gradient(135deg,#7c3aed,#6366f1)',\n        color: disabled ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.96)',",
  '        background: disabled ? p.btnDisabledBg : p.btnEnabledBg,\n        color: disabled ? p.btnDisabledText : p.btnEnabledText,'
);

// ChipSelect
s = s.replace(
  'function ChipSelect({ options, value, onChange, multi = false }) {\n  const isSelected',
  'function ChipSelect({ options, value, onChange, multi = false }) {\n  const p = useAssistantPalette();\n  const isSelected'
);
s = s.replace(
  "            border: isSelected(opt) ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(0,0,0,0.1)',\n            background: isSelected(opt) ? 'rgba(124,58,237,0.08)' : 'rgba(0,0,0,0.03)',\n            color: isSelected(opt) ? 'rgba(109,40,217,1)' : 'rgba(71,85,105,0.85)',",
  '            border: isSelected(opt) ? `1px solid ${p.chipSelectedBorder}` : `1px solid ${p.chipBorder}`,\n            background: isSelected(opt) ? p.chipSelectedBg : p.chipBg,\n            color: isSelected(opt) ? p.chipSelectedText : p.chipText,'
);
s = s.replace(
  "onMouseEnter={e => { if (!isSelected(opt)) e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}",
  'onMouseEnter={e => { if (!isSelected(opt)) e.currentTarget.style.background = p.chipBgHover; }}'
);
s = s.replace(
  "onMouseLeave={e => { if (!isSelected(opt)) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}",
  'onMouseLeave={e => { if (!isSelected(opt)) e.currentTarget.style.background = p.chipBg; }}'
);

// FlowHeader
s = s.replace(
  'function FlowHeader({ title, onBack, step, total }) {\n  return (\n    <motion.div style={{ padding: \'13px 14px 12px\', borderBottom: \'1px solid rgba(0,0,0,0.07)\', display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', flexShrink: 0, background: \'rgba(248,249,252,1)\' }}>',
  'function FlowHeader({ title, onBack, step, total }) {\n  const p = useAssistantPalette();\n  return (\n    <motion.div style={{ padding: \'13px 14px 12px\', borderBottom: `1px solid ${p.border}`, display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', flexShrink: 0, background: p.flowHeaderBg }}>'
);
s = s.replace(
  'function FlowHeader({ title, onBack, step, total }) {\n  const p = useAssistantPalette();\n  return (\n    <motion.div style=',
  'function FlowHeader({ title, onBack, step, total }) {\n  const p = useAssistantPalette();\n  return (\n    <motion.div style='
);
// fix FlowHeader - opened with div
s = s.replace(
  /function FlowHeader\([\s\S]*?return \(\n    <motion\.div style=\{\{ padding: '13px 14px 12px', borderBottom: `1px solid \$\{p\.border\}`/,
  (m) => m.replace('<motion.div style={{', '<div style={{')
);

// simpler FlowHeader replace
s = s.replace(
  "    <motion.div style={{ padding: '13px 14px 12px', borderBottom: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: p.flowHeaderBg }}>",
  "    <div style={{ padding: '13px 14px 12px', borderBottom: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: p.flowHeaderBg }}>"
);

s = s.replace(
  "      <span style={{ color: 'rgba(15,23,42,0.9)', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</span>",
  "      <span style={{ color: p.text, fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</span>"
);

// flow question
s = s.replace(
  "color: 'rgba(15,23,42,0.9)'",
  "color: 'var(--ea-flow-q, #0f172a)'"
);

// Main component
s = s.replace(
  'export default function ExpansionAssistant() {\n  const [isOpen, setIsOpen] = useState(false);',
  'export default function ExpansionAssistant() {\n  const { isLight } = useTheme();\n  const palette = useMemo(() => getAssistantPalette(isLight), [isLight]);\n  const [isOpen, setIsOpen] = useState(false);'
);

s = s.replace(/background: 'rgba\(255,255,255,0\.99\)'/g, 'background: palette.panel');
s = s.replace(
  "border: '1px solid rgba(0,0,0,0.07)'",
  'border: `1px solid ${palette.border}`'
);
s = s.replace(
  "border: '1px solid rgba(0,0,0,0.08)'",
  'border: `1px solid ${palette.border}`'
);

s = s.replace(
  '  return (\n    <>\n      {/* Mobile backdrop */}',
  '  return (\n    <AssistantPaletteContext.Provider value={palette}>\n    <>\n      {/* Mobile backdrop */}'
);

s = s.replace(
  '\n    </>\n  );\n}\n',
  '\n    </>\n    </AssistantPaletteContext.Provider>\n  );\n}\n'
);

// Panel attrs
s = s.replace(
  '            style={panelStyle}\n          >',
  `            className="assistant-panel"\n            data-assistant-theme={palette.mode}\n            style={{ ...panelStyle, color: palette.text, ['--ea-flow-q']: palette.text }}\n          >`
);

// Header block
const headerOld = `            {/* Header */}
            <div
              style={{
                padding: '14px 16px 13px',
                flexShrink: 0,
                background: 'rgba(248,249,252,1)',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <AssistantGlyphTile dimension={36} />
                  <AssistantDateTime />
                </div>
                <button`;

const headerNew = `            {/* Header */}
            <div
              style={{
                padding: '12px 14px 11px',
                flexShrink: 0,
                background: palette.header,
                borderBottom: \`1px solid \${palette.border}\`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <AssistantGlyphTile dimension={34} />
                  <AssistantDateTime />
                </motion.div>
                <motion.div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <LiveStatusPulse />
                <button`;

if (s.includes(headerOld)) {
  s = s.replace(headerOld, headerNew.replace(/<motion\.motion.div/g, '<div').replace(/<\/motion\.motion.div>/g, '</div>'));
}

const headerNewFixed = headerNew
  .replace(/<motion\.motion.div/g, '<div')
  .replace(/<\/motion\.motion.div>/g, '</div>');
if (s.includes(headerOld)) s = s.replace(headerOld, headerNewFixed);

// Close button palette + close right column
s = s.replace(
  "                    background: 'rgba(255,255,255,1)',\n                    border: '1px solid rgba(0,0,0,0.08)',\n                    display: 'flex',\n                    alignItems: 'center',\n                    justifyContent: 'center',\n                    color: 'rgba(71,85,105,0.75)',",
  "                    background: palette.closeBg,\n                    border: `1px solid ${palette.closeBorder}`,\n                    display: 'flex',\n                    alignItems: 'center',\n                    justifyContent: 'center',\n                    color: palette.closeColor,"
);

// Insert close div for right column after button - only once in header
s = s.replace(
  /(<LiveStatusPulse \/>\s*<button[\s\S]*?<\/svg>\s*<\/button>)\s*(<\/div>\s*<\/motion.div>\s*\{\/\* View router)/,
  '$1\n                </motion.div>\n              </motion.div>$2'
);

// Fix erroneous motion.div closings in header - replace with div
s = s.replace(
  /(<LiveStatusPulse \/>\s*<button[\s\S]*?<\/svg>\s*<\/button>)\n                <\/motion\.motion.div>\n              <\/motion\.motion.div>/,
  '$1\n                </motion.div>\n              </motion.div>'
);

fs.writeFileSync(path, s);
console.log('applied');
