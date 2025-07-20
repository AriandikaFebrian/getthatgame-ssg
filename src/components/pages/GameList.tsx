'use client';

import { useState, useMemo } from "react";
import { games } from "@/data/games";
import { GameCard } from "@/components/molecules/GameCard";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import { FloatingGenreSelector } from "@/components/molecules/FloatingGenreSelector";
import { Game } from "../../../types";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  const [page, setPage] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const gamesPerPage = 8;

  const allGenres = useMemo(() => {
    const genreSet = new Set<string>();
    games.forEach((game) => game.genres.forEach((g) => genreSet.add(g)));
    return Array.from(genreSet);
  }, [games]);

  const toggleGenre = (genre: string) => {
    setPage(0);
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const filteredGames = useMemo(() => {
    if (selectedGenres.length === 0) return games;
    return games.filter((game) =>
      selectedGenres.every((genre) => game.genres.includes(genre))
    );
  }, [games, selectedGenres]);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = page * gamesPerPage;
  const visibleGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const latestGames = [...games].slice(-5).reverse();

  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-10 overflow-x-hidden">
        {/* Game Grid + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleGames.length > 0 ? (
              visibleGames.map((game) => (
                <GameCard
                  key={game.slug}
                  slug={game.slug}
                  title={game.title}
                  coverImage={game.coverImage}
                  platform={game.platform}
                  rating={game.rating}
                  genres={game.genres}
                  selectedGenre={undefined}
                  onGenreClick={toggleGenre}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No games found.
              </div>
            )}
          </div>

          {/* Sidebar */}
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
          <div className="flex justify-center items-center flex-wrap gap-2 pt-4">
            <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0} variant="outline" size="sm">
              Prev
            </Button>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                onClick={() => handlePageChange(idx)}
                variant={idx === page ? "default" : "outline"}
                size="sm"
              >
                {idx + 1}
              </Button>
            ))}

            <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} variant="outline" size="sm">
              Next
            </Button>
          </div>
        )}
      </main>

      {/* Floating Genre Filter */}
      <FloatingGenreSelector
        allGenres={allGenres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />
    </>
  );
};
