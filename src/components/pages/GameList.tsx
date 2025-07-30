'use client';

import { useState, useMemo } from "react";
import { GameCard } from "@/components/molecules/GameCard";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import { FloatingGenreSelector } from "@/components/molecules/FloatingGenreSelector";
import { Game } from "../../../types";
import { RatingFilterChips } from "../organisms/RatingFilterChips";
import { SortByDropdown } from "../organisms/SortByDropdown";

interface GameListProps {
  games: Game[];
}

interface RatingData {
  label: string;
  min: number;
  max: number;
  count: number;
}

export const GameList = ({ games }: GameListProps) => {
  const [page, setPage] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
const [minRatings, setMinRatings] = useState<number | null>(null);

const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);


  const gamesPerPage = 8;

  const ratingOptions = [
    { label: "4.5 – 5.0", min: 4.5, max: 5.0 },
    { label: "4.0 – 4.4", min: 4.0, max: 4.5 },
    { label: "3.5 – 3.9", min: 3.5, max: 4.0 },
    { label: "Under 3.5", min: 0, max: 3.5 },
  ];

  const ratingData: RatingData[] = ratingOptions.map((range) => ({
    ...range,
    count: games.filter(
      (game) => game.rating >= range.min && game.rating < range.max
    ).length,
  }));

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

  const handleMinRatingsChange = (val: number | null) => {
  setPage(0);
  setMinRatings(val);
};


  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((game) =>
        selectedGenres.every((genre) => game.genres.includes(genre))
      );
    }

    if (minRatings !== null) {
  const selectedRange = ratingOptions.find((r) => r.min === minRatings);
  if (selectedRange) {
    filtered = filtered.filter(
      (game) =>
        game.rating >= selectedRange.min &&
        game.rating < selectedRange.max
    );
  }
}


   const sorted = sortOrder
  ? [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    )
  : filtered;
  
    return sorted;
  }, [games, selectedGenres, minRatings, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedGames.length / gamesPerPage);
  const startIndex = page * gamesPerPage;
  const visibleGames = filteredAndSortedGames.slice(startIndex, startIndex + gamesPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const latestGames = [...games].slice(-4).reverse();

  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-10 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Game Grid */}
          <div className="flex-1">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <SortByDropdown value={sortOrder} onChange={setSortOrder} />
            </div>

            {/* Game Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center flex-wrap gap-2 pt-6">
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

                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages - 1}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
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

         {/* Rating Filter – Responsive */}
{/* Desktop Sidebar */}
<div className="hidden md:block w-full">
  <RatingFilterChips
    value={minRatings}
    onChange={handleMinRatingsChange}
    data={ratingData}
  />
</div>

{/* Mobile Accordion */}
<div className="block md:hidden mb-4">
  <details className="border rounded-md p-3 bg-muted/40 dark:bg-muted/20">
    <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
      Filter by Rating
    </summary>
    <div className="mt-3">
      <RatingFilterChips
        value={minRatings}
        onChange={handleMinRatingsChange}
        data={ratingData}
      />
    </div>
  </details>
</div>

          </aside>
        </div>
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
