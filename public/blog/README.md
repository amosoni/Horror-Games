# Blog Images Directory

This directory contains images used in blog posts.

## Required Images

### Silent Hill F
- `silent-hill-f-og.jpg` - Open Graph image (1200x630px)
- `silent-hill-f-hero.jpg` - Hero image for the article
- `silent-hill-f-screenshots/` - Game screenshots and media

### Other Blog Posts
- `survival-horror-2025.jpg` - Survival horror games 2025
- `psychological-horror.jpg` - Psychological horror games
- `silent-hill-history.jpg` - Silent Hill series history

## Image Specifications

- **Open Graph Images**: 1200x630px, JPG format
- **Hero Images**: 1920x1080px, JPG format
- **Thumbnail Images**: 400x300px, JPG format
- **Screenshots**: Various sizes, PNG format for clarity

## Optimization

All images should be:
- Compressed for web use
- Include proper alt text in the blog posts
- Responsive and mobile-friendly
- Optimized for fast loading

## Usage

Images are referenced in blog posts using Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/blog/silent-hill-f-og.jpg" 
  alt="Silent Hill F - New Silent Hill Game 2025"
  width={1200}
  height={630}
/>
``` 