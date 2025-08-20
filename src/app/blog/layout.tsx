import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Horror Games Blog - Latest News, Reviews & Guides',
  description: 'Stay updated with the latest horror gaming news, in-depth reviews, and comprehensive guides. From Silent Hill F to indie horror gems, discover everything in the world of horror gaming.',
  keywords: [
    'horror games blog',
    'horror gaming news',
    'horror game reviews',
    'horror game guides',
    'Silent Hill F',
    'survival horror games',
    'psychological horror',
    'horror gaming articles',
    'horror game analysis',
    'horror game walkthroughs'
  ].join(', '),
  openGraph: {
    title: 'Horror Games Blog - Latest News, Reviews & Guides',
    description: 'Stay updated with the latest horror gaming news, in-depth reviews, and comprehensive guides.',
    type: 'website',
    url: 'https://horrorgames.games/blog',
    siteName: 'Horror Games Hub',
  },
  alternates: {
    canonical: 'https://horrorgames.games/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 