'use client';  // Tambahkan directive ini untuk memastikan komponen ini berjalan di sisi klien

import { useParams } from 'next/navigation';
import { Base64 } from 'js-base64';

const VerifyPage = () => {
  const { token } = useParams();  // Ambil parameter token menggunakan useParams()

  if (!token) {
    return <div>Token not found</div>;
  }

  // Decode token
  const decoded = Base64.decode(token as string);
  const [slug, host] = decoded.split(":");

  return (
    <div>
      <h1>Token decoded</h1>
      <p>Slug: {slug}</p>
      <p>Host: {host}</p>
    </div>
  );
};

export default VerifyPage;
