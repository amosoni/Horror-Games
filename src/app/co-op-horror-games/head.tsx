export default function Head() {
  const title = 'Co-op Horror Games — Best Multiplayer Horror Games';
  const description = 'Play horror games with friends in these multiplayer co-op experiences. Discover the best co-op horror games ranked by rating and popularity.';
  const url = 'https://horrorgames.games/co-op-horror-games';
  const image = '/og-image.jpg';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Co-op Horror Games',
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