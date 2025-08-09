export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  platform: string[];
  genre: string[];
  rating: number;
  reviewCount: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  imageUrl: string;
  trailerUrl?: string;
  iframeUrl?: string;
  steamUrl?: string;
  price?: number;
  featured: boolean;
  tags: string[];
  metacritic?: number;
  storeLinks?: { label: string; url: string }[];
  canonicalSlug?: string;
  screenshots?: string[];
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  games: Game[];
}

export interface Review {
  id: string;
  gameId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}