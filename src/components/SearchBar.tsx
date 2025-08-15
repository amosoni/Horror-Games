import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { SearchFilters } from '../types/common';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter?: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search horror games..."
            className="w-full pl-12 pr-16 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="">All Platforms</option>
                <option value="steam">Steam</option>
                <option value="playstation">PlayStation</option>
                <option value="xbox">Xbox</option>
                <option value="nintendo">Nintendo Switch</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="">All Genres</option>
                <option value="survival">Survival Horror</option>
                <option value="psychological">Psychological</option>
                <option value="action">Action Horror</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="">Any Price</option>
                <option value="free">Free</option>
                <option value="under10">Under $10</option>
                <option value="under25">Under $25</option>
                <option value="under50">Under $50</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}