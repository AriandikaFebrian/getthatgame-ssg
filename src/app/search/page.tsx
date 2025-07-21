import { Suspense } from "react";
import { SearchResult } from "@/components/organisms/SearchResult"; // sesuaikan path-nya

export default function SearchPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Search Results</h1>
      <Suspense fallback={<div className="text-center text-sm">Loading search...</div>}>
        <SearchResult />
      </Suspense>
    </main>
  );
}
