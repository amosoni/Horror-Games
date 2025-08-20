import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Psychological Horror Games: Mind-Bending Terror - Horror Games Online',
  description: 'Dive into the world of psychological horror games that mess with your mind and create lasting fear. Discover games that rely on atmosphere and psychological elements rather than jump scares.',
  keywords: [
    'psychological horror games',
    'mind-bending horror',
    'atmospheric horror games',
    'psychological thriller games',
    'horror games without jump scares',
    'mental horror games',
    'psychological gaming'
  ].join(', '),
  openGraph: {
    title: 'Psychological Horror Games: Mind-Bending Terror',
    description: 'Dive into the world of psychological horror games that mess with your mind and create lasting fear.',
    type: 'article',
    url: 'https://horrorgames.games/blog/psychological-horror-games',
    siteName: 'Horror Games Online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychological Horror Games: Mind-Bending Terror',
    description: 'Dive into the world of psychological horror games that mess with your mind and create lasting fear.',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://horrorgames.games/blog/psychological-horror-games',
  },
};

export default function PsychologicalHorrorGamesPage() {
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
                  <span className="inline-block bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    GAME ANALYSIS
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Psychological Horror Games
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                  Mind-Bending Terror That Messes With Your Head
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    January 5, 2025
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    12 min read
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
                    src="/blog/SILENTHILLf/SILENTHILLf5.jpg" 
                    alt="Psychological Horror Games" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
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
            <h2 className="text-xl font-bold mb-4 text-purple-400">Table of Contents</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#overview" className="hover:text-purple-400 transition-colors">Overview</a></li>
              <li><a href="#what-is-psychological-horror" className="hover:text-purple-400 transition-colors">What is Psychological Horror?</a></li>
              <li><a href="#top-games" className="hover:text-purple-400 transition-colors">Top Psychological Horror Games</a></li>
              <li><a href="#gameplay-mechanics" className="hover:text-purple-400 transition-colors">Gameplay Mechanics</a></li>
              <li><a href="#atmosphere" className="hover:text-purple-400 transition-colors">Atmosphere & Sound Design</a></li>
              <li><a href="#conclusion" className="hover:text-purple-400 transition-colors">Conclusion</a></li>
            </ul>
          </nav>

          {/* Article Content */}
          <article className="prose prose-invert prose-purple max-w-none">
            <section id="overview">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Psychological horror games represent the pinnacle of atmospheric terror in gaming. Unlike traditional horror games that rely on jump scares and gore, psychological horror focuses on creating an unsettling atmosphere that gets under your skin and stays with you long after you&apos;ve stopped playing.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                These games master the art of subtle manipulation, using environmental storytelling, unreliable narrators, and psychological manipulation to create a sense of dread that&apos;s far more effective than any monster or jump scare could ever be.
              </p>
            </section>

            <section id="what-is-psychological-horror">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">What is Psychological Horror?</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Psychological horror is a subgenre that focuses on creating fear through psychological and emotional manipulation rather than physical threats. These games often explore themes of mental illness, paranoia, isolation, and the fragility of the human mind.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Key Characteristics</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Atmospheric Tension:</strong> Builds fear through environment and mood rather than direct threats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Psychological Manipulation:</strong> Uses unreliable narrators and reality-bending elements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Subtle Horror:</strong> Fear comes from what you don&apos;t see rather than what you do</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Mental Impact:</strong> Creates lasting psychological effects beyond the gaming session</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="top-games">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Top Psychological Horror Games</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Layers of Fear</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    This masterpiece of psychological horror puts you in the role of a painter whose sanity slowly unravels as you explore a Victorian mansion. The game&apos;s signature mechanic of changing environments creates a constant sense of uncertainty and paranoia.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Atmospheric</span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Environmental Storytelling</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Unreliable Reality</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Amnesia: The Dark Descent</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    A game that revolutionized the genre by removing combat entirely, forcing players to rely on stealth and wits. The sanity mechanic, where staying in darkness affects your character&apos;s mental state, creates a unique psychological pressure.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Sanity System</span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">No Combat</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Stealth Horror</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Outlast</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Set in an abandoned psychiatric hospital, Outlast uses found footage mechanics and limited resources to create a sense of vulnerability. The game&apos;s approach to mental illness and institutional horror creates a deeply unsettling experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Found Footage</span>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Institutional Horror</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Vulnerability</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="gameplay-mechanics">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Gameplay Mechanics</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Psychological horror games employ unique mechanics that enhance the psychological impact rather than relying on traditional action elements. These mechanics are designed to create tension and uncertainty.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Sanity Systems</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Games like Amnesia and Eternal Darkness use sanity meters that affect gameplay and create psychological pressure.
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Environmental Manipulation</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Changing environments and reality-bending elements create uncertainty and disorientation.
                  </p>
                </div>
              </div>
            </section>

            <section id="atmosphere">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Atmosphere & Sound Design</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The atmosphere in psychological horror games is everything. From subtle ambient sounds to carefully crafted lighting, every element works together to create an oppressive, unsettling environment that gets under your skin.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Sound Design Elements</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Ambient Sounds:</strong> Subtle background noises that create unease</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Dynamic Music:</strong> Adaptive soundtracks that respond to player actions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Silence:</strong> Strategic use of quiet moments to build tension</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="conclusion">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Conclusion</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Psychological horror games represent the most sophisticated form of horror in gaming. By focusing on mental and emotional manipulation rather than physical threats, they create experiences that are far more memorable and impactful than traditional horror games.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The best psychological horror games stay with you long after you&apos;ve finished playing, their atmosphere and themes lingering in your mind. They prove that true horror doesn&apos;t need monsters or gore—it just needs to understand how to mess with your head.
              </p>
            </section>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/silent-hill-f" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf1.jpg" 
                      alt="Silent Hill F" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      Silent Hill F: Everything You Need to Know
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Discover the latest installment in the iconic survival horror series.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/survival-horror-games-2025" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf2.jpg" 
                      alt="Survival Horror Games 2025" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      Best Survival Horror Games 2025
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Complete guide to the most anticipated horror games releasing this year.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/silent-hill-series-history" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf4.jpg" 
                      alt="Silent Hill Series History" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
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
          <section className="mt-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore More Psychological Horror</h2>
            <p className="text-gray-200 mb-6">
              Discover more games that mess with your mind and create lasting psychological impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Play Horror Games
              </Link>
              <Link href="/blog" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
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