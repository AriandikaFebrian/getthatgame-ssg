"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Reset isLoading ketika route berubah
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full px-4 py-3"
    >
      <input
        type="text"
        placeholder="Search games..."
        className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Cari"
        )}
      </button>
    </form>
  );
};
