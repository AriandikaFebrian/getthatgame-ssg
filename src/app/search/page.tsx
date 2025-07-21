"use client";

import { games } from "@/data/games";
import { GameCard } from "@/components/molecules/GameCard";

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
        <p className="text-gray-500">No games found.</p>
      )}
    </main>
  );
}
