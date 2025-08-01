"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Star } from "lucide-react";

interface RatingRange {
  label: string;
  min: number;
  max: number;
  count: number;
}

interface RatingFilterDropdownProps {
  value: number | null;
  onChange: (val: number | null) => void;
  data: RatingRange[];
}

const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <Star
      key={i}
      size={10}
      fill="currentColor"
      className="text-yellow-400"
    />
  ));

export function RatingFilterChips({
  value,
  onChange,
  data,
}: RatingFilterDropdownProps) {
  return (
    <Select
      value={value?.toString() ?? "none"}
      onValueChange={(val) => onChange(val === "none" ? null : parseFloat(val))}
    >
      <SelectTrigger className="w-[140px] h-7 px-2 py-1 text-[11px]">
        <SelectValue placeholder="Rating" />
      </SelectTrigger>
      <SelectContent className="text-[11px]">
        <SelectItem value="none">
          <div className="flex items-center gap-1">
            <Star size={10} fill="currentColor" className="text-yellow-400" />
            All Ratings
          </div>
        </SelectItem>

        {data.map((r) => (
          <SelectItem key={r.label} value={r.min.toString()}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-[2px]">
                {renderStars(Math.floor(r.min))}
              </div>
              <span className="text-muted-foreground">{r.count}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
