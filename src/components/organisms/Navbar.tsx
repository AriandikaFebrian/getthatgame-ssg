"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Donation", href: "/donation" },
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

  const toggleDarkMode = () => setIsDark(!isDark);

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
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-medium ${
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}

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
        <div className="fixed inset-0 z-50 flex" onClick={() => setIsOpen(false)}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Side Drawer */}
          <div
            className="relative w-64 max-w-full bg-white dark:bg-background shadow-lg p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-600"
            >
              ✕
            </button>

            {/* Nav Items */}
            <nav className="mt-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block font-medium text-base ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="my-4 border-t border-gray-300 dark:border-gray-700" />

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

export default Navbar;
