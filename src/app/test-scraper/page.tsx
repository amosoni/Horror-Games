"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  Database
} from 'lucide-react';

interface ScrapingResult {
  games: unknown[];
  total: number;
  platform: string;
  lastUpdated: string;
  scrapingTime: number;
  error?: string;
}

export default function TestScraperPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, ScrapingResult>>({});
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'steam', label: 'Steam' },
    { value: 'roblox', label: 'Roblox' },
    { value: 'playstation', label: 'PlayStation' },
    { value: 'xbox', label: 'Xbox' },
    { value: 'nintendo', label: 'Nintendo' }
  ];

  const testScraping = async () => {
    setIsLoading(true);
    try {
      const url = selectedPlatform === 'all' 
        ? '/api/scraper'
        : `/api/scraper?platform=${selectedPlatform}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (selectedPlatform === 'all') {
        setResults(data);
      } else {
        setResults({ [selectedPlatform]: data });
      }
    } catch (error) {
      console.error('Scraping test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatScrapingTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getTotalGames = () => {
    return Object.values(results).reduce((sum, result) => sum + (result.games?.length || 0), 0);
  };

  const getTotalScrapingTime = () => {
    return Object.values(results).reduce((sum, result) => sum + (result.scrapingTime || 0), 0);
  };

  const getSuccessfulScrapes = () => {
    return Object.values(results).filter(result => !result.error).length;
  };

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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Globe className="text-white w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Web Scraper Test
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Test the web scraping functionality to verify it can extract horror games data from various platforms.
          </motion.p>
        </motion.div>

        {/* Test Controls */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-gray-700/50 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
            <Zap className="text-green-500" />
            <span>Test Controls</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Select Platform to Test
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <label key={platform.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="platform"
                      value={platform.value}
                      checked={selectedPlatform === platform.value}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <span className="text-white font-medium">{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={testScraping}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25"
              >
                <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Scraping...' : 'Start Test Scraping'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        {Object.keys(results).length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {getSuccessfulScrapes()}/{Object.keys(results).length}
              </div>
              <div className="text-gray-400 text-lg">Successful Scrapes</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {formatScrapingTime(getTotalScrapingTime())}
              </div>
              <div className="text-gray-400 text-lg">Total Scraping Time</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {getTotalGames()}
              </div>
              <div className="text-gray-400 text-lg">Total Games Found</div>
            </div>
          </motion.div>
        )}

        {/* Detailed Results */}
        {Object.keys(results).length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
              <Database className="text-blue-500" />
              <span>Scraping Results</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(results).map(([platform, result]) => (
                <div
                  key={platform}
                  className={`p-6 rounded-2xl border ${
                    result.error
                      ? 'bg-red-900/20 border-red-500/30'
                      : 'bg-green-900/20 border-green-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white capitalize">
                      {platform}
                    </h3>
                    {result.error ? (
                      <XCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Games:</span>
                      <span className="text-white font-bold">{result.games?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-white">{formatTime(result.lastUpdated)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">{formatScrapingTime(result.scrapingTime)}</span>
                    </div>
                    {result.error && (
                      <div className="text-red-400 text-xs mt-2">
                        Error: {result.error}
                      </div>
                    )}
                  </div>

                  {/* Sample Games */}
                  {result.games && result.games.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <h4 className="text-sm font-bold text-gray-300 mb-2">Sample Games:</h4>
                      <div className="space-y-1">
                        {result.games.slice(0, 3).map((game: unknown, index: number) => (
                          <div key={index} className="text-xs text-gray-400 truncate">
                            {game.title}
                          </div>
                        ))}
                        {result.games.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{result.games.length - 3} more...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 