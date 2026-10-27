import { CogIcon } from '@sanity/icons/Cog';
import { UserIcon } from '@sanity/icons/User';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { stringList } from './fields';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Setări site',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact și program' },
    { name: 'home', title: 'Pagina principală' },
  ],
  fields: [
    defineField({ name: 'siteName', title: 'Numele site-ului', type: 'string', group: 'general', validation: (rule) => rule.required() }),
    defineField({ name: 'specialty', title: 'Specialitatea', type: 'string', group: 'general', validation: (rule) => rule.required() }),
    defineField({
      name: 'description',
      title: 'Descrierea site-ului în Google',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (rule) => rule.required().max(160).warning('Ideal sub 160 de caractere.'),
    }),
    defineField({ name: 'cmrCode', title: 'Cod CMR', type: 'string', group: 'general' }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
      description: 'Așa cum vreți să apară pe site, de ex. 0740 123 456.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({
      name: 'clinic',
      title: 'Clinica',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'name', title: 'Numele clinicii', type: 'string' }),
        defineField({ name: 'street', title: 'Strada și numărul', type: 'string' }),
        defineField({ name: 'city', title: 'Orașul', type: 'string' }),
        defineField({ name: 'county', title: 'Județul', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Cod poștal', type: 'string' }),
        defineField({ name: 'mapsUrl', title: 'Link Google Maps', type: 'url' }),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Program',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'days', title: 'Zilele', type: 'string', description: 'de ex. Luni – Vineri' }),
            defineField({ name: 'hours', title: 'Orele', type: 'string', description: 'de ex. 09:00 – 17:00' }),
          ],
          preview: { select: { title: 'days', subtitle: 'hours' } },
        }),
      ],
    }),
    defineField({ name: 'googleBusinessUrl', title: 'Link profil Google Business', type: 'url', group: 'contact' }),
    defineField({
      name: 'social',
      title: 'Rețele sociale',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),
    defineField({ name: 'heroTitle', title: 'Titlul principal', type: 'string', group: 'home', validation: (rule) => rule.required() }),
    defineField({ name: 'heroText', title: 'Textul de sub titlu', type: 'text', rows: 3, group: 'home', validation: (rule) => rule.required() }),
  ],
  preview: { prepare: () => ({ title: 'Setări site' }) },
});

export const doctorType = defineType({
  name: 'doctor',
  title: 'Despre medic',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', title: 'Nume', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Titlu profesional', type: 'string', description: 'de ex. Medic primar chirurg' }),
    defineField({ name: 'specialty', title: 'Specialitatea', type: 'string' }),
    defineField({
      name: 'portrait',
      title: 'Fotografie',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Descrierea fotografiei', type: 'string' })],
    }),
    defineField({
      name: 'shortBio',
      title: 'Prezentare scurtă',
      type: 'text',
      rows: 4,
      description: 'Apare pe pagina principală și în partea de sus a paginii „Despre”.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'bio', title: 'Povestea și modul de lucru', type: 'richText' }),
    stringList('focusAreas', 'Arii de interes'),
    defineField({
      name: 'education',
      title: 'Formare',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'period', title: 'Perioada', type: 'string', description: 'de ex. 2008 – 2014' }),
            defineField({ name: 'title', title: 'Ce', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'institution', title: 'Unde', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'institution' } },
        }),
      ],
    }),
    stringList('memberships', 'Afilieri și societăți profesionale'),
  ],
  preview: { select: { title: 'name', media: 'portrait' } },
});
