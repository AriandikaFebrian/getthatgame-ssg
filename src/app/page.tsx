import { Metadata } from "next";
import { games } from "@/data/games";
import { GameList } from "@/components/pages/GameList";

export const metadata: Metadata = {
  title: "Game List - Next.js Game App",
  description: "Browse a list of exciting games with ratings and platforms.",
};

export default function Home() {
  return <GameList games={games} />;
}
