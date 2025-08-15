import { useState, useEffect, useCallback } from 'react';
import { PlatformApiResponse, PlatformGame } from '../services/platformApi';

interface UsePlatformDataOptions {
  platform?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // 毫秒
  cacheTimeout?: number; // 毫秒
}

interface PlatformDataState {
  data: PlatformApiResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

interface CacheEntry {
  data: PlatformApiResponse;
  timestamp: number;
}

// 内存缓存
const cache = new Map<string, CacheEntry>();

// API基础URL
const API_BASE_URL = '/api/platforms';

export function usePlatformData(options: UsePlatformDataOptions = {}) {
  const {
    platform,
    autoRefresh = false,
    refreshInterval = 300000, // 5分钟
    cacheTimeout = 600000 // 10分钟
  } = options;

  const [state, setState] = useState<PlatformDataState>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null
  });

  // 清理过期缓存
  const cleanCache = useCallback(() => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > cacheTimeout) {
        cache.delete(key);
      }
    }
  }, [cacheTimeout]);

  // 从API获取数据
  const fetchFromAPI = useCallback(async (platformName: string): Promise<PlatformApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/${platformName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }, []);

  // 获取单个平台数据
  const fetchPlatformData = useCallback(async (platformName: string) => {
    const cacheKey = `platform_${platformName}`;
    const cached = cache.get(cacheKey);
    
    // 检查缓存是否有效
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      setState({
        data: cached.data,
        loading: false,
        error: null,
        lastUpdated: cached.data.lastUpdated
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchFromAPI(platformName);
      
      // 更新缓存
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      setState({
        data,
        loading: false,
        error: null,
        lastUpdated: data.lastUpdated
      });
    } catch (error) {
      console.error(`Error fetching ${platformName} data:`, error);
      setState({
        data: null,
        loading: false,
        error: `Failed to fetch ${platformName} data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        lastUpdated: null
      });
    }
  }, [cacheTimeout, fetchFromAPI]);

  // 获取所有平台数据
  const fetchAllPlatformsData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const allData = await response.json();
      
      // 合并所有平台数据
      const combinedGames: PlatformGame[] = [];
      let totalGames = 0;
      
      Object.values(allData).forEach((platformData: unknown) => {
        const typedData = platformData as { games?: PlatformGame[]; total?: number };
        if (typedData.games) {
          combinedGames.push(...typedData.games);
          totalGames += typedData.total || 0;
        }
      });

      const combinedData: PlatformApiResponse = {
        games: combinedGames.sort((a, b) => b.rating - a.rating),
        total: totalGames,
        platform: 'All Platforms',
        lastUpdated: new Date().toISOString(),
        scrapingTime: 0
      };

      setState({
        data: combinedData,
        loading: false,
        error: null,
        lastUpdated: combinedData.lastUpdated
      });
    } catch (error) {
      console.error('Error fetching all platforms data:', error);
      setState({
        data: null,
        loading: false,
        error: `Failed to fetch all platforms data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        lastUpdated: null
      });
    }
  }, []);

  // 手动刷新数据
  const refresh = useCallback(async () => {
    if (platform) {
      await fetchPlatformData(platform);
    } else {
      await fetchAllPlatformsData();
    }
  }, [platform, fetchPlatformData, fetchAllPlatformsData]);

  // 清除错误状态
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // 获取特定排序的数据
  const getSortedGames = useCallback((sortBy: 'rating' | 'newest' | 'popular' | 'price') => {
    if (!state.data?.games) return [];

    return [...state.data.games].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [state.data]);

  // 搜索游戏
  const searchGames = useCallback((query: string) => {
    if (!state.data?.games || !query.trim()) return state.data?.games || [];

    const searchTerm = query.toLowerCase();
    return state.data.games.filter(game =>
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      game.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
      game.platform.some(p => p.toLowerCase().includes(searchTerm))
    );
  }, [state.data]);

  // 过滤游戏
  const filterGames = useCallback((filters: {
    genre?: string[];
    platform?: string[];
    priceRange?: { min: number; max: number };
    rating?: number;
  }) => {
    if (!state.data?.games) return [];

    return state.data.games.filter(game => {
      // 类型过滤
      if (filters.genre && filters.genre.length > 0) {
        if (!filters.genre.some(g => game.genre.includes(g))) {
          return false;
        }
      }

      // 平台过滤
      if (filters.platform && filters.platform.length > 0) {
        if (!filters.platform.some(p => game.platform.includes(p))) {
          return false;
        }
      }

      // 价格范围过滤
      if (filters.priceRange) {
        if (game.price < filters.priceRange.min || game.price > filters.priceRange.max) {
          return false;
        }
      }

      // 评分过滤
      if (filters.rating && game.rating < filters.rating) {
        return false;
      }

      return true;
    });
  }, [state.data]);

  // 初始数据加载
  useEffect(() => {
    if (platform) {
      fetchPlatformData(platform);
    } else {
      fetchAllPlatformsData();
    }
  }, [platform, fetchPlatformData, fetchAllPlatformsData]);

  // 自动刷新
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  // 定期清理缓存
  useEffect(() => {
    const interval = setInterval(cleanCache, 60000); // 每分钟清理一次
    return () => clearInterval(interval);
  }, [cleanCache]);

  return {
    ...state,
    refresh,
    clearError,
    getSortedGames,
    searchGames,
    filterGames,
    // 缓存统计
    cacheStats: {
      size: cache.size,
      keys: Array.from(cache.keys())
    }
  };
}

// 获取特定平台数据的Hook
export function useSteamData() {
  return usePlatformData({ platform: 'steam', autoRefresh: true });
}

export function usePlayStationData() {
  return usePlatformData({ platform: 'playstation', autoRefresh: true });
}

export function useXboxData() {
  return usePlatformData({ platform: 'xbox', autoRefresh: true });
}

export function useNintendoData() {
  return usePlatformData({ platform: 'nintendo', autoRefresh: true });
}

export function useRobloxData() {
  return usePlatformData({ platform: 'roblox', autoRefresh: true });
}

// 获取所有平台数据的Hook
export function useAllPlatformsData() {
  return usePlatformData({ autoRefresh: true });
} 