import React from 'react';
import Script from 'next/script';
import '../index.css';
import type { Metadata } from 'next';
import I18nProvider from '../components/I18nProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://horrorgames.games';

export const metadata: Metadata = {
  title: 'Horror Games Online - Play Free Horror Games in Browser',
  description: 'Play the best free horror games online directly in your browser. No downloads required! Discover survival horror, psychological horror, and jump scare games.',
  keywords: [
    'horror games online',
    'free horror games', 
    'horror games browser',
    'survival horror',
    'psychological horror',
    'jump scare games',
    'horror games steam',
    'horror games multiplayer'
  ].join(', '),
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Horror Games Online - Play Free Horror Games in Browser',
    description: 'Play the best free horror games online directly in your browser. No downloads required! Discover survival horror, psychological horror, and jump scare games.',
    type: 'website',
    url: siteUrl + '/',
    siteName: 'Horror Games Online',
    images: [
      { url: '/logo.svg', width: 512, height: 512, alt: 'Horror Games Online' },
      { url: '/og-image.svg', width: 1200, height: 630, alt: 'Horror Games Online' },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horror Games Online - Play Free Horror Games in Browser',
    description: 'Play the best free horror games online directly in your browser. No downloads required! Discover survival horror, psychological horror, and jump scare games.',
    images: ['/logo.svg', '/og-image.svg'],
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
  alternates: { canonical: siteUrl + '/' },
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
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-Robots-Tag" content="index, follow" />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7151444025542785"
          crossOrigin="anonymous"
        />

        {/* Google tag (gtag.js) using next/script to avoid hydration mismatch */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-7QH42Q9P3L`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7QH42Q9P3L');
          `}
        </Script>
        
        {/* Structured Data */}
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
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
          })}
        </Script>
      </head>
      <body>
        <I18nProvider>
          <div className="min-h-screen bg-black text-white">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
