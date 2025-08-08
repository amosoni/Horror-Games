// 数据同步服务 - 用于定期更新游戏数据
import { PlatformApiFactory } from './platformApi';

interface SyncConfig {
  platforms: string[];
  interval: number; // 同步间隔（毫秒）
  retryAttempts: number;
  retryDelay: number;
}

interface SyncResult {
  platform: string;
  success: boolean;
  gamesCount: number;
  lastUpdated: string;
  error?: string;
}

class DataSyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  private isRunning = false;
  private config: SyncConfig;

  constructor(config: SyncConfig) {
    this.config = config;
  }

  // 开始定期同步
  startSync() {
    if (this.isRunning) {
      console.log('Data sync is already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting data sync service...');

    // 立即执行一次同步
    this.performSync();

    // 设置定期同步
    this.syncInterval = setInterval(() => {
      this.performSync();
    }, this.config.interval);
  }

  // 停止同步
  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.isRunning = false;
    console.log('Data sync service stopped');
  }

  // 执行同步
  private async performSync() {
    console.log(`Starting sync at ${new Date().toISOString()}`);
    
    const results: SyncResult[] = [];
    
    // 并行同步所有平台
    const syncPromises = this.config.platforms.map(platform => 
      this.syncPlatform(platform)
    );

    try {
      const platformResults = await Promise.allSettled(syncPromises);
      
      platformResults.forEach((result, index) => {
        const platform = this.config.platforms[index];
        
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            platform,
            success: false,
            gamesCount: 0,
            lastUpdated: new Date().toISOString(),
            error: result.reason?.message || 'Unknown error'
          });
        }
      });

      this.logSyncResults(results);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  // 同步单个平台
  private async syncPlatform(platform: string): Promise<SyncResult> {
    let attempts = 0;
    
    while (attempts < this.config.retryAttempts) {
      try {
        console.log(`Syncing ${platform} (attempt ${attempts + 1})`);
        
        const apiService = PlatformApiFactory.getApiService(platform);
        const data = await apiService.getTopHorrorGames();
        
        return {
          platform,
          success: true,
          gamesCount: data.games.length,
          lastUpdated: data.lastUpdated
        };
      } catch (error) {
        attempts++;
        console.error(`Error syncing ${platform} (attempt ${attempts}):`, error);
        
        if (attempts < this.config.retryAttempts) {
          // 等待重试
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        } else {
          throw error;
        }
      }
    }
    
    throw new Error(`Failed to sync ${platform} after ${this.config.retryAttempts} attempts`);
  }

  // 记录同步结果
  private logSyncResults(results: SyncResult[]) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log('=== Sync Results ===');
    console.log(`Successful: ${successful.length}/${results.length}`);
    console.log(`Failed: ${failed.length}/${results.length}`);
    
    successful.forEach(result => {
      console.log(`✅ ${result.platform}: ${result.gamesCount} games`);
    });
    
    failed.forEach(result => {
      console.log(`❌ ${result.platform}: ${result.error}`);
    });
    
    console.log('===================');
  }

  // 手动触发同步
  async manualSync(platforms?: string[]) {
    const platformsToSync = platforms || this.config.platforms;
    console.log(`Manual sync triggered for: ${platformsToSync.join(', ')}`);
    
    const results: SyncResult[] = [];
    
    for (const platform of platformsToSync) {
      try {
        const result = await this.syncPlatform(platform);
        results.push(result);
      } catch (error) {
        results.push({
          platform,
          success: false,
          gamesCount: 0,
          lastUpdated: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    this.logSyncResults(results);
    return results;
  }

  // 获取同步状态
  getStatus() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      lastSync: new Date().toISOString()
    };
  }
}

// 创建默认同步服务实例
const defaultSyncService = new DataSyncService({
  platforms: ['steam', 'playstation', 'xbox', 'nintendo', 'roblox'],
  interval: 30 * 60 * 1000, // 30分钟
  retryAttempts: 3,
  retryDelay: 5000 // 5秒
});

// 导出服务实例和类
export { DataSyncService, defaultSyncService };
export type { SyncConfig, SyncResult };

// 在开发环境中启动同步服务
if (process.env.NODE_ENV === 'development') {
  // 开发环境下每5分钟同步一次
  const devSyncService = new DataSyncService({
    platforms: ['steam', 'playstation', 'xbox', 'nintendo', 'roblox'],
    interval: 5 * 60 * 1000, // 5分钟
    retryAttempts: 2,
    retryDelay: 2000
  });
  
  devSyncService.startSync();
} 