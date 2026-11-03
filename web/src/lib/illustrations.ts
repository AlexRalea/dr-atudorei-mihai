import type { ImageMetadata } from 'astro';

/**
 * Schițele în peniță ale afecțiunilor, serviciilor și articolelor: src/assets/afectiuni/<slug>.webp,
 * src/assets/servicii/<slug>.webp și src/assets/articole/<slug>.webp. Pentru o pagină nouă e suficient
 * să adăugați o imagine cu slug-ul ei ca nume; fără imagine, se folosește ornamentul implicit.
 */
const conditions = import.meta.glob<{ default: ImageMetadata }>('../assets/afectiuni/*.webp', { eager: true });
const services = import.meta.glob<{ default: ImageMetadata }>('../assets/servicii/*.webp', { eager: true });
const articles = import.meta.glob<{ default: ImageMetadata }>('../assets/articole/*.webp', { eager: true });

export function conditionArt(slug: string): ImageMetadata | null {
  return conditions[`../assets/afectiuni/${slug}.webp`]?.default ?? null;
}

export function serviceArt(slug: string): ImageMetadata | null {
  return services[`../assets/servicii/${slug}.webp`]?.default ?? null;
}

export function articleArt(slug: string): ImageMetadata | null {
  return articles[`../assets/articole/${slug}.webp`]?.default ?? null;
}
