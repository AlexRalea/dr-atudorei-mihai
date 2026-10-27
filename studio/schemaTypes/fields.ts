import { defineArrayMember, defineField, defineType } from 'sanity';
import { LockedSlugInput } from '../components/LockedSlugInput';
import { slugify } from '../lib/routes';

export const slugField = (options: { reserved?: string[] } = {}) =>
  defineField({
    name: 'slug',
    title: 'Adresa paginii',
    type: 'slug',
    description: 'Se generează din titlu, fără diacritice. Apăsați „Generează” după ce ați scris titlul.',
    options: { source: 'title', maxLength: 80, slugify },
    components: { input: LockedSlugInput },
    validation: (rule) =>
      rule.required().custom((value) => {
        const current = value?.current;
        if (current && options.reserved?.includes(current)) {
          return `Adresa „${current}” este folosită deja de o pagină a site-ului. Alegeți alta.`;
        }
        return true;
      }),
  });

export const previousSlugsField = defineField({
  name: 'previousSlugs',
  title: 'Adrese vechi',
  type: 'array',
  of: [defineArrayMember({ type: 'string' })],
  description: 'Completat automat. Aceste adrese redirecționează spre adresa actuală.',
  readOnly: true,
  hidden: ({ value }) => !Array.isArray(value) || value.length === 0,
});

export const seoField = defineField({
  name: 'seo',
  title: 'Google și distribuire',
  type: 'seo',
  group: 'seo',
});

export const stringList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  });

export const seoType = defineType({
  name: 'seo',
  title: 'Google și distribuire',
  type: 'object',
  description: 'Opțional. Dacă rămân goale, se folosesc titlul și rezumatul paginii.',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlul afișat în Google',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Ideal sub 60 de caractere, ca să nu fie tăiat în rezultatele Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrierea afișată în Google',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Ideal sub 160 de caractere.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagine la distribuirea pe rețele sociale',
      type: 'image',
      fields: [defineField({ name: 'alt', title: 'Descrierea imaginii', type: 'string' })],
    }),
    defineField({
      name: 'noindex',
      title: 'Ascunde pagina din Google',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'Întrebare',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Întrebarea', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Răspunsul', type: 'text', rows: 4, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'question', subtitle: 'answer' } },
});

export const calloutType = defineType({
  name: 'callout',
  title: 'Casetă de evidențiere',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tip',
      type: 'string',
      options: {
        list: [
          { title: 'Informație', value: 'info' },
          { title: 'Atenționare', value: 'warning' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'info',
    }),
    defineField({ name: 'title', title: 'Titlu (opțional)', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'text' }, prepare: ({ title, subtitle }) => ({ title: title || 'Casetă', subtitle }) },
});

export const richTextType = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraf', value: 'normal' },
        { title: 'Subtitlu', value: 'h2' },
        { title: 'Subtitlu mic', value: 'h3' },
        { title: 'Citat', value: 'blockquote' },
      ],
      lists: [
        { title: 'Listă cu puncte', value: 'bullet' },
        { title: 'Listă numerotată', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Îngroșat', value: 'strong' },
          { title: 'Cursiv', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Adresa',
                type: 'url',
                description: 'Pentru pagini de pe site, scrieți doar adresa relativă, de ex. /afectiuni/boala-dupuytren/',
                validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Imagine',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descrierea imaginii',
          type: 'string',
          description: 'Pentru persoanele care nu văd imaginea și pentru Google.',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'caption', title: 'Text sub imagine', type: 'string' }),
      ],
    }),
    defineArrayMember({ type: 'callout' }),
  ],
});
