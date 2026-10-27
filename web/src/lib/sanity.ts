import { createClient, type QueryParams } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

/** Fără proiect Sanity configurat, site-ul folosește conținutul din src/content/seed. */
export const sanityEnabled = Boolean(projectId);

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-10-01',
      // La build vrem mereu conținutul proaspăt publicat, nu varianta din cache.
      useCdn: false,
      perspective: 'published',
    })
  : null;

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  if (!client) throw new Error('Sanity nu este configurat: lipsește PUBLIC_SANITY_PROJECT_ID.');
  return client.fetch<T>(query, params);
}
