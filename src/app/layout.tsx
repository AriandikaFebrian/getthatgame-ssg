import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";

// ✅ Toast system (Sonner)
import { Toaster } from "sonner";
import { UnderConstructionToast } from "@/components/dev/under-construction-toast";
import { ReportBrokenLinkButton } from "@/components/organisms/ReportBrokenLinkButton";


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
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground transition-all duration-700 ease-in-out`}>

        <Navbar />

        <main className="scroll-area px-4 sm:px-6 md:px-8">
          {children}
            <ReportBrokenLinkButton />
<footer className="text-center text-sm text-muted-foreground py-6 border-t border-border">
  <p>
    © {new Date().getFullYear()}{" "}
    <span className="font-semibold text-primary">GetThatGame</span>. All rights reserved.
  </p>
  <p className="mt-2">
    Found a broken link?{" "}
    <a
      href="/reports"
      className="text-blue-600 hover:underline dark:text-blue-400"
    >
      Report it here.
    </a>
  </p>
</footer>


        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
