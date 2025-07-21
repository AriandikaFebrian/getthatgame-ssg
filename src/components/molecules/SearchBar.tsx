"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition(); // <- useTransition
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isPending}
          placeholder="Search games..."
          className="w-full pl-10 pr-20 text-sm"
        />

        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={isPending || !query.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-auto px-2 py-1 text-xs"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
        </Button>
      </div>
    </form>
  );
};
