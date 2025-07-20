"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Genres", href: "/genres" },
  { name: "About", href: "/about" },
  { name: "Donation", href: "/donation" },
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


          {/* Other nav links */}
          {navLinks
            .filter((link) => link.name !== "Genres")
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-foreground"
              >
                {link.name}
              </Link>
            ))}

          {/* Search Bar */}
          <div className="ml-4">
            <SearchBar />
          </div>

          {/* Dark Mode Toggle Button */}
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-foreground dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
