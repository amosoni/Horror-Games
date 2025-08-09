"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Game } from "../types/game";
import { Share2, Bookmark, BookmarkCheck, Star as StarIcon, Award, List, ChevronRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { horrorGames as localGames, curatedWebGames } from "../data/games";
import { gameSeoBySlug } from "../data/gameSeo";

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
    if (/^(?:\-|\*|•)\s+/.test(line)) {
      flushParagraph();
      listItems = listItems || [];
      listItems.push(line.replace(/^(?:\-|\*|•)\s+/, ''));
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
        <p key={`a-${nodes.length}`} className="mb-3 text-gray-300"><span className="font-semibold text-white">A:</span> {line.replace(/^A:\s*/i, '')}</p>
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
  const extra = gameSeoBySlug[slug];

  // Local web game (for online playable embeds)
  const localWebGame = localGames.find(
    g => g.iframeUrl && ((g.canonicalSlug && g.canonicalSlug === slug) || g.id === slug)
  );
  const recommendedWeb = curatedWebGames
    .filter(g => (g.canonicalSlug ?? g.id) !== slug)
    .slice(0, 8);

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

        const data: Game = await res.json();
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
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
        <div>
          <div className="animate-spin mx-auto mb-3 h-10 w-10 rounded-full border-b-2 border-red-600"></div>
          <p>Loading game details...</p>
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
                    />
                  )}
                </div>
              );
            })()}
          </section>
        ) : null}

        {/* Recommended web games */}
        {localWebGame && recommendedWeb.length ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Recommended Games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recommendedWeb.map((g) => (
                <Link
                  key={g.id}
                  href={`/games/${g.canonicalSlug ?? g.id}`}
                  className="group block rounded-lg overflow-hidden border border-gray-800 bg-gray-900/60 hover:bg-gray-900"
                >
                  <div className="relative aspect-video bg-black">
                    {g.imageUrl ? (
                      <img src={g.imageUrl} alt={g.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : null}
                  </div>
                  <div className="p-2">
                    <div className="text-sm text-white font-semibold line-clamp-1">{g.title}</div>
                    <div className="text-xs text-gray-400 line-clamp-1">{g.genre.join(', ')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* SEO/details content (RAWG) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={game.imageUrl || "https://placehold.co/1200x675?text=Horror+Game"}
              alt={game.title}
              className="w-full h-[420px] object-cover rounded-xl"
            />
            <div className="mt-6 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-3">About This Game</h2>
              {renderFormattedDescription(game.description || '')}
              {/* SEO enriched blocks for local games */}
              {localWebGame ? (
                <div className="mt-6 space-y-6">
                  {(() => {
                    const extra = gameSeoBySlug[slug];
                    return (
                      <>
                        {extra?.overview ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                            <p className="text-gray-200 leading-relaxed">{extra.overview}</p>
                          </div>
                        ) : null}
                        {extra?.story ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Story</h3>
                            <p className="text-gray-200 leading-relaxed">{extra.story}</p>
                          </div>
                        ) : null}
                        {extra?.whyPlay ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Why Play</h3>
                            <p className="text-gray-200 leading-relaxed">{extra.whyPlay}</p>
                          </div>
                        ) : null}
                        {extra?.tips ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Tips</h3>
                            <p className="text-gray-200 leading-relaxed">{extra.tips}</p>
                          </div>
                        ) : null}
                        {extra?.features?.length ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
                            <ul className="list-disc list-inside text-gray-200 space-y-1">
                              {extra.features.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {extra?.howTo?.length ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">How to Play</h3>
                            <ol className="list-decimal list-inside text-gray-200 space-y-1">
                              {extra.howTo.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ol>
                          </div>
                        ) : null}
                        {extra?.faqs?.length ? (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
                            <div className="space-y-3">
                              {extra.faqs.map((f, i) => (
                                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                                  <p className="text-white font-medium">Q: {f.q}</p>
                                  <p className="text-gray-300">A: {f.a}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </>
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Game Info</h3>
              {game.shortDescription ? (
                <p className="text-base text-gray-300">{game.shortDescription}</p>
              ) : null}
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-white text-xl font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" /> {game.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">
                  ({game.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {game.platform?.length ? (
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platform.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 