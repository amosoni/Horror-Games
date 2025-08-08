"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Users, Globe, Star } from 'lucide-react';
import Header from '../../components/Header';

export default function AboutPage() {
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
            About Horror Games Online
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your ultimate destination for discovering and playing the best horror games across all platforms.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Skull className="w-8 h-8 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300">
                We're dedicated to bringing you the most terrifying and immersive horror gaming experiences. 
                From classic survival horror to modern psychological thrillers, we curate the best games across all platforms.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-white">Global Community</h2>
              </div>
              <p className="text-gray-300">
                Join thousands of horror game enthusiasts from around the world. 
                Share experiences, discover new games, and connect with fellow horror fans.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Curated Selection</h3>
                <p className="text-gray-300">
                  Every game is hand-picked by our expert team to ensure quality and scares.
                </p>
              </div>
              
              <div className="text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
                <p className="text-gray-300">
                  Reviews and recommendations from real horror game fans like you.
                </p>
              </div>
              
              <div className="text-center">
                <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Multi-Platform</h3>
                <p className="text-gray-300">
                  Find horror games for Steam, PlayStation, Xbox, Nintendo, PC, and more.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 