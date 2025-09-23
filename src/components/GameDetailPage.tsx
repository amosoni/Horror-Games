"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { Game } from "../types/game";
import { Star, Calendar, User, Tag, MessageCircle, Eye, Gamepad2, ThumbsUp, Trash2, Send } from "lucide-react";
import { horrorGames as localGames, curatedWebGames } from "../data/games";
import { halloweenGames } from "../data/halloweenGames";
import { gameSeoBySlug } from "../data/gameSeo";
import Image from 'next/image';
// Modal removed; inline only

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

interface Comment {
  id: string;
  gameId: string;
  userName: string;
  userEmail: string;
  content: string;
  rating: number;
  date: string;
  helpful: number;
  replies?: Comment[];
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
  const [commentRating, setCommentRating] = useState(5);
  const [commentAgreed, setCommentAgreed] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const extra = gameSeoBySlug[slug];
  const [iframeCount, setIframeCount] = useState<number | null>(null);

  // Per-slug style overrides to minimize visual split for tricky sources
  const containerOverride: { aspectRatio?: string; fixedHeightVh?: number } =
    slug === 'nightmare-kart' ? { aspectRatio: '16 / 10' } :
    slug === 'soul-roulette' ? { aspectRatio: '16 / 10' } :
    slug === 'sprunki-fall-edition' ? { fixedHeightVh: 68 } :
    slug === 'creepy-cave-cave-in' ? { aspectRatio: '4 / 3' } :
    {};

  // Local web game (for online playable embeds)
  const localWebGame = useMemo(() => {
    return localGames.find(
      g => g.iframeUrl && ((g.canonicalSlug && g.canonicalSlug === slug) || g.id === slug)
    ) || halloweenGames.find(
      g => g.iframeUrl && ((g.canonicalSlug && g.canonicalSlug === slug) || g.id === slug)
    );
  }, [slug]);
  
  const recommendedWeb = curatedWebGames
    .filter(g => (g.canonicalSlug ?? g.id) !== slug && g.iframeUrl) // Only show iframe games
    .slice(0, 8);

  // Generate random play count for demo purposes
  const playCount = Math.floor(Math.random() * 100000) + 10000;

  // 加载评论
  const loadComments = useCallback(async () => {
    if (!game) return;
    
    setCommentsLoading(true);
    try {
      const response = await fetch(`/api/comments?gameId=${game.id}`);
      const data = await response.json();
      if (response.ok) {
        setComments(data.comments || []);
      } else {
        console.error('Failed to load comments:', data.error);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  }, [game]);

  // 提交评论
  const submitComment = async () => {
    if (!game || !commentName || !commentEmail || !commentContent || !commentAgreed) {
      setCommentError('Please fill in all fields and agree to terms.');
      return;
    }

    setCommentSubmitting(true);
    setCommentError(null);
    setCommentSuccess(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
          userName: commentName,
          userEmail: commentEmail,
          content: commentContent,
          rating: commentRating,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setCommentSuccess(data.message);
        setCommentName('');
        setCommentEmail('');
        setCommentContent('');
        setCommentRating(5);
        setCommentAgreed(false);
        // 重新加载评论
        loadComments();
      } else {
        setCommentError(data.error || 'Failed to submit comment');
      }
    } catch {
      setCommentError('Network error. Please try again.');
    } finally {
      setCommentSubmitting(false);
    }
  };

  // 点赞评论
  const likeComment = async (commentId: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          action: 'helpful',
        }),
      });

      if (response.ok) {
        // 更新本地评论状态
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? { ...comment, helpful: comment.helpful + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // 删除评论
  const deleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments?commentId=${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Network error. Please try again.');
    }
  };

  // Keep host page scroll enabled; iframe scroll is disabled via attribute below

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

  // 当游戏加载完成后加载评论
  useEffect(() => {
    if (game) {
      loadComments();
    }
  }, [game, loadComments]);

  useEffect(() => {
    // Count iframes within the playable section to rule out duplicate mounts
    const section = document.getElementById('playable-section');
    if (section) {
      const count = section.querySelectorAll('iframe').length;
      setIframeCount(count);
    }
  }, []);

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
          <section className="mb-10" id="playable-section">
            <div
              className="relative w-full overflow-hidden rounded-xl border border-gray-800 bg-black"
              style={
                containerOverride.fixedHeightVh
                  ? { width: '100%', height: `${containerOverride.fixedHeightVh}vh` }
                  : { width: '100%', aspectRatio: containerOverride.aspectRatio || '16 / 9' }
              }
            >
              <iframe
                data-testid="game-iframe"
                key={`game-iframe-${localWebGame.id}`}
                src={localWebGame.iframeUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allow="autoplay; fullscreen"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                title={localWebGame.title}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                scrolling="no"
                style={{ width: '100%', height: '100%', border: '0', overflow: 'hidden' }}
              />

              {typeof iframeCount === 'number' && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  iframes: {iframeCount}
                </div>
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
                    <p className="text-sm text-gray-300 mb-4">The game may not be available</p>
                    <div className="space-y-2">
                      <a 
                        href={localWebGame.iframeUrl} 
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
                          const iframe = document.querySelector('iframe');
                          if (iframe) {
                            const currentSrc = (iframe as HTMLIFrameElement).src;
                            (iframe as HTMLIFrameElement).src = '';
                            setTimeout(() => {
                              (iframe as HTMLIFrameElement).src = currentSrc;
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
            </div>
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
              <div className="flex flex-wrap gap-2">
                {game.platform.map((platform, index) => {
                  const platformLinks: Record<string, string> = {
                    'Steam': '/horror-games-on-steam',
                    'PlayStation': '/horror-games-on-playstation',
                    'Xbox': '/horror-games-on-xbox',
                    'Nintendo Switch': '/horror-games-on-nintendo',
                    'PC': '/horror-games-on-pc',
                    'Roblox': '/horror-games-on-roblox',
                    'Web': '#'
                  };
                  
                  const platformLink = platformLinks[platform] || '#';
                  const isWeb = platform === 'Web';
                  
                  return (
                    <Link
                      key={index}
                      href={platformLink}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        isWeb 
                          ? 'bg-gray-700 text-gray-300 cursor-default' 
                          : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 border border-blue-500/30'
                      }`}
                    >
                      {platform}
                    </Link>
                  );
                })}
              </div>
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
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
              <Image
                src={game.imageUrl || "https://placehold.co/1200x675?text=Horror+Game"}
                alt={game.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Game Description */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
              {renderFormattedDescription(game.description || '')}
              
              {/* SEO enriched content from game object */}
              {localWebGame && (
                <div className="mt-6 space-y-6">
                  {game.gameplayDescription && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Gameplay</h3>
                      <p className="text-gray-200 leading-relaxed">{game.gameplayDescription}</p>
                    </div>
                  )}
                  
                  {game.storyDescription && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Story</h3>
                      <p className="text-gray-200 leading-relaxed">{game.storyDescription}</p>
                    </div>
                  )}

                  {game.keyFeatures && game.keyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {game.keyFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {game.systemRequirements && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">System Requirements</h3>
                      <div className="space-y-2">
                        {game.systemRequirements.minimum && (
                          <div>
                            <span className="text-gray-400 font-medium">Minimum: </span>
                            <span className="text-gray-300">{game.systemRequirements.minimum}</span>
                          </div>
                        )}
                        {game.systemRequirements.recommended && (
                          <div>
                            <span className="text-gray-400 font-medium">Recommended: </span>
                            <span className="text-gray-300">{game.systemRequirements.recommended}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {game.ageRating && (
                      <div>
                        <span className="text-gray-400 font-medium">Age Rating: </span>
                        <span className="text-gray-300">{game.ageRating}</span>
                      </div>
                    )}
                    {game.languages && game.languages.length > 0 && (
                      <div>
                        <span className="text-gray-400 font-medium">Languages: </span>
                        <span className="text-gray-300">{game.languages.join(', ')}</span>
                      </div>
                    )}
                    {game.playTime && (
                      <div>
                        <span className="text-gray-400 font-medium">Play Time: </span>
                        <span className="text-gray-300">{game.playTime}</span>
                      </div>
                    )}
                    {game.difficulty && (
                      <div>
                        <span className="text-gray-400 font-medium">Difficulty: </span>
                        <span className="text-gray-300">{game.difficulty}</span>
                      </div>
                    )}
                    {game.achievements && (
                      <div>
                        <span className="text-gray-400 font-medium">Achievements: </span>
                        <span className="text-gray-300">{game.achievements}</span>
                      </div>
                    )}
                    {game.lastUpdated && (
                      <div>
                        <span className="text-gray-400 font-medium">Last Updated: </span>
                        <span className="text-gray-300">{game.lastUpdated}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
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

            {/* Download Links */}
            {((game.storeLinks && game.storeLinks.length > 0) || game.steamUrl) && (
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download & Purchase Links
                </h3>
                <p className="text-gray-300 mb-6">
                  Get this game from official stores and platforms. Click any link below to purchase or download.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Steam Link */}
                  {game.steamUrl && (
                    <a
                      href={game.steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-orange-800/20 to-red-800/20 border border-orange-500/30 rounded-lg p-4 hover:border-orange-400/50 hover:bg-orange-800/30 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                            <path d="M12 6l-4 4h3v4h2v-4h3l-4-4z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-orange-300 transition-colors">
                            Steam
                          </h4>
                          <p className="text-gray-400 text-sm">Official Store</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  )}
                  
                  {/* Other Store Links */}
                  {game.storeLinks && game.storeLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-green-800/20 to-emerald-800/20 border border-green-500/30 rounded-lg p-4 hover:border-green-400/50 hover:bg-green-800/30 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">
                            {link.label}
                          </h4>
                          <p className="text-gray-400 text-sm">Official Store</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                  
                  {/* Web Game Link */}
                  {game.iframeUrl && (
                    <a
                      href={game.iframeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-blue-800/20 to-cyan-800/20 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 hover:bg-blue-800/30 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            Play Online
                          </h4>
                          <p className="text-gray-400 text-sm">Direct Play Link</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Platform Recommendations */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2 text-blue-400" />
                Explore More Horror Games by Platform
              </h3>
              <p className="text-gray-300 mb-6">
                Discover the best horror games on each platform with our curated rankings and recommendations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link 
                  href="/horror-games-on-steam" 
                  className="group bg-gradient-to-br from-orange-900/30 to-red-900/20 border border-orange-500/30 rounded-lg p-4 hover:border-orange-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-orange-300">Steam</span>
                  </div>
                  <p className="text-gray-300 text-sm">Largest horror library with indie gems and AAA titles</p>
                </Link>
                
                <Link 
                  href="/horror-games-on-playstation" 
                  className="group bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-blue-300">PlayStation</span>
                  </div>
                  <p className="text-gray-300 text-sm">Exclusive titles and VR horror experiences</p>
                </Link>
                
                <Link 
                  href="/horror-games-on-xbox" 
                  className="group bg-gradient-to-br from-green-900/30 to-teal-900/20 border border-green-500/30 rounded-lg p-4 hover:border-green-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-green-300">Xbox</span>
                  </div>
                  <p className="text-gray-300 text-sm">Game Pass horror games and exclusive content</p>
                </Link>
                
                <Link 
                  href="/horror-games-on-nintendo" 
                  className="group bg-gradient-to-br from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-lg p-4 hover:border-red-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-red-300">Nintendo Switch</span>
                  </div>
                  <p className="text-gray-300 text-sm">Portable horror gaming and indie favorites</p>
                </Link>
                
                <Link 
                  href="/horror-games-on-pc" 
                  className="group bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-cyan-300">PC</span>
                  </div>
                  <p className="text-gray-300 text-sm">Mod support and high-end graphics</p>
                </Link>
                
                <Link 
                  href="/horror-games-on-roblox" 
                  className="group bg-gradient-to-br from-pink-900/30 to-purple-900/20 border border-pink-500/30 rounded-lg p-4 hover:border-pink-400/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-pink-300">Roblox</span>
                  </div>
                  <p className="text-gray-300 text-sm">User-created horror experiences and multiplayer</p>
                </Link>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comments ({comments.length})
              </h3>

              {/* 评论列表 */}
              {commentsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Loading comments...</p>
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {comment.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{comment.userName}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < comment.rating ? 'fill-current' : 'text-gray-600'}`} />
                                ))}
                              </div>
                              <span className="text-gray-400 text-sm">
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-200 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => likeComment(comment.id)}
                          className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{comment.helpful}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}

              {/* 评论表单 */}
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Leave a Comment</h4>
                
                {/* 错误和成功消息 */}
                {commentError && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                    {commentError}
                  </div>
                )}
                {commentSuccess && (
                  <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
                    {commentSuccess}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  
                  {/* 评分 */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setCommentRating(rating)}
                          className={`p-1 ${
                            rating <= commentRating 
                              ? 'text-yellow-400' 
                              : 'text-gray-600 hover:text-yellow-300'
                          }`}
                        >
                          <Star className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Share your thoughts about this game..."
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
                      I agree to the terms and conditions
                    </label>
                  </div>
                  
                  <button
                    onClick={submitComment}
                    disabled={commentSubmitting}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    {commentSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Comment</span>
                      </>
                    )}
                  </button>
                </div>
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
    </div>
  );
}