"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Globe } from 'lucide-react';
import { featuredGames, horrorGames } from '../data/games';
import FeaturedGame from '../components/FeaturedGame';
import GameCard from '../components/GameCard';
import GameIframe from '../components/GameIframe';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import type { Game } from '../types/game';

export default function Page() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchResults, setSearchResults] = useState<Game[]>(horrorGames);

  const handlePlayGame = (game: Game) => {
    if (game.iframeUrl) {
      setSelectedGame(game);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(horrorGames);
      return;
    }
    
    const filtered = horrorGames.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handleFilter = (filters: Record<string, unknown>) => {
    // Implement filtering logic here
    console.log('Filters:', filters);
  };

  // 筛选在线游戏和免费游戏
  const onlineGames = horrorGames.filter(game => game.iframeUrl);
  const freeGames = horrorGames.filter(game => !game.price || game.price === 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-purple-900/10" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Horror Games Online
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Play the best free horror games online directly in your browser. No downloads required!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
              </motion.div>
            </motion.div>

            {/* Featured Games Section */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <Globe className="text-purple-500" />
                  <span>Featured Horror Games</span>
                </h2>
              </div>

              <div className="space-y-8">
                {featuredGames.slice(0, 2).map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.6 }}
                  >
                    <FeaturedGame 
                      game={game} 
                      onPlayClick={() => handlePlayGame(game)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Platform Games Section */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <Play className="text-red-500" />
                  <span>Top Horror Games by Platform</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {horrorGames.slice(0, 6).map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <GameCard 
                      game={game} 
                      onClick={() => handlePlayGame(game)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
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
