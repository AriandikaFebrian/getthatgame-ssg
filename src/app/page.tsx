'use client';

import { useEffect, useState } from "react";
import { games } from "@/data/games";
import { GameList } from "@/components/pages/GameList";
import IntroDialog from "@/components/organisms/IntroDialog"; // Import komponen baru

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenIntroModal");
    if (!seen) {
      setShowIntro(true);
      localStorage.setItem("hasSeenIntroModal", "true");
    }
  }, []);

  return (
    <>
      <GameList games={games} />

      <IntroDialog showIntro={showIntro} setShowIntro={setShowIntro} />
    </>
  );
}
