import fs from 'node:fs/promises';

const path = './tsconfig.json';

try {
  const raw = await fs.readFile(path, 'utf-8');
  const config = JSON.parse(raw);

  if (Array.isArray(config.include)) {
    config.include = config.include.filter(
      (entry) => !entry.includes('.next/types')
    );
    await fs.writeFile(path, JSON.stringify(config, null, 2));
    console.log("✅ Removed .next/types/**/*.ts from tsconfig.json");
  }
} catch (err) {
  console.error("❌ Failed to patch tsconfig.json", err);
}
