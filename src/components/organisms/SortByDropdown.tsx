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
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">Sort by rating</p>
      <Select
        value={value ?? "none"} // default to "none" when null
        onValueChange={(val) =>
          onChange(val === "none" ? null : (val as "asc" | "desc"))
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            <Minus size={14} className="inline mr-1" />
            No Sort
          </SelectItem>
          <SelectItem value="desc">
            <ArrowDown size={14} className="inline mr-1" />
            High to Low
          </SelectItem>
          <SelectItem value="asc">
            <ArrowUp size={14} className="inline mr-1" />
            Low to High
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
