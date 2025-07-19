'use client';

import { useState } from "react";
import { Game } from "@/data/games";
import { GameCard } from "@/components/molecules/GameCard";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  const [page, setPage] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const gamesPerPage = 8;

  const filteredGames = selectedGenre
    ? games.filter((game) => game.genres.includes(selectedGenre))
    : games;

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = page * gamesPerPage;
  const visibleGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
    setPage(0);
  };

  // Ambil 3 game terbaru dari array games
  const latestGames = [...games].slice(-5).reverse();

  return (
    <main className="container mx-auto px-4 py-8 space-y-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Game Grid */}
       <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {visibleGames.map((game) => (
            <GameCard
              key={game.slug}
              slug={game.slug}
              title={game.title}
              coverImage={game.coverImage}
              platform={game.platform}
              rating={game.rating}
              genres={game.genres}
              selectedGenre={selectedGenre || undefined}
              onGenreClick={handleGenreClick}
            />
          ))}
        </div>

        {/* Sidebar GameRight */}
        <aside className="lg:w-72 space-y-4">
          <h2 className="text-xl font-semibold">New & Trending</h2>
          <div className="space-y-4">
            {latestGames.map((game) => (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className="flex gap-3 border rounded-md p-2 hover:shadow transition"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                  <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-sm line-clamp-2">{game.title}</h3>
                  <span className="text-xs text-muted-foreground">{game.platform}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <Button onClick={handlePrev} disabled={page === 0} variant="outline" size="sm">
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
};
