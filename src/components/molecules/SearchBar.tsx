"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    });

    setQuery(""); // Clear input after submit
  };

  // Press "/" to focus input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full sm:max-w-xs transition-opacity duration-200 ${isPending ? "opacity-60" : ""}`}
    >
      <div className="relative">
        <Search
          className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />

        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isPending}
          placeholder="Search games..."
          aria-label="Search games"
          className="pl-8 pr-20 h-8 text-xs focus-visible:ring-2 focus-visible:ring-primary"
        />

        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={isPending || !query.trim()}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-auto px-2 py-1 text-xs"
          aria-label="Submit search"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
        </Button>
      </div>
    </form>
  );
};
