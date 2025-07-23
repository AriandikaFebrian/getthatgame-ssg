import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { GenreTag } from "@/components/atoms/GenreTag";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [dots, setDots] = useState(".");

  const handleViewDetails = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/game/${slug}`);
    }, 2000);
  };

  useEffect(() => {
    if (!loading) return;
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(dotInterval);
  }, [loading]);

  return (
    <div
      onClick={handleViewDetails}
      className={`flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-background cursor-pointer ${
        loading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* Cover Image with Overlay Title */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={coverImage}
          alt={`${title} cover`}
          fill
          className="object-cover"
          priority
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute bottom-0 left-0 w-full bg-black/60 px-3 py-2 text-white text-sm font-semibold truncate cursor-help">
              {title}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow px-4 pt-4 pb-2 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{platform}</Badge>
          <Badge>{rating.toFixed(1)}</Badge>
        </div>
        {genres.map((genre) => (
  <div
    key={genre}
    onClick={(e: React.MouseEvent) => {
      e.stopPropagation();
      onGenreClick?.(genre);
    }}
  >
    <GenreTag
      genre={genre}
      isSelected={selectedGenre === genre}
    />
  </div>
))}


        {/* Optional: show loading indicator */}
        {loading && (
          <div className="flex items-center gap-2 pt-2">
            <div className="w-4 h-4 border-2 border-t-2 border-primary rounded-full animate-spin" />
            <span className="font-medium text-sm">Loading{dots}</span>
          </div>
        )}
      </div>
    </div>
  );
};
