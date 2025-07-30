// lib/token-utils.ts
import { tokens } from './tokens';

export function getToken(slug: string, host: string): string | null {
  for (const [token, value] of Object.entries(tokens)) {
    if (value.slug === slug && value.host === host) {
      return token;
    }
  }
  return null;
}
