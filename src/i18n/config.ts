import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.platforms': 'Platforms',
      'nav.genres': 'Genres',
      'nav.reviews': 'Reviews',
      'nav.about': 'About',
      'nav.search': 'Search horror games...',
      
      // Home page
      'home.title': 'Horror Games Hub',
      'home.subtitle': 'Discover the most terrifying games across all platforms',
      'home.featured': 'Featured Horror Games',
      'home.recommendations': 'Recommended Horror Games',
      'home.playNow': 'Play Now',
      'home.learnMore': 'Learn More',
      'home.viewAll': 'View All Games',
      
      // Game details
      'game.rating': 'Rating',
      'game.reviews': 'reviews',
      'game.released': 'Released',
      'game.developer': 'Developer',
      'game.publisher': 'Publisher',
      'game.platforms': 'Platforms',
      'game.genres': 'Genres',
      'game.price': 'Price',
      'game.free': 'Free',
      'game.buyOnSteam': 'Buy on Steam',
      'game.addReview': 'Add Review',
      
      // Platform pages
      'platform.title': '{{platform}} Horror Games',
      'platform.description': 'Discover the best horror games on {{platform}}',
      'platform.topRated': 'Top Rated',
      'platform.newest': 'Newest',
      'platform.popular': 'Most Popular',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Something went wrong',
      'common.retry': 'Retry',
      'common.back': 'Back',
      'common.share': 'Share',
      'common.bookmark': 'Bookmark',
      'common.stars': '{{rating}} stars'
    }
  },
  zh: {
    translation: {
      'nav.home': '首页',
      'nav.platforms': '平台',
      'nav.genres': '类型',
      'nav.reviews': '评价',
      'nav.about': '关于',
      'nav.search': '搜索恐怖游戏...',
      
      'home.title': '恐怖游戏中心',
      'home.subtitle': '发现各平台最恐怖的游戏',
      'home.featured': '精选恐怖游戏',
      'home.recommendations': '推荐恐怖游戏',
      'home.playNow': '立即游玩',
      'home.learnMore': '了解更多',
      'home.viewAll': '查看所有游戏',
      
      'game.rating': '评分',
      'game.reviews': '评价',
      'game.released': '发布日期',
      'game.developer': '开发商',
      'game.publisher': '发行商',
      'game.platforms': '平台',
      'game.genres': '类型',
      'game.price': '价格',
      'game.free': '免费',
      'game.buyOnSteam': 'Steam购买',
      'game.addReview': '添加评价',
      
      'platform.title': '{{platform}} 恐怖游戏',
      'platform.description': '发现{{platform}}上最好的恐怖游戏',
      'platform.topRated': '评分最高',
      'platform.newest': '最新',
      'platform.popular': '最受欢迎',
      
      'common.loading': '加载中...',
      'common.error': '出现错误',
      'common.retry': '重试',
      'common.back': '返回',
      'common.share': '分享',
      'common.bookmark': '收藏',
      'common.stars': '{{rating}} 星'
    }
  },
  es: {
    translation: {
      'nav.home': 'Inicio',
      'nav.platforms': 'Plataformas',
      'nav.genres': 'Géneros',
      'nav.reviews': 'Reseñas',
      'nav.about': 'Acerca de',
      'nav.search': 'Buscar juegos de terror...',
      
      'home.title': 'Centro de Juegos de Terror',
      'home.subtitle': 'Descubre los juegos más aterradores en todas las plataformas',
      'home.featured': 'Juegos de Terror Destacados',
      'home.recommendations': 'Juegos de Terror Recomendados',
      'home.playNow': 'Jugar Ahora',
      'home.learnMore': 'Saber Más',
      'home.viewAll': 'Ver Todos los Juegos'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;