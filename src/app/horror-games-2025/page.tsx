"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { horrorGames } from '../../data/games';
import GameCard from '../../components/GameCard';
import { Star, Clock, TrendingUp, Trophy } from 'lucide-react';

export default function TopGames2025Page() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('rating');

  // 筛选2025年的游戏或评分最高的游戏
  const topGames = horrorGames
    .filter(game => {
      const releaseYear = new Date(game.releaseDate).getFullYear();
      return releaseYear === 2025 || game.rating >= 4.5;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20); // 取前20个

  const sortedGames = [...topGames].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'rating', label: t('platform.topRated'), icon: Star },
    { value: 'newest', label: t('platform.newest'), icon: Clock },
    { value: 'popular', label: t('platform.popular'), icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center space-x-4">
            <Trophy className="text-yellow-500 w-12 h-12" />
            <span>Best Horror Games 2025</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the top-rated horror games of 2025. From survival horror to psychological thrillers, find your next favorite scary game.
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
              onClick={() => setSortBy(value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === value
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {sortedGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>

        {sortedGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No top games found for 2025
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 