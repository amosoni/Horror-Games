 "use client";

import React from 'react';
import { featuredGames, horrorGames } from '../../data/games';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">测试页面</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Games ({featuredGames.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredGames.map((game) => (
            <div key={game.id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold">{game.title}</h3>
              <p className="text-gray-300 text-sm">{game.shortDescription}</p>
              <p className="text-red-400 text-sm">Rating: {game.rating}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">All Games ({horrorGames.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {horrorGames.slice(0, 6).map((game) => (
            <div key={game.id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold">{game.title}</h3>
              <p className="text-gray-300 text-sm">{game.shortDescription}</p>
              <p className="text-red-400 text-sm">Rating: {game.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}