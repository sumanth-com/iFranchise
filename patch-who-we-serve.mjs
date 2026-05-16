import fs from 'fs';

const p = 'src/components/Hero.jsx';
let lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

const start = lines.findIndex(
  (line) => line.includes('relative h-56 overflow-hidden') && line.includes('card.img') === false
);
// find block that has card.img on next lines
let i = lines.findIndex(
  (line, idx) =>
    line.includes('relative h-56 overflow-hidden') &&
    lines[idx + 1]?.includes('src={card.img}')
);
if (i < 0) {
  console.error('block not found');
  process.exit(1);
}

let end = i + 1;
while (end < lines.length && !lines[end].includes('Tag badge')) end++;

const replacement = `                <motion.div className="relative h-60 overflow-hidden bg-[#0a0618] sm:h-64">
                  <img
                    src={card.img}
                    alt={card.tag}
                    className="h-full w-full object-contain object-center p-2 sm:p-3"
                    style={{ transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                    ref={(el) => {
                      if (!el) return;
                      const p = el.closest('.group');
                      p.addEventListener('mouseenter', () => {
                        el.style.transform = 'scale(1.03)';
                      });
                      p.addEventListener('mouseleave', () => {
                        el.style.transform = 'scale(1)';
                      });
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,6,24,0.92) 0%, rgba(10,6,24,0.35) 55%, transparent 100%)',
                    }}
                  />`.split('\n');

// Use plain div, not motion.div
replacement[0] = '                <motion.div className="relative h-60 overflow-hidden bg-[#0a0618] sm:h-64">'.replace(
  '<motion.div',
  '<motion.div'
);
replacement[0] = '                <motion.div className="relative h-60 overflow-hidden bg-[#0a0618] sm:h-64">';

// Fix: first line should be div
replacement[0] = '                <motion.div className="relative h-60 overflow-hidden bg-[#0a0618] sm:h-64">';
