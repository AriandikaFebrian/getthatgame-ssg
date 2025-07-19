import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { GenreTag } from "@/components/atoms/GenreTag";

interface GameCardProps {
  slug: string;
  title: string;
  coverImage: string;
  platform: string;
  rating: number;
  genres: string[];
  selectedGenre?: string;
  onGenreClick?: (genre: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  slug,
  title,
  coverImage,
  platform,
  rating,
  genres,
  selectedGenre,
  onGenreClick,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingFrame, setLoadingFrame] = useState(1);
  const [dots, setDots] = useState(".");

  const handleViewDetails = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/game/${slug}`);
    }, 2000); // simulate delay
  };

  // Frame animasi gambar (250ms per frame)
  useEffect(() => {
    if (!loading) return;

    const frameInterval = setInterval(() => {
      setLoadingFrame((prev) => (prev % 8) + 1); // loop 1 -> 8
    }, 250);

    return () => clearInterval(frameInterval);
  }, [loading]);

  // Animasi titik "Loading."
  useEffect(() => {
    if (!loading) return;

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(dotInterval);
  }, [loading]);

  return (
    <div className="flex flex-col justify-between border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
      <div>
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={coverImage}
            alt={`${title} cover`}
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{platform}</Badge>
            <Badge>{rating.toFixed(1)}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <GenreTag
                key={genre}
                genre={genre}
                isSelected={selectedGenre === genre}
                onClick={onGenreClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button
          variant="link"
          size="sm"
          onClick={handleViewDetails}
          disabled={loading}
          className="cursor-pointer transition-transform duration-200 hover:scale-105 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Image
                src={`/images/logo/sketsa${loadingFrame}.png`}
                alt={`Loading frame ${loadingFrame}`}
                width={20}
                height={20}
                className="rounded"
              />
              <span className="font-medium text-sm">Loading{dots}</span>
            </>
          ) : (
            "View Details"
          )}
        </Button>
      </div>
    </div>
  );
};
