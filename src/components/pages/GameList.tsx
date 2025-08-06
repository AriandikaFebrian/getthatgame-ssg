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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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


  const gamesPerPage = 12;

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

type PaginationItem = number | "...";
 function getSmartPagination(currentPage: number, totalPages: number): PaginationItem[] {
  const maxPagesToShow = 10;
  const pages: PaginationItem[] = [];

  const currentChunkStart = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const currentChunkEnd = Math.min(currentChunkStart + maxPagesToShow - 1, totalPages);

  if (currentChunkStart > 1) {
    pages.push("...");
  }

  for (let i = currentChunkStart; i <= currentChunkEnd; i++) {
    pages.push(i);
  }

  if (currentChunkEnd < totalPages) {
    pages.push("...");
  }

  return pages;
}




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
{totalPages > 1 && (
  <div className="flex justify-center items-center flex-wrap gap-1 pt-6">

    {/* First Page */}
    <Button
      onClick={() => handlePageChange(0)}
      disabled={page === 0}
      variant="ghost"
    >
      <ChevronsLeft className="w-4 h-4" />
    </Button>

    {/* Prev */}
    <Button
      onClick={() => handlePageChange(page - 1)}
      disabled={page === 0}
      variant="ghost"
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>

    {/* Page Numbers */}
    {getSmartPagination(page + 1, totalPages).map((item, idx) =>
      item === "..." ? (
        <span key={idx} className="px-2 text-muted-foreground">...</span>
      ) : (
        <Button
          key={idx}
          onClick={() => handlePageChange(Number(item) - 1)}
          variant={Number(item) - 1 === page ? "default" : "ghost"}
          className="w-8 h-8 text-sm"
        >
          {item}
        </Button>
      )
    )}

    {/* Next */}
    <Button
      onClick={() => handlePageChange(page + 1)}
      disabled={page === totalPages - 1}
      variant="ghost"
    >
      <ChevronRight className="w-4 h-4" />
    </Button>

    {/* Last Page */}
    <Button
      onClick={() => handlePageChange(totalPages - 1)}
      disabled={page === totalPages - 1}
      variant="ghost"
    >
      <ChevronsRight className="w-4 h-4" />
    </Button>
  </div>
)}


          </div>

          <aside className="lg:w-74 space-y-6">
  {/* New & Trending (paling atas karena penting) */}
  <div>
    <h2 className="text-xl font-semibold mb-2">New & Trending</h2>
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
            <span className="text-xs text-muted-foreground">{game.publisher}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>

  {/* Filter tools (di bawah karena sekunder) */}
  <div className="flex flex-col md:flex-row md:items-end gap-4">
    <div className="hidden md:block">
      <h2 className="text-sm font-semibold text-muted-foreground mb-1">Filter by rating</h2>
      <RatingFilterChips
        value={minRatings}
        onChange={handleMinRatingsChange}
        data={ratingData}
      />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-muted-foreground mb-1">Sort by</h2>
      <SortByDropdown value={sortOrder} onChange={setSortOrder} />
    </div>
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
