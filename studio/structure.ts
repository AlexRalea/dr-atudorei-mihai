import { CogIcon } from '@sanity/icons/Cog';
import { UserIcon } from '@sanity/icons/User';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conținut')
    .items([
      S.listItem()
        .title('Setări site')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Setări site')),
      S.listItem()
        .title('Despre medic')
        .id('doctor')
        .icon(UserIcon)
        .child(S.document().schemaType('doctor').documentId('doctor').title('Despre medic')),
      S.divider(),
      S.documentTypeListItem('condition').title('Afecțiuni'),
      S.documentTypeListItem('service').title('Servicii'),
      S.documentTypeListItem('article').title('Articole'),
      S.documentTypeListItem('faq').title('Întrebări frecvente'),
      S.documentTypeListItem('page').title('Pagini simple'),
      S.divider(),
      S.documentTypeListItem('redirect').title('Redirecționări'),
    ]);
