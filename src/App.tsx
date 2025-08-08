import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PlatformsPage from './pages/PlatformsPage';
import GamePage from './pages/GamePage';
import GenrePage from './pages/GenrePage';
import ReviewsPage from './pages/ReviewsPage';
import AboutPage from './pages/AboutPage';
import FreeGamesPage from './pages/FreeGamesPage';
import MultiplayerGamesPage from './pages/MultiplayerGamesPage';
import OnlineGamesPage from './pages/OnlineGamesPage';
import TopGames2025Page from './pages/TopGames2025Page';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Routes>
              {/* 首页 - Horror Games online/free */}
              <Route path="/" element={<HomePage />} />
              
              {/* 平台分类页面 - SEO优化URL */}
              <Route path="/horror-games-on-steam" element={<PlatformsPage platform="steam" />} />
              <Route path="/horror-games-on-xbox" element={<PlatformsPage platform="xbox" />} />
              <Route path="/horror-games-on-playstation" element={<PlatformsPage platform="playstation" />} />
              <Route path="/horror-games-on-nintendo" element={<PlatformsPage platform="nintendo" />} />
              <Route path="/horror-games-on-pc" element={<PlatformsPage platform="pc" />} />
              
              {/* 游戏类型页面 */}
              <Route path="/survival-horror-games" element={<GenrePage genre="survival" />} />
              <Route path="/psychological-horror-games" element={<GenrePage genre="psychological" />} />
              <Route path="/jump-scare-games" element={<GenrePage genre="jump-scare" />} />
              <Route path="/co-op-horror-games" element={<GenrePage genre="co-op" />} />
              
              {/* 特殊SEO页面 */}
              <Route path="/free-horror-games" element={<FreeGamesPage />} />
              <Route path="/horror-games-multiplayer" element={<MultiplayerGamesPage />} />
              <Route path="/horror-games-online" element={<OnlineGamesPage />} />
              <Route path="/horror-games-2025" element={<TopGames2025Page />} />
              
              {/* 游戏详情页 */}
              <Route path="/game/:id" element={<GamePage />} />
              
              {/* 其他页面 */}
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* 兼容旧路由 */}
              <Route path="/platforms" element={<PlatformsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;