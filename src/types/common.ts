// 通用游戏数据类型
export interface GameData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  rating?: number;
  platforms?: string[];
  genres?: string[];
  releaseDate?: string;
  [key: string]: unknown;
}

// API 响应类型
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

// 平台数据类型
export interface PlatformData {
  id: number;
  name: string;
  slug: string;
  games?: GameData[];
  [key: string]: unknown;
}

// 搜索过滤类型
export interface SearchFilters {
  query?: string;
  platform?: string;
  genre?: string;
  rating?: number;
  [key: string]: unknown;
}

// 分页类型
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 错误类型
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
} 