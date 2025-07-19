"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const DonationPage: React.FC = () => {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Support GameApp</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Why Donate?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 text-base">
          <p>
            GameApp is a passion project built to help gamers explore and discover games across genres and platforms. 
            We aim to provide a clean, user-friendly platform with curated collections and seamless browsing.
          </p>
          <p>
            Your donation helps us maintain and improve the platform, update content, and continue building a great experience.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ways to Donate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-800 space-y-2">
            <p>
              💳 <strong>Bank Transfer:</strong> 1234567890 (BCA - a.n. GameApp)
            </p>
            <p>
              📱 <strong>DANA:</strong> 0812-3456-7890
            </p>
            <p>
              ☕ <strong>Buy Me a Coffee:</strong>{" "}
              <a
                href="https://buymeacoffee.com/gameapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                buymeacoffee.com/gameapp
              </a>
            </p>
          </div>

          <Separator className="my-4" />

          <div className="text-center">
            <Button asChild variant="outline">
              <a href="https://buymeacoffee.com/gameapp" target="_blank" rel="noopener noreferrer">
                Donate Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-center text-muted-foreground mt-8">
        Every donation helps keep GameApp alive. Thank you for your support!
      </p>
    </main>
  );
};

export default DonationPage;
