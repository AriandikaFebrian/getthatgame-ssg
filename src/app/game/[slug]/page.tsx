import { notFound } from "next/navigation";
import { Metadata } from "next";
import { games } from "@/data/games";
import { GameDetail } from "@/components/organisms/GameDetail";

interface GamePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) {
    return {
      title: "Game Not Found",
      description: "The requested game was not found.",
    };
  }
  return {
    title: game.title,
    description: game.description,
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) {
    notFound();
  }

  return <GameDetail game={game} />;
}
