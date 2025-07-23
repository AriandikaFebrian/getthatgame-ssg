"use client";

import { Star, Check } from "lucide-react";

interface RatingRange {
  label: string;
  min: number;
  max: number;
  count: number;
}

interface RatingFilterChipsProps {
  value: number | null;
  onChange: (val: number | null) => void;
  data: RatingRange[];
}

const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <Star key={i} size={14} fill="currentColor" className="text-yellow-400" />
  ));

export function RatingFilterChips({
  value,
  onChange,
  data,
}: RatingFilterChipsProps) {
  return (
    <div className="space-y-2 w-full max-w-xs">
     <p className="text-xs text-muted-foreground mb-1">
  Filter by rating range
</p>


      {data.map((r) => {
        const isSelected = value === r.min;

        return (
          <button
            key={r.label}
            onClick={() => onChange(isSelected ? null : r.min)}
            className={`flex items-center justify-between w-full px-3 py-1.5 rounded-md border text-left transition 
              ${isSelected ? "border-blue-600 text-blue-600 font-semibold" : "border border-border hover:border-blue-400"}
            `}
          >
            <div className="flex items-center gap-1 min-w-[120px]">
              {renderStars(Math.round(r.min))}
              <span className="ml-1 text-sm">{r.label}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{r.count}</span>
              {isSelected && <Check size={14} className="text-blue-600" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
