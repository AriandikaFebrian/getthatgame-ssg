import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake, ExternalLink } from "lucide-react";

export default function DonationPage() {
  return (
    <section className="container max-w-2xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Support GetThatGame 💖</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Help us keep delivering free, safe, and high-quality PC games for everyone.
        </p>
        <Badge variant="outline" className="text-xs">Built for gamers, by gamers.</Badge>
      </div>

      <Card className="shadow-lg border border-border rounded-2xl">
        <CardHeader className="bg-muted/50 rounded-t-2xl px-6 py-5 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-pink-500" />
          <CardTitle className="text-lg sm:text-xl font-semibold text-primary">
            Why We Need Your Support
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 px-6 py-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">GetThatGame</strong> is a free platform where you can download{" "}
            <strong className="text-foreground">safe, high-quality PC games</strong> — including indie hits and top AAA titles — without paying a cent.
          </p>

          <p>
            Instead of popups and spammy ads, we use <strong className="text-foreground">ad shorteners</strong> like Adshrink to earn a small amount from each click.
          </p>

          <p>
            <strong>Every link you open supports us directly</strong>. It helps pay for hosting, bandwidth, storage, and lets us keep adding new games regularly.
          </p>

          <p>
            If users skip or block the shortlink, we earn nothing — and we rely 100% on these small earnings to stay online.
          </p>

          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-100">
            <p className="mb-1 font-medium">No shortlink = No revenue 💸</p>
            <p>
              Please consider letting the shortlink load — it costs you nothing, but means everything to us. 🙏
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
