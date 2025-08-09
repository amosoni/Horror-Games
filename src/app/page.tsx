"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { curatedWebGames } from '../data/games';

export default function Page() {
  const allGames = useMemo(() => curatedWebGames, []);
  const featured = useMemo(() => {
    const bySlug = allGames.find(g => (g.canonicalSlug ?? g.id) === 'last-seen-online');
    return bySlug || allGames[0] || null;
  }, [allGames]);
  const gridGames = useMemo(() => allGames.filter(g => g.id !== featured?.id), [allGames, featured]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Horror background overlays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(80% 60% at 50% 0%, rgba(120,0,0,0.12), transparent),' +
            'radial-gradient(40% 30% at 10% 80%, rgba(200,0,0,0.08), transparent),' +
            'radial-gradient(35% 25% at 90% 70%, rgba(120,0,0,0.08), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,0,0,0.05) 0 2px, transparent 2px 6px)',
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
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
            Click any game card to open its detail page and play in full view. Our curation focuses on lightweight, embeddable browser horror—no installs, no waiting. Discover short narratives, experimental atmospheres, and micro‑thrillers perfect for a quick scare.
          </p>
        </motion.div>

        {/* Featured random game */}
        {featured ? (
          <div className="mb-6">
            <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="relative aspect-[16/9] bg-black">
                {featured.imageUrl ? (
                  <img src={featured.imageUrl} alt={featured.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                ) : null}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">{featured.title}</h2>
                  <p className="text-gray-200 max-w-2xl mb-4 line-clamp-2">{featured.shortDescription || featured.genre.join(', ')}</p>
                  <Link href={`/games/${featured.canonicalSlug ?? featured.id}`} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500">
                    Play now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Dense grid without CTA button */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {gridGames.map((g, idx) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * idx }}
              className="relative bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden hover:ring-1 hover:ring-red-700/40"
            >
              {/* Clickable overlay to go to detail page */}
              <Link
                href={`/games/${g.canonicalSlug ?? g.id}`}
                className="absolute inset-0 z-20"
                aria-label={`${g.title} details`}
              />

              <div className="relative aspect-video bg-black">
                {g.imageUrl ? (
                  <img
                    src={g.imageUrl}
                    alt={g.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-45"
                  />
                ) : null}

                {/* Title overlay */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-center">
                  <div className="text-white text-sm sm:text-base font-semibold line-clamp-1">{g.title}</div>
                  <div className="text-gray-400 text-xs line-clamp-1">{g.genre.slice(0, 2).join(', ')}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
