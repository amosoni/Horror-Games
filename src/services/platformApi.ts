// 游戏平台API服务 - 使用真实爬虫
import { WebScraper, ScrapedGame, ScrapingResult } from './webScraper';

export type PlatformGame = ScrapedGame;

export type PlatformApiResponse = ScrapingResult;

// 创建爬虫实例
const scraper = new WebScraper();

// Steam平台API
export class SteamApiService {
  static async getTopHorrorGames(): Promise<PlatformApiResponse> {
    try {
      const result = await scraper.scrapeSteam();
      return result;
    } catch (error) {
      console.error('Error fetching Steam games:', error);
      return {
        games: [],
        total: 0,
        platform: 'Steam',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };
    }
  }
}

// PlayStation平台API
export class PlayStationApiService {
  static async getTopHorrorGames(): Promise<PlatformApiResponse> {
    try {
      const result = await scraper.scrapePlayStation();
      return result;
    } catch (error) {
      console.error('Error fetching PlayStation games:', error);
      return {
        games: [],
        total: 0,
        platform: 'PlayStation',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };
    }
  }
}

// Xbox平台API
export class XboxApiService {
  static async getTopHorrorGames(): Promise<PlatformApiResponse> {
    try {
      const result = await scraper.scrapeXbox();
      return result;
    } catch (error) {
      console.error('Error fetching Xbox games:', error);
      return {
        games: [],
        total: 0,
        platform: 'Xbox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };
    }
  }
}

// Nintendo平台API
export class NintendoApiService {
  static async getTopHorrorGames(): Promise<PlatformApiResponse> {
    try {
      const result = await scraper.scrapeNintendo();
      return result;
    } catch (error) {
      console.error('Error fetching Nintendo games:', error);
      return {
        games: [],
        total: 0,
        platform: 'Nintendo Switch',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };
    }
  }
}

// Roblox平台API
export class RobloxApiService {
  static async getTopHorrorGames(): Promise<PlatformApiResponse> {
    try {
      const result = await scraper.scrapeRoblox();
      return result;
    } catch (error) {
      console.error('Error fetching Roblox games:', error);
      return {
        games: [],
        total: 0,
        platform: 'Roblox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };
    }
  }
}

// 平台API工厂
export class PlatformApiFactory {
  static getApiService(platform: string) {
    switch (platform.toLowerCase()) {
      case 'steam':
        return SteamApiService;
      case 'playstation':
      case 'ps':
        return PlayStationApiService;
      case 'xbox':
        return XboxApiService;
      case 'nintendo':
      case 'switch':
        return NintendoApiService;
      case 'roblox':
        return RobloxApiService;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  static async getAllPlatformsData(): Promise<Record<string, PlatformApiResponse>> {
    try {
      const results = await scraper.scrapeAllPlatforms();
      return results;
    } catch (error) {
      console.error('Error fetching all platforms data:', error);
      return {
        steam: { games: [], total: 0, platform: 'Steam', lastUpdated: new Date().toISOString(), scrapingTime: 0 },
        playstation: { games: [], total: 0, platform: 'PlayStation', lastUpdated: new Date().toISOString(), scrapingTime: 0 },
        xbox: { games: [], total: 0, platform: 'Xbox', lastUpdated: new Date().toISOString(), scrapingTime: 0 },
        nintendo: { games: [], total: 0, platform: 'Nintendo Switch', lastUpdated: new Date().toISOString(), scrapingTime: 0 },
        roblox: { games: [], total: 0, platform: 'Roblox', lastUpdated: new Date().toISOString(), scrapingTime: 0 }
      };
    }
  }
} 