import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { horrorGames } from '../data/games';
import GameCard from '../components/GameCard';
import { Filter, Star, Clock, TrendingUp } from 'lucide-react';

export default function GenrePage() {
  const { t } = useTranslation();
  const { genre } = useParams<{ genre: string }>();
  const [sortBy, setSortBy] = useState('rating');

  // 根据类型筛选游戏
  const filteredGames = horrorGames.filter(game => 
    game.genre.some(g => g.toLowerCase().includes(genre?.toLowerCase() || ''))
  );

  const sortedGames = [...filteredGames].sort((a, b) => {
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

  const getGenreTitle = (genre: string) => {
    const titles: { [key: string]: string } = {
      'survival': 'Survival Horror Games',
      'psychological': 'Psychological Horror Games',
      'jump-scare': 'Jump Scare Games',
      'co-op': 'Co-op Horror Games'
    };
    return titles[genre] || `${genre} Horror Games`;
  };

  const getGenreDescription = (genre: string) => {
    const descriptions: { [key: string]: string } = {
      'survival': 'Discover the best survival horror games where you must fight to stay alive',
      'psychological': 'Explore psychological horror games that mess with your mind',
      'jump-scare': 'Find the scariest jump scare games that will make you scream',
      'co-op': 'Play horror games with friends in these multiplayer co-op experiences'
    };
    return descriptions[genre] || `Explore the best ${genre} horror games`;
  };

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
            {getGenreTitle(genre || '')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {getGenreDescription(genre || '')}
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
                  ? 'bg-orange-600 text-white'
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
              No games found for {genre} genre
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 