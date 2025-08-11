export const SECURITY_CONFIG = {
  // 反爬虫设置
  antiCrawler: {
    enabled: true,
    maxRequestsPerMinute: 100,
    maxRequestsPerHour: 1000,
    suspiciousScoreThreshold: 30,
    botBlockingEnabled: true,
    suspiciousBlockingEnabled: true,
  },

  // 安全头部设置
  securityHeaders: {
    xFrameOptions: 'SAMEORIGIN',
    xContentTypeOptions: 'nosniff',
    xXSSProtection: '1; mode=block',
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
    xRobotsTag: 'index, follow',
  },

  // 允许的域名
  allowedDomains: [
    'horrorgames.games',
    'localhost',
    '127.0.0.1',
  ],

  // 爬虫检测模式
  botPatterns: [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /crawling/i,
    /curl/i, /wget/i, /python/i, /java/i, /php/i,
    /scrapy/i, /selenium/i, /puppeteer/i, /playwright/i,
    /headless/i, /phantomjs/i, /casperjs/i,
  ],

  // 可疑行为检测
  suspiciousPatterns: {
    userAgentLength: { min: 10, max: 500 },
    missingHeaders: ['accept', 'accept-language', 'accept-encoding'],
    suspiciousAjax: true,
  },

  // 日志设置
  logging: {
    enabled: true,
    logLevel: 'info', // 'debug' | 'info' | 'warn' | 'error'
    logSuspicious: true,
    logBlocked: true,
  },
};

export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1分钟
  maxRequests: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}; 