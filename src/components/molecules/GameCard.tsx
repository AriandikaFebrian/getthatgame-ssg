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
  const [loadingFrame, setLoadingFrame] = useState(1);
  const [dots, setDots] = useState(".");

  const handleViewDetails = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/game/${slug}`);
    }, 2000);
  };

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
    <div className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-background">
      {/* Cover Image */}
      <div className="w-full h-[180px] relative overflow-hidden rounded-t-lg">
  <Image
    src={coverImage}
    alt={`${title} cover`}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover"
    priority
  />
</div>



      {/* Main Content */}
     <div className="flex flex-col flex-grow px-4 pt-4 pb-2 space-y-2">
    <Tooltip>
  <TooltipTrigger asChild>
    <h3 className="text-lg font-semibold truncate bg-primary/10 px-3 py-1 rounded shadow-sm cursor-help">
      {title}
    </h3>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>{title}</p>
  </TooltipContent>
</Tooltip>


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

        {/* View Details Button */}
        <div className="mt-auto pt-3">
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
                  src={`/images/logo/Sketsa${loadingFrame}.png`}
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
    </div>
  );
};
