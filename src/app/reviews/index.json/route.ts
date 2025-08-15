import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), 'content', 'reviews');
    const items: unknown[] = [];
    if (fs.existsSync(baseDir)) {
      const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.mdx'));
      for (const file of files) {
        const slug = file.replace(/\.mdx$/, '');
        const full = path.join(baseDir, file);
        const raw = fs.readFileSync(full, 'utf8');
        const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
        const meta: unknown = {};
        if (fmMatch) {
          const yaml = fmMatch[1];
          yaml.split('\n').forEach(line => {
            const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
            if (m) meta[m[1].trim()] = m[2].trim();
          });
        }
        items.push({
          title: meta.title || slug,
          rating: Number(meta.rating || 0),
          date: meta.date || '',
          author: meta.author || '',
          excerpt: meta.excerpt || '',
          slug,
        });
      }
    }
    // 评分降序
    items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
} 