import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { GenreTag } from "@/components/atoms/GenreTag";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Star } from "lucide-react";

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
  rating,
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
      <div className="relative w-full aspect-[16/9] overflow-hidden ">

<div className="absolute top-2 left-[-10px] bg-black/65 text-white text-[11px] font-bold px-3 py-0.5 rounded shadow-md rotate-[-12deg] z-20">

  {rating.toFixed(1)}
</div>


<div className="relative w-full aspect-[21/8.2]  overflow-hidden">
  <Image
    src={coverImage}
    alt={`${title} cover`}
    fill
    className="object-cover"
    priority
  />
</div>

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
<div className="pt-3 px-3 flex flex-col items-end gap-1">
  {loading ? (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-4 h-4 border-2 border-t-2 border-primary rounded-full animate-spin" />
      <span className="font-medium">Loading{dots}</span>
    </div>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="text-xs px-3 py-1 h-auto"
      onClick={(e) => {
        e.stopPropagation();
        handleViewDetails();
      }}
    >
      View More
    </Button>
  )}

  <p className="text-[10px] text-muted-foreground mt-1 mb-2 text-right">
  Found a broken link?{" "}
  <Link
    href="/reports"
    onClick={(e) => e.stopPropagation()}
    className="text-blue-600 hover:underline dark:text-blue-400"
  >
    Report it
  </Link>
</p>

</div>

    </div>
  );
};
