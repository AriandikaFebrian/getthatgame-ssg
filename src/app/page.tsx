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
              This website helps you discover and install Ileggal game downloads. If you don&apos;t have the budget for original games, this is a helpful and safe alternative. Please support developers when you can!
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
