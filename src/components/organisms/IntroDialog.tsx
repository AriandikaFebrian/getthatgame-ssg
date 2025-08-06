'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function IntroDialog({
  showIntro,
  setShowIntro,
}: {
  showIntro: boolean;
  setShowIntro: (v: boolean) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 1500); // Logo animasi selama 1.5 detik lalu tampil dialog
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {!showDialog ? (
        // 🔁 Animasi Logo: efek koin muter (rotateY)
        <motion.div
          className="w-[120px] h-[120px] perspective-1000 drop-shadow-xl"
          style={{ filter: "drop-shadow(0 0 15px #3b82f6)" }} // efek glow biru
          initial={{ rotateY: 0, opacity: 0 }}
          animate={{ rotateY: 1080, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src="/Images/Logo/Logo-removebg-preview.png"
            alt="Logo"
            width={120}
            height={120}
            priority
            className="w-full h-full object-contain"
          />
        </motion.div>
      ) : (
        // 🎬 Animasi munculnya dialog
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Dialog open={true}>
            <DialogContent className="text-center">
              <DialogHeader>
                <DialogTitle>Hi Gamer! 🎮</DialogTitle>
                <DialogDescription>
                  This website helps you discover popular and trending games available online. If you&apos;re currently unable to afford paid versions, this platform can be a helpful alternative. We always recommend supporting the developers whenever possible!
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => {
                    setShowIntro(false);
                    localStorage.setItem("hasSeenIntroModal", "true");
                  }}
                >
                  Got it!
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
    </div>
  );
}
