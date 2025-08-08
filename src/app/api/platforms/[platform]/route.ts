// 使用 Web 标准 Request/Response，兼容 Next.js 15 路由类型检查
import { PlatformApiFactory } from '../../../../services/platformApi';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await params;

    const validPlatforms = ['steam', 'playstation', 'xbox', 'nintendo', 'roblox', 'all'];
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return new Response(JSON.stringify({ error: `Invalid platform: ${platform}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let data: any;

    if (platform.toLowerCase() === 'all') {
      data = await PlatformApiFactory.getAllPlatformsData();
    } else {
      const apiService = PlatformApiFactory.getApiService(platform);
      data = await apiService.getTopHorrorGames();
    }

    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Content-Type': 'application/json',
    } as const;

    return new Response(JSON.stringify(data), { headers });
  } catch (error) {
    console.error('Error fetching platform data:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch platform data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { platforms } = await req.json();

    if (!platforms || !Array.isArray(platforms)) {
      return new Response(JSON.stringify({ error: 'Platforms array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const results: Record<string, any> = {};

    await Promise.all(
      platforms.map(async (platform: string) => {
        try {
          const apiService = PlatformApiFactory.getApiService(platform);
          results[platform] = await apiService.getTopHorrorGames();
        } catch (error) {
          console.error(`Error fetching ${platform} data:`, error);
          results[platform] = {
            games: [],
            total: 0,
            platform,
            lastUpdated: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Content-Type': 'application/json',
    } as const;

    return new Response(JSON.stringify(results), { headers });
  } catch (error) {
    console.error('Error fetching multiple platforms data:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch platforms data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 