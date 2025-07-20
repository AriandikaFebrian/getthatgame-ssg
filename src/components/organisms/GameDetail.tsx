// ...imports
'use client';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { games } from "@/data/games";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Info, Folder, FileArchive, HardDriveDownload } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Game } from "../../../types";

export const GameDetail = ({ game }: { game: Game }) => {
  const latestGames = [...games]
    .filter((g) => g.slug !== game.slug)
    .slice(-3)
    .reverse();

  return (
    <>
      <Head>
        <title>{game.title} | Get That Game</title>
        <meta
          name="description"
          content={game.description?.slice(0, 150) || `Download and discover more about ${game.title}`}
        />
        <meta
          name="keywords"
          content={`${game.title}, ${game.platform}, ${game.genres.join(", ")}, free game download`}
        />
        <meta property="og:title" content={`${game.title} | Get That Game`} />
        <meta property="og:description" content={game.description?.slice(0, 150) || ""} />
        <meta property="og:image" content={game.bannerImage} />
      </Head>

      <main className="container mx-auto p-6 lg:p-12 space-y-10">
        {/* Header */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{game.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-xl font-medium">
                  Rating: {game.rating.toFixed(1)} / 5
                </h2>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        Math.floor(game.rating) >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src={game.bannerImage}
                alt={`${game.title} banner`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 space-y-4">
            <h2 className="text-xl font-semibold">New & Trending</h2>
            <div className="space-y-4">
              {latestGames.map((latest) => (
                <Link
                  key={latest.slug}
                  href={`/game/${latest.slug}`}
                  className="flex gap-3 border rounded-md p-2 hover:shadow transition"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={latest.coverImage}
                      alt={latest.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {latest.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {latest.platform}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary">Platform: {game.platform}</Badge>
          <Badge variant="secondary">Developer: {game.developer}</Badge>
          <Badge variant="secondary">Publisher: {game.publisher}</Badge>
          {game.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
          {game.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Screenshots */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {game.screenshots.map((src, idx) => (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <button className="relative w-full h-48 rounded-lg overflow-hidden shadow hover:ring-2 hover:ring-blue-500 focus:outline-none">
                    <Image src={src} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 bg-black rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section>
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="download">Download</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {game.description || "No description provided."}
              </p>
            </TabsContent>

            <TabsContent value="download">
              <h3 className="text-lg font-medium mb-4">Download</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {game.downloadLinks && game.downloadLinks.length > 0 ? (
                    game.downloadLinks.map((link) => {
                      const isLinkAvailable = !!link.url;
                      return (
                        <Button
                          key={link.label}
                          asChild={isLinkAvailable}
                          variant="ghost"
                          size="lg"
                          className="w-full justify-between text-black dark:text-white shadow cursor-default"
                        >
                          {isLinkAvailable ? (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between w-full"
                            >
                              {link.label}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>
                                      <Info className="w-4 h-4 text-green-500 ml-2" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-xs rounded-md px-3 py-2 shadow w-56">
                                    <p className="flex items-center gap-2">
                                      <Folder className="w-4 h-4 text-yellow-500" />
                                      <span><code>{game.filecryptInfo?.folderPassword}</code></span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <FileArchive className="w-4 h-4 text-yellow-500" />
                                      <span><code>{game.filecryptInfo?.rarPassword}</code></span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <HardDriveDownload className="w-4 h-4 text-yellow-500" />
                                      <span><code>{game.filecryptInfo?.filesize}</code></span>
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </a>
                          ) : (
                            <div className="flex items-center justify-between w-full text-muted-foreground">
                              {link.label}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>
                                      <Info className="w-4 h-4 text-red-500 ml-2" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-xs rounded-md px-3 py-2 shadow w-56">
                                    <p className="text-red-500 font-medium">Link not available right now</p>
                                    <p className="text-xs text-muted-foreground">Still under construction</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}
                        </Button>
                      );
                    })
                  ) : (
                    <div className="text-sm text-muted-foreground italic">Download link not available.</div>
                  )}
                </div>

                {game.filecryptInfo && (
                  <div className="rounded-md bg-zinc-100 dark:bg-zinc-900 border border-yellow-300 dark:border-yellow-500 p-4 text-sm text-zinc-800 dark:text-zinc-100">
                    <p className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">INFO</p>
                    <p className="mb-1">{game.filecryptInfo.note}</p>
                    <p className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-yellow-500" />
                      <span>Folder Password: <code>{game.filecryptInfo.folderPassword}</code></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FileArchive className="w-4 h-4 text-yellow-500" />
                      <span>RAR Password: <code>{game.filecryptInfo.rarPassword}</code></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <HardDriveDownload className="w-4 h-4 text-yellow-500" />
                      <span>Filesize: <code>{game.filecryptInfo.filesize}</code></span>
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {game.systemRequirements || "No system requirements provided."}
              </p>
            </TabsContent>

            <TabsContent value="installation">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {game.installationNotes || "No installation notes provided."}
              </p>
            </TabsContent>
          </Tabs>

          {/* Related Games */}
          <section>
            <h2 className="text-2xl font-semibold mt-10 mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {games
                .filter((g) => g.slug !== game.slug)
                .filter(
                  (g) =>
                    g.genres.some((genre) => game.genres.includes(genre)) ||
                    g.tags.some((tag) => game.tags.includes(tag))
                )
                .slice(0, 4)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/game/${related.slug}`}
                    className="block border rounded-lg overflow-hidden hover:shadow transition"
                  >
                    <div className="relative w-full h-40">
                      <Image
                        src={related.coverImage}
                        alt={`${related.title} cover`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold">{related.title}</h3>
                      <p className="text-sm text-muted-foreground">{related.platform}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
};