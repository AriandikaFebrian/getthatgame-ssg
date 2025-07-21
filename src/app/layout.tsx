import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";

// ✅ Toast system (Sonner)
import { Toaster } from "sonner";
import { UnderConstructionToast } from "@/components/dev/under-construction-toast"; // <-- clearly labeled

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetThatGame",
  description: "Browse and discover your favorite games. Great for gamers on a budget!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}>
        <Navbar />

        <main className="scroll-area px-4 sm:px-6 md:px-8">
          {children}
        </main>

        <footer className="text-center text-sm text-muted-foreground py-6 border-t border-border">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">GetThatGame</span>. Built with 💻 and a love for gaming. All rights reserved.
          </p>
        </footer>

        {/* 🚧 DEVELOPMENT ONLY: Under Construction Toast - remove before production */}
        <Toaster richColors />
        <UnderConstructionToast />
      </body>
    </html>
  );
}
