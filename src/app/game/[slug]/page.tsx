import { notFound } from "next/navigation";
import { Metadata } from "next";
import { games } from "@/data/games";
import { GameDetail } from "@/components/organisms/GameDetail";

// ✅ Tetap boleh untuk komponen utama
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

// ✅ Ubah ini → Jangan pakai GamePageProps
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

export default async function GamePage(props: Promise<{ params: { slug: string } }>) {
  const { params } = await props;
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return notFound();

  return <GameDetail game={game} />;
}
