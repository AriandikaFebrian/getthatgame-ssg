import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-12 space-y-10">
      {/* Meta Title for SEO */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">About GetThatGame</h1>
        <p className="text-muted-foreground text-sm">
          Discover, explore, and download the best free PC games. GetThatGame is built for gamers, by gamers.
        </p>
      </div>

      {/* About Description */}
      <Card>
  <CardHeader>
    <CardTitle className="text-xl">Welcome to GetThatGame 🎮</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4 text-base text-muted-foreground">
    <p>
      <strong>GetThatGame</strong> is the go-to platform for gamers who want to enjoy premium PC games without spending a dime. Whether you’re broke, just trying a game before buying, or collecting classics — we’ve got you covered.
    </p>
    <p>
      We provide free download links for a wide variety of PC games — from AAA titles to indie gems. Every link is manually reviewed and hosted on trusted platforms like Google Drive and MediaFire.
    </p>
    <p>
      You’ll find all genres here: action, adventure, horror, simulation, RPGs, low-spec games, offline games — and more. No registration, no BS, no sketchy pop-ups.
    </p>
    <p>
      Every game comes with detailed info: system requirements, installation notes, passwords, and file sizes — so you know exactly what you&apos;re getting into.
    </p>
    <p>
      If you&apos;re looking for a clean, fast, and hassle-free way to get PC games, you&apos;re in the right place. GetThatGame is built for gamers who want to play — not pay.
    </p>
  </CardContent>
</Card>


      <Separator className="my-6" />

      {/* FAQ Section */}
      <section>
  <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions (FAQ)</h2>
  <Accordion type="single" collapsible className="space-y-4">

    <AccordionItem value="why-made">
      <AccordionTrigger>Why was GetThatGame created?</AccordionTrigger>
      <AccordionContent>
        We built GetThatGame for gamers who want to enjoy PC games without worrying about money. Most game sites are full of ads, broken links, or fake installers — we’re here to fix that with clean, working, and fast download links.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="is-free">
      <AccordionTrigger>Are all the games really free?</AccordionTrigger>
      <AccordionContent>
        Yes. Everything on GetThatGame is free to download. Some games were originally paid, but we provide access through mirrors like Google Drive or MediaFire. All files are manually reviewed.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="how-to-contribute">
      <AccordionTrigger>Can I upload or share my own game?</AccordionTrigger>
      <AccordionContent>
        Absolutely. If you’re a developer or a collector, you can share your game files using our “Share Your Game” feature. We’ll review it and, if approved, feature it on the site.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="is-safe">
      <AccordionTrigger>Is it safe to download games here?</AccordionTrigger>
      <AccordionContent>
        Yes. We don’t host sketchy .exe installers or use redirect ads. Every game is tested or reviewed before being listed. We only link to trusted sources.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="how-to-install">
      <AccordionTrigger>How do I install the games?</AccordionTrigger>
      <AccordionContent>
        Each game page includes installation notes, passwords (if needed), and system requirements. Usually, it’s as simple as extracting the files and launching the game — no cracks or keygens required.
      </AccordionContent>
    </AccordionItem>

  </Accordion>
</section>

    </main>
  );
}
