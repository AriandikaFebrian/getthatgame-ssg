import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetThatGame.com",
  description: "Browse and discover your favorite games!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <footer className="text-center text-sm text-muted-foreground py-6 mt-12 border-t border-border">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold text-primary">GetThatGame</span>. 
        Built with 💻 and a love for gaming. All rights reserved.
      </p>
    </footer>

      </body>
    </html>
  );
}
