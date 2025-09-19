import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Silent Hill Series: Complete History & Evolution - Horror Games Online',
  description: 'Take a deep dive into the complete history of the Silent Hill franchise. From its origins to the latest announcements, explore how this iconic series has evolved over the years.',
  keywords: [
    'silent hill series history',
    'silent hill franchise evolution',
    'silent hill games timeline',
    'survival horror series',
    'konami horror games',
    'silent hill development history',
    'classic horror gaming'
  ].join(', '),
  openGraph: {
    title: 'Silent Hill Series: Complete History & Evolution',
    description: 'Take a deep dive into the complete history of the Silent Hill franchise.',
    type: 'article',
    url: 'https://horrorgames.games/blog/silent-hill-series-history',
    siteName: 'Horror Games Online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silent Hill Series: Complete History & Evolution',
    description: 'Take a deep dive into the complete history of the Silent Hill franchise.',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://horrorgames.games/blog/silent-hill-series-history',
  },
};

export default function SilentHillSeriesHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="mb-4">
                  <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    SERIES RETROSPECTIVE
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Silent Hill Series
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                  Complete History & Evolution
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    December 28, 2024
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    15 min read
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
                    src="/blog/SILENTHILLf/SILENTHILLf6.jpg" 
                    alt="Silent Hill Series History" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
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
            <h2 className="text-xl font-bold mb-4 text-blue-400">Table of Contents</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a></li>
              <li><a href="#origins" className="hover:text-blue-400 transition-colors">Origins & Development</a></li>
              <li><a href="#classic-era" className="hover:text-blue-400 transition-colors">The Classic Era (1999-2004)</a></li>
              <li><a href="#transition-period" className="hover:text-blue-400 transition-colors">Transition Period (2006-2012)</a></li>
              <li><a href="#modern-era" className="hover:text-blue-400 transition-colors">Modern Era & Revival</a></li>
              <li><a href="#legacy" className="hover:text-blue-400 transition-colors">Legacy & Impact</a></li>
              <li><a href="#conclusion" className="hover:text-blue-400 transition-colors">Conclusion</a></li>
            </ul>
          </nav>

          {/* Article Content */}
          <article className="prose prose-invert prose-blue max-w-none">
            <section id="overview">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The Silent Hill series stands as one of the most influential and beloved franchises in survival horror gaming. Since its debut in 1999, the series has redefined what horror games could be, introducing innovative gameplay mechanics, psychological horror elements, and storytelling techniques that continue to influence the genre today.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                From its humble beginnings as a PlayStation exclusive to its current status as a multi-platform horror powerhouse, the Silent Hill series has undergone numerous transformations while maintaining its core identity as a psychological horror experience unlike any other.
              </p>
            </section>

            <section id="origins">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Origins & Development</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The Silent Hill series was conceived by Konami as a response to the success of Capcom&apos;s Resident Evil franchise. However, instead of following the established formula, Team Silent (the development team) chose to create something entirely different—a horror game that focused on psychological terror rather than action.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Key Development Principles</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Psychological Horror:</strong> Focus on mental and emotional terror over physical threats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Atmospheric Design:</strong> Create fear through environment and mood rather than jump scares</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Symbolic Storytelling:</strong> Use metaphor and symbolism to convey deeper meanings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Player Vulnerability:</strong> Make the player feel powerless and isolated</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="classic-era">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">The Classic Era (1999-2004)</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Silent Hill (1999)</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    The original Silent Hill introduced players to the fog-shrouded town and established the series&apos; signature atmosphere. With its innovative use of fog to create tension and its psychological horror approach, it set the standard for future entries.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Fog Mechanics</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Psychological Horror</span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Atmospheric Design</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Silent Hill 2 (2001)</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Often considered the pinnacle of the series, Silent Hill 2 perfected the psychological horror formula. Its story of guilt, loss, and redemption, combined with masterful atmosphere and symbolism, created an experience that transcended gaming.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Storytelling</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Symbolism</span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Character Development</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Silent Hill 3 (2003)</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    A direct sequel to the original game, Silent Hill 3 refined the series&apos; mechanics while introducing new elements like the Otherworld transformation system. It maintained the psychological horror focus while expanding the series&apos; mythology.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Otherworld System</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Series Mythology</span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Refined Gameplay</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">Silent Hill 4: The Room (2004)</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    The final game of the classic era experimented with new mechanics like the room-based hub system and first-person exploration. While divisive among fans, it demonstrated the series&apos; willingness to innovate and take risks.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Room System</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">First-Person Elements</span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Experimental Design</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="transition-period">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Transition Period (2006-2012)</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The mid-2000s marked a period of transition for the series, as Konami experimented with different development teams and approaches. This era saw both successes and missteps as the series attempted to adapt to changing gaming trends.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Key Changes During This Period</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Development Team Changes:</strong> Team Silent disbanded, new studios took over</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Platform Expansion:</strong> Series moved beyond PlayStation exclusivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Gameplay Evolution:</strong> Attempted to modernize while maintaining horror elements</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="modern-era">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Modern Era & Revival</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                After a period of relative quiet, the Silent Hill series has experienced a renaissance with new announcements and projects. The upcoming Silent Hill F represents a return to the series&apos; roots while embracing modern gaming technology.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Silent Hill F: A New Beginning</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The announcement of Silent Hill F has reignited interest in the series. Set in 1960s Japan, this new installment promises to blend traditional Japanese horror elements with the psychological horror the series is known for.
                </p>
                <Link href="/blog/silent-hill-f" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Read our detailed analysis of Silent Hill F →
                </Link>
              </div>
            </section>

            <section id="legacy">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Legacy & Impact</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The Silent Hill series&apos; influence extends far beyond its own success. Its innovations in psychological horror, atmospheric design, and storytelling have shaped the entire survival horror genre and continue to inspire developers today.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Genre Influence</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    The series pioneered psychological horror in gaming, influencing countless other titles.
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Technical Innovation</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Atmospheric effects like fog and lighting became industry standards.
                  </p>
                </div>
              </div>
            </section>

            <section id="conclusion">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Conclusion</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The Silent Hill series represents the pinnacle of psychological horror in gaming. Through its 25+ year history, it has consistently pushed boundaries, experimented with new ideas, and maintained its commitment to creating truly terrifying experiences that go beyond simple jump scares.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                As we look forward to Silent Hill F and other future entries, the series continues to demonstrate why it remains one of the most respected and influential franchises in horror gaming. Its legacy of innovation and excellence ensures that Silent Hill will continue to shape the genre for years to come.
              </p>
            </section>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/silent-hill-f" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf1.jpg" 
                      alt="Silent Hill F" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      Silent Hill F: Everything You Need to Know
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Discover the latest installment in the iconic survival horror series.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/survival-horror-games-2025" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf2.jpg" 
                      alt="Survival Horror Games 2025" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      Best Survival Horror Games 2025
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Complete guide to the most anticipated horror games releasing this year.
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/psychological-horror-games" className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                  <div className="relative h-32 bg-gray-700">
                    <Image 
                      src="/blog/SILENTHILLf/SILENTHILLf3.jpg" 
                      alt="Psychological Horror Games" 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      Psychological Horror Games Guide
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Explore games that mess with your mind and create lasting fear.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore the Silent Hill Universe</h2>
            <p className="text-gray-200 mb-6">
              Discover more about the iconic series and stay updated on the latest developments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog/silent-hill-f" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Read About Silent Hill F
              </Link>
              <Link href="/blog" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                More Horror Articles
              </Link>
            </div>
          </section>
        </div>
      </main>

      
    </div>
  );
} 