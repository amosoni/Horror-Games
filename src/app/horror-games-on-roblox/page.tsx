"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SteamRankingCard from '../../components/SteamRankingCard';
import GameIframe from '../../components/GameIframe';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Star, TrendingUp, Users, Gamepad2, Trophy, RefreshCw, AlertCircle } from 'lucide-react';
import { useRawgRobloxHorror } from '../../hooks/useRawgGames';
import type { Game } from '../../types/game';

export default function RobloxGamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'popular'>('rating');

  // 使用 RAWG Roblox 数据 Hook
  const { 
    games: robloxGames, 
    loading, 
    error, 
    refresh
  } = useRawgRobloxHorror({
    ordering: sortBy === 'rating' ? '-rating' : sortBy === 'newest' ? '-released' : '-added',
    dates: sortBy === 'newest' ? `${new Date(Date.now()-1000*60*60*24*365*2).toISOString().slice(0,10)},${new Date().toISOString().slice(0,10)}` : undefined,
    popularRandom: sortBy === 'popular'
  });

  const handlePlayGame = (game: Game) => {
    if (game.iframeUrl) {
      setSelectedGame(game);
    }
  };

  const handleSearch = (query: string) => {
    // 搜索功能将在前端实现
    console.log('Search query:', query);
  };

  const handleFilter = (filters: Record<string, unknown>) => {
    console.log('Filters:', filters);
  };

  // 搜索过滤
  const filteredGames = robloxGames;

  const sortOptions = [
    { value: 'rating', label: 'Top Rated', icon: Star },
    { value: 'newest', label: 'Latest', icon: TrendingUp },
    { value: 'popular', label: 'Most Popular', icon: Users }
  ];

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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Gamepad2 className="text-white w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Roblox Horror Games of 2025 Rankings
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the top-rated horror games of 2025 on Roblox. Play with friends in terrifying multiplayer 
            horror experiences of 2025 with our curated rankings.
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{filteredGames.length}</div>
            <div className="text-gray-400 text-lg">Top Games</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {filteredGames.length > 0 ? Math.round(filteredGames.reduce((sum, game) => sum + (game.rating || 0), 0) / filteredGames.length * 10) / 10 : 0}
            </div>
            <div className="text-gray-400 text-lg">Average Rating</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {filteredGames.filter(game => game.tags.includes('multiplayer')).length}
            </div>
            <div className="text-gray-400 text-lg">Multiplayer Games</div>
          </div>
        </motion.div>

        {/* Sort Options */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value as 'rating' | 'newest' | 'popular')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
          
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center space-x-2 text-red-400 mb-4">
              <AlertCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Error loading games</span>
            </div>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={refresh}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center space-x-2 text-gray-400">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Loading Roblox horror games...</span>
            </div>
          </motion.div>
        )}

        {/* Games Rankings */}
        {!loading && !error && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-red-500/30">
                <Trophy className="text-red-500 w-8 h-8" />
                <h2 className="text-4xl font-bold text-white">Roblox Horror Games of 2025 Rankings</h2>
              </div>
            </div>

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
          </motion.div>
        )}

        {/* No Games Found */}
        {!loading && !error && filteredGames.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Top Roblox Horror Games Found</h3>
            <p className="text-gray-400 text-lg">Check back later for new top-rated releases!</p>
          </motion.div>
        )}
      </div>
      <Footer />
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