"use client";

import { useEffect, useState } from "react";
import { games } from "@/data/games";
import { GameList } from "@/components/pages/GameList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/atoms/Button";

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

      <Dialog open={showIntro} onOpenChange={setShowIntro}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hi Gamer! 🎮</DialogTitle>
          <DialogDescription>
  This website helps you discover popular and trending games available online. If you're currently unable to afford paid versions, this platform can be a helpful alternative. We always recommend supporting the developers whenever possible!
</DialogDescription>

          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowIntro(false)}>Got it!</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
