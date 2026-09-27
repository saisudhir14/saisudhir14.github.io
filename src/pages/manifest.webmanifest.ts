import { SITE } from '../site.config';
import { url } from '../lib/utils';

// Tells browsers how to install the site as an app.
export function GET() {
  const manifest = {
    name: SITE.name,
    short_name: SITE.appName,
    description: SITE.description,
    start_url: url('/'),
    scope: url('/'),
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: url('/icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: url('/icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
