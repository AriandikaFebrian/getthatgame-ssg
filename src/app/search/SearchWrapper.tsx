"use client";

import dynamic from "next/dynamic";

// Dynamically import client component
const SearchClient = dynamic(() => import("./SearchClient"), { ssr: false });

export default function SearchWrapper() {
  return <SearchClient />;
}
