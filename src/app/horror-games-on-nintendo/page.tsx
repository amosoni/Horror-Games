"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SteamRankingCard from '../../components/SteamRankingCard';
import GameIframe from '../../components/GameIframe';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Star, TrendingUp, Gamepad2, Trophy, Flame, Award, RefreshCw, AlertCircle } from 'lucide-react';
import { useRawgNintendoHorror } from '../../hooks/useRawgGames';
import type { Game } from '../../types/game';

export default function NintendoGamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'popular'>('rating');

  // 使用 RAWG Nintendo 数据 Hook
  const { 
    games: nintendoGames, 
    loading, 
    error, 
    refresh
  } = useRawgNintendoHorror({
    ordering: sortBy === 'rating' ? '-rating' : sortBy === 'newest' ? '-released' : '-added'
  });

  const handlePlayGame = (game: Game) => {
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

  // 搜索过滤
  const filteredGames = searchQuery 
    ? nintendoGames.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : nintendoGames;

  // 按评分排序
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'newest':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'popular':
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'rating', label: 'Top Rated', icon: Star },
    { value: 'newest', label: 'Newest', icon: TrendingUp },
    { value: 'popular', label: 'Most Popular', icon: Flame }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://horrorgames.games/" },
              { "@type": "ListItem", "position": 2, "name": "Horror Games on Nintendo", "item": "https://horrorgames.games/horror-games-on-nintendo" }
            ]
          })
        }}
      />
      {/* ItemList JSON-LD (top 20) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Nintendo Switch Horror Games 2025",
            "numberOfItems": Math.min(20, sortedGames.length),
            "itemListElement": sortedGames.slice(0, 20).map((g, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "VideoGame",
                "name": g.title,
                "url": `https://horrorgames.games/games/${g.canonicalSlug || g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
                "genre": g.genre,
                "aggregateRating": g.rating ? { "@type": "AggregateRating", "ratingValue": g.rating, "ratingCount": g.reviewCount || 0 } : undefined
              }
            }))
          })
        }}
      />
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
            Nintendo Horror Games of 2025 Rankings
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the top-rated horror games of 2025 on Nintendo Switch. Experience the most 
            terrifying and critically acclaimed horror games of 2025 on Nintendo&apos;s portable platform with our curated rankings.
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center space-x-3">
              <Trophy className="text-red-500 w-8 h-8" />
              <div>
                <p className="text-2xl font-bold text-white">{filteredGames.length}</p>
                <p className="text-gray-300 text-sm">Total Games</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
            <div className="flex items-center space-x-3">
              <Flame className="text-pink-500 w-8 h-8" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredGames.length > 0 ? Math.round(filteredGames.reduce((sum, game) => sum + (game.rating || 0), 0) / filteredGames.length * 10) / 10 : 0}
                </p>
                <p className="text-gray-300 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center space-x-3">
              <Award className="text-purple-500 w-8 h-8" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredGames.filter(game => (game.rating || 0) >= 4.0).length}
                </p>
                <p className="text-gray-300 text-sm">Top Rated</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/30">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-indigo-500 w-8 h-8" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredGames.filter(game => new Date(game.releaseDate) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-gray-300 text-sm">Recent</p>
              </div>
            </div>
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
              onClick={() => setSortBy(value as any)}
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
              <span>Loading Nintendo Switch horror games...</span>
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
                <h2 className="text-4xl font-bold text-white">Nintendo Switch Horror Games of 2025 Rankings</h2>
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
        )}

        {/* No Games Found */}
        {!loading && !error && sortedGames.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {searchQuery ? 'No Games Found' : 'No Nintendo Switch Horror Games Found'}
            </h3>
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'Try adjusting your search terms.' : 'Check back later for new releases!'}
            </p>
          </motion.div>
        )}
        {/* Related Topics Links */}
        <motion.div
          className="mt-20 border-t border-gray-800 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Related Topics</h3>
          <div className="flex flex-wrap gap-3">
            <a href="/horror-games-on-steam" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Horror Games on Steam</a>
            <a href="/horror-games-on-playstation" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Horror Games on PlayStation</a>
            <a href="/horror-games-on-xbox" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Horror Games on Xbox</a>
            <a href="/free-horror-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Free Horror Games</a>
            <a href="/horror-games-multiplayer" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Multiplayer Horror</a>
          </div>
        </motion.div>

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