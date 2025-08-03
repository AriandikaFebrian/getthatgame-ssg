'use client';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { games } from "@/data/games";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Info, Folder, FileArchive, HardDriveDownload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/lib/use-media-query";
import { Game } from "../../../types";
import { getToken } from '@/lib/token-utils';


export const GameDetail = ({ game }: { game: Game }) => {
  const latestGames = [...games].filter((g) => g.slug !== game.slug).slice(-4).reverse();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const languages = game.languages ?? [];


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
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{game.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-lg sm:text-xl font-medium">
                  Rating: {game.rating.toFixed(1)} / 5
                </h2>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl sm:text-2xl ${
                        Math.floor(game.rating) >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

<div className="flex flex-col sm:flex-row gap-4">

  {/* Cover Image */}
<div className="relative w-150 rounded-xl overflow-hidden shadow-md" style={{ height: '16.75rem' }}>
    <Image
      src={game.bannerImage}
      alt={`${game.title} banner`}
      fill
      className="object-cover"
      priority
    />
  </div>

  {/* Game Info / Badges */}
  <div className="flex flex-col gap-2 sm:flex-1">

    {/* Info Utama */}
    <div className="flex flex-wrap gap-2 text-sm">
      <Badge variant="outline" className="bg-transparent border-none text-foreground">Platform: {game.platform}</Badge>
      <Badge variant="outline" className="bg-transparent border-none text-foreground">Developer: {game.developer}</Badge>
      <Badge variant="outline" className="bg-transparent border-none text-foreground">Publisher: {game.publisher}</Badge>

      {game.releaseDate && (
        <Badge variant="outline" className="bg-transparent border-none text-foreground" >
          Release: {new Date(game.releaseDate).toLocaleDateString()}
        </Badge>
      )}

      {game.fileSize && (
        <Badge variant="outline" className="bg-transparent border-none text-foreground">Size: {game.fileSize}</Badge>
      )}

      {game.splitInfo && (
        <Badge variant="outline" className="bg-transparent border-none text-foreground">Split: {game.splitInfo}</Badge>
      )}

  {languages.length > 0 && (
  <Badge variant="outline" className="bg-transparent border-none text-foreground">
    Languages:
      {languages.slice(0, 3).join(', ')}{languages.length > 3 ? ', ...' : ''}
  </Badge>
)}



    </div>

  </div>
  
</div>
{/* Genre dan Tags */}
    <div className="flex flex-wrap gap-2 text-sm mt-2">
      {game.genres.map((genre) => (
        <Badge key={genre}>{genre}</Badge>
      ))}

      {game.tags.map((tag) => (
        <Badge key={tag} variant="outline">
          #{tag}
        </Badge>
      ))}
    </div>

  
</div>


        
          

          {/* Sidebar */}
          <aside className="lg:w-100 space-y-4">
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
                   <div className="flex flex-wrap gap-1 mt-1">
  {latest.genres.slice(0, 3).map((genre) => (
    <span
      key={genre}
      className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
    >
      {genre}
    </span>
  ))}
</div>

                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        

        {/* Screenshots */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {game.screenshots.map((src, idx) => (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <button className="relative w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow hover:ring-2 hover:ring-blue-500 focus:outline-none">
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

        {/* Tabs (or Accordion for Mobile) */}
        <section>
          {isMobile ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {game.description || "No description provided."}
                </p>
              </div>
<hr className="border-t border-zinc-200 dark:border-zinc-700 my-4" />

              <div>
                <h3 className="text-lg font-medium">Download</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {game.downloadLinks?.length ? (
                    game.downloadLinks.map((link) => {
                      const isLinkAvailable = link.files && link.files.length > 0;
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
      href={`/verify/${game.slug}/${link.host}`}
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
              </div>
              <hr className="border-t border-zinc-200 dark:border-zinc-700 my-4" />
              <div>
                <h3 className="text-lg font-medium">Requirements</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {game.systemRequirements || "No system requirements provided."}
                </p>
              </div>
              <hr className="border-t border-zinc-200 dark:border-zinc-700 my-4" />
              <div>
                <h3 className="text-lg font-medium">Installation</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {game.installationNotes || "No installation notes provided."}
                </p>
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
          ) : (
            <Tabs defaultValue="description" className="w-full">
              <div className="relative w-full">
                <TabsList className="flex overflow-x-auto no-scrollbar w-full gap-2 pr-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="installation">Installation</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="description">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {game.description || "No description provided."}
                </p>
              </TabsContent>

       <TabsContent value="download">
  <div className="grid md:grid-cols-2 gap-6">
    <div className="space-y-3">
      {game.downloadLinks && game.downloadLinks.length > 0 ? (
        game.downloadLinks.map((link) => {
          const isAvailable = link.files && link.files.length > 0;
  const host = link.host.toLowerCase();
            const token = getToken(game.slug, host); 
          return (
           <Button
  key={link.label}
  asChild={isAvailable}
  variant="ghost"
  size="lg"
  className="w-full justify-between text-black dark:text-white shadow cursor-default"
>
  {isAvailable ? (
       <a
   href={`/api/go/unlock-${game.slug}-${link.host.toLowerCase()}`}// ← pakai alias ShrinkMe
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
          )}
        </section>

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
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={related.coverImage}
                      alt={`${related.title} cover`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold">{related.title}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};
