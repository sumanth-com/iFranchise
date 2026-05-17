const fs = require('fs');
const path = 'src/components/Hero.jsx';
let s = fs.readFileSync(path, 'utf8');
s = s.replace(/<\/?motion\.div/g, (m) => m.replace('motion.div', 'div'));
fs.writeFileSync(path, s);
console.log('fixed');
