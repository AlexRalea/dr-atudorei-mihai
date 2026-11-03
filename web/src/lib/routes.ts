/**
 * Calea de bază a site-ului: „/” în producție, „/<repo>/” pe previzualizarea de pe GitHub Pages
 * (setată prin PUBLIC_BASE_PATH). În scripturile rulate direct cu Node nu există import.meta.env.
 */
const BASE = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

/** Prefixează o cale internă (care începe cu „/”) cu calea de bază; restul rămân neschimbate. */
export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path);

export const routes = {
  home: withBase('/'),
  about: withBase('/despre/'),
  services: withBase('/servicii/'),
  service: (slug: string) => withBase(`/servicii/${slug}/`),
  conditions: withBase('/afectiuni/'),
  condition: (slug: string) => withBase(`/afectiuni/${slug}/`),
  articles: withBase('/articole/'),
  article: (slug: string) => withBase(`/articole/${slug}/`),
  faq: withBase('/intrebari-frecvente/'),
  contact: withBase('/contact/'),
  appointment: withBase('/contact/#programare'),
  thankYou: withBase('/contact/multumim/'),
  page: (slug: string) => withBase(`/${slug}/`),
};

/** Adrese pe care o pagină simplă din CMS nu le poate folosi. */
export const RESERVED_PAGE_SLUGS = [
  'despre',
  'servicii',
  'afectiuni',
  'articole',
  'intrebari-frecvente',
  'contact',
  'api',
];
