"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ExternalLink } from 'lucide-react';
import type { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const [src] = useState(game.imageUrl || '');
  const [storeUrl, setStoreUrl] = useState<string | undefined>(undefined);
  const slug = game.canonicalSlug || game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleClick = () => {
    if (onClick) return onClick();
    window.location.href = `/games/${slug}`;
  };

  useEffect(() => {
    let aborted = false;
    async function loadStore() {
      try {
        const cacheKey = `store:${slug}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const u = JSON.parse(cached) as string;
          if (!aborted) setStoreUrl(u);
          return;
        }
        const res = await fetch(`/api/rawg/game?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json() as { storeLinks?: Array<{ url: string }>; steamUrl?: string };
        const first = data?.storeLinks?.[0]?.url || data?.steamUrl;
        if (first && !aborted) {
          setStoreUrl(first);
          sessionStorage.setItem(cacheKey, JSON.stringify(first));
        }
      } catch (error) {
        console.error('Failed to load store URL:', error);
      }
    }
    loadStore();
    return () => { aborted = true; };
  }, [slug]);

  return (
    <motion.div
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -5 }}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={src || 'https://placehold.co/600x300?text=Game'}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x300?text=Game'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-200 max-w-[75%] truncate">
            {game.title}
          </h3>
          {(storeUrl || game.steamUrl) && (
            <a href={storeUrl || game.steamUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{game.shortDescription}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {game.genre.slice(0, 2).map((genre) => (
              <span key={genre} className="px-2 py-1 bg-red-600/80 text-white text-xs rounded-full">{genre}</span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {game.steamUrl && (
              <span className="text-yellow-400 text-xs flex items-center"><Star className="w-3 h-3 mr-1 fill-current" />{game.rating.toFixed(1)}</span>
            )}
            <span className="text-green-400 font-bold">{game.price === 0 ? 'Free' : `$${game.price}`}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}