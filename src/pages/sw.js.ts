import { url } from '../lib/utils';

// Service worker, generated at build time so every deploy gets a new VERSION
// and old caches are cleaned up.
//
// Pages: network first, so new posts show up right away. Falls back to the
//        saved copy when offline, then to the offline page.
// Assets (/_astro, images, icons): cache first. Their file names change when
//        the content changes, so a cached copy is never stale.
// Fonts: served from cache, refreshed in the background.
// /admin is never touched.
export function GET() {
  const base = url('/');
  const sw = `
const VERSION = '${Date.now()}';
const BASE = '${base}';
const STATIC = 'static-' + VERSION;
const PAGES = 'pages';
const MAX_PAGES = 60;
const OFFLINE = BASE + 'offline/';
const PRECACHE = [BASE, OFFLINE, BASE + 'favicon.svg', BASE + 'icons/icon-192.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
}); 

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('static-') && k !== STATIC).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_PAGES; i++) await cache.delete(keys[i]);
}

async function networkFirst(request, isPage) {
  const cache = await caches.open(PAGES);
  try {
    // no-cache: always ask the server if the page changed (GitHub Pages lets
    // browsers keep HTML for 10 minutes otherwise). manual: let the browser
    // follow GitHub's /post -> /post/ redirect itself.
    const response = await fetch(request.url, { cache: 'no-cache', redirect: isPage ? 'manual' : 'follow' });
    if (response.ok) {
      cache.put(request, response.clone()).then(() => trim(cache));
    }
    return response;
  } catch {
    // Offline. Links may point at /post while the saved copy is /post/, so try both.
    const u = new URL(request.url);
    const other = u.pathname.endsWith('/') ? u.pathname.slice(0, -1) : u.pathname + '/';
    const cached =
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match(u.origin + other, { ignoreSearch: true }));
    if (cached) return cached;
    if (isPage) return (await caches.match(OFFLINE)) || Response.error();
    return Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(STATIC)).put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC);
  const cached = await cache.match(request);
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const u = new URL(request.url);

  if (u.origin === self.location.origin) {
    if (u.pathname.startsWith(BASE + 'admin')) return;
    if (request.mode === 'navigate') return event.respondWith(networkFirst(request, true));
    if (/\\/(_astro|icons|images)\\//.test(u.pathname) || u.pathname.endsWith('.svg')) {
      return event.respondWith(cacheFirst(request));
    }
    if (u.pathname.endsWith('search.json')) return event.respondWith(networkFirst(request, false));
    return;
  }

  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request));
  }
});
`;
  return new Response(sw.trimStart(), { headers: { 'Content-Type': 'text/javascript' } });
}
