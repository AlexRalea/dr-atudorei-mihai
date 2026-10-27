import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  // Până la setarea domeniului final, motoarele de căutare nu au voie să indexeze site-ul.
  const body = import.meta.env.PUBLIC_SITE_URL
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
