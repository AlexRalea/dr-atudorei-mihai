import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'necompletat',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Panoul publicat va fi disponibil la https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST,
});
