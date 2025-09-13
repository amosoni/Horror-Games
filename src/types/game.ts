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
  // SEO and content fields
  gameplayDescription?: string;
  storyDescription?: string;
  keyFeatures?: string[];
  systemRequirements?: {
    minimum?: string;
    recommended?: string;
  };
  ageRating?: string;
  languages?: string[];
  playTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  multiplayerMode?: string;
  achievements?: number;
  dlcCount?: number;
  lastUpdated?: string;
  metaDescription?: string;
  metaKeywords?: string[];
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