import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://horrorgames.games';
  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/test', '/test-scraper']
    }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
} 