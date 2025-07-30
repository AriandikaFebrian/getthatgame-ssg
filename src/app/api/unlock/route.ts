// pages/api/unlock.ts
import { tokens } from '@/lib/tokens';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).send('Invalid token');
  }

  const data = tokens[token];

  if (!data) {
    return res.status(404).send('Token not found');
  }

  const { slug, host } = data;

  const redirectUrl = `/game/${slug}/unlocked/${host}`;

  // Redirect langsung ke halaman download host
  res.redirect(302, redirectUrl);
}
