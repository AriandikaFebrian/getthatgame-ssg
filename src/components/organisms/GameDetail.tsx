'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Game, games } from "@/data/games";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const GameDetail = ({ game }: { game: Game }) => {
  const [rating, setRating] = useState(game.rating);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const handleRatingChange = (newRating: number) => setUserRating(newRating);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setUserComment(e.target.value);

  const handleSubmit = () => {
    if (userComment.trim() === "" || userRating === 0) return;
    setRating(rating); // Simulasi submit, bisa dihubungkan ke backend
    setUserComment("");
    setUserRating(0);
  };

  // Ambil 3 game terbaru kecuali yang sedang dilihat
  const latestGames = [...games]
    .filter((g) => g.slug !== game.slug)
    .slice(-3)
    .reverse();

  return (
    <main className="container mx-auto p-6 lg:p-12 space-y-10">
      {/* Title + Rating + Image + Sidebar */}
      <section className="flex flex-col md:flex-row gap-6">
        {/* Left: Info + Banner */}
        <div className="md:w-2/3 space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{game.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-xl font-medium">
                Rating: {rating.toFixed(1)} / 5
              </h2>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`text-2xl transition ${
                      userRating >= star
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
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

        {/* Right: Sidebar - GameRight */}
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

      {/* Info Badges */}
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

      {/* Tabs Section */}
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
            <h3 className="text-lg font-medium mb-2">Download Links</h3>
            <div className="flex flex-wrap gap-3">
              {game.downloadLinks.map((link) => (
                <Button
                  key={link.label}
                  asChild
                  variant="default"
                  size="lg"
                  className="shadow"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </Button>
              ))}
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

        {/* Related Games Section */}
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
  );
};
