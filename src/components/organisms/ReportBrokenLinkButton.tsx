"use client";

import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ReportBrokenLinkButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-7 left-5 z-50 transition-all duration-500 ease-in-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <Link href="/reports" aria-label="Report a broken link">
        <button
          className={cn(
            "group flex items-center justify-center",
            "bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600",
            "rounded-full overflow-hidden shadow-md",
            "h-10 transition-all duration-300 ease-in-out",
            "pl-3 pr-3 sm:pl-3 sm:pr-4", // default padding
            "sm:hover:pr-6" // expand on hover
          )}
        >
          <Bug className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          <span
            className={cn(
              "ml-2 hidden sm:inline-block whitespace-nowrap",
              "max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100",
              "transition-all duration-300 ease-in-out overflow-hidden text-sm"
            )}
          >
            Report
          </span>
        </button>
      </Link>
    </div>
  );
}
