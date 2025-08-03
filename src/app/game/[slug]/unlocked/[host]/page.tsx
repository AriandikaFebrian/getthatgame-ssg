import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../src/lib/tokens.ts');
const gamesPath = path.resolve(__dirname, '../src/data/games.ts');

const tokensFile = fs.readFileSync(filePath, 'utf-8');
const tokens: Record<string, { slug: string; host: string }> = {};

// Ambil token existing
const tokenMatches = tokensFile.match(/'(\w+)' ?: ?{ slug: '([\w-]+)', host: '([\w-]+)' }/g);
if (tokenMatches) {
  for (const match of tokenMatches) {
    const [, token, slug, host] = match.match(/'(\w+)' ?: ?{ slug: '([\w-]+)', host: '([\w-]+)' }/)!;
    tokens[`${slug}-${host}`] = { slug, host };
  }
}

// ✅ Import file TS sebagai module
const gamesModule = await import(pathToFileURL(gamesPath).href);
const games = gamesModule.default;

let newTokenLines = '';

for (const game of games) {
  const { slug, hosts } = game;

  for (const host of hosts) {
    const key = `${slug}-${host}`;
    if (tokens[key]) {
      console.log(`⚠️ Token for ${slug} (${host}) already exists, skipped.`);
      continue;
    }

    const newToken = uuidv4().slice(0, 8);
    newTokenLines += `  '${newToken}': { slug: '${slug}', host: '${host}' },\n`;
    console.log(`✅ Added token for ${slug} (${host}) → ${newToken}`);
  }
}

if (!newTokenLines) {
  console.log('✅ No new tokens to add.');
  process.exit(0);
}

const updatedContent = tokensFile.replace(
  /(export const tokens.*=\s*{\n)/,
  `$1${newTokenLines}`
);

fs.writeFileSync(filePath, updatedContent);
console.log(`\n🎉 Done. Tokens written to ${filePath}`);
