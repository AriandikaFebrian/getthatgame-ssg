'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GameList } from '@/components/pages/GameList';
import type { Game } from '../../../../types';

interface GenrePageClientProps {
  genre: string;
  games: Game[];
}

export default function GenrePageClient({ genre, games }: GenrePageClientProps) {
  const [loading, setLoading] = useState(true);
  const [loadingFrame, setLoadingFrame] = useState(1);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const frameInterval = setInterval(() => {
      setLoadingFrame((prev) => (prev % 8) + 1);
    }, 250);
    return () => clearInterval(frameInterval);
  }, [loading]);

  useEffect(() => {
    if (!loading) return;
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(dotInterval);
  }, [loading]);

  return (
    <main className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-600 dark:text-gray-400">
          <Image
            src={`/images/logo/sketsa${loadingFrame}.png`}
            alt={`Loading frame ${loadingFrame}`}
            width={60}
            height={60}
            className="mb-4 rounded"
          />
          <p className="text-lg font-medium">Loading {genre} games{dots}</p>
        </div>
      ) : (
        <GameList games={games} />
      )}
    </main>
  );
}
