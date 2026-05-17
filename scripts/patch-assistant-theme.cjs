const fs = require('fs');
const path = 'src/components/ExpansionAssistant.jsx';
let s = fs.readFileSync(path, 'utf8');

// Fix ProgressBar outer wrapper
s = s.replace(
  /<motion\.motion.div style=\{\{ height: 2, background: p\.progressTrack/,
  '<div style={{ height: 2, background: p.progressTrack'
);
s = s.replace(
  /(function ProgressBar[\s\S]*?animate=\{\{ width: `\$\{\(current \/ total\) \* 100\}%` \}\}[\s\S]*?\/>)\r?\n      <\/div>/,
  '$1\n      </div>'
);

// Fix SummaryCard row closing tag
s = s.replace(
  /(<motion\.div key=\{label\} style=\{\{ display: 'flex'[\s\S]*?\{value\}\}<\/span>)\r?\n          <\/div>/,
  '$1\n          </div>'
);

// ActionRow - add palette hook at start
if (!s.includes('function ActionRow({ row, onClick, index, secondary = false }) {\n  const p = useAssistantPalette();')) {
  s = s.replace(
    'function ActionRow({ row, onClick, index, secondary = false }) {\n  const [hovered, setHovered] = useState(false);',
    'function ActionRow({ row, onClick, index, secondary = false }) {\n  const p = useAssistantPalette();\n  const [hovered, setHovered] = useState(false);'
  );
  s = s.replace(
    "background: hovered\n          ? secondary ? 'rgba(0,0,0,0.04)' : 'rgba(248,246,255,0.92)'\n          : secondary ? 'rgba(249,250,251,0.92)' : 'rgba(255,255,255,0.94)',\n        border: hovered\n          ? `1px solid ${secondary ? 'rgba(148,163,184,0.35)' : 'rgba(167,139,250,0.45)'}`\n          : `1px solid ${secondary ? 'rgba(226,232,240,1)' : 'rgba(237,233,254,0.9)'}`,",
    'background: hovered ? (secondary ? p.chipBgHover : p.rowBgHover) : (secondary ? p.chipBg : p.rowBg),\n        border: hovered ? `1px solid ${secondary ? p.border : p.rowBorderHover}` : `1px solid ${secondary ? p.border : p.rowBorder}`,'
  );
  s = s.replace(
    "color: secondary ? 'rgba(100,116,139,0.88)' : 'rgba(124,58,237,0.85)',",
    'color: secondary ? p.textSoft : PURPLE_BRAND,'
  );
  s = s.replace(
    "color: secondary ? 'rgba(71,85,105,0.88)' : 'rgba(15,23,42,0.9)',",
    'color: secondary ? p.textMuted : p.text,'
  );
}

// HomeView welcome
if (!s.includes('function HomeView({ setView, setIsOpen }) {\n  const p = useAssistantPalette();')) {
  s = s.replace(
    'function HomeView({ setView, setIsOpen }) {\n  return (',
    'function HomeView({ setView, setIsOpen }) {\n  const p = useAssistantPalette();\n  return ('
  );
  s = s.replace(
    "background: 'linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.05) 45%, rgba(255,255,255,0.6) 100%)',\n            border: '1px solid rgba(237,233,254,0.95)',",
    'background: p.welcomeBg,\n            border: `1px solid ${p.welcomeBorder}`,'
  );
  s = s.replace(
    "color: '#0f172a',\n              letterSpacing: '-0.03em',\n              lineHeight: 1.35,\n            }}\n          >\n            How can we help you expand today?",
    'color: p.text,\n              letterSpacing: \'-0.03em\',\n              lineHeight: 1.35,\n            }}\n          >\n            How can we help you expand today?'
  );
  s = s.replace(
    "color: 'rgba(71,85,105,0.88)',\n              letterSpacing: '-0.01em',\n            }}\n          >\n            Please select an option",
    'color: p.textMuted,\n              letterSpacing: \'-0.01em\',\n            }}\n          >\n            Please select an option'
  );
  s = s.replace(
    "background: 'linear-gradient(90deg, transparent, rgba(226,232,240,1), transparent)'",
    'background: `linear-gradient(90deg, transparent, ${p.divider}, transparent)`'
  );
}

// Flow questions
s = s.replace(
  /fontSize: 14, fontWeight: 600, color: 'rgba\(15,23,42,0\.9\)'/g,
  'fontSize: 14, fontWeight: 600, color: \'var(--ea-flow-q)\''
);

// Main component theme
if (!s.includes('const { isLight } = useTheme();')) {
  s = s.replace(
    'export default function ExpansionAssistant() {\n  const [isOpen, setIsOpen] = useState(false);',
    'export default function ExpansionAssistant() {\n  const { isLight } = useTheme();\n  const palette = useMemo(() => getAssistantPalette(isLight), [isLight]);\n  const [isOpen, setIsOpen] = useState(false);'
  );
}

// Panel styles use palette
s = s.replace(
  /background: 'rgba\(255,255,255,0\.99\)',/g,
  "background: palette.panel,"
);
s = s.replace(
  /border: '1px solid rgba\(0,0,0,0\.07\)'/,
  'border: `1px solid ${palette.border}`'
);
s = s.replace(
  /border: '1px solid rgba\(0,0,0,0\.08\)'/,
  'border: `1px solid ${palette.border}`'
);

// Wrap return with provider
if (!s.includes('AssistantPaletteContext.Provider')) {
  s = s.replace(
    '  return (\n    <>\n      {/* Mobile backdrop */}',
    '  return (\n    <AssistantPaletteContext.Provider value={palette}>\n    <>\n      {/* Mobile backdrop */}'
  );
  s = s.replace(
    /(\s+<\/motion\.div>\s+\)\}\s+<\/AnimatePresence>\s+<\/>\s+\);\s+\})/,
    (m) => m.replace('</>', '</>\n    </AssistantPaletteContext.Provider>')
  );
  // fix launcher outside provider - launcher should stay inside provider
  const lastClose = s.lastIndexOf('</>');
  // find end of component - before last );
}

// Header layout - replace header block
const headerOld = `              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <AssistantGlyphTile dimension={36} />
                  <AssistantDateTime />
                </div>
                <button`;

const headerNew = `              <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <AssistantGlyphTile dimension={34} />
                  <AssistantDateTime />
                </motion.div>
                <motion.div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <LiveStatusPulse />
                <button`;

if (s.includes(headerOld)) {
  s = s.replace(headerOld, headerNew);
  s = s.replace(
    /(\s+<\/svg>\s+<\/button>\s+)\r?\n              <\/div>\r?\n            <\/div>\r?\n\r?\n            \{\/\* View router \*\/\}/,
    '$1\n                </div>\n              </motion.div>\n            </motion.div>\n\n            {/* View router */}'
  );
}

// Header bg from palette
s = s.replace(
  /padding: '14px 16px 13px',\s*flexShrink: 0,\s*background: 'rgba\(248,249,252,1\)',\s*borderBottom: '1px solid rgba\(0,0,0,0\.07\)',/,
  "padding: '12px 14px 11px',\n                flexShrink: 0,\n                background: palette.header,\n                borderBottom: `1px solid ${palette.border}`,"
);

// Close button palette
s = s.replace(
    /background: 'rgba\(255,255,255,1\)',\s*border: '1px solid rgba\(0,0,0,0\.08\)',\s*display: 'flex',\s*alignItems: 'center',\s*justifyContent: 'center',\s*color: 'rgba\(71,85,105,0\.75\)',/,
    'background: palette.closeBg,\n                    border: `1px solid ${palette.closeBorder}`,\n                    display: \'flex\',\n                    alignItems: \'center\',\n                    justifyContent: \'center\',\n                    color: palette.closeColor,'
);

// Add className to panel
s = s.replace(
  /style=\{panelStyle\}\n          >/,
  'className="assistant-panel"\n            data-assistant-theme={palette.mode}\n            style={{ ...panelStyle, color: palette.text, [\'--ea-flow-q\']: palette.text }}\n          >'
);

fs.writeFileSync(path, s);
console.log('patched theme');
