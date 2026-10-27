import type { Service } from '../../lib/types.ts';
import { md } from './md.ts';

// Lista de servicii trebuie confirmată de medic: ce proceduri face efectiv și în ce condiții.
const base = { previousSlugs: [], seo: null };

export const services: Service[] = [
  {
    ...base,
    title: 'Consultație de chirurgia mâinii',
    slug: 'consultatie-chirurgia-mainii',
    icon: 'stethoscope',
    summary:
      'Evaluarea completă a problemei: discuție, examinarea mâinii, interpretarea investigațiilor și un plan de tratament explicat pe înțeles.',
    overview: md`
      Consultația este primul pas pentru orice problemă a mâinii, pumnului sau degetelor. Discutăm despre simptome, examinăm mâna și vă explicăm ce se întâmplă, ce opțiuni aveți și ce presupune fiecare.

      Plecați de la consultație știind ce aveți și care sunt pașii următori, fie că este vorba de un tratament fără operație, de investigații suplimentare sau de o intervenție.
    `,
    indications: [
      'Amorțeală, furnicături sau slăbiciune în mână',
      'Durere la nivelul pumnului sau al degetelor',
      'Un deget care se blochează sau nu se mai întinde',
      'Umflături sau noduli pe mână',
      'Urmări ale unor accidentări sau fracturi',
      'O a doua opinie înaintea unei intervenții',
    ],
    steps: [
      { title: 'Discuția', text: 'Vorbim despre simptome, de când au apărut și cum vă afectează viața de zi cu zi.' },
      { title: 'Examinarea', text: 'Examinăm mâna: mobilitatea, forța, sensibilitatea și testele specifice fiecărei afecțiuni.' },
      {
        title: 'Investigațiile',
        text: 'Analizăm investigațiile pe care le aveți și, la nevoie, recomandăm altele: radiografie, ecografie sau electromiografie.',
      },
      {
        title: 'Planul de tratament',
        text: 'Vă explicăm diagnosticul și opțiunile, cu avantajele și limitele fiecăreia, ca să decidem împreună.',
      },
    ],
    recovery: [],
    faqs: [
      {
        question: 'Ce trebuie să aduc la consultație?',
        answer:
          'Actul de identitate, investigațiile anterioare (radiografii, ecografii, EMG: rezultatele și, dacă le aveți, imaginile), scrisorile medicale și lista medicamentelor pe care le luați.',
      },
      {
        question: 'Am nevoie de trimitere?',
        answer:
          'Pentru consultația în regim privat nu aveți nevoie de trimitere. Pentru alte situații, vă rugăm să întrebați la programare ce documente sunt necesare.',
      },
    ],
    relatedConditions: [
      'sindrom-de-tunel-carpian',
      'deget-in-resort',
      'boala-dupuytren',
      'chist-sinovial',
      'rizartroza',
    ],
  },
  {
    ...base,
    title: 'Decompresia nervilor',
    slug: 'decompresia-nervilor',
    icon: 'activity',
    summary:
      'Intervenții pentru eliberarea nervilor comprimați la pumn sau la cot: sindromul de tunel carpian și sindromul de canal cubital.',
    overview: md`
      Când un nerv este comprimat mult timp, apar amorțeala, durerea și, în final, slăbiciunea mușchilor. Decompresia chirurgicală eliberează nervul, oprește agravarea și permite, în multe cazuri, recuperarea lui.
    `,
    indications: [
      'Sindrom de tunel carpian care nu se ameliorează cu tratament fără operație',
      'Amorțeală constantă sau slăbiciune în mână',
      'Semne de afectare a nervului la electromiografie',
      'Sindrom de canal cubital cu simptome persistente',
    ],
    steps: [
      { title: 'Evaluarea', text: 'Consultația și, de obicei, o electromiografie, care arată cât de afectat este nervul.' },
      { title: 'Intervenția', text: 'Se face de regulă cu anestezie locală sau regională, iar pacientul pleacă acasă în aceeași zi.' },
      { title: 'Pansamentul și controlul', text: 'Pansamentul se îngrijește acasă, după indicații, iar firele se scot la control.' },
      { title: 'Recuperarea', text: 'Activitățile ușoare se reiau repede; forța și sensibilitatea revin treptat.' },
    ],
    recovery: md`
      Activitățile ușoare se pot relua la scurt timp după intervenție, evitând efortul și sprijinul pe mână în primele săptămâni. Firele se scot de obicei după aproximativ două săptămâni.
    `,
    faqs: [
      {
        question: 'Voi simți imediat o ameliorare?',
        answer:
          'Durerea și amorțeala de noapte se ameliorează adesea repede. Sensibilitatea și forța se recuperează mai lent, iar în formele foarte vechi recuperarea poate fi incompletă.',
      },
    ],
    relatedConditions: ['sindrom-de-tunel-carpian', 'sindrom-de-canal-cubital'],
  },
  {
    ...base,
    title: 'Chirurgia tendoanelor',
    slug: 'chirurgia-tendoanelor',
    icon: 'hand',
    summary:
      'Tratamentul degetului în resort și al tenosinovitei De Quervain și repararea tendoanelor secționate sau rupte.',
    overview: md`
      Tendoanele transmit mișcarea de la mușchii antebrațului la degete. Când alunecarea lor este blocată de o teacă îngroșată sau când sunt secționate, mâna își pierde din funcție. Intervențiile pe tendoane urmăresc refacerea alunecării și a mișcării.
    `,
    indications: [
      'Deget în resort care nu se ameliorează după infiltrații',
      'Tenosinovită De Quervain persistentă',
      'Tendoane secționate după tăieturi',
      'Tendoane rupte după traumatisme',
    ],
    steps: [
      { title: 'Evaluarea', text: 'Consultația stabilește tipul leziunii și dacă este nevoie de intervenție.' },
      { title: 'Intervenția', text: 'Cele mai multe intervenții pe tendoane se fac cu anestezie locală sau regională.' },
      {
        title: 'Mișcarea controlată',
        text: 'La multe intervenții, mișcarea controlată începe din primele zile, ca tendonul să nu se lipească de țesuturile din jur.',
      },
      { title: 'Recuperarea', text: 'După repararea tendoanelor, recuperarea se face de obicei împreună cu un kinetoterapeut.' },
    ],
    recovery: md`
      Durata recuperării diferă mult de la o intervenție la alta: câteva săptămâni după eliberarea unui deget în resort, câteva luni după repararea unui tendon secționat.
    `,
    faqs: [
      {
        question: 'Infiltrație sau operație?',
        answer:
          'Pentru degetul în resort și tenosinovita De Quervain, tratamentul începe adesea cu o infiltrație. Operația se discută când simptomele persistă sau revin.',
      },
    ],
    relatedConditions: ['deget-in-resort', 'tenosinovita-de-quervain', 'leziuni-de-tendoane', 'deget-in-ciocan'],
  },
  {
    ...base,
    title: 'Tratamentul bolii Dupuytren',
    slug: 'tratamentul-bolii-dupuytren',
    icon: 'hand',
    summary:
      'Opțiuni pentru corectarea degetelor îndoite în boala Dupuytren, de la fasciotomia cu ac la îndepărtarea chirurgicală a țesutului bolnav.',
    overview: md`
      Scopul tratamentului este ca degetele să se poată întinde din nou și să vă fie mai ușor în activitățile zilnice. Alegerea metodei depinde de gradul contracturii și de degetele afectate.
    `,
    indications: [
      'Nu mai puteți pune palma plat pe masă',
      'Contractură care se accentuează',
      'Degete îndoite care vă încurcă în activitățile zilnice',
    ],
    steps: [
      { title: 'Evaluarea', text: 'Măsurăm cât de îndoite sunt degetele și discutăm cum vă afectează.' },
      { title: 'Alegerea metodei', text: 'Vă explicăm opțiunile, cu avantajele și limitele fiecăreia, și alegem împreună.' },
      { title: 'Intervenția', text: 'Se face de regulă în regim de zi, cu anestezie locală sau regională.' },
      { title: 'Atela și recuperarea', text: 'O atelă de noapte și exercițiile ajută la menținerea rezultatului.' },
    ],
    recovery: md`
      După intervenție se poartă de obicei o atelă de noapte timp de câteva săptămâni, iar exercițiile de recuperare ajută la menținerea rezultatului.
    `,
    faqs: [
      {
        question: 'Boala poate reveni?',
        answer:
          'Da. Boala Dupuytren este o afecțiune cronică, iar contractura poate reapărea după un timp. Riscul diferă în funcție de metoda de tratament și de fiecare pacient.',
      },
    ],
    relatedConditions: ['boala-dupuytren'],
  },
  {
    ...base,
    title: 'Îndepărtarea chisturilor și a formațiunilor',
    slug: 'excizia-formatiunilor',
    icon: 'scissors',
    summary:
      'Îndepărtarea chisturilor sinoviale și a altor formațiuni benigne ale mâinii și pumnului, cu analiza țesutului atunci când este necesar.',
    overview: md`
      Majoritatea umflăturilor de pe mână sunt benigne, cel mai des chisturi sinoviale. Când dor, cresc sau vă încurcă, pot fi îndepărtate chirurgical, de obicei în ambulatoriu.
    `,
    indications: [
      'Chist sinovial dureros sau care limitează mișcarea',
      'Chist care revine după aspirație',
      'Formațiuni care cresc sau arată neobișnuit',
      'Noduli care apasă pe un nerv',
    ],
    steps: [
      { title: 'Evaluarea', text: 'Consultația și, la nevoie, o ecografie, pentru a vedea natura și întinderea formațiunii.' },
      { title: 'Intervenția', text: 'Se face de regulă cu anestezie locală sau regională, în ambulatoriu.' },
      {
        title: 'Analiza țesutului',
        text: 'Când este cazul, țesutul îndepărtat este trimis la laborator pentru examenul histopatologic.',
      },
      { title: 'Controlul', text: 'La control se verifică vindecarea și se scot firele.' },
    ],
    recovery: md`
      Mâna se protejează câteva zile, apoi mișcările se reiau treptat. Firele se scot de obicei după aproximativ două săptămâni.
    `,
    faqs: [
      {
        question: 'Rămâne cicatrice?',
        answer:
          'Orice incizie lasă o cicatrice, dar pe mână acestea se estompează de obicei bine în timp. Inciziile sunt plasate, pe cât posibil, în pliurile naturale ale pielii.',
      },
    ],
    relatedConditions: ['chist-sinovial'],
  },
  {
    ...base,
    title: 'Traumatologia mâinii și a pumnului',
    slug: 'traumatologia-mainii',
    icon: 'bone',
    summary:
      'Tratamentul fracturilor, al leziunilor de tendoane și de nervi și al urmărilor accidentărilor la mână și pumn.',
    overview: md`
      Accidentările mâinii, de la fracturi la tăieturi cu leziuni de tendoane sau de nervi, au nevoie de un tratament corect de la început, pentru ca mâna să-și recapete funcția. Tratamentul este urmat de o recuperare adaptată fiecărei leziuni.

      > Pentru traumatisme recente cu deformare, plagă deschisă, sângerare sau amorțeală, mergeți la cea mai apropiată unitate de primiri urgențe.
    `,
    indications: [
      'Fracturi ale pumnului, ale oaselor mâinii și ale degetelor',
      'Tendoane sau nervi secționați',
      'Degetul în ciocan',
      'Fracturi vindecate în poziție greșită sau alte urmări ale unor accidentări mai vechi',
    ],
    steps: [
      { title: 'Evaluarea', text: 'Consultația și investigațiile necesare: radiografie, uneori tomografie.' },
      { title: 'Tratamentul', text: 'Imobilizare sau intervenție chirurgicală, în funcție de leziune.' },
      { title: 'Controalele', text: 'Controale periodice, cu radiografii acolo unde este nevoie.' },
      { title: 'Recuperarea', text: 'Exerciții acasă sau kinetoterapie, pentru refacerea mobilității și a forței.' },
    ],
    recovery: md`
      Durata recuperării depinde de tipul leziunii: de la câteva săptămâni pentru o fractură simplă la câteva luni pentru leziunile complexe de tendoane sau de nervi.
    `,
    faqs: [
      {
        question: 'Merg la urgențe sau la cabinet?',
        answer:
          'Pentru traumatisme recente cu deformare, plagă, sângerare sau amorțeală, mergeți la urgențe. Pentru urmările unor accidentări mai vechi sau pentru o a doua opinie, programați o consultație.',
      },
    ],
    relatedConditions: ['fracturi-pumn-si-mana', 'leziuni-de-tendoane', 'leziuni-de-nervi', 'deget-in-ciocan'],
  },
];
