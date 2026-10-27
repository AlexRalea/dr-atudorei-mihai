// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  // Domeniul final se setează prin PUBLIC_SITE_URL (vezi .env.example).
  site: env.PUBLIC_SITE_URL || 'https://www.exemplu.ro',
  trailingSlash: 'always',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  image: {
    // Imaginile din Sanity sunt descărcate și optimizate la build.
    domains: ['cdn.sanity.io'],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/multumim/'),
    }),
  ],
});
