import type { Page } from '../../lib/types.ts';
import { md } from './md.ts';

const base = { previousSlugs: [], seo: null };

export const pages: Page[] = [
  {
    ...base,
    title: 'Informații pentru pacienți',
    slug: 'pacienti',
    intro: 'Ce trebuie să știți înainte de consultație, înainte de o intervenție și în perioada de recuperare.',
    showInFooter: true,
    body: md`
      ## Înainte de consultație

      - Aduceți actul de identitate și investigațiile anterioare: radiografii, ecografii, electromiografie, RMN. Dacă le aveți, aduceți și imaginile, nu doar rezultatele.
      - Aduceți scrisorile medicale și lista medicamentelor pe care le luați.
      - Gândiți-vă dinainte când au început simptomele, ce le agravează și ce nu mai puteți face din cauza lor.

      Mai multe sfaturi găsiți în articolul [Cum vă pregătiți pentru prima consultație](/articole/pregatirea-pentru-prima-consultatie/).

      ## Înainte de o intervenție

      - Spuneți-ne ce medicamente luați, mai ales anticoagulante sau antiagregante. Nu le întrerupeți fără recomandarea medicului.
      - Anunțați-ne dacă aveți alergii, diabet sau alte afecțiuni cronice.
      - În ziua intervenției, scoateți inelele, brățările și ceasul de pe mâna care va fi operată.
      - Organizați-vă dinainte transportul acasă: nu veți putea conduce în ziua intervenției.

      ## După intervenție

      - Țineți mâna ridicată, deasupra nivelului inimii, în primele zile.
      - Păstrați pansamentul curat și uscat și mișcați degetele care nu sunt imobilizate, dacă nu vi s-a spus altfel.
      - Respectați datele controalelor și ale scoaterii firelor.

      > Sunați-ne dacă aveți febră, durere care crește, roșeață sau secreții la nivelul inciziei, amorțeală nouă ori degete reci și palide.

      ## Decontare și documente

      [De completat cu informațiile clinicii: dacă există contract cu Casa de Asigurări de Sănătate, ce documente sunt necesare și cum se face plata.]
    `,
  },
  {
    ...base,
    title: 'Politica de confidențialitate',
    slug: 'politica-confidentialitate',
    intro: 'Cum folosim și cum protejăm datele pe care ni le transmiteți prin acest site.',
    showInFooter: true,
    body: md`
      > Acest text este un model de pornire și trebuie verificat și completat (de preferat de un consultant GDPR sau de un jurist) înainte de lansarea site-ului.

      ## Cine suntem

      Operatorul datelor este [numele operatorului: cabinetul medical sau medicul], cu sediul în [adresa], care poate fi contactat la [adresa de email].

      ## Ce date colectăm

      - **Prin formularul de programare:** numele, numărul de telefon, adresa de email (opțional) și mesajul transmis.
      - **Date tehnice:** furnizorul de hosting poate prelucra adresa IP și informații despre browser, strict pentru securitatea și funcționarea site-ului.
      - **Statistici de trafic:** folosim un serviciu de statistici fără cookie-uri, care nu vă identifică personal.

      ## De ce folosim datele

      Folosim datele din formular doar pentru a vă contacta în legătură cu programarea solicitată. Temeiul prelucrării este cererea dumneavoastră și consimțământul pe care îl exprimați la trimiterea formularului.

      Vă rugăm să nu includeți în mesaj detalii medicale pe care nu doriți să le transmiteți pe email. Dacă alegeți totuși să le includeți, le prelucrăm pe baza consimțământului dumneavoastră explicit și doar în scopul programării.

      ## Cât timp păstrăm datele

      Mesajele primite prin formular se păstrează doar cât este necesar pentru stabilirea programării, apoi se șterg, în cel mult [perioada de completat].

      ## Cui transmitem datele

      Datele nu sunt vândute și nu sunt folosite în scop de marketing. Ele pot fi prelucrate de furnizori care ne ajută să facem site-ul să funcționeze: furnizorul de hosting (Cloudflare) și serviciul de trimitere a emailurilor (Brevo). [De completat: dacă datele se transmit clinicii pentru programare.]

      ## Drepturile dumneavoastră

      Aveți dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, de opoziție și la portabilitatea datelor, precum și dreptul de a vă retrage oricând consimțământul. Pentru oricare dintre acestea, scrieți-ne la [adresa de email].

      Aveți, de asemenea, dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal ([www.dataprotection.ro](https://www.dataprotection.ro)).
    `,
  },
  {
    ...base,
    title: 'Politica de cookie-uri',
    slug: 'politica-cookies',
    intro: 'Ce cookie-uri folosește acest site și de ce.',
    showInFooter: true,
    body: md`
      > Acest text este un model de pornire și trebuie verificat înainte de lansarea site-ului.

      ## Pe scurt

      Acest site nu folosește cookie-uri de marketing, de publicitate sau de urmărire. De aceea nu vă cerem acordul printr-un banner.

      ## Statistici fără cookie-uri

      Pentru a ști câte persoane vizitează site-ul și ce pagini sunt utile, folosim Cloudflare Web Analytics, un serviciu care nu folosește cookie-uri și nu vă identifică personal.

      ## Cookie-uri strict necesare

      Furnizorul de hosting (Cloudflare) poate seta cookie-uri strict necesare pentru securitate, de exemplu pentru protecția împotriva traficului automat. Acestea nu sunt folosite pentru a vă urmări.

      ## Cum controlați cookie-urile

      Puteți șterge sau bloca oricând cookie-urile din setările browserului. Site-ul va funcționa în continuare.
    `,
  },
];
