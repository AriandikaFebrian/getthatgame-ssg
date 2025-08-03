import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { games } from "@/data/games";
import Link from "next/link";
import { tokens } from "@/lib/tokens"; // ✅ Perlu untuk validasi token
import { Game } from "../../../../../../types";

export default async function UnlockedHostPage({
  params,
}: {
  params: { slug: string; host: string };
}) {
  const { slug, host } = params;
  const cookieStore = cookies();
  const cookieName = `unlock_${slug}_${host}`;
  const token = (await cookieStore).get(cookieName)?.value;

  // ⛔ Tidak ada token
  if (!token) {
    console.log("⛔ Tidak ada token! Redirect ke /unauthorized");
    redirect("/unauthorized");
  }

  // 🔒 Validasi token cocok dengan slug & host
  const tokenData = tokens[token];
  if (
    !tokenData ||
    tokenData.slug !== slug ||
    tokenData.host.toLowerCase() !== host.toLowerCase()
  ) {
    console.log("🔐 Token tidak valid atau mismatch");
    redirect("/unauthorized");
  }

  const game: Game | undefined = games.find((g) => g.slug === slug);
  if (!game) return notFound();

  const linkGroup = game.downloadLinks.find(
    (link) => link.host.toLowerCase() === host.toLowerCase()
  );
  if (!linkGroup || !linkGroup.files?.length) return notFound();

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">
        {game.title} – {linkGroup.label} Download
      </h1>

      <div className="space-y-4">
        {linkGroup.files.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded border bg-zinc-100 dark:bg-zinc-900"
          >
            <div className="flex flex-col">
              <span className="font-medium">{file.name}</span>
              <span className="text-sm text-muted-foreground">{file.size}</span>
            </div>
            <Link
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-semibold"
            >
              Download
            </Link>
          </div>
        ))}
      </div>

      {game.filecryptInfo && (
        <div className="mt-8 border border-yellow-300 dark:border-yellow-500 p-4 rounded bg-yellow-50 dark:bg-yellow-900 text-sm">
          <p className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
            Password & Info
          </p>
          <ul className="space-y-1">
            <li>
              🔐 <strong>Folder Password:</strong>{" "}
              <code>{game.filecryptInfo.folderPassword}</code>
            </li>
            <li>
              🗜️ <strong>RAR Password:</strong>{" "}
              <code>{game.filecryptInfo.rarPassword}</code>
            </li>
            <li>
              💾 <strong>Filesize:</strong> {game.filecryptInfo.filesize}
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}
