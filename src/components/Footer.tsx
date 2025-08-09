"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-black/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-300">
        <div>
          <div className="text-white font-bold text-lg mb-3">Horror Games Online</div>
          <p className="text-gray-400">Play the best horror games online. Curated lists across Steam, PlayStation, Xbox, PC and Roblox.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Platforms</div>
          <ul className="space-y-1">
            <li><Link href="/horror-games-on-steam" className="hover:text-white">Steam</Link></li>
            <li><Link href="/horror-games-on-playstation" className="hover:text-white">PlayStation</Link></li>
            <li><Link href="/horror-games-on-xbox" className="hover:text-white">Xbox</Link></li>
            <li><Link href="/horror-games-on-pc" className="hover:text-white">PC</Link></li>
            <li><Link href="/horror-games-on-roblox" className="hover:text-white">Roblox</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Collections</div>
          <ul className="space-y-1">
            <li><Link href="/co-op-horror-games" className="hover:text-white">Co-op Horror Games</Link></li>
            <li><Link href="/free-horror-games" className="hover:text-white">Free Horror Games</Link></li>
            <li><Link href="/jump-scare-games" className="hover:text-white">Jump Scare Games</Link></li>
            <li><Link href="/survival-horror-games" className="hover:text-white">Survival Horror Games</Link></li>
            <li><Link href="/psychological-horror-games" className="hover:text-white">Psychological Horror Games</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Site</div>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/reviews" className="hover:text-white">Reviews</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
            <li><Link href="/robots.txt" className="hover:text-white">Robots</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Horror Games Online. All rights reserved.
      </div>
    </footer>
  );
} 