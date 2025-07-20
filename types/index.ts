export interface Game {
  slug: string;
  title: string;
  coverImage: string;
  bannerImage: string;
  platform: string;
  rating: number;
  description: string;
  developer: string;
  publisher: string;
  genres: string[];
  tags: string[];
  screenshots: string[];
  systemRequirements?: string;
  installationNotes?: string;
  downloadLinks: { label: string; url: string }[];
   filecryptInfo?: {
    folderPassword?: string;
    rarPassword?: string;
    note?: string;
    filesize?: string;
  };
}