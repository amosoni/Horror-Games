/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { fetchRawgGameDetail, searchRawgGamesOnce, type RawgGameDetail, fetchRawgScreenshots, fetchRawgGameStores, fetchRawgGameDetailFlexible } from '../../../../services/rawgApi';
import { horrorGames as localGames } from '../../../../data/games';

interface Game {
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

function normalizeTitle(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
    }

    const query = slug.replace(/-/g, ' ');

    // If local game exists, return mapped local data immediately
    const local = localGames.find(g => (g.canonicalSlug ?? g.id) === slug);
    if (local) {
      const mappedLocal: Game = {
        id: local.id,
        title: local.title,
        description: local.description,
        shortDescription: local.shortDescription,
        platform: local.platform,
        genre: local.genre,
        rating: local.rating,
        reviewCount: local.reviewCount,
        releaseDate: local.releaseDate,
        developer: local.developer || '',
        publisher: local.publisher || '',
        imageUrl: local.imageUrl,
        trailerUrl: undefined,
        iframeUrl: local.iframeUrl,
        steamUrl: local.steamUrl,
        price: local.price,
        featured: local.featured,
        tags: local.tags,
        metacritic: local.metacritic,
        storeLinks: local.storeLinks,
        canonicalSlug: local.canonicalSlug,
        screenshots: local.screenshots || [],
      };
      return new Response(JSON.stringify(mappedLocal), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
    }

    // Primary: search API to find the closest match
    const list = await searchRawgGamesOnce({
      search: query,
      page_size: 5,
      search_precise: true,
      search_exact: true,
      // Do not over-constrain with tags; fallback logic will handle genre filtering
    });

    const cleaned = normalizeTitle(query);
    let pick = (list.results || []).sort((a, b) => {
      const na = normalizeTitle(a.name);
      const nb = normalizeTitle(b.name);
      const da = Math.abs(na.length - cleaned.length) + (na.includes(cleaned) ? -5 : 0);
      const db = Math.abs(nb.length - cleaned.length) + (nb.includes(cleaned) ? -5 : 0);
      return da - db;
    })[0];

    let detail: RawgGameDetail | null = null;

    // Fallback A: fetch detail directly by slug (RAWG supports /games/{slug})
    if (!pick) {
      detail = await fetchRawgGameDetailFlexible(slug).catch(() => null);
    }

    // Fallback B: strip trailing year (e.g., -2023) and try again
    if (!pick && !detail) {
      const noYear = slug.replace(/-(19|20)\d{2}$/, '');
      if (noYear !== slug) {
        detail = await fetchRawgGameDetailFlexible(noYear).catch(() => null);
      }
    }

    // If we have detail from fallback, synthesize a minimal pick
    if (!pick && detail) {
      pick = {
        id: detail.id as number,
        slug: detail.slug || slug,
        name: detail.name,
        background_image: detail.background_image || null,
        background_image_additional: detail.background_image_additional || null,
      };
    }

    if (!pick) {
      return new Response(JSON.stringify({ error: 'Game not found' }), { status: 404 });
    }

    // Ensure we have detail object
    if (!detail) {
      detail = await fetchRawgGameDetail(pick.id);
    }

    // Fetch screenshots and stores in parallel to reduce latency
    const [shots, storesResp] = await Promise.all([
      fetchRawgScreenshots(pick.id).catch(() => ({ results: [] })),
      fetchRawgGameStores(pick.id).catch(() => ({ results: [] })),
    ]);

    const steamStore = detail.stores?.find((s) => s.store.slug === 'steam');
    const descriptionRaw = (detail.description_raw || '').trim();
    const shortDescription = descriptionRaw.slice(0, 160);

    const storeLinks: { label: string; url: string }[] = ((storesResp && Array.isArray((storesResp as any).results)) ? (storesResp as any).results : [])
      .filter((s: any) => s && typeof s.url === 'string' && s.store && typeof s.store.name === 'string')
      .map((s: any) => ({ label: String(s.store.name), url: String(s.url) }));

    // sort platform priority
    const order = ['steam', 'playstation', 'xbox', 'gog', 'epic-games'];
    storeLinks.sort((a: { label: string; url: string }, b: { label: string; url: string }) => {
      const ia = order.findIndex(k => a.label.toLowerCase().includes(k));
      const ib = order.findIndex(k => b.label.toLowerCase().includes(k));
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    const imageUrl = detail.background_image || detail.background_image_additional || (shots as any).results?.[0]?.image || pick.background_image || '';

    const canonicalSlug = detail.slug || pick.slug;

    // Fallback: if no store links from RAWG, provide search links for major stores
    if (storeLinks.length === 0 && detail.name) {
      const q = encodeURIComponent(detail.name);
      storeLinks.push(
        { label: 'Steam', url: `https://store.steampowered.com/search/?term=${q}` },
        { label: 'GOG', url: `https://www.gog.com/en/games?query=${q}` },
        { label: 'Epic Games', url: `https://store.epicgames.com/en-US/browse?q=${q}` },
        { label: 'PlayStation', url: `https://store.playstation.com/en-us/search/${q}` },
        { label: 'Xbox', url: `https://www.xbox.com/en-US/search?q=${q}` },
      );
    }

    const mapped: Game = {
      id: String(detail.id),
      title: detail.name,
      description: descriptionRaw,
      shortDescription,
      platform: detail.platforms?.map(p => p.platform.name) ?? [],
      genre: detail.genres?.map(g => g.name) ?? [],
      rating: Number(detail.rating ?? 0),
      reviewCount: Number(detail.ratings_count ?? 0),
      releaseDate: detail.released ?? '',
      developer: detail.developers?.map(d => d.name).join(', ') || '',
      publisher: detail.publishers?.map(p => p.name).join(', ') || '',
      imageUrl,
      trailerUrl: undefined,
      iframeUrl: undefined,
      steamUrl: steamStore?.url_en,
      price: 0,
      featured: false,
      tags: detail.tags?.map(t => t.name) ?? [],
      metacritic: detail.metacritic ?? undefined,
      storeLinks,
      canonicalSlug,
      screenshots: Array.isArray((shots as any).results) ? (shots as any).results.map((s: any) => String(s.image)).filter(Boolean) : [],
    };

    return new Response(JSON.stringify(mapped), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (err) {
    console.error('RAWG game detail proxy error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch RAWG game detail' }), { status: 500 });
  }
} 