"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GameCard } from "@/components/molecules/GameCard";
import { games as allGames } from "@/data/games";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q")?.toLowerCase() || ""; // Get search query from URL params

  const [results, setResults] = useState<typeof allGames>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (query) {
      const timeout = setTimeout(() => {
        const filtered = allGames.filter((game) =>
          game.title.toLowerCase().includes(query) // Filter games by query
        );
        setResults(filtered);
        setLoading(false);
      }, 800); // Simulate loading for 800ms

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    } else {
      // Reset results when query is empty (e.g., navigating to home or clearing search)
      setResults([]);
      setLoading(false);
    }
  }, [query]); // Re-run effect when query changes

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for: <span className="text-blue-600">{query || "All Games"}</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : results.length > 0 ? (
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
        <p className="text-gray-500">No games found.</p> // Handle empty results
      )}
    </main>
  );
}
