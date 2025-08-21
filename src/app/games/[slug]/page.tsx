import { Metadata } from 'next';
import GameDetailPage from '../../../components/GameDetailPage';
import { fetchRawgGameDetailFlexible, searchRawgGamesOnce, type RawgGameDetail } from '../../../services/rawgApi';
import { horrorGames as localGames } from '../../../data/games';
import { halloweenGames } from '../../../data/halloweenGames';
import type { Game as LocalGame } from '../../../types/game';
import { gameSeoBySlug } from '../../../data/gameSeo';

// Next 15 types expect params/searchParams to be Promises in PageProps.
// We model just what we need from params.
interface RouteParams {
  slug?: string | string[];
}

async function getSeoGame(slugStr: string): Promise<RawgGameDetail | null> {
  // Short-circuit with local data if available
  const local = localGames.find((g: LocalGame) => (g.canonicalSlug ?? g.id) === slugStr) || 
                halloweenGames.find((g: LocalGame) => (g.canonicalSlug ?? g.id) === slugStr);
  if (local) {
    return {
      id: Number.NaN,
      slug: local.canonicalSlug ?? local.id,
      name: local.title,
      description_raw: local.description,
      background_image: local.imageUrl,
      background_image_additional: undefined,
      rating: local.rating,
      ratings_count: local.reviewCount,
      genres: local.genre.map((name: string, i: number) => ({ id: i + 1, name, slug: name.toLowerCase().replace(/\s+/g, '-') })),
      platforms: local.platform.map((name: string, i: number) => ({ platform: { id: i + 1, name, slug: name.toLowerCase().replace(/\s+/g, '-') } })),
      tags: local.tags.map((name: string, i: number) => ({ id: i + 1, name, slug: name.toLowerCase().replace(/\s+/g, '-') })),
      developers: local.developer ? [{ id: 1, name: local.developer as string }] : [],
      publishers: local.publisher ? [{ id: 1, name: local.publisher as string }] : [],
    } as unknown as RawgGameDetail;
  }
  // Try direct by slug
  const tryDirect = await fetchRawgGameDetailFlexible(slugStr).catch(() => null);
  if (tryDirect) return tryDirect;
  // Try without trailing year
  const noYear = slugStr.replace(/-(19|20)\d{2}$/, '');
  if (noYear !== slugStr) {
    const byNoYear = await fetchRawgGameDetailFlexible(noYear).catch(() => null);
    if (byNoYear) return byNoYear;
  }
  // Fallback search
  const query = slugStr.replace(/-/g, ' ');
  const list = await searchRawgGamesOnce({ search: query, page_size: 1, search_exact: true, search_precise: true }).catch(() => null);
  if (list && list.results?.length) {
    const picked = list.results[0];
    const detail = await fetchRawgGameDetailFlexible(picked.id).catch(() => null);
    if (detail) return detail;
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug[0] ?? '' : slug ?? '';

  const detail = await getSeoGame(slugStr);
  const gameTitle = detail?.name || slugStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const description = (detail?.description_raw || '').trim().slice(0, 160) || `Play ${gameTitle} online. Experience the best horror games with our curated rankings.`;
  const extra = gameSeoBySlug[slugStr];
  const metaDescription = extra?.description || description;
  const image = detail?.background_image || detail?.background_image_additional || '/og-image.jpg';
  const baseUrl = 'https://horrorgames.games';
  const canonical = `${baseUrl}/games/${detail?.slug || slugStr}`;
  const isLocalPlayable = Boolean((localGames.find(g => (g.canonicalSlug ?? g.id) === slugStr && g.iframeUrl)) || 
                                (halloweenGames.find(g => (g.canonicalSlug ?? g.id) === slugStr && g.iframeUrl)));
  const titleText = isLocalPlayable ? `${gameTitle} Online Game - Play Now` : `${gameTitle} - Horror Games Online`;

  return {
    title: titleText,
    description: metaDescription,
    keywords: [
      'horror games',
      'online games',
      gameTitle.toLowerCase(),
      'scary games',
      ...(detail?.genres?.map(g => g.name.toLowerCase()) || []),
      ...(extra?.keywords || []),
    ],
    alternates: { canonical },
    openGraph: {
      title: titleText,
      description: metaDescription,
      siteName: 'Horror Games Online',
      type: 'article',
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: gameTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: metaDescription,
      images: [image],
    },
  };
}

export default async function GamePage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug[0] ?? '' : slug ?? '';

  const detail = await getSeoGame(slugStr);
  // const gameTitle = detail?.name || slugStr;
  const image = detail?.background_image || detail?.background_image_additional || '/og-image.jpg';
  const isLocalPlayable = Boolean((localGames.find(g => (g.canonicalSlug ?? g.id) === slugStr && g.iframeUrl)) || 
                                (halloweenGames.find(g => (g.canonicalSlug ?? g.id) === slugStr && g.iframeUrl)));
  const extra = gameSeoBySlug[slugStr];
  const baseUrl = 'https://horrorgames.games';
  const canonical = `${baseUrl}/games/${detail?.slug || slugStr}`;

  const jsonLdBlocks = [] as unknown[];
  if (detail) {
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: detail.name,
      image,
      url: canonical,
      description: (extra?.description || detail.description_raw || '').trim().slice(0, 500),
      genre: detail.genres?.map(g => g.name),
      gamePlatform: detail.platforms?.map(p => p.platform.name),
      potentialAction: isLocalPlayable ? { '@type': 'PlayAction', target: canonical } : undefined,
      aggregateRating: detail.rating
        ? {
            '@type': 'AggregateRating',
            ratingValue: String(detail.rating),
            reviewCount: String(detail.ratings_count || 0),
          }
        : undefined,
    });
    // Breadcrumbs
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Games', item: `${baseUrl}/games` },
        { '@type': 'ListItem', position: 3, name: detail.name, item: canonical },
      ],
    });
    // FAQPage
    if (extra?.faqs?.length) {
      jsonLdBlocks.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: extra.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }
    // HowTo
    if (extra?.howTo?.length) {
      jsonLdBlocks.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to play ${detail.name}`,
        step: extra.howTo.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s })),
      });
    }
  }

  return (
    <>
      {jsonLdBlocks.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <GameDetailPage slug={slugStr} />
    </>
  );
} 