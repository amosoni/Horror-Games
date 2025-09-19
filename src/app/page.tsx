"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';
import Link from 'next/link';
import { curatedWebGames } from '../data/games';
import { Game } from '../types/game';
import Image from 'next/image';

export default function Page() {
  // Get featured game and grid games (only iframe games)
  const iframeGames = curatedWebGames.filter(g => g.iframeUrl);
  const featured = iframeGames[0];

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://horrorgames.games/" }
            ]
          })
        }}
      />
      {/* ItemList JSON-LD (featured+grid subset) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Horror Games Online — Featured",
            "numberOfItems": Math.min(20, iframeGames.length),
            "itemListElement": iframeGames.slice(0, 20).map((g, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "VideoGame",
                "name": g.title,
                "url": `https://horrorgames.games/games/${g.canonicalSlug ?? g.id}`,
                "genre": g.genre,
                "aggregateRating": g.rating ? { "@type": "AggregateRating", "ratingValue": g.rating, "ratingCount": g.reviewCount || 0 } : undefined
              }
            }))
          })
        }}
      />
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
            {/* Granny Game Card */}
            <Link href="/granny">
              <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-red-500/60 hover:bg-gray-700/90">
                <div className="relative aspect-[4/3] bg-gray-800">
                  <Image 
                    src="/images/Horror-Granny.jpg" 
                    alt="Granny - Horror Survival Game" 
                    fill 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <h3 className="text-sm font-bold text-white mb-1">Granny</h3>
                    <p className="text-xs text-gray-200 line-clamp-2">Survival Horror</p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Halloween Games Category Card */}
            <Link href="/halloween-games">
              <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-orange-500/60 hover:bg-gray-700/90">
                <div className="relative aspect-[4/3] bg-gray-800">
                  <Image 
                    src="/images/Halloween Games/Haunted-School.avif" 
                    alt="Halloween Horror Games Collection" 
                    fill 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      🎃 HALLOWEEN
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <h3 className="text-sm font-bold text-white mb-1">Halloween Games</h3>
                    <p className="text-xs text-gray-200 line-clamp-2">Spooky Collection</p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Other Games */}
            {iframeGames.slice(3).map((game: Game) => (
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

        {/* Halloween Games Special Section */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">🎃 Halloween Horror Special 🎃</h2>
            <p className="text-gray-300 text-sm">Get ready for the spookiest season with our curated collection</p>
          </div>
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 rounded-lg p-6 text-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-3">Halloween Horror Games Collection</h3>
                <p className="text-gray-200 mb-4 leading-relaxed text-sm">
                  Experience the ultimate Halloween scare with our specially curated collection of horror games. 
                  From haunted schools to creepy houses, these games will give you the perfect Halloween atmosphere!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Haunted Schools
                  </span>
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Creepy Houses
                  </span>
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Survival Horror
                  </span>
                </div>
                <Link 
                  href="/halloween-games" 
                  className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Explore Halloween Games
                </Link>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border-2 border-white/30">
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-bold text-white mb-2">Halloween Collection</h4>
                    <p className="text-sm text-gray-200">Spooky Horror Games</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Game: Granny */}
        <div className="mb-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">Featured Horror Game</h2>
            <p className="text-gray-300 text-sm">Experience the terrifying survival horror game</p>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-3">Granny - Survival Horror</h3>
                <p className="text-gray-200 mb-4 leading-relaxed text-sm">
                  Can you escape from the mysterious house without waking up Granny? 
                  Play this terrifying survival horror game online for free!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Survival Horror
                  </span>
                  <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Stealth Gameplay
                  </span>
                  <span className="inline-block bg-white text-xs font-semibold px-3 py-1 rounded-full">
                    Puzzle Solving
                  </span>
                </div>
                <Link 
                  href="/granny" 
                  className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Play Granny Now
                </Link>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border-2 border-red-500/30">
                  <Image 
                    src="/images/Horror-Granny.jpg" 
                    alt="Granny - Horror Survival Game" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-bold text-white mb-2">Granny</h4>
                    <p className="text-sm text-gray-200">Survival Horror Adventure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9.12 New Games Section */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">🎮 New Games Added 9.12</h2>
            <p className="text-gray-300 text-sm">Fresh horror experiences just added to our collection</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-5xl mx-auto">
            {curatedWebGames.slice(12, 28).map((game: Game) => (
              <Link key={game.id} href={`/games/${game.canonicalSlug ?? game.id}`}>
                <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-green-500/60 hover:bg-gray-700/90">
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
                    <div className="absolute top-2 left-2">
                      <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <h3 className="text-sm font-bold text-white mb-1">{game.title}</h3>
                      <p className="text-xs text-gray-200 line-clamp-2">{game.genre.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link 
              href="/games" 
              className="text-green-400 hover:text-green-300 transition-colors font-semibold"
            >
              View All Games →
            </Link>
          </div>
        </div>

        {/* Blog Section */}
        <div className="mb-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">Latest Horror Gaming News</h2>
            <p className="text-gray-300 text-sm">Stay updated with the latest horror gaming news and insights</p>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Silent Hill F: New Silent Hill Game 2025</h3>
            <p className="text-gray-200 mb-4">
              Discover everything you need to know about the latest installment in the iconic survival horror series. 
              Learn about the new Japanese setting, gameplay mechanics, and release date.
            </p>
            <Link 
              href="/blog/silent-hill-f" 
              className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Full Article
            </Link>
          </div>
          <div className="text-center mt-4">
            <Link 
              href="/blog" 
              className="text-red-400 hover:text-red-300 transition-colors font-semibold"
            >
              View All Articles →
            </Link>
          </div>
        </div>
        {/* FAQ JSON-LD (homepage) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Can I play horror games online without downloading?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many titles on our site are browser‑playable. Open a game page and start instantly." }},
                { "@type": "Question", "name": "Are these games free?", "acceptedAnswer": { "@type": "Answer", "text": "We tag free and demo content clearly. See our Free Horror Games page for a curated list." }},
                { "@type": "Question", "name": "How do you choose featured games?", "acceptedAnswer": { "@type": "Answer", "text": "We combine user ratings, review counts, freshness, and manual curation for quality and variety." }}
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
