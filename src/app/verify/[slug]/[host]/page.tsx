"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { games } from "@/data/games";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
    host: string;
  };
}

export default function VerifyPage({ params }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Step 1: Cek apakah user punya izin
  useEffect(() => {
    const key = `verify_${params.slug}_${params.host}`;
    const isAllowed = sessionStorage.getItem(key);

    // If the key exists, set the user as authorized
    if (isAllowed === "true") {
      setAuthorized(true);
      // Optionally, you could remove it here if it's for one-time use
      // sessionStorage.removeItem(key); // If you only want to allow access once
    } else {
      // Redirect if not authorized
      router.replace("/"); // Redirect back if the session isn't set or isn't valid
    }
  }, [params.slug, params.host, router]);

  const game = games.find((g) => g.slug === params.slug);
  if (!game || !authorized) return null;

  const downloadLink = game.downloadLinks.find(
    (link) => link.label.toLowerCase().replace(/\s+/g, "-") === params.host
  );

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-sm">Mengalihkan...</p>
      </div>
    );
  }

  if (!downloadLink || downloadLink.files.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold mb-2">Link belum tersedia</h1>
        <p className="text-muted-foreground">Silakan kembali nanti</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Verifikasi Link</h1>
        <p className="text-muted-foreground text-sm">
          Pilih bagian file dari host{" "}
          <span className="font-medium text-primary">{downloadLink.label}</span>
        </p>
      </div>

      <div className="space-y-3">
        {downloadLink.files.map((file, i) => (
          <Card key={i} className="p-3 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{`Part ${i + 1}`}</span>
              <div className="flex items-center gap-2">
                <Badge variant="success" className="text-xs px-2 py-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
                <Button asChild size="sm" variant="outline" className="px-2 h-7 text-xs">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Unduh
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{file.size}</span>
              <span>•</span>
              <span>{file.host}</span>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Jika terjadi masalah saat unduh, silakan pilih host lainnya.
      </p>
    </div>
  );
}
