"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ExternalLink, TrendingUp, Users, Clock } from 'lucide-react';
import type { PlatformGame } from '../services/platformApi';
import type { Game } from '../types/game';

interface SteamRankingCardProps {
  game: PlatformGame | Game;
  rank: number;
  onClick?: () => void;
}

export default function SteamRankingCard({ game, rank, onClick }: SteamRankingCardProps) {
  const [imageSrc, setImageSrc] = useState<string>((game as any).imageUrl || '');

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    return 'bg-gradient-to-r from-gray-700 to-gray-800 text-white';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankSize = (rank: number) => {
    if (rank <= 3) return 'w-14 h-14 text-xl';
    return 'w-12 h-12 text-lg';
  };

  const handleImgError = () => {
    if (imageSrc !== 'https://placehold.co/80x80?text=Game') {
      setImageSrc('https://placehold.co/80x80?text=Game');
    }
  };

  // 归一化字段
  const title = (game as any).title ?? 'Unknown';
  const shortDescription = (game as any).shortDescription ?? '';
  const rating: number = Number((game as any).rating ?? 0);
  const reviewCount: number = Number((game as any).reviewCount ?? 0);
  const releaseDate: string = (game as any).releaseDate ?? '';
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const price: number = Number((game as any).price ?? 0);
  const genres: string[] = Array.isArray((game as any).genre) ? (game as any).genre : [];
  const steamUrl: string | undefined = (game as any).steamUrl;
  const iframeUrl: string | undefined = (game as any).iframeUrl;

  return (
    <motion.div
      className="group relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-800/90 hover:to-gray-700/90 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50 shadow-lg hover:shadow-xl"
      whileHover={{ x: 8, scale: 1.02 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-800/20 to-transparent rounded-2xl" />
      
      <div className="relative flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className={`${getRankSize(rank)} ${getRankColor(rank)} rounded-full flex items-center justify-center font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            {getRankIcon(rank)}
          </div>
        </div>

        <div className="flex-shrink-0 relative">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg bg-gray-800">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={handleImgError}
              />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          {iframeUrl && (
            <div className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
              <Play className="w-3 h-3" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-200 truncate mb-1">
                {title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                {shortDescription}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-yellow-500/30">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-bold">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{reviewCount.toLocaleString()} reviews</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
              {genres.includes('Multiplayer') && (
                <div className="flex items-center space-x-1 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Multiplayer</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {steamUrl && (
                <a
                  href={steamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-500/20 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              
              <div className={`px-3 py-1.5 rounded-full font-bold text-sm ${
                price === 0 
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-700/50 text-white border border-gray-600/50'
              }`}>
                {price === 0 ? 'Free' : `$${price}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50">
        {genres.slice(0, 4).map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30 hover:bg-red-600/30 transition-colors duration-200"
          >
            {genre}
          </span>
        ))}
        {genres.length > 4 && (
          <span className="px-3 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full border border-gray-600/30">
            +{genres.length - 4} more
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
} 