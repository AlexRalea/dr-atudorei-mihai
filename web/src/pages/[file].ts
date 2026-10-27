import type { APIRoute } from 'astro';
import { getRedirects } from '../lib/content';

// Generează fișierul `_redirects` citit de Cloudflare Pages (redirecționări 301).
// Fișierele care încep cu „_” sunt ignorate de rutarea Astro, de aceea numele vine din parametru.
export function getStaticPaths() {
  return [{ params: { file: '_redirects' } }];
}

const normalize = (path: string) => {
  const withSlash = path.trim().startsWith('/') || /^https?:\/\//.test(path.trim()) ? path.trim() : `/${path.trim()}`;
  return /^https?:\/\//.test(withSlash) || withSlash.endsWith('/') || /\.[a-z0-9]+$/i.test(withSlash)
    ? withSlash
    : `${withSlash}/`;
};

export const GET: APIRoute = async () => {
  const redirects = await getRedirects();
  const lines = redirects
    .map(({ from, to }) => ({ from: normalize(from), to: normalize(to) }))
    .filter(({ from, to }) => from !== to)
    .flatMap(({ from, to }) => {
      // Adresa veche poate fi accesată și fără „/” la final.
      const variants = from.endsWith('/') && from !== '/' ? [from.slice(0, -1), from] : [from];
      return variants.map((variant) => `${variant} ${to} 301`);
    });

  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
