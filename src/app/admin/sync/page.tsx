"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Play, 
  Pause, 
  Settings, 
  Database, 
  Clock, 
  CheckCircle, 
  XCircle,
  Activity,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';

interface SyncStatus {
  isRunning: boolean;
  lastSync: string;
  platforms: string[];
  interval: number;
}

interface SyncResult {
  platform: string;
  success: boolean;
  gamesCount: number;
  lastUpdated: string;
  error?: string;
  scrapingTime?: number;
}

interface ScrapingResult {
  games: any[];
  total: number;
  platform: string;
  lastUpdated: string;
  scrapingTime: number;
  error?: string;
}

export default function SyncManagementPage() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [lastResults, setLastResults] = useState<SyncResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scrapingResults, setScrapingResults] = useState<Record<string, ScrapingResult>>({});

  const platforms = ['steam', 'playstation', 'xbox', 'nintendo', 'roblox'];

  // 获取同步状态
  const fetchSyncStatus = async () => {
    try {
      const response = await fetch('/api/admin/sync/status');
      if (response.ok) {
        const status = await response.json();
        setSyncStatus(status);
      }
    } catch (error) {
      console.error('Error fetching sync status:', error);
    }
  };

  // 手动触发爬虫
  const triggerScraping = async () => {
    setIsLoading(true);
    try {
      const platformsToScrape = selectedPlatforms.length > 0 ? selectedPlatforms : platforms;
      const response = await fetch('/api/scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'scrape',
          platforms: platformsToScrape 
        }),
      });

      if (response.ok) {
        const results = await response.json();
        setScrapingResults(results);
        
        // 转换结果为显示格式
        const displayResults: SyncResult[] = Object.entries(results).map(([platform, result]: [string, any]) => ({
          platform,
          success: !result.error,
          gamesCount: result.games?.length || 0,
          lastUpdated: result.lastUpdated || new Date().toISOString(),
          error: result.error,
          scrapingTime: result.scrapingTime
        }));
        
        setLastResults(displayResults);
        await fetchSyncStatus();
      }
    } catch (error) {
      console.error('Error triggering scraping:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 启动/停止自动同步
  const toggleAutoSync = async () => {
    try {
      const action = syncStatus?.isRunning ? 'stop' : 'start';
      const response = await fetch(`/api/admin/sync/${action}`, {
        method: 'POST',
      });

      if (response.ok) {
        await fetchSyncStatus();
      }
    } catch (error) {
      console.error('Error toggling auto sync:', error);
    }
  };

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // 格式化间隔时间
  const formatInterval = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s)`;
    if (hours > 0) return `${hours} hour(s)`;
    return `${minutes} minute(s)`;
  };

  // 格式化抓取时间
  const formatScrapingTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  useEffect(() => {
    fetchSyncStatus();
    const interval = setInterval(fetchSyncStatus, 10000); // 每10秒更新状态
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Globe className="text-white w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Web Scraper Management
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Monitor and control the web scraping of horror games data from various gaming platforms.
          </motion.p>
        </motion.div>

        {/* Scraping Status */}
        {Object.keys(scrapingResults).length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {Object.values(scrapingResults).filter(r => !r.error).length}
              </div>
              <div className="text-gray-400 text-lg">Successful Scrapes</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {Object.values(scrapingResults).reduce((sum, r) => sum + (r.scrapingTime || 0), 0)}ms
              </div>
              <div className="text-gray-400 text-lg">Total Scraping Time</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {Object.values(scrapingResults).reduce((sum, r) => sum + (r.games?.length || 0), 0)}
              </div>
              <div className="text-gray-400 text-lg">Total Games Found</div>
            </div>
          </motion.div>
        )}

        {/* Control Panel */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-gray-700/50 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
            <Settings className="text-blue-500" />
            <span>Scraping Control Panel</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manual Scraping Controls */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Manual Scraping</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Platforms (leave empty for all)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map(platform => (
                      <label key={platform} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPlatforms([...selectedPlatforms, platform]);
                            } else {
                              setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                            }
                          }}
                          className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300 capitalize">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={triggerScraping}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Scraping...' : 'Start Web Scraping'}</span>
                </button>
              </div>
            </div>

            {/* Auto Sync Controls */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Auto Sync Controls</h3>
              <div className="space-y-4">
                <button
                  onClick={toggleAutoSync}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    syncStatus?.isRunning
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  }`}
                >
                  {syncStatus?.isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Stop Auto Sync</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Start Auto Sync</span>
                    </>
                  )}
                </button>

                {syncStatus && (
                  <div className="text-sm text-gray-400">
                    <p>Last sync: {formatTime(syncStatus.lastSync)}</p>
                    <p>Next sync: {formatInterval(syncStatus.interval)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Scraping Results */}
        {lastResults.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
              <Database className="text-green-500" />
              <span>Last Scraping Results</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lastResults.map((result) => (
                <div
                  key={result.platform}
                  className={`p-6 rounded-2xl border ${
                    result.success
                      ? 'bg-green-900/20 border-green-500/30'
                      : 'bg-red-900/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white capitalize">
                      {result.platform}
                    </h3>
                    {result.success ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Games:</span>
                      <span className="text-white font-bold">{result.gamesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-white">{formatTime(result.lastUpdated)}</span>
                    </div>
                    {result.scrapingTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white">{formatScrapingTime(result.scrapingTime)}</span>
                      </div>
                    )}
                    {result.error && (
                      <div className="text-red-400 text-xs mt-2">
                        Error: {result.error}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 