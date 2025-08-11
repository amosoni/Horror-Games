// Web scraping service for fetching platform data (demo)
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedGame {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  releaseDate: string;
  platform: string[];
  genre: string[];
  steamUrl?: string;
  iframeUrl?: string;
  tags: string[];
}

export interface ScrapingResult {
  games: ScrapedGame[];
  total: number;
  platform: string;
  lastUpdated: string;
  scrapingTime: number;
}

// Helpers to auto-correct scraping
function normalizeText(text: string | undefined): string {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function toAbsoluteUrl(src: string | undefined, base: string): string {
  const s = (src || '').trim();
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('//')) return `https:${s}`;
  try {
    const u = new URL(s, base);
    return u.href;
  } catch {
    return s;
  }
}

function parsePrice(text: string | undefined): number {
  const t = (text || '').toLowerCase();
  if (t.includes('free') || t.includes('免费')) return 0;
  const n = parseFloat(t.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function inferRatingFromSummary(summary: string | undefined): number {
  const s = (summary || '').toLowerCase();
  if (/overwhelmingly positive|特别好评|overwhelmingly\s+positive/.test(s)) return 4.8;
  if (/very positive|好评如潮|very\s+positive/.test(s)) return 4.6;
  if (/mostly positive|多半好评|mostly\s+positive/.test(s)) return 4.3;
  if (/mixed|褒贬不一/.test(s)) return 3.5;
  if (/mostly negative|多半差评/.test(s)) return 2.8;
  return 4.0;
}

class WebScraper {
  private userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  ];

  private getRandomUserAgent(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  private async fetchWithRetry(url: string, retries = 3): Promise<string> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': this.getRandomUserAgent(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Referer': url,
            'Upgrade-Insecure-Requests': '1',
          },
          timeout: 15000,
          validateStatus: (s) => s >= 200 && s < 500,
        });
        return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1500 * (i + 1)));
      }
    }
    throw new Error('Failed to fetch after retries');
  }

  // Steam (uses search/results JSON API)
  async scrapeSteam(): Promise<ScrapingResult> {
    const startTime = Date.now();
    const games: ScrapedGame[] = [];

    try {
      const steamJsonUrl = 'https://store.steampowered.com/search/results/?query&norender=1&infinite=1&start=0&count=50&category1=998&term=horror';
      const jsonText = await this.fetchWithRetry(steamJsonUrl);

      const data: { results_html?: string } = typeof jsonText === 'string' ? JSON.parse(jsonText) : { results_html: String(jsonText || '') };
      const html = data.results_html ?? '';
      if (!html) throw new Error('Empty results_html from Steam');

      const $ = cheerio.load(html);

      $('.search_result_row').each((index, element) => {
        if (index >= 25) return;
        const $el = $(element);
        const title = normalizeText($el.find('.search_name .title').text());
        const price = parsePrice($el.find('.search_price').text());
        let imageUrl = $el.find('.search_capsule img').attr('src') || '';
        const steamUrl = $el.attr('href') || '';
        const reviewSummary = $el.find('.search_review_summary').attr('data-tooltip-html') || '';
        const appId = $el.attr('data-ds-appid') || '';

        // Normalize image URL using appId when possible
        if (appId) {
          imageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_sm_120.jpg`;
        } else if (imageUrl.startsWith('//')) {
          imageUrl = `https:${imageUrl}`;
        } else if (/shared\.st\.dl\.eccdnx\.com/.test(imageUrl)) {
          const path = imageUrl.replace(/^https?:\/\/[^/]+\//, '');
          imageUrl = `https://cdn.cloudflare.steamstatic.com/${path.replace('store_item_assets/', '')}`;
        }

        const rating = inferRatingFromSummary(reviewSummary);

        if (title) {
          games.push({
            id: `steam-${index}`,
            title,
            description: `A horror game available on Steam. ${title} offers a terrifying gaming experience.`,
            shortDescription: `Horror game on Steam - ${title}`,
            imageUrl,
            rating,
            reviewCount: Math.floor(Math.random() * 50000) + 200,
            price,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0],
            platform: ['Steam', 'PC'],
            genre: ['Horror'],
            steamUrl,
            tags: ['steam', 'horror']
          });
        }
      });

      return {
        games: games.sort((a, b) => b.rating - a.rating),
        total: games.length,
        platform: 'Steam',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('Steam scraping error:', error);
      return {
        games: [],
        total: 0,
        platform: 'Steam',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    }
  }

  // Roblox
  async scrapeRoblox(): Promise<ScrapingResult> {
    const startTime = Date.now();
    const games: ScrapedGame[] = [];

    try {
      const robloxUrl = 'https://www.roblox.com/discover/?Keyword=horror&SortType=0';
      const html = await this.fetchWithRetry(robloxUrl);
      const $ = cheerio.load(html);

      const cards = $('.game-card-container');
      const nodes = cards.length ? cards : $('[data-testid="game-card"], .game-card, .grid-item');

      nodes.each((index, element) => {
        if (index >= 15) return;

        const $el = $(element);
        const title = normalizeText($el.find('.game-card-name, [data-testid="game-name"]').text());
        const imgSrc = $el.find('.game-card-thumb img, img[loading="lazy"], img').attr('src') || '';
        const imageUrl = toAbsoluteUrl(imgSrc, 'https://www.roblox.com');

        if (title) {
          games.push({
            id: `roblox-${index}`,
            title,
            description: `A multiplayer horror game on Roblox. ${title} offers a terrifying experience for players.`,
            shortDescription: `Multiplayer horror on Roblox - ${title}`,
            imageUrl,
            rating: 4.0 + Math.random() * 1.0,
            reviewCount: Math.floor(Math.random() * 50000) + 1000,
            price: 0,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            platform: ['Roblox'],
            genre: ['Horror', 'Multiplayer'],
            iframeUrl: `https://www.roblox.com/games/${index + 1000000}`,
            tags: ['roblox', 'horror', 'multiplayer']
          });
        }
      });

      return {
        games: games.sort((a, b) => b.rating - a.rating),
        total: games.length,
        platform: 'Roblox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('Roblox scraping error:', error);
      return {
        games: [],
        total: 0,
        platform: 'Roblox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    }
  }

  // PlayStation Store
  async scrapePlayStation(): Promise<ScrapingResult> {
    const startTime = Date.now();
    const games: ScrapedGame[] = [];

    try {
      const psUrl = 'https://store.playstation.com/en-us/category/44d8bb20-653e-431e-8ad0-c0a365f68d2f';
      const html = await this.fetchWithRetry(psUrl);
      const $ = cheerio.load(html);

      const tiles = $('.psw-product-tile');
      const nodes = tiles.length ? tiles : $('[data-qa="ems-sdk-grid#product-tile"], article');

      nodes.each((index, element) => {
        if (index >= 15) return;

        const $el = $(element);
        const title = normalizeText($el.find('.psw-product-tile__title, [data-qa="ems-sdk-grid#product-name"]').text());
        const priceText = $el.find('.psw-price, [data-qa="mfeCtaMain#offer0#finalPrice"]').text();
        const price = parsePrice(priceText);
        const imgSrc = $el.find('.psw-product-tile__img img, img').attr('src') || '';
        const imageUrl = toAbsoluteUrl(imgSrc, 'https://store.playstation.com');

        if (title) {
          games.push({
            id: `ps-${index}`,
            title,
            description: `A horror game available on PlayStation. ${title} delivers a terrifying gaming experience.`,
            shortDescription: `Horror game on PlayStation - ${title}`,
            imageUrl,
            rating: 4.0 + Math.random() * 1.0,
            reviewCount: Math.floor(Math.random() * 20000) + 500,
            price,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            platform: ['PlayStation', 'PS4', 'PS5'],
            genre: ['Horror'],
            tags: ['playstation', 'horror']
          });
        }
      });

      return {
        games: games.sort((a, b) => b.rating - a.rating),
        total: games.length,
        platform: 'PlayStation',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('PlayStation scraping error:', error);
      return {
        games: [],
        total: 0,
        platform: 'PlayStation',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    }
  }

  // Xbox Store
  async scrapeXbox(): Promise<ScrapingResult> {
    const startTime = Date.now();
    const games: ScrapedGame[] = [];

    try {
      const xboxUrl = 'https://www.xbox.com/en-US/games/horror-games';
      const html = await this.fetchWithRetry(xboxUrl);
      const $ = cheerio.load(html);

      const cards = $('.game-card');
      const nodes = cards.length ? cards : $('[data-automation-id="gameProductCard"], article');

      nodes.each((index, element) => {
        if (index >= 15) return;

        const $el = $(element);
        const title = normalizeText($el.find('.game-title, [data-automation-id="productTitle"]').text());
        const price = parsePrice($el.find('.game-price, [itemprop="price"]').text());
        const imgSrc = $el.find('.game-image img, img').attr('src') || '';
        const imageUrl = toAbsoluteUrl(imgSrc, 'https://www.xbox.com');

        if (title) {
          games.push({
            id: `xbox-${index}`,
            title,
            description: `A horror game available on Xbox. ${title} offers a terrifying gaming experience.`,
            shortDescription: `Horror game on Xbox - ${title}`,
            imageUrl,
            rating: 4.0 + Math.random() * 1.0,
            reviewCount: Math.floor(Math.random() * 15000) + 300,
            price,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            platform: ['Xbox', 'Xbox One', 'Xbox Series X'],
            genre: ['Horror'],
            tags: ['xbox', 'horror']
          });
        }
      });

      return {
        games: games.sort((a, b) => b.rating - a.rating),
        total: games.length,
        platform: 'Xbox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('Xbox scraping error:', error);
      return {
        games: [],
        total: 0,
        platform: 'Xbox',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    }
  }

  // Nintendo eShop
  async scrapeNintendo(): Promise<ScrapingResult> {
    const startTime = Date.now();
    const games: ScrapedGame[] = [];

    try {
      const nintendoUrl = 'https://www.nintendo.com/store/products/horror-games/';
      const html = await this.fetchWithRetry(nintendoUrl);
      const $ = cheerio.load(html);

      const items = $('.product-item');
      const nodes = items.length ? items : $('[data-test="productCard"], article');

      nodes.each((index, element) => {
        if (index >= 15) return;

        const $el = $(element);
        const title = normalizeText($el.find('.product-title, [data-test="productTitle"]').text());
        const price = parsePrice($el.find('.product-price, [data-test="currentPrice"]').text());
        const imgSrc = $el.find('.product-image img, img').attr('src') || '';
        const imageUrl = toAbsoluteUrl(imgSrc, 'https://www.nintendo.com');

        if (title) {
          games.push({
            id: `nintendo-${index}`,
            title,
            description: `A horror game available on Nintendo Switch. ${title} delivers a terrifying gaming experience.`,
            shortDescription: `Horror game on Nintendo Switch - ${title}`,
            imageUrl,
            rating: 4.0 + Math.random() * 1.0,
            reviewCount: Math.floor(Math.random() * 10000) + 200,
            price,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            platform: ['Nintendo Switch'],
            genre: ['Horror'],
            tags: ['nintendo', 'horror']
          });
        }
      });

      return {
        games: games.sort((a, b) => b.rating - a.rating),
        total: games.length,
        platform: 'Nintendo Switch',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('Nintendo scraping error:', error);
      return {
        games: [],
        total: 0,
        platform: 'Nintendo Switch',
        lastUpdated: new Date().toISOString(),
        scrapingTime: Date.now() - startTime
      };
    }
  }

  // Aggregate all
  async scrapeAllPlatforms(): Promise<Record<string, ScrapingResult>> {
    const results: Record<string, ScrapingResult> = {};
    
    const platforms = [
      { name: 'steam', scraper: () => this.scrapeSteam() },
      { name: 'roblox', scraper: () => this.scrapeRoblox() },
      { name: 'playstation', scraper: () => this.scrapePlayStation() },
      { name: 'xbox', scraper: () => this.scrapeXbox() },
      { name: 'nintendo', scraper: () => this.scrapeNintendo() }
    ];

    const promises = platforms.map(async ({ name, scraper }) => {
      try {
        const result = await scraper();
        results[name] = result;
        console.log(`✅ Scraped ${name}: ${result.games.length} games (${result.scrapingTime}ms)`);
      } catch (error) {
        console.error(`❌ Failed to scrape ${name}:`, error);
        results[name] = {
          games: [],
          total: 0,
          platform: name,
          lastUpdated: new Date().toISOString(),
          scrapingTime: 0
        };
      }
    });

    await Promise.all(promises);
    return results;
  }
}

export { WebScraper }; 