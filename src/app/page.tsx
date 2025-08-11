"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { curatedWebGames } from '../data/games';
import { Game } from '../types/game';
import Image from 'next/image';

export default function Page() {
  // Get featured game and grid games
  const featured = curatedWebGames[0];

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Horror background overlays - reduced opacity for better visibility */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(80% 60% at 50% 0%, rgba(120,0,0,0.08), transparent),' +
            'radial-gradient(40% 30% at 10% 80%, rgba(200,0,0,0.05), transparent),' +
            'radial-gradient(35% 25% at 90% 70%, rgba(120,0,0,0.05), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-15"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,0,0,0.03) 0 2px, transparent 2px 6px)',
        }}
      />

      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 lg:py-8 relative">
        {/* Hero */}
        <motion.div className="mb-4 sm:mb-6 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 flex items-center justify-center gap-3">
            <Skull className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
            <span>Play Horror Games Online</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-4xl mx-auto">
            Click any game card to open its detail page and play in full view. Our curation focuses on lightweight, embeddable browser horror—no installs, no waiting. Discover short narratives, experimental atmospheres, and micro‑thrillers perfect for a quick scare.
          </p>
        </motion.div>

        {/* Featured random game */}
        {featured ? (
          <div className="mb-2 text-center">
            <h3 className="text-sm uppercase tracking-widest text-gray-300 mb-2">Featured Game</h3>
          </div>
        ) : null}
        {featured ? (
          <div className="mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full max-w-5xl mx-auto">
              {/* Main featured game - takes 2/3 width */}
              <div className="lg:col-span-2">
                <Link href={`/games/${featured.canonicalSlug ?? featured.id}`}>
                  <div className="relative w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                    <div className="relative aspect-[4/3] bg-gray-800">
                      {featured.imageUrl ? (
                        <Image 
                          src={featured.imageUrl} 
                          alt={featured.title} 
                          fill 
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover opacity-60" 
                        />
                      ) : null}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <h2 className="text-base md:text-xl font-extrabold text-white mb-1">{featured.title}</h2>
                        <p className="text-gray-100 max-w-md line-clamp-2 text-xs">{featured.shortDescription || featured.genre.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Two side cards - take 1/3 width */}
              <div className="lg:col-span-1 space-y-3">
                {curatedWebGames.slice(1, 3).map((game: Game) => (
                  <Link key={game.id} href={`/games/${game.canonicalSlug ?? game.id}`}>
                    <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-red-500/60 hover:bg-gray-700/90">
                      <div className="relative aspect-[4/3] bg-gray-800">
                        {game.imageUrl ? (
                          <Image 
                            src={game.imageUrl} 
                            alt={game.title} 
                            fill 
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover opacity-70" 
                          />
                        ) : null}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <h3 className="text-sm font-bold text-white mb-1">{game.title}</h3>
                          <p className="text-xs text-gray-200 line-clamp-2">{game.genre.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Browse Games Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center text-white mb-4">Browse Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-5xl mx-auto">
            {curatedWebGames.slice(3).map((game: Game) => (
              <Link key={game.id} href={`/games/${game.canonicalSlug ?? game.id}`}>
                <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-red-500/60 hover:bg-gray-700/90">
                  <div className="relative aspect-[4/3] bg-gray-800">
                    {game.imageUrl ? (
                      <Image 
                        src={game.imageUrl} 
                        alt={game.title} 
                        fill 
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover opacity-70" 
                      />
                    ) : null}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <h3 className="text-sm font-bold text-white mb-1">{game.title}</h3>
                      <p className="text-xs text-gray-200 line-clamp-2">{game.genre.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
