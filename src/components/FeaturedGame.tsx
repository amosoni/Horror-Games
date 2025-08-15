import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Star, Calendar } from 'lucide-react';
import { Game } from '../types/game';
import { useTranslation } from 'react-i18next';

interface FeaturedGameProps {
  game: Game;
  onPlayClick?: () => void;
}

export default function FeaturedGame({ game, onPlayClick }: FeaturedGameProps) {
  const { t } = useTranslation();
  const slug = useMemo(() => game.canonicalSlug || game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), [game]);

  const openDetail = () => {
    window.location.href = `/games/${slug}`;
  };

  return (
    <motion.div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="relative h-96 overflow-hidden cursor-pointer" onClick={openDetail}>
        <motion.img src={game.imageUrl || 'https://placehold.co/1200x675?text=Horror+Game'} alt={game.title} className="w-full h-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/1200x675?text=Horror+Game'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold">{game.rating}</span>
                <span className="text-gray-300">({game.reviewCount?.toLocaleString() || 0} {t('game.reviews')})</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{new Date(game.releaseDate).getFullYear()}</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 hover:text-red-400" onClick={openDetail}>{game.title}</h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl">{game.description}</p>
            <div className="flex space-x-4">
              {game.iframeUrl && (
                <motion.button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); if (onPlayClick) onPlayClick(); }}>
                  <Play className="w-5 h-5" />
                  <span>{t('home.playNow')}</span>
                </motion.button>
              )}
              {game.steamUrl && (
                <motion.button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); window.open(game.steamUrl!, '_blank'); }}>
                  <ExternalLink className="w-5 h-5" />
                  <span>{t('game.buyOnSteam')}</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}