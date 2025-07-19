"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/atoms/Input";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="container mx-auto px-4 py-3">
      <input
        type="text"
        placeholder="Search games..."
        className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
