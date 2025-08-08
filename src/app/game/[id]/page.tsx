"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { horrorGames } from '../../../data/games';
import GameIframe from '../../../components/GameIframe';
import { Star, Calendar, User, ExternalLink, Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GameDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const gameId = (params as any)?.id as string | undefined;
  const game = horrorGames.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
          <Link href="/" className="text-red-400 hover:text-red-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePlayGame = () => {
    if (game.iframeUrl) setSelectedGame(game);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative">
            <motion.img src={game.imageUrl} alt={game.title} className="w-full h-96 object-cover rounded-2xl shadow-2xl" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl" />
          </div>

          <div className="flex flex-col justify-center">
            <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {game.title}
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              {game.description}
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold">{game.rating}</span>
                <span className="text-gray-300">({game.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{new Date(game.releaseDate).getFullYear()}</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{game.developer}</span>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              {game.genre.map((g) => (
                <span key={g} className="px-3 py-1 bg-red-600/80 text-white rounded-full text-sm font-medium">
                  {g}
                </span>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
              {game.iframeUrl && (
                <motion.button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePlayGame}>
                  <Play className="w-5 h-5" />
                  <span>Play Now</span>
                </motion.button>
              )}
              {game.steamUrl && (
                <motion.button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open(game.steamUrl as string, '_blank')}>
                  <ExternalLink className="w-5 h-5" />
                  <span>Buy on Steam</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {game.platform.map((platform) => (
                <span key={platform} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Price</h3>
            <div className="text-3xl font-bold text-green-400">
              {game.price === 0 ? 'Free' : `$${game.price}`}
            </div>
          </div>
        </motion.div>
      </div>

      {selectedGame && (
        <GameIframe url={selectedGame.iframeUrl ?? ''} title={selectedGame.title ?? ''} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
} 