export default function Head() {
  const title = 'Roblox Horror Games Rankings — Scary Roblox Games to Play';
  const description = 'Discover the top-rated horror games on Roblox. Explore the scariest multiplayer Roblox horror experiences ranked by rating and popularity.';
  const url = 'https://horrorgamesonline.com/horror-games-on-roblox';
  const image = '/og-image.jpg';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Roblox Horror Games Rankings',
    description,
    url,
  };
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
} 