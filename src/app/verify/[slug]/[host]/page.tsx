"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { games } from "@/data/games";
import { notFound } from "next/navigation";

// Tambahkan tipe parameter yang lebih baik
interface Props {
  params: Promise<{
    slug: string;
    host: string;
  }>;
}

export default function VerifyPage({ params }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unwrappedParams, setUnwrappedParams] = useState<{ slug: string; host: string } | null>(null);

  useEffect(() => {
    // Unwrap `params` dengan `React.use()` agar bisa diakses dengan aman
    const unwrapParams = async () => {
      try {
        const unwrapped = await params;
        setUnwrappedParams(unwrapped);
      } catch (error) {
        console.error("Error while unwrapping params:", error);
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    // Jika params sudah di-unwrapped dan ada, lanjutkan pengecekan sessionStorage
    if (unwrappedParams) {
      const { slug, host } = unwrappedParams;
      const key = `verify_${slug}_${host}`;
      const isAllowed = sessionStorage.getItem(key);

      if (isAllowed === "true") {
        setAuthorized(true);
        sessionStorage.removeItem(key); // once-only use
      } else {
        router.replace("/"); // redirect if not allowed
      }

      setLoading(false); // Stop loading once params are checked
    }
  }, [unwrappedParams, router]);

  // If params or session is loading, show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-sm">Memeriksa izin...</p>
      </div>
    );
  }

  if (!unwrappedParams) return null; // Ensure that unwrappedParams is available

  const { slug, host } = unwrappedParams;
  const game = games.find((g) => g.slug === slug);
  if (!game || !authorized) return null;

  const downloadLink = game.downloadLinks.find(
    (link) => link.label.toLowerCase().replace(/\s+/g, "-") === host
  );

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
