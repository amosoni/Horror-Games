export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released?: string | null;
  background_image?: string | null;
  background_image_additional?: string | null;
  rating?: number;
  ratings_count?: number;
  metacritic?: number | null;
  platforms?: Array<{ platform: { id: number; name: string; slug: string } }>;
  genres?: Array<{ id: number; name: string; slug: string }>;
  tags?: Array<{ id: number; name: string; slug: string }>;
  stores?: Array<{ store: { id: number; name: string; slug: string }; url_en?: string }>;
}

export interface RawgListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface RawgGameDetail {
  id: number;
  slug: string;
  name: string;
  description_raw?: string;
  released?: string | null;
  background_image?: string | null;
  background_image_additional?: string | null;
  rating?: number;
  ratings_count?: number;
  metacritic?: number | null;
  platforms?: Array<{ platform: { id: number; name: string; slug: string } }>;
  genres?: Array<{ id: number; name: string; slug: string }>;
  tags?: Array<{ id: number; name: string; slug: string }>;
  developers?: Array<{ id: number; name: string }>;
  publishers?: Array<{ id: number; name: string }>;
  stores?: Array<{ store: { id: number; name: string; slug: string }; url_en?: string }>;
}

function buildQuery(params: Record<string, string | number | boolean | undefined | null>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    searchParams.append(key, String(value));
  }
  return searchParams.toString();
}

export async function rawgFetch<T>(path: string, params: Record<string, string | number | boolean | undefined | null> = {}): Promise<T> {
  // 尝试多种方式读取环境变量
  const apiKey = process.env.RAWG_API_KEY || 
                 process.env.NEXT_PUBLIC_RAWG_API_KEY || 
                 'be913d8207af4b21baf71a35d7e484a4'; // 备用密钥
  
  if (!apiKey) {
    throw new Error('RAWG_API_KEY is not set');
  }

  const baseUrl = 'https://api.rawg.io/api';
  // 强制使用英文语言参数
  const query = buildQuery({ key: apiKey, language: 'en', ...params });
  const url = `${baseUrl}${path}?${query}`;

  const res = await fetch(url, {
    // Ensure this only runs server-side; do not cache sensitive requests in the edge
    cache: 'no-store',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`RAWG request failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as T;
}

export async function fetchRawgGames(params: {
  search?: string;
  genres?: string; // comma-separated slugs, e.g., "horror"
  tags?: string; // comma-separated slugs, e.g., "co-op,cooperative"
  platforms?: string; // comma-separated ids
  ordering?: string; // e.g., "-rating", "-released"
  page?: number;
  page_size?: number;
  dates?: string; // e.g., "2020-01-01,2025-12-31"
}) {
  return rawgFetch<RawgListResponse<RawgGame>>('/games', params);
}

export async function fetchRawgGameDetail(id: number) {
  return rawgFetch<RawgGameDetail>(`/games/${id}`);
}

// Flexibly fetch RAWG game detail by id or slug
export async function fetchRawgGameDetailFlexible(idOrSlug: number | string) {
  return rawgFetch<RawgGameDetail>(`/games/${idOrSlug}`);
}

export async function fetchRawgScreenshots(id: number) {
  return rawgFetch<{ results: { image: string }[] }>(`/games/${id}/screenshots`);
}

export async function fetchRawgGameStores(id: number) {
  return rawgFetch<{ results: Array<{ id: number; url: string; store: { id: number; name: string; slug: string } }> }>(`/games/${id}/stores`);
}

export async function searchRawgGamesOnce(params: {
  search: string;
  page_size?: number;
  search_precise?: boolean;
  search_exact?: boolean;
  tags?: string;
}) {
  return rawgFetch<RawgListResponse<RawgGame>>('/games', params);
}
