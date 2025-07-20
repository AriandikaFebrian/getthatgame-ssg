import { games } from '@/data/games';
import GenrePageClient from './GenrePageClient';

interface GenrePageProps {
  params: { genre: string };
}

export default function GenrePage({ params }: GenrePageProps) {
  const genre = params.genre.charAt(0).toUpperCase() + params.genre.slice(1);
  const filteredGames = games.filter((game) => game.genres.includes(genre));

  return <GenrePageClient genre={genre} games={filteredGames} />;
}
