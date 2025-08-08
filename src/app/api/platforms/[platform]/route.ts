import { NextRequest, NextResponse } from 'next/server';
import { PlatformApiFactory } from '../../../../services/platformApi';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const platform = params.platform;
    
    // 验证平台参数
    const validPlatforms = ['steam', 'playstation', 'xbox', 'nintendo', 'roblox', 'all'];
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return NextResponse.json(
        { error: `Invalid platform: ${platform}` },
        { status: 400 }
      );
    }

    let data;
    
    if (platform.toLowerCase() === 'all') {
      // 获取所有平台数据
      data = await PlatformApiFactory.getAllPlatformsData();
    } else {
      // 获取特定平台数据
      const apiService = PlatformApiFactory.getApiService(platform);
      data = await apiService.getTopHorrorGames();
    }

    // 设置缓存头
    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5分钟缓存
      'Content-Type': 'application/json',
    };

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error(`Error fetching ${params.platform} data:`, error);
    
    return NextResponse.json(
      { 
        error: `Failed to fetch ${params.platform} data`,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 获取所有平台数据的路由
export async function POST(request: NextRequest) {
  try {
    const { platforms } = await request.json();
    
    if (!platforms || !Array.isArray(platforms)) {
      return NextResponse.json(
        { error: 'Platforms array is required' },
        { status: 400 }
      );
    }

    const results: Record<string, any> = {};
    
    // 并行获取多个平台数据
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
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Content-Type': 'application/json',
    };

    return NextResponse.json(results, { headers });
  } catch (error) {
    console.error('Error fetching multiple platforms data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch platforms data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 