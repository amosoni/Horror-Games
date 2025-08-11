export interface CrawlerDetection {
  isBot: boolean;
  isSuspicious: boolean;
  reason: string[];
  score: number;
}

export function detectCrawler(userAgent: string, headers: Record<string, string>): CrawlerDetection {
  const result: CrawlerDetection = {
    isBot: false,
    isSuspicious: false,
    reason: [],
    score: 0
  };

  // 检查明显的爬虫标识
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /crawling/i,
    /curl/i, /wget/i, /python/i, /java/i, /php/i,
    /scrapy/i, /selenium/i, /puppeteer/i, /playwright/i
  ];

  botPatterns.forEach(pattern => {
    if (pattern.test(userAgent)) {
      result.isBot = true;
      result.score += 50;
      result.reason.push(`Bot pattern detected: ${pattern.source}`);
    }
  });

  // 检查可疑的 User-Agent
  if (!userAgent || userAgent.length < 10) {
    result.score += 20;
    result.reason.push('Suspicious User-Agent length');
  }

  if (userAgent.includes('Mozilla') && userAgent.includes('Chrome') && userAgent.length < 50) {
    result.score += 15;
    result.reason.push('Suspicious Chrome User-Agent');
  }

  // 检查缺少常见的浏览器头部
  const requiredHeaders = ['accept', 'accept-language', 'accept-encoding'];
  requiredHeaders.forEach(header => {
    if (!headers[header]) {
      result.score += 10;
      result.reason.push(`Missing header: ${header}`);
    }
  });

  // 检查可疑的请求模式
  if (headers['x-requested-with'] === 'XMLHttpRequest' && !userAgent.includes('Mozilla')) {
    result.score += 25;
    result.reason.push('Suspicious AJAX request without proper User-Agent');
  }

  // 判断是否可疑
  result.isSuspicious = result.score >= 30;

  return result;
}

export function shouldBlockRequest(detection: CrawlerDetection): boolean {
  return detection.isBot || detection.isSuspicious;
}

export function getBlockReason(detection: CrawlerDetection): string {
  if (detection.isBot) {
    return 'Bot access detected';
  }
  if (detection.isSuspicious) {
    return `Suspicious activity detected (score: ${detection.score})`;
  }
  return 'Access allowed';
} 