'use client';

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { SlidersHorizontal } from "lucide-react";

interface FloatingGenreSelectorProps {
  allGenres: string[];
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
}

export const FloatingGenreSelector = ({
  allGenres,
  selectedGenres,
  onToggleGenre,
}: FloatingGenreSelectorProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button
                  className="bg-primary text-primary-foreground shadow-lg p-3 rounded-full hover:bg-primary/90 transition"
                  aria-label="Filter by Genre"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Filter by Genre
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

       <DialogContent className="max-w-sm w-full animate-in slide-in-from-bottom duration-300 rounded-xl shadow-xl p-6">
  <h3 className="text-lg font-semibold mb-4">Filter by Genre</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">

            {[...allGenres].sort().map((genre) => (
  <Badge
    key={genre}
    onClick={() => onToggleGenre(genre)}
    className={`cursor-pointer px-3 py-1 border rounded-md transition ${
      selectedGenres.includes(genre)
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background text-foreground border-border hover:bg-accent"
    }`}
  >
    {genre}
  </Badge>
))}

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
