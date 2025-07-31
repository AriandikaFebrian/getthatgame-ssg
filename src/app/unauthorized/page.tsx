import { redirect } from "next/navigation";

export default function UnauthorizedPage() {
  redirect("/"); // ⛔ Ini akan langsung redirect ke home, tidak pernah render halaman Unauthorized
  return <div>⛔ Unauthorized</div>; // Ini tidak pernah ditampilkan
}
