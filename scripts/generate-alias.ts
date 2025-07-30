import fs from 'fs';
import path from 'path';
import { tokens } from '../src/lib/tokens'; // Update ke path file tokens.ts

type Row = [string, string];

const rows: Row[] = [];

for (const token in tokens) {
  const { slug, host } = tokens[token];
  const alias = `unlock-${slug}-${host}`;
  const destination = `https://getthatgame.com/api/unlock?token=${token}`;
  rows.push([alias, destination]);
}

// Cari panjang maksimal setiap kolom
const colWidths = [
  Math.max(...rows.map(([a]) => a.length), 'alias'.length),
  Math.max(...rows.map(([, d]) => d.length), 'destination'.length),
];

const makeRow = (cols: string[]) => {
  return '| ' + cols.map((c, i) => c.padEnd(colWidths[i])).join(' | ') + ' |';
};

const makeBorder = () => {
  return '+-' + colWidths.map(w => '-'.repeat(w)).join('-+-') + '-+';
};

// Print ke console
console.log(makeBorder());
console.log(makeRow(['alias', 'destination']));
console.log(makeBorder());
rows.forEach(row => console.log(makeRow(row)));
console.log(makeBorder());
