import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke file games.ts dan tokens.ts
const gamesPath = path.resolve(__dirname, '../src/data/games.ts');
const tokensPath = path.resolve(__dirname, '../src/lib/tokens.ts');

// Import games secara dinamis
const { games } = await import(pathToFileURL(gamesPath).href);

// Ambil tokens yang sudah ada
let existingTokens: Record<string, { slug: string; host: string }> = {};
if (fs.existsSync(tokensPath)) {
  const raw = fs.readFileSync(tokensPath, 'utf-8');
  const match = raw.match(/export const tokens = {\n([\s\S]*?)^};/m);

  if (match) {
    const objectContent = match[1]
      .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:/g, '"$2":') // convert keys to strings
      .replace(/'([^']+)'/g, '"$1"'); // convert values to strings
    try {
      existingTokens = JSON.parse(`{${objectContent}}`);
    } catch {
      console.warn('⚠️  Gagal parse tokens.ts, akan menimpa seluruh isi.');
    }
  }
}

// Generate token baru
const groupedByGame: Record<string, string> = {}; // Untuk pisahkan antar game
const newTokenLines = '';
let count = 0;

for (const game of games) {
  const { slug, downloadLinks } = game;
  let gameBlock = '';

  for (const link of downloadLinks) {
    const host = link.host;

    // Skip jika token sudah ada untuk kombinasi ini
    const alreadyExists = Object.values(existingTokens).some(
      (e) => e.slug === slug && e.host === host
    );
    if (alreadyExists) {
      console.log(`⚠️ Token sudah ada untuk ${slug} (${host}), dilewati.`);
      continue;
    }

    const newToken = uuidv4().slice(0, 8);
    const line = `  '${newToken}': { slug: '${slug}', host: '${host}' },\n`;
    gameBlock += line;
    console.log(`✅ Token "${newToken}" ditambahkan untuk game "${slug}" (${host})`);
    count++;
  }

  if (gameBlock) {
    groupedByGame[slug] = gameBlock;
  }
}

// Tidak ada yang ditambahkan
if (count === 0) {
  console.log('✅ Tidak ada token baru yang perlu ditambahkan.');
  process.exit(0);
}

// Gabungkan semua token
const groupedTokens = Object.entries(existingTokens)
  .reduce((acc, [token, { slug, host }]) => {
    acc[slug] ??= '';
    acc[slug] += `  '${token}': { slug: '${slug}', host: '${host}' },\n`;
    return acc;
  }, {} as Record<string, string>);

const finalTokenString =
  'export const tokens: Record<string, { slug: string; host: string }> = {\n' +
  Object.entries({ ...groupedTokens, ...groupedByGame })
    .map(([slug, block]) => `  // ${slug}\n${block}`)
    .join('\n') +
  '};\n';

// Tulis ke tokens.ts
fs.writeFileSync(tokensPath, finalTokenString, 'utf-8');
console.log(`\n💾 ${count} token baru berhasil disimpan ke src/lib/tokens.ts`);
