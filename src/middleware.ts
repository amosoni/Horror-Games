import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  
  // 基础安全头部
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://horrorgames.games");
  
  // 增强安全头部
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // 允许生产环境索引，非生产环境不索引
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  res.headers.set('X-Robots-Tag', isProduction ? 'index, follow' : 'noindex, nofollow');
  
  // 检查 User-Agent
  const userAgent = request.headers.get('user-agent') || '';

  // 放行主流搜索引擎爬虫（Google、Bing、Yahoo、DuckDuckGo、Yandex、Baidu 等）以及常见SEO审计工具
  const allowedSearchBots = /(googlebot|bingbot|slurp|duckduckbot|yandex(bot)?|baiduspider|sogou|exabot|ahrefsbot|semrush(bot)?|mj12bot|seznambot|dotbot|rogerbot|facebookexternalhit|linkedinbot|twitterbot)/i;
  const isAllowedSearchBot = allowedSearchBots.test(userAgent);

  // 通用爬虫特征（用于拦截未知或恶意爬虫）
  const genericBotPattern = /(bot|crawler|spider|crawling)/i;
  const isGenericBot = genericBotPattern.test(userAgent);
  
  // 检查是否是明显的且不在白名单内的爬虫
  if (isGenericBot && !isAllowedSearchBot) {
    return new NextResponse('Access denied for bots', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, noarchive'
      }
    });
  }
  
  // 简单的访问日志
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const path = request.nextUrl.pathname;
  console.log(`[${new Date().toISOString()}] ${ip} - ${request.method} ${path} - ${userAgent.substring(0, 100)}`);
  
  return res;
}

export const config = {
  matcher: ['/(.*)'],
}; 