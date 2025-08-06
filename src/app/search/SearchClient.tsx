"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GameCard } from "@/components/molecules/GameCard";
import { games } from "@/data/games";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.toLowerCase() || "";
  const minRating = parseFloat(searchParams.get("rating") || "0");
  const sortOrder = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const filtered = games.filter(
    (game) =>
      game.title.toLowerCase().includes(query) && game.rating >= minRating
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
  );

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Search Results for:{" "}
          <span className="text-blue-600 break-words">{query}</span>
        </h1>
      </div>

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
         <div className="text-center mt-20 text-gray-500">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-4">
        No results found for <span className="text-blue-600">&quot;{query}&quot;</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Try another keyword or check your spelling.
      </p>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
      )}
    </>
  );
}
