// Exportă conținutul de pornire (src/content/seed) în formatul de import Sanity:
//   npm run seed:export        → studio/seed/production.ndjson
//   cd ../studio && npm run seed:import
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as seed from '../src/content/seed/index.ts';

type Doc = Record<string, unknown> & { _id: string; _type: string };

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, '../../studio/seed/production.ndjson');

const slug = (current: string) => ({ _type: 'slug', current });
const ref = (id: string) => ({ _type: 'reference', _ref: id, _key: id });
const keyed = <T extends object>(items: T[], type?: string) =>
  items.map((item, index) => ({ ...(type ? { _type: type } : {}), ...item, _key: `k${index}` }));

/** Elimină câmpurile goale, ca documentele importate să fie curate. */
function clean(doc: Doc): Doc {
  return Object.fromEntries(
    Object.entries(doc).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value as object).length === 0),
    ),
  ) as Doc;
}

const docs: Doc[] = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...seed.settings,
    hours: keyed(seed.settings.hours),
  },
  {
    _id: 'doctor',
    _type: 'doctor',
    ...seed.doctor,
    portrait: null,
    education: keyed(seed.doctor.education),
  },
  ...seed.conditions.map((condition, index) => ({
    _id: `condition-${condition.slug}`,
    _type: 'condition',
    ...condition,
    slug: slug(condition.slug),
    order: index + 1,
    faqs: keyed(condition.faqs, 'faqItem'),
    relatedServices: condition.relatedServices.map((service) => ref(`service-${service}`)),
  })),
  ...seed.services.map((service, index) => ({
    _id: `service-${service.slug}`,
    _type: 'service',
    ...service,
    slug: slug(service.slug),
    order: index + 1,
    steps: keyed(service.steps),
    faqs: keyed(service.faqs, 'faqItem'),
    relatedConditions: service.relatedConditions.map((condition) => ref(`condition-${condition}`)),
  })),
  ...seed.articles.map((article) => ({
    _id: `article-${article.slug}`,
    _type: 'article',
    ...article,
    slug: slug(article.slug),
    relatedConditions: article.relatedConditions.map((condition) => ref(`condition-${condition}`)),
  })),
  ...seed.faqs.map((faq, index) => ({
    _id: `faq-${index + 1}`,
    _type: 'faq',
    ...faq,
    order: index + 1,
  })),
  ...seed.pages.map((page) => ({
    _id: `page-${page.slug}`,
    _type: 'page',
    ...page,
    slug: slug(page.slug),
  })),
].map(clean);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${docs.map((doc) => JSON.stringify(doc)).join('\n')}\n`, 'utf8');
console.log(`${docs.length} documente exportate în ${output}`);
