import fs from 'fs';
import path from 'path';
import { games } from '../src/data/games';

type Row = [string, string];

const rows: Row[] = [];

for (const game of games) {
  const gameSlug = game.slug;

  for (const mirror of game.downloadLinks || []) {
    const host = mirror.host.toLowerCase();
    const alias = `unlock-${gameSlug}-${host}`;
    const destination = `https://getthatgame-ssg.vercel.app/game/${gameSlug}/unlocked/${host}`;
    rows.push([alias, destination]);
  }
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
