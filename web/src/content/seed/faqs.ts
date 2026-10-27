import type { FaqEntry } from '../../lib/types.ts';

export const faqs: FaqEntry[] = [
  {
    category: 'programare',
    showOnHome: true,
    question: 'Cum fac o programare?',
    answer:
      'Ne puteți suna sau puteți completa formularul de programare de pe site. Vă contactăm pentru a stabili împreună ziua și ora.',
  },
  {
    category: 'consultatie',
    question: 'Am nevoie de trimitere de la medicul de familie?',
    answer:
      'Pentru consultația în regim privat nu aveți nevoie de trimitere. Pentru alte situații, vă rugăm să întrebați la programare ce documente sunt necesare.',
  },
  {
    category: 'consultatie',
    showOnHome: true,
    question: 'Ce trebuie să aduc la consultație?',
    answer:
      'Actul de identitate, investigațiile anterioare (radiografii, ecografii, EMG: rezultatele și, dacă le aveți, imaginile), scrisorile medicale și lista medicamentelor pe care le luați.',
  },
  {
    category: 'interventie',
    showOnHome: true,
    question: 'Intervențiile la mână se fac cu anestezie generală?',
    answer:
      'Multe intervenții la mână se pot face cu anestezie locală sau regională, în care doar brațul este amorțit, iar pacientul pleacă acasă în aceeași zi. Tipul de anestezie se stabilește în funcție de intervenție și de starea dumneavoastră de sănătate.',
  },
  {
    category: 'interventie',
    question: 'Trebuie să opresc medicamentele înainte de operație?',
    answer:
      'Nu întrerupeți niciun medicament fără recomandarea medicului. Spuneți-ne la consultație ce tratamente urmați, mai ales dacă luați anticoagulante sau antiagregante, ca să stabilim împreună ce este de făcut.',
  },
  {
    category: 'recuperare',
    question: 'Pot conduce după intervenție?',
    answer:
      'Nu în ziua intervenției. Reluarea condusului depinde de tipul operației și de cât de bine vă puteți folosi mâna; medicul vă spune când este sigur.',
  },
  {
    category: 'recuperare',
    showOnHome: true,
    question: 'Când mă pot întoarce la muncă?',
    answer:
      'Depinde de intervenție și de tipul muncii. După intervențiile mici, munca de birou se poate relua adesea după câteva zile, în timp ce munca fizică grea poate necesita câteva săptămâni sau mai mult.',
  },
  {
    category: 'recuperare',
    question: 'Am nevoie de kinetoterapie după operație?',
    answer:
      'Nu întotdeauna. După multe intervenții mici sunt suficiente exercițiile făcute acasă. După repararea tendoanelor, a nervilor sau după fracturi, recuperarea cu un kinetoterapeut este de obicei esențială.',
  },
];
