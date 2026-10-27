import { roROLocale } from '@sanity/locale-ro-ro';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { OpenOnSiteAction, withSlugHistory } from './actions';
import { routedTypes, schemaTypes, singletonTypes } from './schemaTypes';
import { structure } from './structure';

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'Dr. Mihai Atudorei',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'necompletat',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({ structure }), roROLocale()],

  schema: {
    types: schemaTypes,
    // Documentele unice nu apar în meniul „Creează”.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action));
      }
      if (!routedTypes.has(schemaType)) return actions;
      return [
        ...actions.map((action) => (action.action === 'publish' ? withSlugHistory(action) : action)),
        OpenOnSiteAction,
      ];
    },
  },
});
