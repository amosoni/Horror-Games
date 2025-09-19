"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { horrorGames } from '../../data/games';
import type { Game } from '../../types/game';
import GameCard from '../../components/GameCard';
import FeaturedGame from '../../components/FeaturedGame';
import { Star, Filter, ListOrdered, Search, Grid3X3 } from 'lucide-react';

type SortKey = 'rating' | 'newest' | 'popular';

export default function HorrorGamesHubPage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [query, setQuery] = useState('');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyMultiplayer, setOnlyMultiplayer] = useState(false);

  const featured = useMemo(() => {
    const best = [...horrorGames]
      .filter(g => g.imageUrl)
      .sort((a, b) => b.rating - a.rating);
    return best.slice(0, 1)[0];
  }, []);

  const filtered: Game[] = useMemo(() => {
    return horrorGames.filter(g => {
      if (onlyFree && g.price !== 0) return false;
      if (onlyMultiplayer && !g.tags?.some(t => /coop|co-op|multiplayer/i.test(t))) return false;
      if (query && !g.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [onlyFree, onlyMultiplayer, query]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      case 'popular':
        return list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      default:
        return list;
    }
  }, [filtered, sortBy]);

  const itemListSchema = useMemo(() => {
    const elements = sorted.slice(0, 30).map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoGame',
        name: g.title,
        url: `https://horrorgames.games/games/${g.canonicalSlug || g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        genre: g.genre,
        aggregateRating: g.rating ? { '@type': 'AggregateRating', ratingValue: g.rating, ratingCount: g.reviewCount || 0 } : undefined,
      },
    }));
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best Horror Games',
      numberOfItems: elements.length,
      itemListElement: elements,
    } as const;
  }, [sorted]);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the best horror games right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We curate and update a ranked list based on ratings, reviews, and community buzz across platforms.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I play free horror games online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'See our Online and Free sections. Many titles are playable in browser or available as free-to-play.'
        }
      },
      {
        '@type': 'Question',
        name: 'What platforms have the most horror games?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Steam and PC have the broadest selection, with strong catalogs on PlayStation, Xbox, and Nintendo Switch.'
        }
      }
    ]
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
            Best Horror Games
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Curated scary games across PC, PlayStation, Xbox, and Nintendo. Filter by free, multiplayer, and more.
          </p>
          <div className="flex gap-4 mt-6 flex-wrap text-sm">
            <Link href="/horror-games-online" className="text-red-400 hover:text-red-300 underline">Horror Games Online</Link>
            <Link href="/free-horror-games" className="text-red-400 hover:text-red-300 underline">Free Horror Games</Link>
            <Link href="/horror-games-multiplayer" className="text-red-400 hover:text-red-300 underline">Multiplayer Horror</Link>
            <Link href="/horror-games-on-steam" className="text-red-400 hover:text-red-300 underline">On Steam</Link>
            <Link href="/psychological-horror-games" className="text-red-400 hover:text-red-300 underline">Psychological</Link>
            <Link href="/survival-horror-games" className="text-red-400 hover:text-red-300 underline">Survival</Link>
          </div>
        </motion.div>

        {/* Featured */}
        {featured && (
          <FeaturedGame game={featured} />
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center bg-gray-800/70 border border-gray-700 rounded-xl px-3 py-2 gap-2 text-gray-200">
            <Search className="w-4 h-4" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search.placeholder') || 'Search games...'} className="bg-transparent outline-none placeholder-gray-400 text-sm" />
          </div>
          <button onClick={() => setOnlyFree(v => !v)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${onlyFree ? 'bg-red-600 text-white border-red-500' : 'bg-gray-800/70 text-gray-200 border-gray-700'}`}>
            <Filter className="w-4 h-4" /> Free
          </button>
          <button onClick={() => setOnlyMultiplayer(v => !v)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${onlyMultiplayer ? 'bg-red-600 text-white border-red-500' : 'bg-gray-800/70 text-gray-200 border-gray-700'}`}>
            <Grid3X3 className="w-4 h-4" /> Multiplayer
          </button>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-gray-400 text-sm flex items-center gap-1"><ListOrdered className="w-4 h-4" /> Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} className="bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200">
              <option value="rating">Top rated</option>
              <option value="newest">Newest</option>
              <option value="popular">Most reviewed</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" /> Frequently Asked Questions</h2>
          <div className="space-y-4 text-gray-300">
            <details className="bg-gray-900/70 border border-gray-800 rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">How do you choose games for this list?</summary>
              <p className="mt-2 text-gray-400">We combine critic scores, player reviews, and community signals from platforms like Steam and RAWG, then manually review to ensure quality.</p>
            </details>
            <details className="bg-gray-900/70 border border-gray-800 rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">Can I play these in browser?</summary>
              <p className="mt-2 text-gray-400">Many titles are playable online. Check our <Link href="/horror-games-online" className="underline text-red-400">Online Horror Games</Link> page.</p>
            </details>
            <details className="bg-gray-900/70 border border-gray-800 rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">What are the scariest games?</summary>
              <p className="mt-2 text-gray-400">Browse our curated categories like Psychological, Survival, and Jump Scare to find the scariest experiences for you.</p>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}


