import { isPlaceholder, telHref } from './format.ts';
import { toPlainText } from './portable-text.ts';
import { routes } from './routes.ts';
import type { Article, Condition, Doctor, Faq, Service, SiteSettings } from './types.ts';

type JsonLd = Record<string, unknown>;

const absolute = (site: URL, path: string) => new URL(path, site).href;

export const physicianId = (site: URL) => absolute(site, `${routes.home}#medic`);

export function websiteSchema(site: URL, settings: SiteSettings): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absolute(site, `${routes.home}#website`),
    url: absolute(site, routes.home),
    name: settings.siteName,
    inLanguage: 'ro-RO',
    publisher: { '@id': physicianId(site) },
  };
}

export function physicianSchema(site: URL, settings: SiteSettings, doctor: Doctor, knowsAbout: string[] = []): JsonLd {
  const { clinic } = settings;
  const address = isPlaceholder(clinic.street)
    ? undefined
    : {
        '@type': 'PostalAddress',
        streetAddress: clinic.street,
        addressLocality: clinic.city,
        addressRegion: clinic.county || undefined,
        postalCode: clinic.postalCode || undefined,
        addressCountry: 'RO',
      };
  const sameAs = [settings.googleBusinessUrl, ...Object.values(settings.social ?? {})].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': physicianId(site),
    name: doctor.name,
    description: settings.description,
    url: absolute(site, routes.home),
    medicalSpecialty: 'Surgical',
    telephone: telHref(settings.phone) ? settings.phone : undefined,
    email: isPlaceholder(settings.email) ? undefined : settings.email,
    address,
    image: doctor.portrait?.url,
    knowsAbout: knowsAbout.length ? knowsAbout : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function breadcrumbSchema(site: URL, items: { name: string; href: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(site, item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function conditionSchema(site: URL, condition: Condition, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: absolute(site, path),
    name: condition.title,
    description: condition.summary,
    inLanguage: 'ro-RO',
    audience: { '@type': 'Patient' },
    lastReviewed: condition.reviewedAt,
    reviewedBy: { '@id': physicianId(site) },
    about: {
      '@type': 'MedicalCondition',
      name: condition.title,
      alternateName: condition.aka || undefined,
      description: toPlainText(condition.overview) || condition.summary,
      signOrSymptom: condition.symptoms.map((name) => ({ '@type': 'MedicalSignOrSymptom', name })),
    },
  };
}

export function serviceSchema(site: URL, service: Service, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: absolute(site, path),
    name: service.title,
    description: service.summary,
    inLanguage: 'ro-RO',
    audience: { '@type': 'Patient' },
    about: {
      '@type': 'MedicalProcedure',
      name: service.title,
      description: service.summary,
    },
    provider: { '@id': physicianId(site) },
  };
}

export function articleSchema(site: URL, article: Article, doctor: Doctor, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: absolute(site, path),
    headline: article.title,
    description: article.excerpt,
    inLanguage: 'ro-RO',
    datePublished: article.publishedAt,
    dateModified: article.reviewedAt ?? article.publishedAt,
    image: article.cover?.url,
    author: { '@type': 'Person', name: doctor.name, url: absolute(site, routes.about) },
    publisher: { '@id': physicianId(site) },
  };
}
