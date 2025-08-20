import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Calendar, Gamepad2, AlertTriangle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Play Granny Online - Free Horror Survival Game | Horror Games Online',
  description: 'Play Granny online for free! Experience the terrifying survival horror game where you must escape from a mysterious house while avoiding the creepy Granny. No download required.',
  keywords: [
    'Granny game',
    'play Granny online',
    'Granny horror game',
    'free Granny game',
    'Granny survival horror',
    'Granny escape game',
    'horror games online',
    'free horror games',
    'survival horror games'
  ].join(', '),
  openGraph: {
    title: 'Play Granny Online - Free Horror Survival Game',
    description: 'Play Granny online for free! Experience the terrifying survival horror game where you must escape from a mysterious house while avoiding the creepy Granny.',
    type: 'website',
    url: 'https://horrorgames.games/granny',
    siteName: 'Horror Games Online',
    images: [
      {
        url: '/games/granny-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Granny - Horror Survival Game',
      },
    ],
  },
  alternates: {
    canonical: 'https://horrorgames.games/granny',
  },
};

export default function GrannyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/Horror-Granny.jpg" 
            alt="Granny Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 to-gray-900/90" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                FREE TO PLAY
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Granny
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Can you escape from the mysterious house without waking up Granny?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span>4.1/5</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>304K+ players</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Updated 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Game Player */}
          <section className="mb-12">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-center">Play Granny Online</h2>
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-600">
                <iframe 
                  src="https://www.miniplay.com/embed/horror-granny" 
                  style={{ width: '100%', height: '100%' }} 
                  frameBorder="0" 
                  allowFullScreen
                  title="Play Granny Online - Horror Survival Game"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Game may take a moment to load. Make sure to enable pop-ups if the game doesn&apos;t start.
                </p>
              </div>
            </div>
          </section>

          {/* Game Information */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-red-400">About Granny</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Granny is a first-person survival horror game that puts your stealth and puzzle-solving skills to the ultimate test. 
                    You find yourself trapped in a mysterious house with only one goal: escape without being caught by the terrifying Granny.
                  </p>
                  <p>
                    The game features multiple difficulty levels, each offering a unique challenge. You&apos;ll need to search for items, 
                    solve puzzles, and navigate through the house while avoiding detection. Every sound you make could alert Granny 
                    to your presence, so you must move carefully and think strategically.
                  </p>
                  <p>
                    With its atmospheric horror elements, jump scares, and challenging gameplay, Granny has become one of the most 
                    popular horror games in the survival horror genre.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-400">Game Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Gamepad2 className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">First-Person Survival Horror</h4>
                      <p className="text-gray-400 text-sm">Immerse yourself in the terrifying atmosphere</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Gamepad2 className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Stealth Gameplay</h4>
                      <p className="text-gray-400 text-sm">Avoid detection and stay quiet to survive</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Gamepad2 className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Puzzle Solving</h4>
                      <p className="text-gray-400 text-sm">Find items and solve mysteries to escape</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Gamepad2 className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Multiple Difficulty Levels</h4>
                      <p className="text-gray-400 text-sm">Challenge yourself with increasing difficulty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Play */}
          <section className="mb-12">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 text-red-400 text-center">How to Play</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Explore Carefully</h3>
                  <p className="text-gray-300 text-sm">
                    Search the house for items and clues while staying quiet to avoid detection.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Solve Puzzles</h3>
                  <p className="text-gray-300 text-sm">
                    Find the right items and use them to unlock doors and solve mysteries.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Escape Alive</h3>
                  <p className="text-gray-300 text-sm">
                    Make it to the exit without being caught by Granny to win the game.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips & Strategies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-red-400">Tips & Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-white">Stealth Tips</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Walk slowly to reduce noise</li>
                  <li>• Close doors behind you</li>
                  <li>• Hide under beds or in closets when Granny is nearby</li>
                  <li>• Use distractions to lure Granny away</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-white">Survival Strategies</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Learn Granny&apos;s patrol patterns</li>
                  <li>• Always have an escape route planned</li>
                  <li>• Don&apos;t panic - stay calm and think</li>
                  <li>• Practice on easier difficulties first</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Warning */}
          <section className="mb-12">
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Content Warning</h3>
                  <p className="text-gray-300 text-sm">
                    This game contains jump scares, horror elements, and may not be suitable for all players. 
                    If you&apos;re sensitive to horror content, please proceed with caution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Games */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-red-400">More Horror Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/" className="group">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    Horror Games Collection
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Discover more terrifying games to play online
                  </p>
                </div>
              </Link>
              <Link href="/survival-horror-games" className="group">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    Survival Horror Games
                  </h3>
                  <p className="text-gray-300 text-sm">
                    More survival horror experiences like Granny
                  </p>
                </div>
              </Link>
              <Link href="/free-horror-games" className="group">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    Free Horror Games
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Play more free horror games online
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 