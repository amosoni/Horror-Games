import { MetadataRoute } from 'next';
import { curatedWebSlugs } from '../data/games';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://horrorgames.games';
  // Stabilize lastModified to reduce noisy daily changes
  const lastModified = new Date('2025-01-01T00:00:00.000Z');
  
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/horror-games`, lastModified, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/granny`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    // Core topic pages - high priority
    { url: `${baseUrl}/horror-games-online`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/free-horror-games`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/horror-games-multiplayer`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-2025`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/survival-horror-games`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/psychological-horror-games`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/jump-scare-games`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/co-op-horror-games`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/halloween-games`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    // Platform pages
    { url: `${baseUrl}/horror-games-on-steam`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-on-playstation`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-on-xbox`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-on-nintendo`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-on-pc`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/horror-games-on-roblox`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    // Other pages
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog/silent-hill-f`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const gamePages: MetadataRoute.Sitemap = curatedWebSlugs.map((slug) => ({
    url: `${baseUrl}/games/${slug}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages, ...gamePages];
} 