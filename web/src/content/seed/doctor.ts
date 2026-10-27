import type { Doctor } from '../../lib/types.ts';
import { md } from './md.ts';

export const doctor: Doctor = {
  name: 'Dr. Mihai Atudorei',
  role: 'Medic chirurg',
  specialty: 'Chirurgia mâinii',
  shortBio:
    'Mă ocup de afecțiunile mâinii, ale pumnului și ale degetelor: de la amorțeli și dureri care vă încurcă în fiecare zi până la urmările accidentărilor. Cred într-o medicină explicată pe înțeles, în care fiecare pacient știe ce are și ce opțiuni are.',
  bio: md`
    [De completat de medic: parcursul profesional, ce l-a atras spre chirurgia mâinii și cum lucrează cu pacienții.]

    Chirurgia mâinii este o specialitate în care detaliile contează. O mână sănătoasă înseamnă să vă puteți îmbrăca singur, să lucrați, să conduceți, să țineți un copil în brațe. De aceea, scopul tratamentului nu este doar vindecarea unei leziuni, ci recuperarea funcției de care aveți nevoie în viața de zi cu zi.

    La consultație îmi iau timp să vă explic ce se întâmplă cu mâna dumneavoastră și care sunt opțiunile, cu avantajele și limitele fiecăreia. Nu orice problemă a mâinii are nevoie de operație. Iar atunci când are, este important să știți la ce să vă așteptați: cum decurge intervenția, cât durează recuperarea și ce puteți face ca să vă ajutați.
  `,
  portrait: null,
  focusAreas: [
    'Compresiile de nervi: tunel carpian, canal cubital',
    'Afecțiunile tendoanelor: deget în resort, tenosinovita De Quervain',
    'Boala Dupuytren',
    'Chisturi și formațiuni ale mâinii',
    'Traumatologia mâinii și a pumnului',
  ],
  education: [
    { period: '[anii]', title: 'Facultatea de Medicină', institution: '[Universitatea de completat]' },
    { period: '[anii]', title: 'Rezidențiat în [specialitatea de completat]', institution: '[Spitalul de completat]' },
    { period: '[anul]', title: 'Formare în chirurgia mâinii', institution: '[De completat]' },
  ],
  memberships: ['Colegiul Medicilor din România', '[Societăți profesionale de completat]'],
};
