import type { SiteSettings } from '../../lib/types.ts';

// Valorile între [ ] sunt de completat cu datele reale ale medicului și ale clinicii.
export const settings: SiteSettings = {
  siteName: 'Dr. Mihai Atudorei',
  specialty: 'Chirurgia mâinii',
  description:
    'Dr. Mihai Atudorei, medic chirurg, chirurgia mâinii. Informații despre afecțiunile mâinii, pumnului și degetelor, opțiunile de tratament și programări.',
  phone: '+40 7XX XXX XXX',
  email: '[email de completat]',
  clinic: {
    name: '[Numele clinicii]',
    street: '[Strada și numărul]',
    city: '[Orașul]',
    county: '',
    postalCode: '',
    mapsUrl: '',
  },
  hours: [{ days: 'Consultații', hours: 'pe bază de programare' }],
  cmrCode: '',
  googleBusinessUrl: '',
  social: {},
  heroTitle: 'Pentru mâinile cu care faceți totul',
  heroText:
    'Diagnostic și tratament pentru afecțiunile mâinii, pumnului și degetelor, de la amorțeli și dureri până la urmările accidentărilor. Explicate pe înțeles, pas cu pas.',
};
