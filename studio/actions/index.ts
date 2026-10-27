import { LaunchIcon } from '@sanity/icons/Launch';
import { useDocumentOperation, type DocumentActionComponent } from 'sanity';
import { pathFor } from '../lib/routes';

type SlugDocument = { slug?: { current?: string }; previousSlugs?: string[] } | null;

/**
 * Înlocuiește acțiunea „Publică”: dacă adresa paginii s-a schimbat față de versiunea
 * publicată, adresa veche se salvează în `previousSlugs`, iar site-ul generează
 * la build o redirecționare 301 de pe ea.
 */
export function withSlugHistory(publish: DocumentActionComponent): DocumentActionComponent {
  const PublishWithSlugHistory: DocumentActionComponent = (props) => {
    const original = publish(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    if (!original) return original;

    return {
      ...original,
      onHandle: () => {
        const draft = props.draft as SlugDocument;
        const published = props.published as SlugDocument;
        const oldSlug = published?.slug?.current;
        const newSlug = draft?.slug?.current;

        if (oldSlug && newSlug && oldSlug !== newSlug) {
          const history = new Set([...(draft?.previousSlugs ?? []), oldSlug]);
          history.delete(newSlug);
          patch.execute([{ set: { previousSlugs: [...history] } }]);
        }

        original.onHandle?.();
      },
    };
  };

  PublishWithSlugHistory.action = publish.action;
  return PublishWithSlugHistory;
}

const siteUrl = process.env.SANITY_STUDIO_SITE_URL?.replace(/\/$/, '');

/** Deschide pagina publicată pe site, într-un tab nou. */
export const OpenOnSiteAction: DocumentActionComponent = (props) => {
  const slug = (props.published as SlugDocument)?.slug?.current;
  const path = slug ? pathFor(props.type, slug) : null;
  if (!siteUrl || !path) return null;

  return {
    label: 'Vezi pe site',
    icon: LaunchIcon,
    onHandle: () => {
      window.open(`${siteUrl}${path}`, '_blank', 'noopener');
      props.onComplete();
    },
  };
};
