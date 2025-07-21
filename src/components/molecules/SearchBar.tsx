"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react"; // Spinner icon

export const SearchBar = () => {
  const [query, setQuery] = useState(""); // Current search query
  const [previousQuery, setPreviousQuery] = useState(""); // Previous search query to prevent repeat searches
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // This hook runs once on component mount to check for any query params
  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      setQuery(initialQuery); // Set initial query from URL if present
      setPreviousQuery(initialQuery); // Set the previous query to match the initial query
    }
  }, [searchParams]);

  // Reset isLoading when URL or query parameter changes
  useEffect(() => {
    setIsLoading(false); // Reset loading state when page URL changes
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || query.trim() === previousQuery) {
      return; // Prevent search if query is empty or the same as previous query
    }

    setIsLoading(true); // Start loading
    router.push(`/search?q=${encodeURIComponent(query.trim())}`); // Navigate to search page
    setPreviousQuery(query.trim()); // Update the previous query to the current one after search
  };

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
