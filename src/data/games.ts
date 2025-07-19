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
}

export const games: Game[] = [
  {
    slug: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    coverImage: "/Images/Cyberpunk/CoverImages.webp",
    bannerImage: "/Images/Cyberpunk/Banner.webp",
    platform: "PC, PS5, Xbox Series X",
    rating: 4.2,
    description:
      "Cyberpunk 2077 adalah sebuah game RPG aksi dunia terbuka yang membawa pemain ke dalam kehidupan brutal dan kompleks Night City — sebuah kota futuristik yang dipenuhi dengan kekacauan, korupsi, dan obsesi terhadap modifikasi tubuh.Dalam game ini, kamu berperan sebagai V, seorang tentara bayaran dengan kebebasan penuh untuk membentuk jalan hidupnya sendiri. Dengan sistem karakter yang sangat fleksibel, kamu bisa memilih latar belakang, kemampuan teknis, gaya bertarung, hingga pendekatanmu terhadap berbagai misi: apakah ingin menyelinap secara diam-diam, membajak sistem digital, atau maju dengan kekuatan penuh.Night City bukan sekadar latar tempat — kota ini adalah karakter hidup dengan enam distrik yang memiliki kepribadian unik. Mulai dari pusat kota yang megah hingga gang-gang gelap penuh kejahatan, dunia Cyberpunk 2077 terasa padat, penuh cerita, dan dipenuhi karakter-karakter dengan narasi kuat.Game ini menggabungkan narasi sinematik, pilihan dialog yang mempengaruhi alur cerita, serta elemen RPG mendalam yang memungkinkan kamu meng-upgrade tubuh dengan implan sibernetik, meretas otak musuh, atau mengendalikan dunia digital dari kejauhan.Cyberpunk 2077 juga menonjol berkat kualitas grafis sinematik, voice acting bintang seperti Keanu Reeves, dan dunia yang sangat imersif. Dengan campuran elemen distopia, teknologi tinggi, dan pilihan moral yang tidak selalu hitam-putih, Cyberpunk 2077 adalah pengalaman eksplorasi dunia masa depan yang mentah, emosional, dan sangat personal.",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    genres: ["Action", "RPG", "Open World"],
    tags: ["Futuristic", "Sci-Fi", "Story Rich"],
    screenshots: [
      "/Images/Cyberpunk/Gameplay.webp",
      "/Images/Cyberpunk/Gameplay2.webp",
      "/Images/Cyberpunk/Gameplay3.webp",
    ],
    downloadLinks: [
      { label: "Mega", url: "https://mega.nz/fake-link-example" },
  { label: "Google Drive", url: "https://drive.google.com/fake-link-example" },
  { label: "MediaFire", url: "https://www.mediafire.com/fake-link-example" },
  { label: "1Fichier", url: "https://1fichier.com/fake-link-example" },
  { label: "Zippyshare", url: "https://www.zippyshare.com/fake-link-example" },
  { label: "AnonFiles", url: "https://anonfiles.com/fake-link-example" },
  { label: "Pixeldrain", url: "https://pixeldrain.com/u/fake-link-example" },
  { label: "Send.cm", url: "https://send.cm/fake-link-example" },
  { label: "Torrent (Magnet)", url: "magnet:?xt=urn:btih:examplehash&dn=Cyberpunk2077" },
    ],
     systemRequirements: `Minimum:
- OS: Windows 10 (64-bit)
- Processor: Intel Core i5-3570K / AMD FX-8310
- Memory: 8 GB RAM
- Graphics: NVIDIA GeForce GTX 970 / AMD Radeon RX 470
- Storage: 70 GB SSD recommended

Recommended:
- OS: Windows 10 (64-bit)
- Processor: Intel Core i7-4790 / AMD Ryzen 3 3200G
- Memory: 12 GB RAM
- Graphics: NVIDIA GeForce GTX 1060 6GB / AMD Radeon R9 Fury
- Storage: 70 GB SSD`,

installationNotes: `1. Extract  
2. Burn or mount the .iso  
3. Run setup.exe and install  
4. Enjoy & Play  
  
Full List of Supported Languages:  
English, French, Italian, German, Spanish, Spanish (Mexico), Polish, Czech, Portuguese-Brazil, Russian, Ukrainian, Turkish, Arabic, Japanese, Korean, Simplified Chinese, Traditional Chinese, Serbian  
  
Release Notes:  
ElAmigos release — game is already cracked after installation (crack by Codex/Rune or FLT).  
Updated to version 1.5.0 (25.06.2025).  
  
DLC Included:  
- Pre-order Bonus  
- Soundtrack  
- Artbook  
- Ultimate Content  
- Deluxe Content  
- Community Items  
- Season Pass  
  
Installation time with 16-thread CPU and SSD: ~3 minutes.`,


  },
  {
    slug: "hades",
    title: "Hades",
    coverImage: "/public/vercel.svg",
    bannerImage: "/public/vercel.svg",
    platform: "PC, Switch",
    rating: 4.8,
    description:
      "Hades is a rogue-like dungeon crawler from Supergiant Games, featuring fast-paced action and a rich story.",
    developer: "Supergiant Games",
    publisher: "Supergiant Games",
    genres: ["Action", "Rogue-like", "Indie"],
    tags: ["Mythology", "Fast-Paced", "Replayable"],
    screenshots: [
      "/public/vercel.svg",
      "/public/vercel.svg",
      "/public/vercel.svg",
    ],
    systemRequirements: "OS: Windows 10, Processor: Intel i5, RAM: 8GB, Graphics: GTX 970",
    installationNotes: "Download the installer from the official site and follow the on-screen instructions.",
    downloadLinks: [
      { label: "Official Site", url: "https://www.supergiantgames.com/games/hades/" },
      { label: "Steam", url: "https://store.steampowered.com/app/1145360/Hades/" },
    ],
  },
  {
  slug: "elden-ring",
  title: "Elden Ring",
  coverImage: "/Images/EldenRing/Cover.webp",
  bannerImage: "/Images/EldenRing/Banner.webp",
  platform: "PC, PS5, Xbox Series X",
  rating: 4.9,
  description:
    "Elden Ring adalah game action-RPG open-world kolaborasi antara FromSoftware dan George R. R. Martin. Dengan dunia fantasi kelam bernama The Lands Between, pemain menjelajahi wilayah luas penuh tantangan dan rahasia. Menggabungkan elemen souls-like dengan dunia terbuka, Elden Ring memberikan kebebasan eksplorasi dan pertarungan yang menegangkan dengan sistem pertumbuhan karakter yang mendalam.",
  developer: "FromSoftware",
  publisher: "Bandai Namco",
  genres: ["Action", "RPG", "Open World"],
  tags: ["Souls-like", "Dark Fantasy", "Exploration"],
  screenshots: [
    "/Images/EldenRing/Gameplay1.webp",
    "/Images/EldenRing/Gameplay2.webp",
    "/Images/EldenRing/Gameplay3.webp"
  ],
  systemRequirements: `Minimum:
- OS: Windows 10
- Processor: Intel Core i5-8400 / AMD Ryzen 3 3300X
- Memory: 12 GB RAM
- Graphics: NVIDIA GeForce GTX 1060 / AMD Radeon RX 580
- Storage: 60 GB SSD

Recommended:
- OS: Windows 10/11
- Processor: Intel Core i7-8700K / AMD Ryzen 5 3600X
- Memory: 16 GB RAM
- Graphics: NVIDIA GeForce GTX 1070 / AMD Radeon RX Vega 56
- Storage: 60 GB SSD`,
  installationNotes: "Install via official launcher or Steam. Ensure the latest GPU drivers are installed.",
  downloadLinks: [
    { label: "Official Site", url: "https://en.bandainamcoent.eu/elden-ring/elden-ring" },
    { label: "Steam", url: "https://store.steampowered.com/app/1245620/ELDEN_RING/" },
  ]
},
{
  slug: "stardew-valley",
  title: "Stardew Valley",
  coverImage: "/Images/Stardew/Cover.webp",
  bannerImage: "/Images/Stardew/Banner.webp",
  platform: "PC, Switch, PS4, Mobile",
  rating: 4.7,
  description:
    "Stardew Valley adalah game simulasi pertanian di mana pemain membangun kembali pertanian lama di sebuah desa kecil. Game ini menawarkan kombinasi menenangkan antara bertani, bersosialisasi dengan penduduk desa, eksplorasi gua, dan membangun kehidupan sesuai keinginanmu. Dengan grafis pixel art yang indah dan musik yang menenangkan, Stardew Valley menjadi pelarian sempurna dari dunia nyata.",
  developer: "ConcernedApe",
  publisher: "ConcernedApe",
  genres: ["Simulation", "RPG", "Casual"],
  tags: ["Farming", "Relaxing", "Pixel Art"],
  screenshots: [
    "/Images/Stardew/Gameplay1.webp",
    "/Images/Stardew/Gameplay2.webp",
    "/Images/Stardew/Gameplay3.webp"
  ],
  systemRequirements: `Minimum:
- OS: Windows Vista or greater
- Processor: 2 GHz
- Memory: 2 GB RAM
- Graphics: 256 MB video memory, shader model 3.0+
- Storage: 500 MB

Recommended:
- OS: Windows 10
- Processor: 2.8 GHz Quad-Core
- Memory: 4 GB RAM
- Graphics: Dedicated GPU
- Storage: 1 GB SSD`,
  installationNotes: "Download dari platform resmi seperti Steam atau GOG, lalu install seperti biasa.",
  downloadLinks: [
    { label: "Official Site", url: "https://www.stardewvalley.net/" },
    { label: "Steam", url: "https://store.steampowered.com/app/413150/Stardew_Valley/" },
  ]
},
{
  slug: "minecraft",
  title: "Minecraft",
  coverImage: "/Images/Minecraft/Cover.webp",
  bannerImage: "/Images/Minecraft/Banner.webp",
  platform: "PC, PS5, Xbox, Switch, Mobile",
  rating: 4.9,
  description:
    "Minecraft adalah game sandbox kreatif di mana pemain bisa membangun, menjelajah, dan bertahan hidup di dunia terbuka berbasis blok. Dengan dua mode utama — Survival dan Creative — pemain dapat membangun struktur raksasa, menjelajahi gua berbahaya, dan bahkan menciptakan mekanisme redstone kompleks. Game ini juga mendukung modding dan multiplayer yang membuatnya terus berkembang dan tak terbatas.",
  developer: "Mojang Studios",
  publisher: "Mojang Studios",
  genres: ["Sandbox", "Adventure", "Survival"],
  tags: ["Creative", "Multiplayer", "Building"],
  screenshots: [
    "/Images/Minecraft/Gameplay1.webp",
    "/Images/Minecraft/Gameplay2.webp",
    "/Images/Minecraft/Gameplay3.webp"
  ],
  systemRequirements: `Minimum:
- OS: Windows 7 or later
- Processor: Intel Core i3
- Memory: 4 GB RAM
- Graphics: Intel HD Graphics 4000
- Storage: 1 GB

Recommended:
- OS: Windows 10
- Processor: Intel Core i5
- Memory: 8 GB RAM
- Graphics: NVIDIA GTX 1050
- Storage: SSD`,
  installationNotes: "Install launcher dari Minecraft.net dan login menggunakan akun Microsoft atau Mojang.",
  downloadLinks: [
    { label: "Official Site", url: "https://www.minecraft.net/" },
    { label: "Microsoft Store", url: "https://www.microsoft.com/store/productId/9NBLGGH2JHXJ" }
  ]
},
{
  slug: "the-witcher-3",
  title: "The Witcher 3: Wild Hunt",
  coverImage: "/Images/Witcher3/Cover.webp",
  bannerImage: "/Images/Witcher3/Banner.webp",
  platform: "PC, PS5, Xbox Series X",
  rating: 4.9,
  description:
    "The Witcher 3: Wild Hunt adalah game RPG aksi naratif dengan dunia terbuka luas yang penuh kehidupan dan cerita kompleks. Kamu berperan sebagai Geralt of Rivia, seorang pemburu monster profesional yang mencari anak angkatnya di dunia penuh intrik politik, sihir kuno, dan makhluk mitologi. Cerita yang dalam, pilihan yang berdampak, dan dunia yang imersif membuat game ini salah satu RPG terbaik sepanjang masa.",
  developer: "CD Projekt Red",
  publisher: "CD Projekt",
  genres: ["RPG", "Open World", "Fantasy"],
  tags: ["Story Rich", "Choices Matter", "Epic"],
  screenshots: [
    "/Images/Witcher3/Gameplay1.webp",
    "/Images/Witcher3/Gameplay2.webp",
    "/Images/Witcher3/Gameplay3.webp"
  ],
  systemRequirements: `Minimum:
- OS: 64-bit Windows 7/8/10
- Processor: Intel Core i5-2500K / AMD Phenom II X4 940
- Memory: 6 GB RAM
- Graphics: NVIDIA GTX 660 / AMD HD 7870
- Storage: 50 GB HDD

Recommended:
- OS: 64-bit Windows 10
- Processor: Intel Core i7-3770 / AMD FX-8350
- Memory: 8 GB RAM
- Graphics: NVIDIA GTX 770 / AMD R9 290
- Storage: SSD`,
  installationNotes: "Gunakan GOG Galaxy atau Steam untuk instalasi dan update otomatis.",
  downloadLinks: [
    { label: "GOG", url: "https://www.gog.com/game/witcher_3_wild_hunt" },
    { label: "Steam", url: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/" }
  ]
},
{
  slug: "valorant",
  title: "Valorant",
  coverImage: "/Images/Valorant/Cover.webp",
  bannerImage: "/Images/Valorant/Banner.webp",
  platform: "PC",
  rating: 4.5,
  description:
    "Valorant adalah game FPS kompetitif berbasis tim dari Riot Games yang menggabungkan elemen taktis ala CS:GO dengan kemampuan karakter unik seperti di Overwatch. Pemain memilih agen dengan peran dan kemampuan tertentu, lalu bertarung dalam mode bomb-plant 5v5. Fokus pada akurasi, koordinasi tim, dan strategi menjadikan Valorant pilihan utama untuk esports dan permainan kompetitif.",
  developer: "Riot Games",
  publisher: "Riot Games",
  genres: ["Shooter", "Tactical", "Competitive"],
  tags: ["Esports", "Team-Based", "Free to Play"],
  screenshots: [
    "/Images/Valorant/Gameplay1.webp",
    "/Images/Valorant/Gameplay2.webp",
    "/Images/Valorant/Gameplay3.webp"
  ],
  systemRequirements: `Minimum:
- OS: Windows 7/8/10 (64-bit)
- Processor: Intel Core 2 Duo E8400
- Memory: 4 GB RAM
- Graphics: Intel HD 3000
- Storage: 20 GB

Recommended:
- OS: Windows 10 (64-bit)
- Processor: Intel i3-4150
- Memory: 8 GB RAM
- Graphics: GTX 1050 Ti
- Storage: SSD`,
  installationNotes: "Download launcher dari Riot Games, login dengan akun Riot, dan instal Valorant.",
  downloadLinks: [
    { label: "Official Site", url: "https://playvalorant.com/" }
  ]
}

];
