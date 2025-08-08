"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ExternalLink } from 'lucide-react';
import type { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-bold">{game.rating}</span>
        </div>

        {/* Play Button */}
        {game.iframeUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 font-medium">
              <Play className="w-5 h-5" />
              <span>Play Now</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-200">
          {game.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {game.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {game.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-red-600/80 text-white text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {game.steamUrl && (
              <a
                href={game.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            
            <span className="text-green-400 font-bold">
              {game.price === 0 ? 'Free' : `$${game.price}`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}