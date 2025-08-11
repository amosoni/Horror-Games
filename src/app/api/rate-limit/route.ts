import { NextRequest, NextResponse } from 'next/server';

// 简单的内存存储（生产环境建议使用 Redis）
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1分钟
const MAX_REQUESTS = 100; // 每分钟最多100次请求

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const userRequests = requestCounts.get(ip);
  
  if (!userRequests || now > userRequests.resetTime) {
    // 重置计数器
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    // 增加计数器
    userRequests.count++;
    if (userRequests.count > MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
  }
  
  return NextResponse.json({ 
    message: 'Rate limit check passed',
    remaining: MAX_REQUESTS - (userRequests?.count || 1)
  });
}

export async function POST(request: NextRequest) {
  // 对 POST 请求应用更严格的限制
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const userRequests = requestCounts.get(ip);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    userRequests.count += 2; // POST 请求权重更高
    if (userRequests.count > MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded for POST requests.' },
        { status: 429 }
      );
    }
  }
  
  return NextResponse.json({ 
    message: 'POST request rate limit check passed',
    remaining: MAX_REQUESTS - (userRequests?.count || 1)
  });
} 