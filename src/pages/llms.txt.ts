import type { APIContext } from 'astro';
import { getEntry, getCollection } from 'astro:content';
import { SITE } from '../site.config';
import { getPosts, url } from '../lib/utils';

function link(title: string, href: string, description = '') {
  const desc = description.trim();
  return desc ? `- [${title}](${href}): ${desc}` : `- [${title}](${href})`;
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://saisudhir14.github.io');
  const abs = (path: string) => {
    const withSlash = /\.[a-z0-9]+$/i.test(path) || path.endsWith('/') ? path : `${path}/`;
    return new URL(url(withSlash), site).href;
  };

  const about = await getEntry('pages', 'about');
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  const projects = (await getCollection('projects')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.homeDescription}`,
    '',
    `${SITE.profile.jobTitle} at ${SITE.profile.employer} in ${SITE.profile.location}.`,
    '',
    '## Pages',
    link('About', abs('/about'), about?.data.description ?? ''),
    link('Projects', abs('/projects'), 'Projects Sai Sudheer Dontha has built or worked on.'),
    link('Blog', abs('/'), 'Notes on AI agents, MCP, Go, and cloud.'),
    link('RSS', abs('/rss.xml'), 'Feed of new posts.'),
    '',
    '## Posts',
    ...posts.map((p) => link(p.data.title, abs(`/blog/${p.id}`), p.data.description)),
    '',
    '## Projects',
    ...projects.map((p) => link(p.data.title, p.data.url || abs('/projects'), p.data.description)),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
