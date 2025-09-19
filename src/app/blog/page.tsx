"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;
  
  // Newsletter subscription state
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');

  // 获取所有可用的分类和标签
  const allCategories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // 筛选文章
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 重置分页当筛选条件改变时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTags]);

  // Newsletter subscription handler
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('idle');
    setSubscriptionMessage('');

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里可以添加真实的API调用
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setSubscriptionStatus('success');
      setSubscriptionMessage('Thank you for subscribing! You\'ll receive our latest updates soon.');
      setEmail('');
    } catch {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Horror Games Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
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
      <main className="container mx-auto px-4 py-8">
        {/* Quick Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Articles
            </button>
            {allCategories.filter(cat => cat !== 'all').map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {allCategories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 8).map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="text-sm text-gray-400">
                Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
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
                    <Image 
                      src={post.id === 'silent-hill-f' ? '/blog/SILENTHILLf/SILENTHILLf1.jpg' : 
                           post.id === 'survival-horror-games-2025' ? '/blog/SILENTHILLf/SILENTHILLf2.jpg' :
                           post.id === 'psychological-horror-games' ? '/blog/SILENTHILLf/SILENTHILLf3.jpg' :
                           post.id === 'silent-hill-series-history' ? '/blog/SILENTHILLf/SILENTHILLf4.jpg' :
                           '/blog/SILENTHILLf/SILENTHILLf5.jpg'}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
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
        {currentPosts.filter(post => !post.featured).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg h-full">
                    <div className="relative h-48 bg-gray-700">
                      <Image 
                        src={post.id === 'silent-hill-f' ? '/blog/SILENTHILLf/SILENTHILLf1.jpg' : 
                             post.id === 'survival-horror-games-2025' ? '/blog/SILENTHILLf/SILENTHILLf2.jpg' :
                             post.id === 'psychological-horror-games' ? '/blog/SILENTHILLf/SILENTHILLf3.jpg' :
                             post.id === 'silent-hill-series-history' ? '/blog/SILENTHILLf/SILENTHILLf4.jpg' :
                             '/blog/SILENTHILLf/SILENTHILLf5.jpg'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
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
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              No articles found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTags([]);
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Popular Tags */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Popular Tags</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-200 mb-6">
            Get the latest horror gaming news and articles delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing || !email}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {/* Status Messages */}
            {subscriptionStatus === 'success' && (
              <div className="text-green-200 text-sm bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                {subscriptionMessage}
              </div>
            )}
            
            {subscriptionStatus === 'error' && (
              <div className="text-red-200 text-sm bg-red-900/20 rounded-lg p-3 border border-red-500/30">
                {subscriptionMessage}
              </div>
            )}
            
            {/* Privacy Notice */}
            <p className="text-xs text-gray-300 mt-3">
              By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
            </p>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Horror Games Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 