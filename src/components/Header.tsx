"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Skull, ChevronDown, Gamepad2, Gamepad, GamepadIcon, Smartphone, Monitor, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platformItems = [
    { path: '/horror-games-on-steam', label: 'Steam', icon: Gamepad2, color: 'text-orange-500' },
    { path: '/horror-games-on-playstation', label: 'PlayStation', icon: Gamepad, color: 'text-blue-500' },
    { path: '/horror-games-on-xbox', label: 'Xbox', icon: GamepadIcon, color: 'text-green-500' },
    { path: '/horror-games-on-nintendo', label: 'Nintendo Switch', icon: Smartphone, color: 'text-red-500' },
    { path: '/horror-games-on-pc', label: 'PC', icon: Monitor, color: 'text-cyan-500' },
    { path: '/horror-games-on-roblox', label: 'Roblox', icon: Users, color: 'text-pink-500' }
  ];

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/granny', label: 'Granny' },
    { path: '/halloween-games', label: 'Halloween Games' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isPlatformActive = () => {
    return platformItems.some(item => pathname === item.path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPlatformDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Skull className="w-8 h-8 text-red-600" />
            </motion.div>
            <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-200">
              Horror Games Online
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                title={`${item.label} - Horror Games Online`}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-red-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
            
            {/* Platform Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  isPlatformActive()
                    ? 'text-red-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Platforms</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isPlatformDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {isPlatformActive() && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                  layoutId="activeTab"
                />
              )}
              
              <AnimatePresence>
                {isPlatformDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {platformItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsPlatformDropdownOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                              isActive(item.path)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${item.color}`} />
                            <span>{item.label}</span>
                            {isActive(item.path) && (
                              <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    title={`${item.label} - Horror Games Online`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-red-400 bg-gray-800'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Platform Dropdown */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm font-medium text-gray-400 border-b border-gray-700">
                    Platforms
                  </div>
                  {platformItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        title={`${item.label} - Horror Games Online`}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          isActive(item.path)
                            ? 'text-red-400 bg-gray-800'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span>{item.label}</span>
                        {isActive(item.path) && (
                          <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}