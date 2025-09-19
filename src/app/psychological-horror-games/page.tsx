"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { horrorGames } from '../../data/games';
import GameCard from '../../components/GameCard';
import { Star, Clock, TrendingUp } from 'lucide-react';

export default function PsychologicalHorrorGamesPage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('rating');

  const genreKey = 'psychological';

  // 根据类型筛选游戏
  const filteredGames = horrorGames.filter(game =>
    game.genre.some(g => g.toLowerCase().includes('psychological'))
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

  const title = 'Psychological Horror Games';
  const description = 'Explore psychological horror games that mess with your mind.';

  const sortOptions = [
    { value: 'rating', label: t('platform.topRated'), icon: Star },
    { value: 'newest', label: t('platform.newest'), icon: Clock },
    { value: 'popular', label: t('platform.popular'), icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-8">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://horrorgames.games/" },
              { "@type": "ListItem", "position": 2, "name": "Psychological Horror Games", "item": "https://horrorgames.games/psychological-horror-games" }
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
            "name": "Psychological Horror Games",
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {description}
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

        {/* Related Topics Links */}
        <motion.div
          className="mt-20 border-t border-gray-800 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Related Topics</h3>
          <div className="flex flex-wrap gap-3">
            <a href="/horror-games-online" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Horror Games Online</a>
            <a href="/free-horror-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Free Horror Games</a>
            <a href="/horror-games-multiplayer" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Multiplayer Horror</a>
            <a href="/survival-horror-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Survival Horror</a>
            <a href="/jump-scare-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Jump Scare Horror</a>
          </div>
        </motion.div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What defines psychological horror games?", "acceptedAnswer": { "@type": "Answer", "text": "Games that focus on atmosphere, mind games, and dread over gore or jump scares." }},
                { "@type": "Question", "name": "Are these games very difficult?", "acceptedAnswer": { "@type": "Answer", "text": "Difficulty varies. Many focus on narrative tension rather than mechanical challenge." }},
                { "@type": "Question", "name": "Where should I start?", "acceptedAnswer": { "@type": "Answer", "text": "Check the top of our list for critically acclaimed psychological horror starters." }}
              ]
            })
          }}
        />

        {sortedGames.length === 0 && (
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