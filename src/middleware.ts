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
  
  // 反爬虫头部
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  
  // 检查 User-Agent
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  // 检查是否是明显的爬虫
  if (isBot) {
    return new NextResponse('Access denied for bots', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, noarchive'
      }
    });
  }
  
  // 检查请求频率（简单的 IP 检查）
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const path = request.nextUrl.pathname;
  
  // 记录访问日志（可选）
  console.log(`[${new Date().toISOString()}] ${ip} - ${request.method} ${path} - ${userAgent.substring(0, 100)}`);
  
  return res;
}

export const config = {
  matcher: ['/(.*)'],
}; 