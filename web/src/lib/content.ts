import * as seed from '../content/seed/index.ts';
import * as queries from './queries.ts';
import { routes } from './routes.ts';
import { sanityEnabled, sanityFetch } from './sanity.ts';
import type {
  Article,
  Condition,
  Doctor,
  FaqEntry,
  Page,
  Redirect,
  Service,
  SiteSettings,
} from './types.ts';

// În timpul build-ului, fiecare colecție e cerută o singură dată, oricâte pagini o folosesc.
const cache = new Map<string, Promise<unknown>>();

function load<T>(key: string, fromSanity: () => Promise<T>, fromSeed: T): Promise<T> {
  if (!sanityEnabled) return Promise.resolve(fromSeed);
  if (import.meta.env.DEV) return fromSanity();
  if (!cache.has(key)) cache.set(key, fromSanity());
  return cache.get(key) as Promise<T>;
}

export const getSettings = () =>
  load(
    'settings',
    async () => (await sanityFetch<SiteSettings | null>(queries.settingsQuery)) ?? seed.settings,
    seed.settings,
  );

export const getDoctor = () =>
  load('doctor', async () => (await sanityFetch<Doctor | null>(queries.doctorQuery)) ?? seed.doctor, seed.doctor);

export const getConditions = () =>
  load('conditions', () => sanityFetch<Condition[]>(queries.conditionsQuery), seed.conditions);

export const getServices = () =>
  load('services', () => sanityFetch<Service[]>(queries.servicesQuery), seed.services);

export const getArticles = () =>
  load('articles', () => sanityFetch<Article[]>(queries.articlesQuery), seed.articles);

export const getFaqs = () => load('faqs', () => sanityFetch<FaqEntry[]>(queries.faqsQuery), seed.faqs);

export const getPages = () => load('pages', () => sanityFetch<Page[]>(queries.pagesQuery), seed.pages);

/** Păstrează ordinea din `slugs` și ignoră referințele către documente nepublicate. */
export function pickBySlug<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  return slugs.map((slug) => items.find((item) => item.slug === slug)).filter((item): item is T => Boolean(item));
}

/**
 * Redirecționările 301: cele adăugate manual în CMS plus cele generate automat
 * din adresele vechi ale paginilor (câmpul `previousSlugs`).
 */
export async function getRedirects(): Promise<Redirect[]> {
  const [conditions, services, articles, pages, manual] = await Promise.all([
    getConditions(),
    getServices(),
    getArticles(),
    getPages(),
    load('redirects', () => sanityFetch<Redirect[]>(queries.redirectsQuery), seed.redirects),
  ]);

  const fromHistory = (items: { slug: string; previousSlugs: string[] }[], url: (slug: string) => string) =>
    items.flatMap((item) =>
      item.previousSlugs.filter((old) => old !== item.slug).map((old) => ({ from: url(old), to: url(item.slug) })),
    );

  const all = [
    ...manual,
    ...fromHistory(conditions, routes.condition),
    ...fromHistory(services, routes.service),
    ...fromHistory(articles, routes.article),
    ...fromHistory(pages, routes.page),
  ];

  // O singură regulă per adresă veche; prima câștigă (cele manuale au prioritate).
  const seen = new Set<string>();
  return all.filter((redirect) => {
    if (seen.has(redirect.from)) return false;
    seen.add(redirect.from);
    return true;
  });
}
