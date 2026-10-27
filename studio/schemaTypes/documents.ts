import { ActivityIcon } from '@sanity/icons/Activity';
import { BookIcon } from '@sanity/icons/Book';
import { CaseIcon } from '@sanity/icons/Case';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { LinkIcon } from '@sanity/icons/Link';
import { defineArrayMember, defineField, defineType, type StringRule } from 'sanity';
import { RESERVED_PAGE_SLUGS } from '../lib/routes';
import { previousSlugsField, seoField, slugField, stringList } from './fields';

const groups = [
  { name: 'content', title: 'Conținut', default: true },
  { name: 'links', title: 'Legături' },
  { name: 'seo', title: 'Google' },
];

const orderField = defineField({
  name: 'order',
  title: 'Ordinea în listă',
  type: 'number',
  description: 'Numerele mai mici apar primele.',
  group: 'links',
});

const faqsField = defineField({
  name: 'faqs',
  title: 'Întrebări frecvente',
  type: 'array',
  of: [defineArrayMember({ type: 'faqItem' })],
});

const today = () => new Date().toISOString().slice(0, 10);

export const conditionType = defineType({
  name: 'condition',
  title: 'Afecțiune',
  type: 'document',
  icon: ActivityIcon,
  groups,
  fields: [
    defineField({ name: 'title', title: 'Denumirea', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    { ...slugField(), group: 'content' },
    defineField({ name: 'aka', title: 'Alte denumiri', type: 'string', group: 'content' }),
    defineField({
      name: 'symptomPrompt',
      title: 'Cum descrie pacientul problema',
      type: 'string',
      group: 'content',
      description: 'Apare pe pagina principală, la „Ce vă supără?”. De ex.: Un deget se blochează când îl îndoiți.',
    }),
    defineField({
      name: 'summary',
      title: 'Rezumat',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Una-două fraze. Apare pe carduri și în Google.',
      validation: (rule) => rule.required().max(220).warning('Ideal sub 220 de caractere.'),
    }),
    defineField({ name: 'overview', title: 'Ce este', type: 'richText', group: 'content' }),
    { ...stringList('symptoms', 'Simptome'), group: 'content' },
    { ...stringList('causes', 'Cauze și factori de risc'), group: 'content' },
    { ...stringList('whenToSee', 'Când să mergeți la medic'), group: 'content' },
    defineField({ name: 'treatment', title: 'Tratament', type: 'richText', group: 'content' }),
    defineField({ name: 'recovery', title: 'Recuperare', type: 'richText', group: 'content' }),
    { ...faqsField, group: 'content' },
    defineField({
      name: 'reviewedAt',
      title: 'Data ultimei revizuiri medicale',
      type: 'date',
      group: 'content',
      initialValue: today,
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Servicii pentru această afecțiune',
      type: 'array',
      group: 'links',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    orderField,
    seoField,
    previousSlugsField,
  ],
  orderings: [{ title: 'Ordinea din site', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'aka' } },
});

export const serviceType = defineType({
  name: 'service',
  title: 'Serviciu',
  type: 'document',
  icon: CaseIcon,
  groups,
  fields: [
    defineField({ name: 'title', title: 'Denumirea', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    { ...slugField(), group: 'content' },
    defineField({
      name: 'icon',
      title: 'Iconiță',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Stetoscop', value: 'stethoscope' },
          { title: 'Puls / nervi', value: 'activity' },
          { title: 'Mână', value: 'hand' },
          { title: 'Foarfecă', value: 'scissors' },
          { title: 'Os', value: 'bone' },
          { title: 'Seringă', value: 'syringe' },
          { title: 'Inimă', value: 'heart-pulse' },
        ],
      },
      initialValue: 'hand',
    }),
    defineField({
      name: 'summary',
      title: 'Rezumat',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Una-două fraze. Apare pe carduri și în Google.',
      validation: (rule) => rule.required().max(220).warning('Ideal sub 220 de caractere.'),
    }),
    defineField({ name: 'overview', title: 'Pe scurt', type: 'richText', group: 'content' }),
    { ...stringList('indications', 'Când este recomandat'), group: 'content' },
    defineField({
      name: 'steps',
      title: 'Cum decurge (pași)',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pasul', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Descriere', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        }),
      ],
    }),
    defineField({ name: 'recovery', title: 'Recuperare', type: 'richText', group: 'content' }),
    { ...faqsField, group: 'content' },
    defineField({
      name: 'relatedConditions',
      title: 'Afecțiuni tratate',
      type: 'array',
      group: 'links',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'condition' }] })],
    }),
    orderField,
    seoField,
    previousSlugsField,
  ],
  orderings: [{ title: 'Ordinea din site', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'summary' } },
});

export const articleType = defineType({
  name: 'article',
  title: 'Articol',
  type: 'document',
  icon: BookIcon,
  groups,
  fields: [
    defineField({ name: 'title', title: 'Titlu', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    { ...slugField(), group: 'content' },
    defineField({
      name: 'excerpt',
      title: 'Rezumat',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Apare pe carduri și în Google.',
      validation: (rule) => rule.required().max(220).warning('Ideal sub 220 de caractere.'),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      group: 'content',
      options: { list: ['Afecțiuni', 'Recuperare', 'Sfaturi pentru pacienți', 'Noutăți'] },
    }),
    defineField({
      name: 'cover',
      title: 'Imagine principală',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Descrierea imaginii', type: 'string' })],
    }),
    defineField({ name: 'body', title: 'Conținut', type: 'richText', group: 'content' }),
    defineField({
      name: 'publishedAt',
      title: 'Data publicării',
      type: 'date',
      group: 'content',
      initialValue: today,
      options: { dateFormat: 'DD.MM.YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Data ultimei revizuiri medicale',
      type: 'date',
      group: 'content',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'relatedConditions',
      title: 'Afecțiuni menționate',
      type: 'array',
      group: 'links',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'condition' }] })],
    }),
    seoField,
    previousSlugsField,
  ],
  orderings: [{ title: 'Cele mai noi', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'cover' } },
});

export const faqType = defineType({
  name: 'faq',
  title: 'Întrebare frecventă',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', title: 'Întrebarea', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Răspunsul', type: 'text', rows: 5, validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Programare', value: 'programare' },
          { title: 'Consultație', value: 'consultatie' },
          { title: 'Intervenție', value: 'interventie' },
          { title: 'Recuperare', value: 'recuperare' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'showOnHome', title: 'Afișează pe pagina principală', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordinea în listă', type: 'number' }),
  ],
  orderings: [{ title: 'Ordinea din site', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } },
});

export const pageType = defineType({
  name: 'page',
  title: 'Pagină simplă',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Conținut', default: true },
    { name: 'seo', title: 'Google' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titlu', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    { ...slugField({ reserved: RESERVED_PAGE_SLUGS }), group: 'content' },
    defineField({ name: 'intro', title: 'Introducere', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'body', title: 'Conținut', type: 'richText', group: 'content' }),
    defineField({
      name: 'showInFooter',
      title: 'Afișează linkul în subsolul site-ului',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    seoField,
    previousSlugsField,
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
});

const pathRule = (rule: StringRule) =>
  rule
    .required()
    .custom((value) =>
      !value || value.startsWith('/') ? true : 'Adresa trebuie să înceapă cu „/”, de ex. /pagina-veche/',
    );

export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirecționare',
  type: 'document',
  icon: LinkIcon,
  description: 'Pentru adrese vechi care nu mai există. Schimbările de adresă din pagini se redirecționează automat.',
  fields: [
    defineField({ name: 'from', title: 'De la adresa', type: 'string', description: 'de ex. /pagina-veche/', validation: pathRule }),
    defineField({ name: 'to', title: 'Către adresa', type: 'string', description: 'de ex. /afectiuni/boala-dupuytren/', validation: pathRule }),
  ],
  preview: {
    select: { from: 'from', to: 'to' },
    prepare: ({ from, to }) => ({ title: from, subtitle: `→ ${to}` }),
  },
});
