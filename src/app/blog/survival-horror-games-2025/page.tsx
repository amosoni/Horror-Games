import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Best Survival Horror Games 2025: Complete Guide - Horror Games Online',
  description: 'Explore the most anticipated survival horror games releasing in 2025. From AAA blockbusters to indie gems, discover what horror fans can look forward to this year.',
  keywords: [
    'survival horror games 2025',
    'best horror games 2025',
    'upcoming horror games',
    'survival horror gaming',
    'horror game releases 2025',
    'indie horror games',
    'AAA horror games'
  ].join(', '),
  openGraph: {
    title: 'Best Survival Horror Games 2025: Complete Guide',
    description: 'Explore the most anticipated survival horror games releasing in 2025. From AAA blockbusters to indie gems, discover what horror fans can look forward to this year.',
    type: 'article',
    url: 'https://horrorgames.games/blog/survival-horror-games-2025',
    siteName: 'Horror Games Online',
    images: [
      {
        url: 'https://horrorgames.games/blog/survival-horror-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Survival Horror Games 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Survival Horror Games 2025: Complete Guide',
    description: 'Explore the most anticipated survival horror games releasing in 2025. From AAA blockbusters to indie gems, discover what horror fans can look forward to this year.',
    images: ['https://horrorgames.games/blog/survival-horror-2025.jpg'],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://horrorgames.games/blog/survival-horror-games-2025',
  },
  authors: [{ name: 'Horror Games Hub' }],
  publisher: 'Horror Games Online',
  category: 'Game Guides',
  article: {
    publishedTime: '2025-01-10T00:00:00Z',
    modifiedTime: '2025-01-10T00:00:00Z',
    author: 'Horror Games Hub',
    section: 'Game Guides',
    tags: ['Survival Horror', '2025 Games', 'Game Guides', 'Horror Gaming'],
  },
};

export default function SurvivalHorrorGames2025Page() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="mb-4">
                  <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    GAME GUIDES
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Best Survival Horror Games 2025
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                  Complete Guide to the Most Anticipated Horror Games
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    January 10, 2025
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    8 min read
                  </span>
                  <span className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Horror Games Hub
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <Image 
                    src="/blog/SILENTHILLf/SILENTHILLf1.jpg" 
                    alt="Best Survival Horror Games 2025" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <nav className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">Table of Contents</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#overview" className="hover:text-red-400 transition-colors">Overview</a></li>
              <li><a href="#aaa-games" className="hover:text-red-400 transition-colors">AAA Survival Horror Games</a></li>
              <li><a href="#indie-gems" className="hover:text-red-400 transition-colors">Indie Horror Gems</a></li>
              <li><a href="#platforms" className="hover:text-red-400 transition-colors">Platform Availability</a></li>
              <li><a href="#release-dates" className="hover:text-red-400 transition-colors">Release Dates & Expectations</a></li>
              <li><a href="#conclusion" className="hover:text-red-400 transition-colors">Conclusion</a></li>
            </ul>
          </nav>

          {/* Article Content */}
          <article className="prose prose-invert prose-red max-w-none">
            <section id="overview">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                2025 is shaping up to be an exceptional year for survival horror gaming. With the genre experiencing a renaissance thanks to both major studio releases and innovative indie titles, horror fans have much to look forward to. This comprehensive guide covers everything from highly anticipated AAA blockbusters to hidden indie gems that are pushing the boundaries of the genre.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The survival horror genre continues to evolve, incorporating modern gaming mechanics while maintaining the atmospheric tension and psychological horror elements that fans love. From classic franchises returning with fresh perspectives to entirely new IPs exploring uncharted territory, 2025 offers a diverse range of horror experiences.
              </p>
            </section>

            <section id="aaa-games">
              <h2 className="text-3xl font-bold mb-6 text-red-400">AAA Survival Horror Games</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-200">Silent Hill F</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The highly anticipated return of the Silent Hill franchise takes players to 1960s Japan in a rural village setting. This new installment promises to blend traditional Japanese horror elements with the psychological horror the series is known for.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Survival Horror</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Japanese Setting</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Psychological Horror</span>
                </div>
                <Link href="/blog/silent-hill-f" className="text-red-400 hover:text-red-300 transition-colors">
                  Read our detailed Silent Hill F analysis →
                </Link>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-200">Resident Evil 9</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Capcom&apos;s flagship survival horror series continues with what promises to be the most ambitious entry yet. While details remain scarce, early rumors suggest a return to the series&apos; roots with modern gameplay mechanics.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Survival Horror</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Capcom</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Classic Series</span>
                </div>
              </div>
            </section>

            <section id="indie-gems">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Indie Horror Gems</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">The Last Faith</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    A gothic horror metroidvania that combines dark fantasy elements with challenging combat and exploration.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Metroidvania</span>
                    <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">Gothic Horror</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Signalis</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    A retro-styled survival horror game inspired by classic PS1 era titles with modern sensibilities.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">Retro Style</span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Classic Horror</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="platforms">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Platform Availability</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The good news for horror fans is that most major releases in 2025 will be available across multiple platforms. PC gaming continues to be the primary platform for indie horror titles, while console players can expect most AAA releases to be available on PlayStation 5, Xbox Series X|S, and PC.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                  <h4 className="text-lg font-bold text-white mb-2">PC</h4>
                  <p className="text-gray-300 text-sm">Full library access with mod support</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                  <h4 className="text-lg font-bold text-white mb-2">PlayStation 5</h4>
                  <p className="text-gray-300 text-sm">Exclusive content and optimized performance</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                  <h4 className="text-lg font-bold text-white mb-2">Xbox Series X|S</h4>
                  <p className="text-gray-300 text-sm">Game Pass integration and cloud gaming</p>
                </div>
              </div>
            </section>

            <section id="release-dates">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Release Dates & Expectations</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                While exact release dates for many titles remain unconfirmed, the first half of 2025 is expected to see several major releases. The second half of the year promises even more exciting titles as developers finalize their projects.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Confirmed 2025 Releases</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    <span className="font-semibold">Q1 2025:</span> Several indie horror titles and early access releases
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    <span className="font-semibold">Q2 2025:</span> Major AAA releases begin to surface
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    <span className="font-semibold">Q3-Q4 2025:</span> Peak release period with blockbuster titles
                  </li>
                </ul>
              </div>
            </section>

            <section id="conclusion">
              <h2 className="text-3xl font-bold mb-6 text-red-400">Conclusion</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                2025 represents a golden age for survival horror gaming, with an unprecedented number of high-quality titles scheduled for release. Whether you&apos;re a fan of classic franchises or looking for innovative new experiences, this year has something to offer every horror enthusiast.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The combination of major studio support and independent developer creativity ensures that the survival horror genre continues to evolve and innovate. As we move through 2025, horror fans can expect to be treated to some of the most memorable and terrifying gaming experiences in recent memory.
              </p>
            </section>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-red-400">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/silent-hill-f" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf2.jpg" 
                      alt="Silent Hill F" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                      Silent Hill F: Everything You Need to Know
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Discover the latest installment in the iconic survival horror series.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/psychological-horror-games" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf3.jpg" 
                      alt="Psychological Horror Games" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                      Psychological Horror Games Guide
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Explore games that mess with your mind and create lasting fear.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/silent-hill-series-history" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf4.jpg" 
                      alt="Silent Hill Series History" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                      Silent Hill Series History
                    </h3>
                    <p className="text-gray-300 text-sm">
                      A comprehensive look at the evolution of the Silent Hill franchise.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated on Horror Gaming</h2>
            <p className="text-gray-200 mb-6">
              Get the latest news, reviews, and guides about survival horror games and the gaming industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Horror Games
              </Link>
              <Link href="/blog" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Read More Articles
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 