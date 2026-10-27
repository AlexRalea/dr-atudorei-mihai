import type { Article } from '../../lib/types.ts';
import { md } from './md.ts';

const base = { previousSlugs: [], seo: null, cover: null };

export const articles: Article[] = [
  {
    ...base,
    title: 'Amorțeala degetelor noaptea: când poate fi tunel carpian?',
    slug: 'amorteala-degetelor-noaptea',
    excerpt:
      'Vă treziți cu mâna amorțită și o scuturați ca să vă revină? Iată ce poate însemna, ce puteți face acasă și când este momentul unei consultații.',
    category: 'Afecțiuni',
    publishedAt: '2026-10-20',
    reviewedAt: '2026-10-27',
    relatedConditions: ['sindrom-de-tunel-carpian', 'sindrom-de-canal-cubital'],
    body: md`
      Mulți pacienți descriu aceeași situație: se trezesc noaptea cu mâna amorțită, o scutură sau o lasă să atârne de marginea patului, iar după câteva minute senzația trece. Dacă se întâmplă rar, de obicei nu e un motiv de îngrijorare. Dacă se repetă, merită să aflați de ce.

      ## De ce amorțește mâna noaptea?

      În somn, pumnul stă adesea îndoit mult timp. În această poziție, spațiul din tunelul carpian, canalul prin care trece nervul median la nivelul pumnului, se micșorează, iar nervul este comprimat. De aceea, sindromul de tunel carpian se manifestă de multe ori întâi noaptea.

      Câteva indicii care sugerează tunelul carpian:

      - amorțeala cuprinde degetul mare, arătătorul și mijlociul, uneori și jumătate din inelar;
      - degetul mic **nu** este afectat;
      - simptomele se ameliorează când scuturați mâna;
      - ziua apar furnicături când țineți telefonul, volanul sau o carte.

      Dacă amorțeala cuprinde degetul mic și inelarul, cauza poate fi alta, de exemplu [compresia nervului ulnar la cot](/afectiuni/sindrom-de-canal-cubital/).

      ## Ce puteți face acasă

      - Evitați să dormiți cu pumnii îndoiți sub pernă sau sub corp.
      - O atelă de pumn purtată noaptea, care ține încheietura dreaptă, ajută adesea.
      - Luați pauze în activitățile care solicită mult pumnul.

      ## Când să mergeți la medic

      Programați o consultație dacă amorțeala revine des de câteva săptămâni, dacă vă scapă obiectele din mână sau dacă observați că mușchii de la baza degetului mare s-au subțiat. O compresie de durată poate afecta nervul, iar tratamentul este mai simplu atunci când începe la timp.

      Mai multe despre afecțiune găsiți pe pagina despre [sindromul de tunel carpian](/afectiuni/sindrom-de-tunel-carpian/).
    `,
  },
  {
    ...base,
    title: 'Cum vă pregătiți pentru prima consultație de chirurgia mâinii',
    slug: 'pregatirea-pentru-prima-consultatie',
    excerpt:
      'O listă simplă cu ce să aduceți și la ce să vă gândiți dinainte, ca să profitați cât mai bine de timpul petrecut la consultație.',
    category: 'Sfaturi pentru pacienți',
    publishedAt: '2026-10-13',
    reviewedAt: '2026-10-27',
    relatedConditions: [],
    body: md`
      O consultație bine pregătită înseamnă un diagnostic mai rapid și un plan de tratament mai clar. Iată câteva lucruri care vă ajută.

      ## Ce să aduceți

      - actul de identitate;
      - investigațiile anterioare: radiografii, ecografii, RMN sau electromiografie, atât rezultatele cât și imaginile, dacă le aveți;
      - scrisori medicale și bilete de externare legate de problema mâinii;
      - lista medicamentelor pe care le luați, mai ales anticoagulante sau antiagregante.

      ## La ce să vă gândiți dinainte

      - **Când au început simptomele** și dacă au apărut după un efort sau un accident.
      - **Ce agravează și ce ameliorează** durerea sau amorțeala.
      - **Ce nu mai puteți face** din cauza problemei: la muncă, acasă, în sport.
      - **Ce tratamente ați încercat** până acum și cum ați răspuns la ele.

      Vă poate ajuta să le notați în telefon înainte de consultație.

      ## Ce urmează

      La finalul consultației veți ști ce afecțiune aveți, ce opțiuni de tratament există și ce presupune fiecare. Dacă este nevoie de o intervenție, vă explicăm pașii, pregătirea și recuperarea, ca să puteți decide în cunoștință de cauză.
    `,
  },
  {
    ...base,
    title: 'Recuperarea după o intervenție la mână: ce este normal și ce nu',
    slug: 'recuperarea-dupa-interventia-la-mana',
    excerpt:
      'Primele zile după operație ridică multe întrebări. Iată la ce să vă așteptați, cum vă îngrijiți mâna și ce semne trebuie să vă facă să sunați la medic.',
    category: 'Recuperare',
    publishedAt: '2026-10-06',
    reviewedAt: '2026-10-27',
    relatedConditions: [],
    body: md`
      Recuperarea după o intervenție la mână diferă de la o operație la alta, dar primele zile au câteva reguli comune. Respectarea lor ajută vindecarea și reduce riscul de complicații.

      ## Primele zile

      - **Țineți mâna ridicată**, deasupra nivelului inimii, mai ales în primele două-trei zile. Așa scad umflătura și durerea.
      - **Mișcați degetele care nu sunt imobilizate**, dacă medicul nu v-a spus altfel.
      - **Păstrați pansamentul curat și uscat.** La duș, protejați mâna cu o pungă.
      - **Luați medicamentele pentru durere** conform recomandărilor.

      ## Ce este normal

      - o ușoară umflătură și vânătăi în jurul inciziei;
      - sensibilitate la nivelul cicatricei, timp de câteva săptămâni;
      - o senzație de rigiditate, care se ameliorează pe măsură ce reluați mișcările.

      ## Când să sunați la medic

      Contactați-ne dacă observați:

      - febră sau frisoane;
      - durere care crește în loc să scadă;
      - roșeață, căldură sau secreții la nivelul inciziei;
      - amorțeală nouă sau degete reci și palide;
      - un pansament prea strâns, care vă jenează circulația.

      ## Recuperarea pe termen lung

      După scoaterea firelor, masajul cicatricei și exercițiile recomandate ajută la refacerea mobilității. După unele intervenții, de exemplu repararea tendoanelor, recuperarea se face împreună cu un kinetoterapeut și durează câteva luni. Răbdarea și consecvența contează.
    `,
  },
];
