"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, User } from 'lucide-react';
import Header from '../../components/Header';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Horror Game Reviews
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Read detailed reviews of the best horror games. Get insights from our expert reviewers.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Sample Review */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-bold">4.8</span>
              <span className="text-gray-400">/ 5.0</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Resident Evil 4 Remake</h3>
            <p className="text-gray-300 mb-4">
              A masterful remake that modernizes the classic while preserving its essence. The updated graphics and controls make this the definitive version.
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>March 2023</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>John Doe</span>
              </div>
            </div>
          </div>

          {/* More reviews would go here */}
        </motion.div>
      </div>
    </div>
  );
} 