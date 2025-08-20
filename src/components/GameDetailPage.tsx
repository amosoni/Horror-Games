"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Game } from "../types/game";
import { Star, Calendar, User, Tag, MessageCircle, Eye, Gamepad2 } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { horrorGames as localGames, curatedWebGames } from "../data/games";
import { gameSeoBySlug } from "../data/gameSeo";
import Image from 'next/image';

function renderFormattedDescription(desc: string) {
  const normalized = (desc || '').replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");
  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] | null = null;
  const flushParagraph = () => {
    if (paragraph.length) {
      nodes.push(
        <p key={`p-${nodes.length}`} className="mb-3 text-gray-200 leading-relaxed">
          {paragraph.join(' ')}
        </p>
      );
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems && listItems.length) {
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="mb-3 list-disc list-inside text-gray-200 space-y-1">
          {listItems.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }
    listItems = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || /^[-–—]{3,}$/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }
    if (/^(?:-|\*|•)\s+/.test(line)) {
      flushParagraph();
      listItems = listItems || [];
      listItems.push(line.replace(/^(?:-|\*|•)\s+/, ''));
      continue;
    }
    if (/^Q:\s*/i.test(line)) {
      flushParagraph();
      flushList();
      nodes.push(
        <p key={`q-${nodes.length}`} className="mb-1 text-gray-100"><span className="font-semibold text-white">Q:</span> {line.replace(/^Q:\s*/i, '')}</p>
      );
      continue;
    }
    if (/^A:\s*/i.test(line)) {
      flushParagraph();
      flushList();
      nodes.push(
        <p key={`a-${nodes.length}`} className="mb-3 text-gray-300"><span className="font-semibold text-white">A:</span> {line.replace(/^Q:\s*/i, '')}</p>
      );
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return <div>{nodes}</div>;
}

interface Props {
  slug: string;
}

export default function GameDetailPage({ slug }: Props) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentAgreed, setCommentAgreed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const extra = gameSeoBySlug[slug];

  // Local web game (for online playable embeds)
  const localWebGame = localGames.find(
    g => g.iframeUrl && ((g.canonicalSlug && g.canonicalSlug === slug) || g.id === slug)
  );
  const recommendedWeb = curatedWebGames
    .filter(g => (g.canonicalSlug ?? g.id) !== slug)
    .slice(0, 8);

  // Generate random play count for demo purposes
  const playCount = Math.floor(Math.random() * 100000) + 10000;

  useEffect(() => {
    let aborted = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // If this slug corresponds to a local playable web game, short-circuit network
        if (localWebGame) {
          if (!aborted) {
            setGame(localWebGame);
            setLoading(false);
          }
          return;
        }

        const res = await fetch(
          `/api/rawg/game?slug=${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json() as Game;
        if (!aborted) setGame(data);
      } catch (e) {
        if (!aborted)
          setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    run();

    return () => {
      aborted = true;
    };
  }, [slug, localWebGame]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Error Loading Game</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <Link href="/" className="text-red-500 hover:text-red-400 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
        <div className="text-center">
          <h1 className="text-xl text-white mb-3">Game Not Found</h1>
          <p className="mb-6">{error || "The game you are looking for does not exist."}</p>
          <Link href="/" className="inline-block px-4 py-2 rounded bg-red-600 text-white">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-300">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <span>←</span>
          <span>Back to Rankings</span>
        </Link>

        {/* Page heading (H1/H2) */}
        <header className="mt-4 md:mt-6 mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">{game.title}</h1>
          <h2 className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto">
            {(extra?.overview
              ? `${extra.overview.slice(0, 160)}...`
              : game.shortDescription || `Play ${game.title} online in your browser`) +
              ' — Overview, Story, Why Play & Tips inside.'}
          </h2>
        </header>

        {/* Online playable area */}
        {localWebGame ? (
          <section className="mb-10">
            {(() => {
              const url = String(localWebGame.iframeUrl || '');
              const isItch = /itch\.io|itch\.zone/i.test(url);
              return (
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-800 bg-black aspect-video">
                  {isItch ? (
                    <iframe
                      src={url}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="autoplay; fullscreen"
                      title={localWebGame.title}
                      onLoad={() => setIframeLoaded(true)}
                      onError={() => setIframeError(true)}
                    />
                  ) : (
                    <iframe
                      src={url}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="autoplay; fullscreen"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      title={localWebGame.title}
                      onLoad={() => setIframeLoaded(true)}
                      onError={() => setIframeError(true)}
                    />
                  )}
                  
                  {/* Loading overlay */}
                  {!iframeLoaded && !iframeError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Loading Game...</p>
                        <p className="text-sm text-gray-300 mt-2">Please wait</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Error overlay */}
                  {iframeError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <p className="text-lg font-semibold mb-2">Game Loading Failed</p>
                        <p className="text-sm text-gray-300 mb-4">itch.io may be protecting game content</p>
                        <div className="space-y-2">
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            Open Game in New Window
                          </a>
                          <button 
                            onClick={() => {
                              setIframeError(false);
                              setIframeLoaded(false);
                              // 强制重新加载 iframe
                              const iframe = document.querySelector('iframe');
                              if (iframe) {
                                const currentSrc = iframe.src;
                                iframe.src = '';
                                setTimeout(() => {
                                  iframe.src = currentSrc;
                                }, 100);
                              }
                            }}
                            className="block w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                          >
                            Retry Loading
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Fallback content if iframe fails */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-center text-white">
                      <p className="text-lg font-semibold mb-2">Game Loading...</p>
                      <p className="text-sm text-gray-300 mb-4">If the game cannot load, try refreshing the page</p>
                      <div className="space-y-2">
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Open Game in New Window
                        </a>
                        <button 
                          onClick={() => window.location.reload()}
                          className="block w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          Refresh Page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        ) : null}

        {/* Game Statistics Bar */}
        <div className="mb-8 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(game.rating || 0) ? 'fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-white font-bold">{game.rating || 0}</span>
              <span className="text-gray-400">({game.reviewCount || 0} votes)</span>
            </div>

            {/* Play Count */}
            <div className="flex items-center space-x-2 text-gray-300">
              <Eye className="w-5 h-5" />
              <span>Played {playCount.toLocaleString()} times</span>
            </div>

            {/* Developer */}
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5" />
              <span>{game.developer || 'Unknown'}</span>
            </div>

            {/* Release Date */}
            <div className="flex items-center space-x-2 text-gray-300">
              <Calendar className="w-5 h-5" />
              <span>{new Date(game.releaseDate || '2025-01-01').getFullYear()}</span>
            </div>

            {/* Platform */}
            <div className="flex items-center space-x-2 text-gray-300">
              <Gamepad2 className="w-5 h-5" />
              <span>{game.platform.join(', ')}</span>
            </div>

            {/* Technology */}
            <div className="flex items-center space-x-2 text-gray-300">
              <Tag className="w-5 h-5" />
              <span>HTML5</span>
            </div>
          </div>
        </div>

        {/* Game Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Image */}
            <img
              src={game.imageUrl || "https://placehold.co/1200x675?text=Horror+Game"}
              alt={game.title}
              className="w-full h-[420px] object-cover rounded-xl"
            />

            {/* Game Description */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
              {renderFormattedDescription(game.description || '')}
              
              {/* SEO enriched blocks for local games */}
              {localWebGame && extra && (
                <div className="mt-6 space-y-6">
                  {extra.overview && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Game Overview</h3>
                      <p className="text-gray-200 leading-relaxed">{extra.overview}</p>
                    </div>
                  )}
                  
                  {extra.story && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Story</h3>
                      <p className="text-gray-200 leading-relaxed">{extra.story}</p>
                    </div>
                  )}

                  {extra.features && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Game Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {extra.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {extra.howTo && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">How To Play</h3>
                      <div className="space-y-3">
                        {extra.howTo.map((step: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {extra.whyPlay && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Why Play This Game?</h3>
                      <p className="text-gray-200 leading-relaxed">{extra.whyPlay}</p>
                    </div>
                  )}

                  {extra.tips && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Pro Tips</h3>
                      <p className="text-gray-200 leading-relaxed">{extra.tips}</p>
                    </div>
                  )}

                  {extra.faqs && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {extra.faqs.map((faq: { q: string; a: string }, index: number) => (
                          <div key={index} className="border-l-4 border-orange-400 pl-4">
                            <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                            <p className="text-gray-300">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Game Tags */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                Explore the world of horror games with many more exciting games, one of which is invitationem.
              </p>
              <div className="flex flex-wrap gap-2">
                {game.genre.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-red-600/80 text-white rounded-full text-sm font-medium">
                    {tag.toLowerCase()}
                  </span>
                ))}
                {game.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Leave a Comment
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                </div>
                <textarea
                  placeholder="Content"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={commentAgreed}
                    onChange={(e) => setCommentAgreed(e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-500"
                  />
                  <label htmlFor="agree" className="text-gray-300 text-sm">
                    I&apos;d read and agree to the terms and conditions.
                  </label>
                </div>
                <button
                  onClick={() => {
                    if (commentName && commentEmail && commentContent && commentAgreed) {
                      alert('Comment submitted successfully!');
                      setCommentName('');
                      setCommentEmail('');
                      setCommentContent('');
                      setCommentAgreed(false);
                    } else {
                      alert('Please fill in all fields and agree to terms.');
                    }
                  }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recommended Games */}
            {recommendedWeb.length > 0 && (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recommended Games</h3>
                <div className="space-y-3">
                  {recommendedWeb.slice(0, 6).map((g) => (
                    <Link
                      key={g.id}
                      href={`/games/${g.canonicalSlug ?? g.id}`}
                      className="group block rounded-lg overflow-hidden border border-gray-800 bg-gray-900/60 hover:bg-gray-900 transition-colors duration-200"
                    >
                      <div className="relative aspect-[4/3]">
                        {/* background image */}
                        {g.imageUrl ? (
                          <Image 
                            src={g.imageUrl} 
                            alt={g.title} 
                            fill 
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                          />
                        ) : null}
                      </div>
                      <div className="p-3">
                        <div className="text-sm text-white font-semibold line-clamp-1">{g.title}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{g.genre.join(', ')}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ad Placeholder */}
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-gray-800 font-semibold mb-2">Free Domain Privacy</h4>
              <p className="text-gray-600 text-sm">Protect your domain with privacy services</p>
            </div>

            {/* Another Ad Placeholder */}
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-gray-800 font-semibold mb-2">Super-Speed Meets Simplicity</h4>
              <p className="text-gray-600 text-sm">Web services from Spaceship</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}