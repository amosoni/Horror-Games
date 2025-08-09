export default function Head() {
  const title = 'PC Horror Games Rankings — Best Horror Games on PC';
  const description = 'Discover the top-rated horror games on PC. Explore our curated rankings of the best PC horror games from indie to AAA.';
  const url = 'https://horrorgamesonline.com/horror-games-on-pc';
  const image = '/og-image.jpg';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PC Horror Games Rankings',
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