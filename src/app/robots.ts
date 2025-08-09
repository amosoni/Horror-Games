import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://horrorgames.games';
  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/']
    }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
} 