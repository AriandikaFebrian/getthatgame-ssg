"use client";

import { games } from "@/data/games";
import { GameCard } from "@/components/molecules/GameCard";
import Link from "next/link";

interface SearchParams {
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams }: SearchParams) {
  const query = searchParams.q?.toLowerCase() || "";
  const results = games.filter((game) =>
    game.title.toLowerCase().includes(query)
  );

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((game) => (
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
          <p className="text-lg font-medium mb-2">No results found for &quot;<span className="text-blue-600">{query}</span>&quot;</p>
          <p className="text-sm text-muted-foreground mb-6">
            Try another keyword or check your spelling.
          </p>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      )}
    </main>
  );
}
