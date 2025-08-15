import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'reviews', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: meta, content } = matter(raw);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Header />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-invert max-w-3xl">
        <h1>{(meta as unknown).title || slug}</h1>
        {(meta as unknown).rating ? <p><strong>Rating:</strong> {(meta as unknown).rating} / 5</p> : null}
        {(meta as unknown).author || (meta as unknown).date ? (
          <p className="text-sm text-gray-400">{(meta as unknown).author}{(meta as unknown).author && (meta as unknown).date ? ' · ' : ''}{(meta as unknown).date}</p>
        ) : null}
        <MDXRemote source={content} options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
          },
        }} />
      </article>
    </div>
  );
} 