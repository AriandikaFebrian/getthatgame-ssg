'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowToInstallPage() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold tracking-tight text-center text-primary mb-8">
        How to Install the Game
      </h1>

      <section className="grid md:grid-cols-2 gap-6">
        {/* Extract All Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔧 Extract All Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Use this method if you have downloaded all the game parts and placed them in the same folder.
              Simply extract the <strong>first part</strong> (usually <code>part1.rar</code>), and the rest will follow automatically.
            </p>
            <div className="aspect-video rounded-md overflow-hidden">
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/ID_VIDEO_EXTRACT_ALL"
                title="Install Guide - Extract All"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Manual Extract Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🧩 Manual Extract (One by One)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              If you only have one part or if automatic extraction fails, you can extract each part <strong>manually</strong> one by one.
              Make sure all parts are downloaded and named correctly.
            </p>
            <div className="aspect-video rounded-md overflow-hidden">
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/ID_VIDEO_SEXTRACK"
                title="Install Guide - Manual Extract"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Extra Tips */}
      <div className="max-w-3xl mx-auto text-sm text-muted-foreground mt-10 text-center">
        <p className="italic">
          💡 Tip: We recommend using the latest version of <strong>WinRAR</strong> or <strong>7-Zip</strong>.
          If you&apos;re prompted for a password during extraction, please refer to the <strong>Download</strong> tab or game description page.
        </p>
      </div>
    </main>
  );
}
