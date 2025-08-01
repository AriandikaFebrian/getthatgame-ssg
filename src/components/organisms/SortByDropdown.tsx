"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortByDropdownProps {
  value: "asc" | "desc" | null;
  onChange: (value: "asc" | "desc" | null) => void;
}

export function SortByDropdown({ value, onChange }: SortByDropdownProps) {
  return (
    <Select
      value={value ?? "none"}
      onValueChange={(val) =>
        onChange(val === "none" ? null : (val as "asc" | "desc"))
      }
    >
      <SelectTrigger className="w-[140px] h-7 px-2 py-1 text-[11px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent className="text-[11px]">
        <SelectItem value="none" className="py-1">
          <Minus size={10} className="inline mr-1" />
          No Sort
        </SelectItem>
        <SelectItem value="desc" className="py-1">
          <ArrowDown size={10} className="inline mr-1" />
          High to Low
        </SelectItem>
        <SelectItem value="asc" className="py-1">
          <ArrowUp size={10} className="inline mr-1" />
          Low to High
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
