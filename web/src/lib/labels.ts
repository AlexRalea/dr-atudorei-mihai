import type { FaqCategory } from './types.ts';

export const faqCategoryLabels: Record<FaqCategory, string> = {
  programare: 'Programare',
  consultatie: 'Consultație',
  interventie: 'Intervenție',
  recuperare: 'Recuperare',
};

export const MEDICAL_DISCLAIMER =
  'Informațiile de pe acest site au caracter general și nu înlocuiesc consultația medicală. Pentru un diagnostic și un plan de tratament potrivit, programați o consultație.';
