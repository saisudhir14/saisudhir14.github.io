import { getPosts, formatDate, url } from '../lib/utils';

// Static search index consumed by the ⌘K dialog.
export async function GET() {
  const posts = await getPosts();
  const index = posts.map((p) => ({
    title: p.data.title,
    description: p.data.description,
    tags: p.data.tags,
    date: formatDate(p.data.date),
    url: url(`/blog/${p.id}`),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
