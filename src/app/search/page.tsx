"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GameCard } from "@/components/molecules/GameCard";
import { RatingFilterChips } from "@/components/organisms/RatingFilterChips";
import { SortByDropdown } from "@/components/organisms/SortByDropdown";
import { games } from "@/data/games";


export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.toLowerCase() || "";
  const minRating = parseFloat(searchParams.get("rating") || "0");
  const sortOrder = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const handleRatingChange = (rating: number) => {
    const url = `/search?q=${query}&rating=${rating}&sort=${sortOrder}`;
    router.push(url);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    const url = `/search?q=${query}&rating=${minRating}&sort=${order}`;
    router.push(url);
  };

  const filtered = games.filter(
    (game) =>
      game.title.toLowerCase().includes(query) && game.rating >= minRating
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
  );

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Search Results for:{" "}
          <span className="text-blue-600 break-words">{query}</span>
        </h1>

       
      </div>

      {/* Results */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sorted.map((game) => (
           <GameCard
              key={game.slug}
              slug={game.slug}
              title={game.title}
              coverImage={game.coverImage}
              platform={game.platform}
              rating={game.rating}
              genres={game.genres}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium mb-2">
            No results found for &quot;
            <span className="text-blue-600">{query}</span>&quot;
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Try another keyword or check your spelling.
          </p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      )}
    </main>
  );
}
