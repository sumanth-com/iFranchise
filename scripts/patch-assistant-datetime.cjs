const fs = require('fs');
const path = 'src/components/ExpansionAssistant.jsx';
let s = fs.readFileSync(path, 'utf8');

const fixed = `  return (
    <div className="assistant-desk-datetime-row">
      <span
        className="assistant-desk-date"
        style={{ color: p.dateColor, fontSize: 11, fontWeight: 600 }}
      >
        {formatDeskDate(now)}
      </span>
      <span
        className="assistant-desk-time-pill"
        style={{
          color: p.timeColor,
          background: p.timePillBg,
          borderColor: p.timePillBorder,
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 8px',
        }}
      >
        {formatDeskTime(now)}
      </span>
    </motion.div>
  );`;

const re = /  return \(\r?\n    <div>\r?\n      <motion.div className="assistant-desk-datetime-row">[\s\S]*?LiveStatusPulse \/>\r?\n      <\/motion.div>\r?\n    <\/motion.div>\r?\n  \);/;
const re2 = /  return \(\r?\n    <div>\r?\n      <div className="assistant-desk-datetime-row">[\s\S]*?LiveStatusPulse \/>\r?\n      <\/div>\r?\n    <\/div>\r?\n  \);/;

const replacement = `  return (
    <div className="assistant-desk-datetime-row">
      <span
        className="assistant-desk-date"
        style={{ color: p.dateColor, fontSize: 11, fontWeight: 600 }}
      >
        {formatDeskDate(now)}
      </span>
      <span
        className="assistant-desk-time-pill"
        style={{
          color: p.timeColor,
          background: p.timePillBg,
          borderColor: p.timePillBorder,
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 8px',
        }}
      >
        {formatDeskTime(now)}
      </span>
    </motion.div>
  );`.replace('</motion.div>', '</div>');

if (re2.test(s)) {
  s = s.replace(re2, replacement);
} else if (re.test(s)) {
  s = s.replace(re, replacement);
} else {
  console.log('NO MATCH');
  process.exit(1);
}

fs.writeFileSync(path, s);
console.log('patched');
