import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';

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

const blogPosts = [
  {
    id: 'silent-hill-f',
    title: 'Silent Hill F: New Silent Hill Game 2025 - Everything You Need to Know',
    excerpt: 'Discover Silent Hill F, the latest installment in the iconic survival horror series. Learn about the new Japanese setting, gameplay mechanics, release date, and how it connects to the Silent Hill universe.',
    category: 'Game News',
    readTime: '10 min read',
    publishDate: '2025-01-15',
    featured: true,
    tags: ['Silent Hill', 'Survival Horror', '2025 Games', 'Japanese Horror'],
    image: '/blog/silent-hill-f-og.jpg'
  },
  {
    id: 'survival-horror-games-2025',
    title: 'Best Survival Horror Games 2025: Complete Guide',
    excerpt: 'Explore the most anticipated survival horror games releasing in 2025. From AAA blockbusters to indie gems, discover what horror fans can look forward to this year.',
    category: 'Game Guides',
    readTime: '8 min read',
    publishDate: '2025-01-10',
    featured: false,
    tags: ['Survival Horror', '2025 Games', 'Game Guides', 'Horror Gaming'],
    image: '/blog/survival-horror-2025.jpg'
  },
  {
    id: 'psychological-horror-games',
    title: 'Psychological Horror Games: Mind-Bending Terror',
    excerpt: 'Dive into the world of psychological horror games that mess with your mind and create lasting fear. Discover games that rely on atmosphere and psychological elements rather than jump scares.',
    category: 'Game Analysis',
    readTime: '12 min read',
    publishDate: '2025-01-05',
    featured: false,
    tags: ['Psychological Horror', 'Game Analysis', 'Horror Gaming', 'Atmospheric Horror'],
    image: '/blog/psychological-horror.jpg'
  },
  {
    id: 'silent-hill-series-history',
    title: 'Silent Hill Series: Complete History & Evolution',
    excerpt: 'Take a deep dive into the complete history of the Silent Hill franchise. From its origins to the latest announcements, explore how this iconic series has evolved over the years.',
    category: 'Series Retrospective',
    readTime: '15 min read',
    publishDate: '2024-12-28',
    featured: false,
    tags: ['Silent Hill', 'Series History', 'Retrospective', 'Classic Horror'],
    image: '/blog/silent-hill-history.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Horror Games Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Latest news, in-depth reviews, and comprehensive guides from the world of horror gaming
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Play Horror Games
              </Link>
              <Link href="/about" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {blogPosts.filter(post => post.featured).map(post => (
          <article key={post.id} className="mb-12">
            <Link href={`/blog/${post.id}`} className="group">
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-full bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-red-400 font-semibold group-hover:text-red-300 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map(post => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="relative h-48 bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-red-400 font-semibold text-sm group-hover:text-red-300 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-200 mb-6">
            Get the latest horror gaming news and articles delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Horror Games Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 