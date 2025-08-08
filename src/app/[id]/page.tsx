"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Star, Calendar, User, ExternalLink, Play, Share2, Bookmark, Tag } from 'lucide-react';
import { horrorGames } from '../../data/games';

export default function GamePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();

  const id = params?.id as string | undefined;
  const game = horrorGames.find(g => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game not found</h2>
          <button
            onClick={() => router.back()}
            className="text-red-400 hover:text-red-300"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <motion.img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('common.back')}</span>
        </button>

        <div className="absolute bottom-8 left-8 right-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{game.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold">{game.rating}</span>
                <span className="text-gray-300">({game.reviewCount.toLocaleString()} {t('game.reviews')})</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{new Date(game.releaseDate).getFullYear()}</span>
              </div>

              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{game.developer}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {game.iframeUrl && (
                <motion.button
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>{t('home.playNow')}</span>
                </motion.button>
              )}
              
              {game.steamUrl && (
                <motion.button
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(game.steamUrl as string, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>{t('game.buyOnSteam')}</span>
                </motion.button>
              )}

              <motion.button
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
                <span>{t('common.share')}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">About This Game</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{game.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-400 rounded-lg text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Game Details</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">{t('game.developer')}</span>
                  <p className="text-white font-medium">{game.developer}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">{t('game.publisher')}</span>
                  <p className="text-white font-medium">{game.publisher}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">{t('game.released')}</span>
                  <p className="text-white font-medium">{new Date(game.releaseDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">{t('game.platforms')}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {game.platform.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">{t('game.price')}</span>
                  <p className="text-white font-bold text-lg">
                    {game.price ? `$${game.price}` : t('game.free')}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors duration-200">
                  <Bookmark className="w-5 h-5" />
                  <span>{t('common.bookmark')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}