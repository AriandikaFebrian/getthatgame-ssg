"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Donation", href: "/donation", disabled: true },
  { name: "How To Install?", href: "/howtoinstall" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const pathname = usePathname();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="bg-white border-b shadow-sm z-50 relative dark:bg-background">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 min-w-[56px]">
          <Image
            src="/Images/Logo/Logo-removebg-preview.png"
            alt="GetThatGame logo"
            width={56}
            height={56}
            className="rounded-sm"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center relative">
          {navLinks
            .filter((link) => link.name !== "Genres")
            .map((link) =>
              link.disabled ? (
                <TooltipProvider key={link.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-gray-400 cursor-not-allowed font-medium">
                        {link.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-red-600 border border-red-500 text-xs dark:bg-zinc-900 dark:text-red-500 dark:border-red-500 rounded-md px-3 py-1 shadow">
                      Still under construction
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium dark:text-foreground"
                >
                  {link.name}
                </Link>
              )
            )}

          <div className="ml-4">
            <SearchBar />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="ml-4"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-foreground"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
     {isOpen && (
  <div
    className="fixed inset-0 z-50 flex"
    onClick={() => setIsOpen(false)} // Klik di luar untuk close
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    {/* Side Drawer */}
    <div
    
      className="relative w-64 max-w-full bg-white dark:bg-background shadow-lg p-6 z-50"
      onClick={(e) => e.stopPropagation()} // Biar klik isi menu nggak nutup
    >
      {/* Close Button (opsional) */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-600"
      >
        
        ✕
      </button>

      {/* Nav Items */}
      <nav className="mt-6 space-y-4">
        {navLinks.map((link) =>
          link.disabled ? (
            <div
              key={link.name}
              className="block text-gray-400 cursor-not-allowed dark:text-gray-500"
            >
              {link.name}
            </div>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              className={`block font-medium text-base ${
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-foreground"
              }`}
              onClick={() => setIsOpen(false)} // Tutup menu setelah klik
            >
              {link.name}
            </Link>
          )
        )}
      </nav>

      {/* Divider */}
<div className="my-4 border-t border-gray-300 dark:border-gray-700" />

{/* SearchBar & Theme Toggle */}
<div className="space-y-4">
  <SearchBar />
  
  <Button
    variant="outline"
    size="sm"
    onClick={toggleDarkMode}
    className="w-full"
  >
    {isDark ? (
      <>
        <Sun className="w-4 h-4 mr-2" /> Light Mode
      </>
    ) : (
      <>
        <Moon className="w-4 h-4 mr-2" /> Dark Mode
      </>
    )}
  </Button>

  {/* Logo at the center of the bottom */}
  <div className="flex justify-center items-center mt-6">
    <Link href="/" className="flex items-center space-x-2 min-w-[56px]">
      <Image
        src="/Images/Logo/Logo-removebg-preview.png"
        alt="GetThatGame logo"
        width={56}
        height={56}
        className="rounded-sm"
      />
    </Link>
  </div>
</div>

    </div>
  </div>
)}

    </nav>
  );
};
