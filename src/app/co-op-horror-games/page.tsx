"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GameCard from '../../components/GameCard';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { useRawgCoopHorror } from '../../hooks/useRawgGames';
import type { Game } from '../../types/game';

export default function CoOpHorrorGamesPage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'popular'>('rating');

  const genreKey = 'co-op';

  const { games, loading, error } = useRawgCoopHorror();

  const sortedGames = useMemo(() => {
    const list = [...games];
    return list.sort((a, b) => {
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
  }, [games, sortBy]);

  const sortOptions = [
    { value: 'rating', label: t('platform.topRated'), icon: Star },
    { value: 'newest', label: t('platform.newest'), icon: Clock },
    { value: 'popular', label: t('platform.popular'), icon: TrendingUp }
  ];

  // 页面标题和描述（用于SEO）
  // const title = 'Co-op Horror Games';
  // const description = 'Play horror games with friends in these multiplayer co-op experiences.';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Co-op Horror Games Rankings
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Play the top-rated horror games with friends in these multiplayer co-op experiences.
          </p>
        </motion.div>

        {/* Sort Options */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value as 'rating' | 'newest' | 'popular')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === value
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        )}
        {error && !loading && (
          <div className="text-center text-red-400 py-12">{error}</div>
        )}

        {/* Games Grid */}
        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {sortedGames.map((game, index) => (
              <motion.div
                key={(game as Game).id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <GameCard game={game as Game} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && sortedGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No games found for {genreKey} genre
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 