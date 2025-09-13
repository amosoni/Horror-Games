"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { Game } from "../types/game";
import { Star, Calendar, User, Tag, MessageCircle, Eye, Gamepad2, ThumbsUp, Trash2, Send } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
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
    .filter(g => (g.canonicalSlug ?? g.id) !== slug)
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
      <Footer />
    </div>
  );
}