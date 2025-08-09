import { NextRequest } from 'next/server';
import { fetchRawgGames } from '../../../../services/rawgApi';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Allow pass-through of common RAWG filters with sane defaults
    const search = searchParams.get('search') ?? undefined;
    const ordering = searchParams.get('ordering') ?? '-rating';
    const page = Number(searchParams.get('page') ?? '1');
    const page_size = Number(searchParams.get('page_size') ?? '24');

    // 移除默认的 genres 参数，让 RAWG API 返回所有游戏
    const genres = searchParams.get('genres') ?? undefined;
    const tags = searchParams.get('tags') ?? undefined;
    const platforms = searchParams.get('platforms') ?? undefined;
    const dates = searchParams.get('dates') ?? undefined;

    const data = await fetchRawgGames({
      search,
      ordering,
      page,
      page_size,
      genres,
      tags,
      platforms,
      dates,
    });

    // Return RAWG response as-is for now; frontend can adapt mapping
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('RAWG proxy error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch from RAWG',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 