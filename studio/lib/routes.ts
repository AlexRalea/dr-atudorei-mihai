// Aceleași adrese ca în site (web/src/lib/routes.ts).
export const pathFor = (type: string, slug: string): string | null => {
  switch (type) {
    case 'condition':
      return `/afectiuni/${slug}/`;
    case 'service':
      return `/servicii/${slug}/`;
    case 'article':
      return `/articole/${slug}/`;
    case 'page':
      return `/${slug}/`;
    default:
      return null;
  }
};

export const RESERVED_PAGE_SLUGS = [
  'despre',
  'servicii',
  'afectiuni',
  'articole',
  'intrebari-frecvente',
  'contact',
  'api',
];

/** Adrese fără diacritice: „Tunel carpian ș.a.” → „tunel-carpian-s-a”. */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
