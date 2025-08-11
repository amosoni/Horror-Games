"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Game } from '../types/game';
import type { RawgGame, RawgListResponse } from '../services/rawgApi';

function mapRawgToGame(rawg: RawgGame): Game {
  const steamStore = rawg.stores?.find((s) => s.store.slug === 'steam');
  return {
    id: String(rawg.id),
    title: rawg.name,
    description: '',
    shortDescription: '',
    platform: (rawg.platforms?.map((p) => p.platform.name) ?? []),
    genre: (rawg.genres?.map((g) => g.name) ?? []),
    rating: Number(rawg.rating ?? 0),
    reviewCount: Number(rawg.ratings_count ?? 0),
    releaseDate: rawg.released ?? '',
    developer: '',
    publisher: '',
    imageUrl: rawg.background_image ?? 'https://placehold.co/600x400?text=Game',
    trailerUrl: undefined,
    iframeUrl: undefined,
    steamUrl: steamStore ? undefined : undefined,
    price: 0,
    featured: false,
    tags: rawg.tags?.map((t) => t.name) ?? [],
    metacritic: rawg.metacritic ?? undefined,
    storeLinks: undefined,
    canonicalSlug: rawg.slug,
  };
}

export type SortKey = 'rating' | 'newest' | 'popular';

export function useRawgGames(options?: {
  genres?: string;
  tags?: string;
  platforms?: string;
  ordering?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  popularRandom?: boolean;
  dates?: string; // e.g., "2021-01-01,2025-12-31"
}) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = options?.page ?? 1;
  const page_size = options?.pageSize ?? 24;
  const ordering = options?.ordering ?? '-rating';
  const genres = options?.genres;
  const tags = options?.tags;
  const platforms = options?.platforms;
  const search = options?.search;
  const popularRandom = options?.popularRandom ?? false;
  const dates = options?.dates;

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const makeParams = (custom: Partial<Record<string, string>> = {}) => {
      const params = new URLSearchParams({ 
        ordering, 
          page: String(custom.page || page),
          page_size: String(custom.page_size || page_size),
      });
      if (genres) params.append('genres', genres);
      if (tags) params.append('tags', tags);
      if (platforms) params.append('platforms', platforms);
      if (search) params.append('search', search);
        if (dates) params.append('dates', dates);
        return params;
      };

      if (popularRandom) {
        const perPage = 40;
        const pagesToGet = 3;
        const requests: Promise<Response>[] = [];
        for (let i = 1; i <= pagesToGet; i++) {
          const params = makeParams({ page: String(i), page_size: String(perPage) });
          requests.push(fetch(`/api/rawg/games?${params.toString()}`, { cache: 'no-store' }));
        }
        const responses = await Promise.all(requests);
        const jsons: RawgListResponse<RawgGame>[] = await Promise.all(
          responses.map((r) => r.ok ? r.json() : Promise.resolve({ results: [] } as any))
        );
        const aggregated: RawgGame[] = jsons.flatMap(j => j.results || []);
        for (let i = aggregated.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [aggregated[i], aggregated[j]] = [aggregated[j], aggregated[i]];
        }
        const picked = aggregated.slice(0, page_size).map(mapRawgToGame);
        setGames(picked);
        setLoading(false);
        return;
      }

      const params = makeParams();
      const res = await fetch(`/api/rawg/games?${params.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: RawgListResponse<RawgGame> = await res.json();
      setGames((data.results || []).map(mapRawgToGame));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [ordering, page, page_size, genres, tags, platforms, search, popularRandom, dates]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const refresh = useCallback(() => fetchGames(), [fetchGames]);

  return { games, loading, error, refresh };
}

// Steam 恐怖游戏 Hook
export function useRawgSteamHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    platforms: '4', // Steam platform ID
    pageSize: options?.pageSize ?? 12, // 减少到12个精选游戏
    ordering: options?.ordering ?? '-rating', // 按评分排序，获取最热门的
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// PlayStation 恐怖游戏 Hook
export function useRawgPlayStationHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    platforms: '187,18,16,15,27', // PS5, PS4, PS3, PS2, PS1 platform IDs
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// Xbox 恐怖游戏 Hook
export function useRawgXboxHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    platforms: '1,186,14,80', // Xbox Series X/S, Xbox One, Xbox 360, Xbox platform IDs
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// Nintendo Switch 恐怖游戏 Hook
export function useRawgNintendoHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    platforms: '7', // Nintendo Switch platform ID
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// PC 恐怖游戏 Hook
export function useRawgPCHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    platforms: '4,6,5', // PC, Linux, macOS platform IDs
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// Roblox 恐怖游戏 Hook
export function useRawgRobloxHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror,multiplayer', // Roblox 主要是多人游戏
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// 合作恐怖游戏 Hook
export function useRawgCoopHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror,co-op,cooperative,multiplayer',
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// 免费恐怖游戏 Hook
export function useRawgFreeHorror(options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror,free-to-play',
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// 最新恐怖游戏 Hook
export function useRawgLatestHorror(options?: {
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    ordering: '-released',
    pageSize: options?.pageSize ?? 12,
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
}

// 搜索恐怖游戏 Hook
export function useRawgSearchHorror(searchQuery: string, options?: {
  ordering?: string;
  page?: number;
  pageSize?: number;
  popularRandom?: boolean;
  dates?: string;
}) {
  return useRawgGames({
    ...options,
    tags: 'horror',
    search: searchQuery,
    pageSize: options?.pageSize ?? 12,
    ordering: options?.ordering ?? '-rating',
    popularRandom: options?.popularRandom,
    dates: options?.dates,
  });
} 