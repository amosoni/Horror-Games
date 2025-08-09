"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, User, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRawgLatestHorror } from '../../hooks/useRawgGames';
import type { Game } from '../../types/game';

interface ReviewFrontmatter {
  title: string;
  rating: number;
  date: string; // ISO or human
  author: string;
  excerpt: string;
  slug: string;
}

export default function ReviewsPage() {
  const [items, setItems] = useState<ReviewFrontmatter[]>([]);

  useEffect(() => {
    fetch('/reviews/index.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  }, []);

  // 动态游戏详情（最近发布，12 条，可点进 /games/[slug]）
  const { games, loading } = useRawgLatestHorror({ pageSize: 12 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Horror Game Reviews</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Read detailed reviews and live game details. Editorial reviews below, and dynamically generated game pages you can jump into.</p>
        </motion.div>

        {/* 动态生成的恐怖游戏（跳转到 /games/[slug]） */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Live Horror Game Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="text-gray-400">Loading latest games…</div>
            )}
            {!loading && games.map((g: Game) => (
              <Link key={g.id} href={`/games/${g.canonicalSlug ?? ''}`} className="block bg-gray-900 rounded-2xl p-5 hover:bg-gray-800 transition-colors border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Rating</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1"><LinkIcon className="w-4 h-4" /> Details</div>
                </div>
                <div className="text-white font-bold text-xl mb-1 line-clamp-1">{g.title}</div>
                <div className="text-gray-300 text-sm mb-3">{g.shortDescription || g.genre?.join(', ')}</div>
                <div className="text-sm text-gray-400">{g.rating?.toFixed?.(1)} / 5 · {g.releaseDate || ''}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 编辑部评测（MDX） */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-4">Editorial Reviews</h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {items.map(r => (
            <Link key={r.slug} href={`/reviews/${r.slug}`} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold">{r.rating}</span>
                <span className="text-gray-400">/ 5.0</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
              <p className="text-gray-300 mb-4">{r.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{r.date}</span></div>
                <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{r.author}</span></div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
} 