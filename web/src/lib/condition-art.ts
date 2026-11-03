import type { ImageMetadata } from 'astro';

/**
 * Ilustrațiile afecțiunilor, în src/assets/afectiuni/<slug>.webp.
 * Pentru o afecțiune nouă e suficient să adăugați o imagine cu slug-ul ei ca nume;
 * fără imagine, se folosește desenul generic al mâinii.
 */
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/afectiuni/*.webp', { eager: true });

export function conditionArt(slug: string): ImageMetadata | null {
  return images[`../assets/afectiuni/${slug}.webp`]?.default ?? null;
}
