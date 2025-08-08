"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SteamRankingCard from '../../components/SteamRankingCard';
import GameIframe from '../../components/GameIframe';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import { Gamepad2, TrendingUp, Clock, Star, Trophy, Flame, Award, RefreshCw, AlertCircle } from 'lucide-react';
import { useSteamData } from '../../hooks/usePlatformData';
import type { PlatformGame } from '../../services/platformApi';

export default function SteamGamesPage() {
  const [selectedGame, setSelectedGame] = useState<PlatformGame | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'popular'>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  // 使用Steam数据Hook
  const { 
    data: steamData, 
    loading, 
    error, 
    lastUpdated, 
    refresh, 
    clearError,
    getSortedGames,
    searchGames
  } = useSteamData();

  const handlePlayGame = (game: PlatformGame) => {
    if (game.iframeUrl) {
      setSelectedGame(game);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters: Record<string, unknown>) => {
    console.log('Filters:', filters);
  };

  // 获取排序后的游戏列表
  const sortedGames = getSortedGames(sortBy);
  
  // 搜索过滤
  const filteredGames = searchQuery ? searchGames(searchQuery) : sortedGames;

  const sortOptions = [
    { value: 'rating', label: 'Top Rated', icon: Star },
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'popular', label: 'Most Popular', icon: TrendingUp }
  ];

  // 格式化最后更新时间
  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Gamepad2 className="text-white w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Horror Games on Steam
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the best horror games on Steam. From survival horror to psychological thrillers, 
            find your next favorite scary game with our curated rankings.
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
          </motion.div>

          {/* 数据状态指示器 */}
          <motion.div
            className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {loading && (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Loading latest data...</span>
              </div>
            )}
            {lastUpdated && !loading && (
              <div className="flex items-center space-x-2">
                <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
                <button
                  onClick={refresh}
                  className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* 错误提示 */}
        {error && (
          <motion.div
            className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-white">Data Loading Error</h3>
            </div>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={refresh}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Enhanced Stats */}
        {steamData && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{steamData.total}</div>
              <div className="text-gray-400 text-lg">Total Games</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {steamData.games.length > 0 
                  ? (steamData.games.reduce((sum, game) => sum + game.rating, 0) / steamData.games.length).toFixed(1) 
                  : '0.0'}
              </div>
              <div className="text-gray-400 text-lg">Average Rating</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                {steamData.games.filter(game => game.price === 0).length}
              </div>
              <div className="text-gray-400 text-lg">Free Games</div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Sort Options */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value as 'rating' | 'newest' | 'popular')}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                sortBy === value
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-lg">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Steam Rankings */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-orange-500/30">
              <Trophy className="text-orange-500 w-8 h-8" />
              <h2 className="text-4xl font-bold text-white">Steam Horror Games Rankings</h2>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-4">
                <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                <span className="text-xl text-gray-300">Loading Steam horror games...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-6xl mx-auto">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <SteamRankingCard 
                    game={game} 
                    rank={index + 1}
                    onClick={() => handlePlayGame(game)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* No Games Found */}
        {!loading && filteredGames.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {searchQuery ? 'No Games Found' : 'No Steam Horror Games Found'}
            </h3>
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'Try adjusting your search terms.' : 'Check back later for new releases!'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Game Iframe Modal */}
      {selectedGame && (
        <GameIframe
          url={selectedGame.iframeUrl ?? ''}
          title={selectedGame.title ?? ''}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
} 