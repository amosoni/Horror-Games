import React from 'react';
import '../index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Horror Games Online - Play Free Horror Games in Browser',
  description: 'Play the best free horror games online directly in your browser. No downloads required! Discover survival horror, psychological horror, and jump scare games on Steam, PlayStation, Xbox, PC, and Roblox.',
  keywords: [
    'horror games online',
    'free horror games', 
    'horror games free',
    'play horror games',
    'online horror games',
    'browser horror games',
    'horror games on steam',
    'horror games on roblox',
    'horror games pc',
    'horror games ps5',
    'horror games multiplayer',
    'horror games to play with friends',
    'horror games 2025',
    'horror games unblocked',
    'survival horror',
    'psychological horror',
    'jump scare games'
  ].join(', '),
  metadataBase: new URL('https://horrorgames.games'),
  openGraph: {
    title: 'Horror Games Online - Play Free Horror Games in Browser',
    description: 'Play the best free horror games online directly in your browser. No downloads required! Discover survival horror, psychological horror, and jump scare games.',
    type: 'website',
    url: 'https://horrorgames.games/',
    siteName: 'Horror Games Online',
    images: [
      { url: '/logo.svg', width: 512, height: 512, alt: 'Horror Games Online' },
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Horror Games Online' },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horror Games Online - Play Free Horror Games in Browser',
    description: 'Play the best free horror games online directly in your browser. No downloads required!',
    images: ['/logo.svg', '/og-image.jpg'],
    site: '@horrorgames'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: { canonical: 'https://horrorgames.games/' },
  authors: [{ name: 'Horror Games Hub' }],
  creator: 'Horror Games Hub',
  publisher: 'Horror Games Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7QH42Q9P3L"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-7QH42Q9P3L');`,
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Horror Games Online",
              "url": "https://horrorgames.games",
              "description": "Play the best free horror games online directly in your browser",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://horrorgames.games/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "icons": [
                { "src": "/logo.svg", "sizes": "any", "type": "image/svg+xml" }
              ]
            })
          }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-black text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
