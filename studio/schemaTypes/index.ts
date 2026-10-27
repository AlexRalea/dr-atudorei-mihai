import { articleType, conditionType, faqType, pageType, redirectType, serviceType } from './documents';
import { calloutType, faqItemType, richTextType, seoType } from './fields';
import { doctorType, siteSettingsType } from './singletons';

export const schemaTypes = [
  siteSettingsType,
  doctorType,
  conditionType,
  serviceType,
  articleType,
  faqType,
  pageType,
  redirectType,
  seoType,
  faqItemType,
  calloutType,
  richTextType,
];

/** Documente unice: există o singură dată și nu se pot crea sau șterge. */
export const singletonTypes = new Set(['siteSettings', 'doctor']);

/** Documente cu adresă proprie pe site. */
export const routedTypes = new Set(['condition', 'service', 'article', 'page']);
