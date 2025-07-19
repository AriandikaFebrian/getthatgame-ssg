'use client';

import { useParams } from 'next/navigation';
import { games } from '@/data/games';
import { GameList } from '@/components/pages/GameList';

export default function GenrePage() {
  const params = useParams();
  const genreParam = params.genre;

  // Handle genreParam possibly being undefined or string[]
  let genre = "";
  if (typeof genreParam === "string") {
    genre = genreParam.charAt(0).toUpperCase() + genreParam.slice(1);
  }

  // Filter games by genre
  const filteredGames = games.filter((game) => game.genres.includes(genre));

  return (
    <main className="container mx-auto px-4 py-8">
      <GameList games={filteredGames} />
    </main>
  );
}
