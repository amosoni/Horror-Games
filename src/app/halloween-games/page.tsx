"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Ghost, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { halloweenGames } from '../../data/halloweenGames';
import { Game } from '../../types/game';

export default function HalloweenGamesPage() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Halloween background overlays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(80% 60% at 50% 0%, rgba(255,165,0,0.08), transparent),' +
            'radial-gradient(40% 30% at 10% 80%, rgba(255,69,0,0.05), transparent),' +
            'radial-gradient(35% 25% at 90% 70%, rgba(255,140,0,0.05), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-15"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,165,0,0.03) 0 2px, transparent 2px 6px)',
        }}
      />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 lg:py-8 relative">
        {/* Hero Section */}
        <motion.div className="mb-8 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-orange-500" />
            <Skull className="w-10 h-10 text-red-600" />
            <Ghost className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Halloween Horror Games
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-4xl mx-auto">
            Experience the spookiest Halloween-themed horror games. From haunted schools to creepy houses, 
            these games will give you the ultimate Halloween scare experience!
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">All Halloween Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {halloweenGames.map((game: Game, index: number) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/games/${game.id}`}>
                  <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-orange-500/60 hover:bg-gray-700/90 group">
                    <div className="relative aspect-[4/3] bg-gray-800">
                      {game.imageUrl ? (
                        <Image 
                          src={game.imageUrl} 
                          alt={game.title} 
                          fill 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          HALLOWEEN
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">{game.shortDescription}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {game.genre.slice(0, 2).map((genre: string, idx: number) => (
                            <span key={idx} className="inline-block bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Halloween Special Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 rounded-xl p-8 text-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">🎃 Halloween Horror Special 🎃</h3>
                <p className="text-gray-100 mb-6 leading-relaxed">
                  Get ready for the spookiest season with our curated collection of Halloween-themed horror games. 
                  From haunted schools to creepy houses, these games will give you the ultimate Halloween scare experience!
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Haunted Schools
                  </span>
                  <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Creepy Houses
                  </span>
                  <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Survival Horror
                  </span>
                </div>
                <p className="text-orange-200 text-sm">
                  🕯️ Perfect for Halloween parties and late-night scares! 🕯️
                </p>
              </div>
              <div className="relative">
                <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-white/30">
                  <Image 
                    src="/images/Halloween Games/Haunted-School.avif" 
                    alt="Halloween Horror Games Collection" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-purple-600/20" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-orange-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      🎃 HALLOWEEN SPECIAL 🎃
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-300 mb-4">Ready for more horror?</p>
          <Link 
            href="/" 
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to All Games
          </Link>
        </div>
      </div>
    </div>
  );
} 