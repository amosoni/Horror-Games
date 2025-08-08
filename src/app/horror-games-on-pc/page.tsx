"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { horrorGames } from '../../data/games';
import SteamRankingCard from '../../components/SteamRankingCard';
import GameIframe from '../../components/GameIframe';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import { Star, TrendingUp, Monitor, Trophy, Flame, Award } from 'lucide-react';
import type { Game } from '../../types/game';

export default function PCGamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  // 筛选 PC 平台的游戏
  const pcGames = horrorGames.filter(game => 
    game.platform.includes('PC') || game.platform.includes('Windows')
  );

  const handlePlayGame = (game: Game) => {
    if (game.iframeUrl) {
      setSelectedGame(game);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(pcGames);
      return;
    }
    
    const filtered = pcGames.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handleFilter = (filters: Record<string, unknown>) => {
    console.log('Filters:', filters);
  };

  // 按评分排序
  const sortedGames = [...pcGames].sort((a, b) => b.rating - a.rating);

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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Monitor className="text-white w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            PC Horror Games
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the best horror games for PC. From indie horror to AAA titles, experience the most 
            terrifying games on Windows with our curated rankings.
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

        {/* Enhanced Stats */}
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
            <div className="text-4xl font-bold text-white mb-2">{pcGames.length}</div>
            <div className="text-gray-400 text-lg">Total Games</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {pcGames.length > 0 ? (pcGames.reduce((sum, game) => sum + game.rating, 0) / pcGames.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-gray-400 text-lg">Average Rating</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {pcGames.filter(game => game.price === 0).length}
            </div>
            <div className="text-gray-400 text-lg">Free Games</div>
          </div>
        </motion.div>

        {/* PC Rankings */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-blue-500/30">
              <Trophy className="text-blue-500 w-8 h-8" />
              <h2 className="text-4xl font-bold text-white">PC Horror Games Rankings</h2>
            </div>
          </div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {sortedGames.map((game, index) => (
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

        {/* No Games Found */}
        {pcGames.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Monitor className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No PC Horror Games Found</h3>
            <p className="text-gray-400 text-lg">Check back later for new releases!</p>
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