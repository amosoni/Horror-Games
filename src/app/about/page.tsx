"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Users, Globe, Star, Calendar, Mail, MessageSquare } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Horror Games Online</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Your destination for discovering, tracking and playing the best horror games across Steam, PlayStation, Xbox, Nintendo and PC.</p>
        </motion.div>

        {/* Mission / Community */}
        <motion.div className="max-w-5xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center space-x-3 mb-4">
                <Skull className="w-8 h-8 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300">We bring you the most terrifying and immersive horror gaming experiences. From classic survival horror to modern psychological thrillers, we curate the best games and help you find what to play next.</p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-white">Global Community</h2>
              </div>
              <p className="text-gray-300">Join thousands of horror fans. Share lists, compare ratings and discover hidden gems through our platform pages, reviews and dynamic game details.</p>
            </div>
          </div>

          {/* Why choose us */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Curated Selection</h3>
                <p className="text-gray-300">Every game is hand-picked to ensure quality, atmosphere and scares.</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
                <p className="text-gray-300">Recommendations and lists crafted by horror game fans and editors.</p>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Multi-Platform</h3>
                <p className="text-gray-300">Find titles for Steam, PlayStation, Xbox, Switch and PC—all in one place.</p>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Roadmap</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Q2 · Dynamic rankings & platform filters</p>
                  <p className="text-gray-300 text-sm">Advance filters for platforms, tags and release windows. Smarter “Most Popular” rotation.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Q3 · User lists & favorites</p>
                  <p className="text-gray-300 text-sm">Save favorites, build shareable horror playlists and follow friends.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Q4 · Review hub & MDX templates</p>
                  <p className="text-gray-300 text-sm">Full editor templates for long-form reviews with images, pros/cons and scoring.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">The Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Editor-in-Chief", "Data Engineer", "UX Designer"].map((role, i) => (
                <div key={i} className="rounded-xl border border-gray-800 p-5">
                  <div className="text-white font-semibold">{role}</div>
                  <div className="text-gray-400 text-sm">Horror enthusiast · Remote</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-800 p-4">
                <summary className="text-white font-semibold cursor-pointer">Where does the data come from?</summary>
                <p className="text-gray-300 mt-2">Platform rankings and dynamic game details are powered by the public RAWG API. Editorial long‑form reviews are stored as MDX content on this site.</p>
              </details>
              <details className="rounded-lg border border-gray-800 p-4">
                <summary className="text-white font-semibold cursor-pointer">How can I recommend or submit a game?</summary>
                <p className="text-gray-300 mt-2">User submissions and personal lists will open soon. For now, please reach out via the email below and we will get back to you.</p>
              </details>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Work with us</h2>
            <p className="text-gray-300 mb-6">Press inquiries, partnerships or feedback—drop us a line.</p>
            <div className="flex items-center justify-center gap-4">
              <a href="mailto:soniceono@gmail.com" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"><Mail className="w-4 h-4" /> soniceono@gmail.com</a>
              <a href="/reviews" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700"><MessageSquare className="w-4 h-4" /> Reviews</a>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
} 