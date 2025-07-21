"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { games as allGames } from "@/data/games";
import { GameCard } from "@/components/molecules/GameCard";
import { Loader2 } from "lucide-react";

export const SearchResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [results, setResults] = useState<typeof allGames>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = allGames.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
      setResults(filtered);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
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
        <p className="text-gray-500">No games found.</p>
      )}
    </>
  );
};
