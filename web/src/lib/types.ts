export interface PTSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface PTMarkDef {
  _type: string;
  _key: string;
  href?: string;
}

export interface PTBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h2' | 'h3' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PTSpan[];
  markDefs?: PTMarkDef[];
}

export interface PTImage {
  _type: 'image';
  _key: string;
  url?: string | null;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export interface PTCallout {
  _type: 'callout';
  _key: string;
  tone?: 'info' | 'warning';
  title?: string;
  text: string;
}

export type PortableTextNode = PTBlock | PTImage | PTCallout;
export type PortableTextContent = PortableTextNode[];

export interface ImageData {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
  noindex?: boolean;
  image?: ImageData | null;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface SiteSettings {
  siteName: string;
  specialty: string;
  description: string;
  phone: string;
  email: string;
  clinic: {
    name: string;
    street: string;
    city: string;
    county?: string;
    postalCode?: string;
    mapsUrl?: string;
  };
  hours: OpeningHours[];
  cmrCode?: string;
  googleBusinessUrl?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  heroTitle: string;
  heroText: string;
}

export interface EducationEntry {
  period?: string;
  title: string;
  institution: string;
}

export interface Doctor {
  name: string;
  role: string;
  specialty: string;
  shortBio: string;
  bio: PortableTextContent;
  portrait?: ImageData | null;
  focusAreas: string[];
  education: EducationEntry[];
  memberships: string[];
}

export interface Condition {
  title: string;
  slug: string;
  aka?: string;
  symptomPrompt?: string;
  summary: string;
  overview: PortableTextContent;
  symptoms: string[];
  causes: string[];
  whenToSee: string[];
  treatment: PortableTextContent;
  recovery: PortableTextContent;
  faqs: Faq[];
  relatedServices: string[];
  reviewedAt?: string;
  previousSlugs: string[];
  seo?: SeoFields | null;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export type ServiceIcon = 'stethoscope' | 'activity' | 'hand' | 'scissors' | 'bone' | 'syringe' | 'heart-pulse';

export interface Service {
  title: string;
  slug: string;
  icon?: ServiceIcon;
  summary: string;
  overview: PortableTextContent;
  indications: string[];
  steps: ServiceStep[];
  recovery: PortableTextContent;
  faqs: Faq[];
  relatedConditions: string[];
  previousSlugs: string[];
  seo?: SeoFields | null;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  reviewedAt?: string;
  cover?: ImageData | null;
  body: PortableTextContent;
  relatedConditions: string[];
  previousSlugs: string[];
  seo?: SeoFields | null;
}

export type FaqCategory = 'programare' | 'consultatie' | 'interventie' | 'recuperare';

export interface FaqEntry extends Faq {
  category: FaqCategory;
  showOnHome?: boolean;
}

export interface Page {
  title: string;
  slug: string;
  intro?: string;
  body: PortableTextContent;
  showInFooter?: boolean;
  previousSlugs: string[];
  seo?: SeoFields | null;
}

export interface Redirect {
  from: string;
  to: string;
}
