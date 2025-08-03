export interface Game {
  slug: string;
  title: string;
  coverImage: string;
  bannerImage: string;
  platform: string;
  rating: number;
  releaseDate: string; 
  developer: string;
  publisher: string;

  description: string;
  genres: string[];
  tags: string[];
  languages?: string[];
  screenshots: string[];

  systemRequirements?: string;
  installationNotes?: string;

  fileSize?: string;
  splitInfo?: string;

  downloadLinks: {
    label: string;
    host: string;
    files: {
      name: string;
      url: string;
      size: string;
      host: string;
    }[];
  }[];

  filecryptInfo?: {
    folderPassword?: string;
    rarPassword?: string;
    note?: string;
    filesize?: string;
  };

  mirrors?: string[]; // 🆕 Tambahan: daftar mirror seperti Buzzheavier, Torrent, dll
}
