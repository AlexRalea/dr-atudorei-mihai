export const routes = {
  home: '/',
  about: '/despre/',
  services: '/servicii/',
  service: (slug: string) => `/servicii/${slug}/`,
  conditions: '/afectiuni/',
  condition: (slug: string) => `/afectiuni/${slug}/`,
  articles: '/articole/',
  article: (slug: string) => `/articole/${slug}/`,
  faq: '/intrebari-frecvente/',
  contact: '/contact/',
  appointment: '/contact/#programare',
  thankYou: '/contact/multumim/',
  page: (slug: string) => `/${slug}/`,
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
