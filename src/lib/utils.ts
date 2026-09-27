import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** A row in a month-grouped index (blog, tags, newsletter). */
export type IndexItem = { title: string; href: string; date: Date; tags?: string[]; draft?: boolean };

/** Prefix an internal path with the configured base (needed for GitHub Pages project sites). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;
const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

/** Published posts, newest first. Drafts are visible only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog', visible)).sort(newestFirst);
}

export async function getIssues() {
  return (await getCollection('newsletter', visible)).sort(newestFirst);
}

export function postToItem(p: Post): IndexItem {
  return { title: p.data.title, href: url(`/blog/${p.id}`), date: p.data.date, tags: p.data.tags, draft: p.data.draft };
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function readingTime(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Group items under "2026 September" style labels, keeping their order. */
export function groupByMonth<T extends { date: Date }>(items: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const month = item.date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const key = `${item.date.getUTCFullYear()} ${month}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return [...groups.entries()];
}

export function allTags(posts: Post[]): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const slug = slugify(t);
      const entry = map.get(slug) ?? { name: t, slug, count: 0 };
      entry.count++;
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
