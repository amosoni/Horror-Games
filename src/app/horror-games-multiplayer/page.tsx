"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { horrorGames } from '../../data/games';
import GameCard from '../../components/GameCard';
import { Star, Clock, TrendingUp, Users } from 'lucide-react';

export default function MultiplayerGamesPage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('rating');

  // 筛选多人游戏
  const multiplayerGames = horrorGames.filter(game => 
    game.genre.some(g => g.toLowerCase().includes('co-op') || g.toLowerCase().includes('multiplayer'))
  );

  const sortedGames = [...multiplayerGames].sort((a, b) => {
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
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://horrorgames.games/" },
              { "@type": "ListItem", "position": 2, "name": "Multiplayer Horror Games", "item": "https://horrorgames.games/horror-games-multiplayer" }
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
            "name": "Multiplayer Horror Games",
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center space-x-4">
            <Users className="text-blue-500 w-12 h-12" />
            <span>Multiplayer Horror Games</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Play horror games with friends! We curate the best multiplayer and co-op horror experiences, updated weekly based on player reviews and community feedback.
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
                  ? 'bg-blue-600 text-white'
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
            <a href="/co-op-horror-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Co-op Horror</a>
            <a href="/horror-games-on-steam" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Horror Games on Steam</a>
            <a href="/psychological-horror-games" className="px-4 py-2 rounded-xl bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700">Psychological Horror</a>
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
                { "@type": "Question", "name": "What makes a good multiplayer horror game?", "acceptedAnswer": { "@type": "Answer", "text": "Strong cooperative mechanics, shared scares, and balanced difficulty that works for 2-4 players." }},
                { "@type": "Question", "name": "Can I play these with random players?", "acceptedAnswer": { "@type": "Answer", "text": "Most support matchmaking, but playing with friends usually provides the best experience." }},
                { "@type": "Question", "name": "Are there free multiplayer horror games?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Check our Free Horror Games page for free multiplayer options." }}
              ]
            })
          }}
        />

        {sortedGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No multiplayer games found
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 