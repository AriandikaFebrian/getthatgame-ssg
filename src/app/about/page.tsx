// app/about/page.tsx — ✅ Server Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">About GameApp</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Welcome, Gamer!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-base text-gray-700">
          <p>
            GameApp is your ultimate destination for discovering and exploring a wide variety of games across multiple genres. 
            Our mission is to provide gamers with a clean, user-friendly platform to find games they love, explore genres, and stay updated with the latest releases.
          </p>

          <p>
            Whether you&apos;re a casual player or a hardcore enthusiast, GameApp offers curated game lists, detailed information, and a seamless browsing experience — all in one place.
          </p>

          <p>
            Thank you for being part of our journey. We hope you enjoy exploring the world of games with us!
          </p>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <section className="mt-12 max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-6 text-base text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Why was this website made?</h3>
            <p>
              This website was created to provide gamers with a centralized platform to discover, explore, and stay updated on a wide variety of games across multiple genres.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Why is this website still active?</h3>
            <p>
              We continue to maintain and update this website to ensure gamers have access to the latest game information, new releases, and a seamless browsing experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
