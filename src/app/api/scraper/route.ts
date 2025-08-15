import { NextRequest, NextResponse } from 'next/server';
import { WebScraper } from '../../../services/webScraper';

const scraper = new WebScraper();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    
    if (platform) {
      // 抓取特定平台
      let result;
      switch (platform.toLowerCase()) {
        case 'steam':
          result = await scraper.scrapeSteam();
          break;
        case 'roblox':
          result = await scraper.scrapeRoblox();
          break;
        case 'playstation':
          result = await scraper.scrapePlayStation();
          break;
        case 'xbox':
          result = await scraper.scrapeXbox();
          break;
        case 'nintendo':
          result = await scraper.scrapeNintendo();
          break;
        default:
          return NextResponse.json(
            { error: `Unsupported platform: ${platform}` },
            { status: 400 }
          );
      }
      
      return NextResponse.json(result);
    } else {
      // 抓取所有平台
      const results = await scraper.scrapeAllPlatforms();
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error('Scraper API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to scrape data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { platforms, action } = await request.json();
    
    if (action === 'scrape') {
      if (platforms && Array.isArray(platforms)) {
        // 抓取指定平台
        const results: Record<string, unknown> = {};
        
        for (const platform of platforms) {
          try {
            let result;
            switch (platform.toLowerCase()) {
              case 'steam':
                result = await scraper.scrapeSteam();
                break;
              case 'roblox':
                result = await scraper.scrapeRoblox();
                break;
              case 'playstation':
                result = await scraper.scrapePlayStation();
                break;
              case 'xbox':
                result = await scraper.scrapeXbox();
                break;
              case 'nintendo':
                result = await scraper.scrapeNintendo();
                break;
              default:
                result = { error: `Unsupported platform: ${platform}` };
            }
            results[platform] = result;
          } catch (error) {
            results[platform] = {
              error: error instanceof Error ? error.message : 'Unknown error',
              games: [],
              total: 0,
              platform,
              lastUpdated: new Date().toISOString(),
              scrapingTime: 0
            };
          }
        }
        
        return NextResponse.json(results);
      } else {
        // 抓取所有平台
        const results = await scraper.scrapeAllPlatforms();
        return NextResponse.json(results);
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "scrape" to start scraping.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Scraper POST error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process scraping request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 