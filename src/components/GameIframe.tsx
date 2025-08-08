import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Maximize2, RotateCcw } from 'lucide-react';

interface GameIframeProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function GameIframe({ url, title, onClose }: GameIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshFrame = () => {
    setIsLoading(true);
    const iframe = document.querySelector('#game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'p-0' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className={`bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-5/6'
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshFrame}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
              title="Refresh game"
            >
              <RotateCcw size={18} />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 size={18} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-red-400 transition-colors duration-200"
              title="Close game"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Game Frame */}
        <div className="relative h-full bg-gray-950">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading game...</p>
              </div>
            </div>
          )}
          
          <iframe
            id="game-iframe"
            src={url}
            className="w-full h-full border-none"
            allow="fullscreen; autoplay; microphone; camera"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
            onLoad={handleLoad}
            title={title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}