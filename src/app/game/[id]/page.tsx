import React from 'react';
import { Metadata } from 'next';
import { horrorGames } from '../../../data/games';
import { gameSeoBySlug } from '../../../data/gameSeo';
import GameDetailClient from './GameDetailClient';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const game = horrorGames.find(g => g.id === id);
  const gameSeo = gameSeoBySlug[id as keyof typeof gameSeoBySlug];
  
  if (!game) {
    return {
      title: 'Game Not Found - Horror Games Online',
      description: 'The requested horror game could not be found.',
    };
  }

  const title = gameSeo?.titleOverride || game.title;
  const description = gameSeo?.description || game.description;
  const keywords = gameSeo?.keywords?.join(', ') || game.genre.join(', ');
  
  return {
    title: `${title} - Horror Games Online`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: [
        {
          url: game.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [game.imageUrl],
    },
    alternates: {
      canonical: `/game/${game.canonicalSlug || game.id}`,
    },
  };
}

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = horrorGames.find(g => g.id === id);
  const gameSeo = gameSeoBySlug[id as keyof typeof gameSeoBySlug];

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
          <a href="/" className="text-red-400 hover:text-red-300">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <GameDetailClient game={game} gameSeo={gameSeo} />;
} 