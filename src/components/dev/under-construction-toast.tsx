"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function UnderConstructionToast() {
  useEffect(() => {
    toast("🚧 Under Construction", {
      description: "This website is still under development. Some features may not be fully functional.",
      duration: 5000,
      style: {
        backgroundColor: "#fee2e2", // red-100
        color: "#b91c1c",           // red-700
        border: "1px solid #fca5a5", // red-300
      },
    });
  }, []);

  return null;
}
