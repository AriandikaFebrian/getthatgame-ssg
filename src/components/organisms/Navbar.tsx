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
  { name: "Genres", href: "/genres" },
  { name: "About", href: "/about"},
  { name: "Donation", href: "/donation", disabled: true },
  { name: "How To Install?", href: "/howtoinstall" },
];

const genres = [
  "Action", "Adventure", "Anime", "Arcade", "Casual", "Fighting", "Horror",
  "Platformer", "Puzzle", "Racing", "RPG", "Shooter", "Simulation", "Sports",
  "Strategy", "VN", "Open World", "Survival", "Multiplayer", "Indie", "Retro", "Fantasy",
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const genreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
        setGenreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <Button variant="outline" size="sm" onClick={toggleDarkMode} className="ml-4">
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
        <div className="md:hidden bg-white dark:bg-background border-t border-b shadow-sm">
          {navLinks.map((link) =>
            link.disabled ? (
              <div
                key={link.name}
                className="block px-4 py-2 text-gray-400 cursor-not-allowed dark:text-gray-500"
              >
                {link.name}
              </div>
            ) : (
           <Link
  key={link.name}
  href={link.href}
  className={`relative font-medium px-1 transition-all duration-200 ${
    pathname === link.href
      ? "text-blue-600 dark:text-blue-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:transition-all"
      : "text-gray-700 hover:text-blue-600 dark:text-foreground hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-500 dark:hover:after:bg-blue-400 hover:after:transition-all"
  }`}
>
  {link.name}
</Link>


            )
          )}
        </div>
      )}
    </nav>
  );
};