# Granny Game Page

This directory contains the Granny horror survival game page for the Horror Games website.

## Page Structure

```
src/app/granny/
├── page.tsx          # Main Granny game page
└── README.md         # This documentation file
```

## Features

### Game Integration
- **Embedded Game**: Direct integration with miniplay.com Granny game
- **Responsive Design**: Optimized for all device sizes
- **Full-Screen Support**: Game can be played in full-screen mode

### Content Sections
1. **Hero Section**: Game title, description, and key stats
2. **Game Player**: Embedded iframe with the actual game
3. **Game Information**: Detailed description and features
4. **How to Play**: Step-by-step gameplay instructions
5. **Tips & Strategies**: Helpful gameplay advice
6. **Content Warning**: Appropriate warnings for sensitive players
7. **Related Games**: Links to other horror games

### SEO Optimization
- **Meta Tags**: Complete SEO metadata for search engines
- **Open Graph**: Social media sharing optimization
- **Canonical URL**: Prevents duplicate content issues
- **Structured Content**: Proper heading hierarchy (H1-H3)

## Game Details

- **Title**: Granny
- **Genre**: Survival Horror
- **Platform**: Browser-based (HTML5)
- **Developer**: DVloper
- **Rating**: 4.1/5 (304K+ votes)
- **Price**: Free to play
- **Embed Source**: https://www.miniplay.com/embed/granny

## Technical Implementation

### Iframe Integration
```tsx
<iframe 
  src="https://www.miniplay.com/embed/granny" 
  style={{ width: '100%', height: '100%' }} 
  frameBorder="0" 
  allowFullScreen
  title="Play Granny Online - Horror Survival Game"
  className="w-full h-full"
/>
```

### Responsive Design
- Uses Tailwind CSS for responsive layouts
- Aspect ratio maintained across all screen sizes
- Mobile-first design approach

### Performance
- Optimized images and assets
- Efficient CSS with utility classes
- Fast loading times

## Navigation Integration

The Granny game page is integrated into the main navigation:
- Added to Header component navigation items
- Featured on the homepage
- Included in sitemap for SEO

## Content Management

### Game Information
- Regular updates to game statistics
- Seasonal content updates
- User feedback integration

### SEO Keywords
- Granny game
- play Granny online
- Granny horror game
- free Granny game
- Granny survival horror
- Granny escape game

## Future Enhancements

- User reviews and ratings system
- Game walkthrough integration
- Community features
- Achievement system
- Related game recommendations
- Social sharing functionality

## Accessibility

- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast design elements

## Analytics

The page is ready for:
- Google Analytics integration
- User engagement tracking
- Game performance metrics
- Conversion tracking
- A/B testing capabilities 