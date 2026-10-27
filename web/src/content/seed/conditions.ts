import type { Condition } from '../../lib/types.ts';
import { md } from './md.ts';

// Texte de pornire, cu informații generale. Trebuie revizuite și validate de medic înainte de publicare.
const reviewedAt = '2026-10-27';

const base = { previousSlugs: [], seo: null, reviewedAt };

export const conditions: Condition[] = [
  {
    ...base,
    title: 'Sindromul de tunel carpian',
    slug: 'sindrom-de-tunel-carpian',
    aka: 'Compresia nervului median la pumn',
    symptomPrompt: 'Amorțeală și furnicături în degete, mai ales noaptea',
    summary:
      'Compresia nervului median la nivelul pumnului, care dă amorțeală, furnicături și slăbiciune în degetul mare, arătător și mijlociu.',
    overview: md`
      Tunelul carpian este un canal îngust la nivelul pumnului, prin care trec nervul median și tendoanele care îndoaie degetele. Când spațiul din canal se reduce sau țesuturile din jur se îngroașă, nervul este comprimat și apar simptomele.

      Este una dintre cele mai frecvente afecțiuni ale mâinii. Apare mai des la femei, după 40 de ani, și poate fi favorizată de anumite activități sau de alte afecțiuni.
    `,
    symptoms: [
      'Amorțeală sau furnicături în degetul mare, arătător, mijlociu și jumătate din inelar',
      'Simptome care vă trezesc noaptea și se ameliorează când scuturați mâna',
      'Senzație de mână „umflată” sau stângace',
      'Obiecte care vă scapă din mână',
      'În formele avansate, slăbirea mușchilor de la baza degetului mare',
    ],
    causes: [
      'Mișcări repetitive ale pumnului sau folosirea uneltelor care vibrează',
      'Sarcina și modificările hormonale',
      'Diabetul, afecțiunile tiroidiene, artrita reumatoidă',
      'Fracturi sau traumatisme vechi la nivelul pumnului',
    ],
    whenToSee: [
      'Amorțeala durează de câteva săptămâni sau vă trezește des noaptea',
      'Observați că vă scapă obiectele din mână',
      'Simțiți slăbiciune sau vedeți că mușchii de la baza degetului mare s-au subțiat',
      'Simptomele revin după repaus și purtarea unei atele',
    ],
    treatment: md`
      ### Tratament fără operație

      În formele ușoare, simptomele se pot ameliora cu o atelă purtată noaptea, care ține pumnul drept, cu adaptarea activităților și, în unele cazuri, cu o infiltrație.

      ### Tratament chirurgical

      Când simptomele persistă sau există semne că nervul este afectat, se recomandă decompresia nervului median: secționarea ligamentului care formează „acoperișul” tunelului, pentru a face loc nervului. Intervenția se face de obicei cu anestezie locală, iar pacientul pleacă acasă în aceeași zi.

      Pentru confirmarea diagnosticului și pentru a vedea cât de afectat este nervul, medicul poate recomanda o electromiografie (EMG).
    `,
    recovery: md`
      Mâna poate fi folosită pentru activități ușoare la scurt timp după intervenție. Firele se scot de obicei după aproximativ două săptămâni, iar forța revine treptat, în câteva săptămâni. Amorțeala de noapte se ameliorează adesea prima; în formele vechi, recuperarea completă a sensibilității poate dura mai mult.
    `,
    faqs: [
      {
        question: 'Poate trece tunelul carpian de la sine?',
        answer:
          'În formele ușoare sau în cele apărute în sarcină, simptomele se pot ameliora fără operație. Dacă amorțeala persistă sau apare slăbiciune, nu amânați evaluarea: o compresie de durată poate afecta nervul.',
      },
      {
        question: 'Operația se face cu anestezie generală?',
        answer:
          'De obicei nu. Intervenția se face, în majoritatea cazurilor, cu anestezie locală, iar pacientul pleacă acasă în aceeași zi.',
      },
      {
        question: 'Am nevoie de electromiografie (EMG)?',
        answer:
          'EMG-ul arată cât de afectat este nervul și ajută la confirmarea diagnosticului. Medicul vă spune la consultație dacă este necesar în cazul dumneavoastră.',
      },
    ],
    relatedServices: ['decompresia-nervilor', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Degetul în resort',
    slug: 'deget-in-resort',
    aka: 'Deget „în trăgaci”, tenosinovită stenozantă',
    symptomPrompt: 'Un deget se blochează sau „sare” când îl întindeți',
    summary:
      'Un deget se blochează în poziție îndoită și se deblochează brusc, uneori dureros, din cauza îngroșării tendonului sau a tecii lui.',
    overview: md`
      Tendoanele care îndoaie degetele alunecă printr-un sistem de mici „tunele” numite scripeți. Când tendonul sau teaca lui se îngroașă la baza degetului, alunecarea nu mai este lină: degetul se agață, apoi se deblochează cu un mic salt, ca un trăgaci.

      Poate afecta orice deget, cel mai des degetul mare, inelarul și mijlociul. Este mai frecvent la persoanele cu diabet și la cele care fac des mișcări de prindere puternică.
    `,
    symptoms: [
      'Durere sau sensibilitate în palmă, la baza degetului',
      'Un mic nodul care se simte la baza degetului',
      'Senzația de „clic” sau de blocare când îndoiți și întindeți degetul',
      'Rigiditate mai accentuată dimineața',
      'În formele avansate, degetul rămâne blocat în poziție îndoită',
    ],
    causes: [
      'Mișcări repetate de prindere puternică',
      'Diabetul',
      'Artrita reumatoidă',
      'Apare mai des la femei și după 40–50 de ani',
    ],
    whenToSee: [
      'Degetul se blochează des sau dureros',
      'Nu mai puteți întinde complet degetul',
      'Durerea vă împiedică să lucrați sau să dormiți',
      'Simptomele nu trec după câteva săptămâni de repaus',
    ],
    treatment: md`
      ### Tratament fără operație

      În formele ușoare se pot încerca repausul, o atelă și, frecvent, o infiltrație în teaca tendonului. La mulți pacienți, aceasta ameliorează simptomele.

      ### Tratament chirurgical

      Dacă blocarea persistă sau revine, intervenția constă în eliberarea scripetelui care strânge tendonul, printr-o incizie mică în palmă. Se face cu anestezie locală, iar degetul poate fi mișcat imediat după operație.
    `,
    recovery: md`
      Mișcarea degetului este încurajată încă din primele zile, pentru a preveni rigiditatea. Activitățile ușoare se reiau repede, iar sensibilitatea din palmă scade treptat în câteva săptămâni.
    `,
    faqs: [
      {
        question: 'Infiltrația rezolvă definitiv problema?',
        answer:
          'La o parte dintre pacienți, da. La alții, simptomele revin după un timp. Atunci se poate discuta o a doua infiltrație sau intervenția chirurgicală.',
      },
      {
        question: 'Pot avea mai multe degete afectate?',
        answer:
          'Da, se întâmplă, mai ales la persoanele cu diabet. Fiecare deget se evaluează și se tratează separat.',
      },
    ],
    relatedServices: ['chirurgia-tendoanelor', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Boala Dupuytren',
    slug: 'boala-dupuytren',
    aka: 'Contractura Dupuytren',
    symptomPrompt: 'Degetele se strâng spre palmă și nu se mai întind',
    summary:
      'Îngroșarea țesutului de sub pielea palmei, care formează noduli și corzi și trage treptat degetele în poziție îndoită.',
    overview: md`
      Sub pielea palmei se află un strat de țesut fibros, numit fascie palmară. În boala Dupuytren, acest țesut se îngroașă: apar mai întâi noduli în palmă, apoi corzi care se întind spre degete și le trag treptat în poziție îndoită.

      Boala evoluează de obicei lent, de-a lungul anilor, și în general nu doare. Cel mai des sunt afectate inelarul și degetul mic. Are o componentă ereditară și este mai frecventă la bărbați după 50 de ani.
    `,
    symptoms: [
      'Noduli fermi în palmă, uneori ușor sensibili la început',
      'Corzi care se simt sub piele, de la palmă spre degete',
      'Degete care nu se mai pot întinde complet',
      'Dificultate să puneți palma plat pe masă',
      'Probleme la purtatul mănușilor, la spălatul pe față sau la băgatul mâinii în buzunar',
    ],
    causes: [
      'Predispoziție genetică (istoric familial)',
      'Sexul masculin și vârsta de peste 50 de ani',
      'Diabetul',
      'Fumatul și consumul crescut de alcool',
    ],
    whenToSee: [
      'Nu mai puteți pune palma plat pe o masă',
      'Degetele s-au îndoit tot mai mult în ultimele luni',
      'Contractura vă încurcă în activitățile zilnice',
    ],
    treatment: md`
      Nodulii fără contractură se urmăresc de obicei în timp, fără tratament. Când degetele încep să se îndoaie și vă încurcă, există mai multe opțiuni.

      ### Fasciotomia cu ac

      Corzile sunt secționate prin piele, cu un ac, fără incizie. Recuperarea este rapidă, dar boala poate reveni mai devreme.

      ### Fasciectomia

      Țesutul bolnav este îndepărtat chirurgical. Recuperarea durează mai mult, dar rezultatul este, în general, mai durabil.

      Alegerea metodei depinde de cât de avansată este boala, de degetele afectate și de preferințele dumneavoastră. Le discutăm pe toate la consultație.
    `,
    recovery: md`
      După intervenție se poartă de regulă o atelă de noapte timp de câteva săptămâni, iar exercițiile de recuperare ajută la menținerea degetelor întinse. Boala Dupuytren poate reveni în timp, chiar după un tratament reușit.
    `,
    faqs: [
      {
        question: 'Masajul sau exercițiile pot opri boala?',
        answer:
          'Nu există dovezi că masajul sau întinderile opresc evoluția bolii. Exercițiile sunt însă utile după tratament, pentru recuperare.',
      },
      {
        question: 'Când este momentul potrivit pentru tratament?',
        answer:
          'Un reper simplu este testul mesei: dacă nu mai puteți pune palma plat pe masă, este momentul unei evaluări. Decizia se ia împreună, în funcție de gradul contracturii și de cât vă afectează.',
      },
    ],
    relatedServices: ['tratamentul-bolii-dupuytren', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Chistul sinovial',
    slug: 'chist-sinovial',
    aka: 'Ganglion, chist artrosinovial',
    symptomPrompt: 'O umflătură rotundă pe încheietură sau pe deget',
    summary:
      'O umflătură benignă, plină cu lichid, care apare cel mai des pe dosul sau pe fața încheieturii mâinii.',
    overview: md`
      Chistul sinovial este o „pungă” plină cu un lichid gelatinos, legată de o articulație sau de teaca unui tendon. Este cea mai frecventă formațiune a mâinii și este benignă: nu este o tumoră malignă și nu se transformă într-una.

      Apare cel mai des pe dosul încheieturii, dar și pe fața ei, la baza degetelor sau lângă ultima articulație a unui deget (chistul mucoid). Mărimea lui poate varia: uneori crește, alteori scade sau dispare de la sine.
    `,
    symptoms: [
      'Umflătură rotundă, fermă sau elastică, de la câțiva milimetri la câțiva centimetri',
      'Mărime care variază în timp, uneori în funcție de efort',
      'Disconfort sau durere la sprijinul pe mână sau la mișcările extreme ale pumnului',
      'Rar, amorțeală, dacă chistul apasă pe un nerv',
    ],
    causes: [
      'Cauza exactă nu este cunoscută',
      'Apare mai des la femei, între 20 și 40 de ani',
      'Chistul mucoid de la deget este asociat de obicei cu artroza',
    ],
    whenToSee: [
      'Umflătura doare sau vă limitează mișcările',
      'Crește repede sau arată neobișnuit',
      'Apare amorțeală sau slăbiciune în mână',
      'Vă deranjează estetic și vreți să aflați opțiunile',
    ],
    treatment: md`
      Dacă nu doare și nu vă încurcă, un chist sinovial poate fi doar urmărit: o parte dintre ele dispar singure. Diagnosticul se pune la consultație, uneori cu ajutorul unei ecografii.

      ### Aspirația

      Lichidul poate fi extras cu un ac. Procedura este simplă, dar chistul revine destul de des.

      ### Excizia chirurgicală

      Chistul este îndepărtat împreună cu „rădăcina” lui de la nivelul articulației sau al tendonului, ceea ce scade riscul să revină. Intervenția se face de obicei în ambulatoriu.

      > Nu încercați să spargeți chistul prin lovire. Vechiul sfat cu „cartea grea” poate provoca leziuni și nu împiedică revenirea lui.
    `,
    recovery: md`
      După excizie, mâna se protejează câteva zile, apoi mișcările se reiau treptat. Activitățile obișnuite se reiau de regulă în câteva săptămâni, în funcție de locul în care a fost chistul.
    `,
    faqs: [
      {
        question: 'Chistul sinovial este periculos?',
        answer:
          'Nu. Este o formațiune benignă. Se tratează atunci când doare, limitează mișcarea sau vă deranjează.',
      },
      {
        question: 'Poate reveni după operație?',
        answer:
          'Da, riscul există, dar este mai mic după excizia chirurgicală decât după aspirație.',
      },
    ],
    relatedServices: ['excizia-formatiunilor', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Tenosinovita De Quervain',
    slug: 'tenosinovita-de-quervain',
    aka: 'Tendinita De Quervain',
    symptomPrompt: 'Durere pe marginea pumnului, spre degetul mare',
    summary:
      'Îngroșarea tecii a două tendoane ale degetului mare, care provoacă durere pe marginea pumnului la mișcările degetului mare.',
    overview: md`
      Pe marginea pumnului dinspre degetul mare, două tendoane trec printr-un canal îngust. Când teaca lor se îngroașă, alunecarea tendoanelor devine dureroasă.

      Afecțiunea apare des la proaspetele mame, din cauza poziției mâinii când țin copilul în brațe, dar și la persoanele care fac mișcări repetate de prindere și de rotire a pumnului.
    `,
    symptoms: [
      'Durere pe marginea pumnului, la baza degetului mare',
      'Durere care se accentuează când prindeți, ridicați sau răsuciți ceva',
      'Umflătură ușoară în aceeași zonă',
      'Senzație de frecare sau de blocare la mișcarea degetului mare',
    ],
    causes: [
      'Mișcări repetate ale pumnului și ale degetului mare',
      'Perioada de după naștere și alăptarea',
      'Activități care solicită prinderea între degetul mare și celelalte degete',
    ],
    whenToSee: [
      'Durerea durează de mai mult de câteva săptămâni',
      'Nu mai puteți ține obiecte sau copilul în brațe fără durere',
      'Simptomele revin după repaus',
    ],
    treatment: md`
      ### Tratament fără operație

      O atelă care include degetul mare, repausul și, la nevoie, o infiltrație în teaca tendoanelor ameliorează simptomele la mulți pacienți.

      ### Tratament chirurgical

      Când durerea persistă, canalul îngust poate fi deschis chirurgical, pentru ca tendoanele să alunece liber. Intervenția se face cu anestezie locală, printr-o incizie mică pe marginea pumnului.
    `,
    recovery: md`
      Mâna poate fi folosită pentru activități ușoare după câteva zile, iar forța revine treptat în câteva săptămâni.
    `,
    faqs: [
      {
        question: 'Trece de la sine după naștere?',
        answer:
          'La unele mame, simptomele se ameliorează pe măsură ce copilul crește și se schimbă felul în care este ținut. Dacă durerea persistă, tratamentul poate scurta mult perioada de disconfort.',
      },
    ],
    relatedServices: ['chirurgia-tendoanelor', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Rizartroza',
    slug: 'rizartroza',
    aka: 'Artroza de la baza degetului mare',
    symptomPrompt: 'Durere la baza degetului mare când prindeți ceva',
    summary:
      'Uzura articulației de la baza degetului mare, care provoacă durere la prindere, scăderea forței și, în timp, deformarea degetului.',
    overview: md`
      Articulația de la baza degetului mare ne permite să prindem și să apucăm obiecte. Pentru că este foarte solicitată, cartilajul ei se uzează des odată cu vârsta.

      Rizartroza este mai frecventă la femei, după 50 de ani. Evoluează lent și poate afecta ambele mâini.
    `,
    symptoms: [
      'Durere la baza degetului mare la prindere sau la răsucire (deschiderea unui borcan, întoarcerea cheii)',
      'Scăderea forței de prindere',
      'Umflătură sau proeminență la baza degetului mare',
      'Rigiditate și, în timp, deformarea degetului',
    ],
    causes: [
      'Vârsta și uzura articulației',
      'Predispoziție familială',
      'Articulații laxe',
      'Traumatisme vechi ale degetului mare',
    ],
    whenToSee: [
      'Durerea vă împiedică să faceți activitățile obișnuite',
      'Simțiți că vă scade forța în mână',
      'Observați că baza degetului mare se deformează',
    ],
    treatment: md`
      ### Tratament fără operație

      În majoritatea cazurilor, tratamentul începe fără operație: atele care stabilizează degetul mare, adaptarea felului în care prindeți obiectele, antiinflamatoare la nevoie și, uneori, infiltrații.

      ### Tratament chirurgical

      Când durerea nu se ameliorează, există mai multe tipuri de intervenții, care urmăresc eliminarea durerii și păstrarea funcției mâinii. La consultație discutăm ce variantă se potrivește în cazul dumneavoastră.
    `,
    recovery: md`
      Recuperarea după intervenție durează mai mult decât în alte operații ale mâinii, de regulă câteva luni, și include o perioadă de imobilizare urmată de exerciții de recuperare.
    `,
    faqs: [
      {
        question: 'Atela chiar ajută?',
        answer:
          'Da, la mulți pacienți o atelă potrivită reduce durerea, mai ales în activitățile care solicită degetul mare. Nu oprește uzura, dar poate amâna sau evita operația.',
      },
    ],
    relatedServices: ['consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Sindromul de canal cubital',
    slug: 'sindrom-de-canal-cubital',
    aka: 'Compresia nervului ulnar la cot',
    symptomPrompt: 'Amorțeală în degetul mic și în inelar',
    summary:
      'Compresia nervului ulnar la nivelul cotului, care dă amorțeală în degetul mic și în inelar și, în timp, slăbiciune în mână.',
    overview: md`
      Nervul ulnar trece pe partea interioară a cotului, prin zona în care simțiți un „curent” când vă loviți la cot. Acolo poate fi comprimat sau întins, mai ales când cotul stă mult timp îndoit.

      Este a doua cea mai frecventă compresie de nerv la braț, după sindromul de tunel carpian.
    `,
    symptoms: [
      'Amorțeală sau furnicături în degetul mic și în jumătate din inelar',
      'Simptome mai accentuate când cotul stă îndoit (la telefon, în somn)',
      'Durere pe partea interioară a cotului',
      'Stângăcie la mișcările fine: nasturi, scris',
      'În formele avansate, slăbirea mușchilor mici ai mâinii',
    ],
    causes: [
      'Ținerea îndelungată a cotului îndoit',
      'Sprijinirea frecventă pe cot',
      'Traumatisme sau fracturi vechi ale cotului',
      'Artroza cotului',
    ],
    whenToSee: [
      'Amorțeala persistă sau revine des',
      'Observați slăbiciune sau stângăcie în mână',
      'Mușchii dintre degete par mai subțiri',
    ],
    treatment: md`
      ### Tratament fără operație

      În formele ușoare, evitarea flexiei prelungite a cotului, o atelă purtată noaptea și evitarea sprijinului pe cot pot ameliora simptomele.

      ### Tratament chirurgical

      Când simptomele persistă sau apare slăbiciune, nervul este eliberat chirurgical și uneori repoziționat. Pentru diagnostic și pentru a vedea cât de afectat este nervul, se recomandă de obicei o electromiografie (EMG).
    `,
    recovery: md`
      Sensibilitatea și forța se recuperează treptat, în câteva luni, în funcție de cât de veche și de severă a fost compresia.
    `,
    faqs: [
      {
        question: 'De ce am amorțeli noaptea?',
        answer:
          'În somn, cotul stă adesea mult timp îndoit, ceea ce întinde și comprimă nervul ulnar. O atelă de noapte sau un prosop înfășurat în jurul cotului poate ajuta.',
      },
    ],
    relatedServices: ['decompresia-nervilor', 'consultatie-chirurgia-mainii'],
  },
  {
    ...base,
    title: 'Fracturile pumnului și ale mâinii',
    slug: 'fracturi-pumn-si-mana',
    aka: 'Fractura de radius distal, fractura de scafoid, fracturi ale degetelor',
    symptomPrompt: 'Durere și umflătură după o căzătură pe mână',
    summary:
      'Fracturile oaselor pumnului și ale mâinii, de la fractura de radius distal la fracturile de scafoid, ale oaselor palmei și ale degetelor.',
    overview: md`
      Căzătura pe mâna întinsă este cea mai frecventă cauză a fracturilor de pumn. Fractura de radius distal (osul antebrațului, chiar deasupra pumnului) este una dintre cele mai frecvente fracturi. Fractura de scafoid, un os mic al pumnului, este adesea trecută cu vederea, pentru că poate semăna cu o simplă entorsă.

      O fractură tratată corect și la timp are cele mai bune șanse să se vindece fără deformare și fără limitarea mișcărilor.
    `,
    symptoms: [
      'Durere puternică după o căzătură sau o lovitură',
      'Umflătură și vânătaie',
      'Deformarea vizibilă a pumnului sau a unui deget',
      'Durere la mișcare sau imposibilitatea de a folosi mâna',
      'Durere în adâncitura de la baza degetului mare, semn posibil de fractură de scafoid',
    ],
    causes: [
      'Căzături pe mâna întinsă',
      'Accidente sportive sau rutiere',
      'Lovituri directe',
      'Osteoporoza, care crește riscul de fractură chiar la traumatisme minore',
    ],
    whenToSee: [
      'Imediat după un traumatism cu durere și umflătură importantă',
      'Când pumnul sau un deget este deformat',
      'Când durerea la pumn persistă la câteva zile după o „entorsă”',
      'Când apare amorțeală în degete după accidentare',
    ],
    treatment: md`
      Tratamentul depinde de tipul fracturii, de cât de deplasate sunt fragmentele și de nevoile fiecărui pacient.

      ### Tratament ortopedic

      Multe fracturi se tratează prin imobilizare în atelă sau gips, după ce fragmentele sunt aduse în poziția corectă, cu radiografii de control.

      ### Tratament chirurgical

      Fracturile instabile sau cu deplasare importantă se fixează chirurgical cu plăci, șuruburi sau broșe, pentru o vindecare în poziție corectă și o mobilizare mai rapidă.

      > În caz de traumatism cu deformare, plagă deschisă sau amorțeală, mergeți la cea mai apropiată unitate de primiri urgențe.
    `,
    recovery: md`
      Vindecarea osului durează de la câteva săptămâni la câteva luni, în funcție de os și de tipul fracturii. Recuperarea mobilității și a forței continuă și după aceea, adesea cu ajutorul kinetoterapiei.
    `,
    faqs: [
      {
        question: 'Pot avea o fractură chiar dacă pot mișca mâna?',
        answer:
          'Da. Mai ales fractura de scafoid poate permite mișcarea, cu o durere moderată. Dacă durerea persistă după o căzătură, este important să faceți o evaluare și, la nevoie, o radiografie.',
      },
    ],
    relatedServices: ['traumatologia-mainii'],
  },
  {
    ...base,
    title: 'Leziunile de tendoane',
    slug: 'leziuni-de-tendoane',
    aka: 'Tendoane secționate sau rupte la mână',
    symptomPrompt: 'Nu mai puteți îndoi sau întinde un deget după o tăietură',
    summary:
      'Secționarea sau ruperea tendoanelor care îndoaie ori întind degetele, de obicei după o tăietură sau un traumatism.',
    overview: md`
      Tendoanele leagă mușchii antebrațului de oasele degetelor și transmit mișcarea. Pe partea palmei sunt tendoanele flexoare, care îndoaie degetele, iar pe dosul mâinii, tendoanele extensoare, care le întind.

      O tăietură care pare mică, de exemplu cu un cuțit sau cu sticlă, poate secționa un tendon sau un nerv. Aceste leziuni au nevoie de tratament de specialitate cât mai repede.
    `,
    symptoms: [
      'Imposibilitatea de a îndoi sau de a întinde complet un deget',
      'Un deget care stă într-o poziție neobișnuită în repaus',
      'Durere și umflătură la locul leziunii',
      'Amorțeală, dacă este afectat și un nerv',
    ],
    causes: [
      'Tăieturi cu cuțitul, cu sticlă sau cu unelte',
      'Traumatisme prin smulgere, de exemplu în sport',
      'Mai rar, ruperea unui tendon slăbit de boli reumatice',
    ],
    whenToSee: [
      'Imediat după o tăietură la mână, dacă nu puteți mișca normal degetul',
      'Când apare amorțeală după o tăietură',
      'Când un deget nu se mai întinde după o lovitură',
    ],
    treatment: md`
      Tendoanele flexoare secționate se repară chirurgical, cât mai curând după accident, prin sutura capetelor tendonului. Unele leziuni ale tendoanelor extensoare se pot trata și prin imobilizare în atelă.

      Rezultatul depinde în mare măsură de recuperarea de după operație, făcută după un program strict, de obicei împreună cu un kinetoterapeut specializat în recuperarea mâinii.

      > O tăietură la mână urmată de imposibilitatea de a mișca un deget este o urgență. Mergeți la cea mai apropiată unitate de primiri urgențe.
    `,
    recovery: md`
      Tendonul reparat are nevoie de mai multe săptămâni ca să se vindece. În această perioadă se poartă o atelă de protecție și se fac exerciții controlate, după indicațiile medicului. Respectarea programului de recuperare este esențială pentru rezultat.
    `,
    faqs: [
      {
        question: 'De ce contează atât de mult recuperarea?',
        answer:
          'Un tendon reparat se poate lipi de țesuturile din jur sau se poate rupe din nou dacă este solicitat prea devreme. Exercițiile controlate previn ambele probleme.',
      },
    ],
    relatedServices: ['chirurgia-tendoanelor', 'traumatologia-mainii'],
  },
  {
    ...base,
    title: 'Leziunile de nervi',
    slug: 'leziuni-de-nervi',
    aka: 'Nervi secționați la mână și la antebraț',
    symptomPrompt: 'Amorțeală apărută după o tăietură la mână',
    summary:
      'Leziunile nervilor de la mână și antebraț, care duc la pierderea sensibilității sau a forței în zona deservită de nervul afectat.',
    overview: md`
      Sensibilitatea și mișcările fine ale mâinii depind de trei nervi principali, medianul, ulnarul și radialul, și de nervii mici de pe marginile fiecărui deget. Ei pot fi lezați prin tăieturi, fracturi sau striviri.

      Un nerv secționat nu se vindecă de la sine. Repararea lui chirurgicală, cât mai devreme, oferă cele mai bune șanse de recuperare.
    `,
    symptoms: [
      'Amorțeală într-o zonă a degetelor sau a mâinii după o tăietură sau un traumatism',
      'Furnicături sau senzații „de curent”',
      'Slăbiciune sau stângăcie la mișcările fine',
      'Dificultatea de a simți obiectele mici sau temperatura',
    ],
    causes: ['Tăieturi cu obiecte ascuțite', 'Fracturi și luxații', 'Striviri și traumatisme prin smulgere'],
    whenToSee: [
      'Imediat, dacă după o tăietură apare amorțeală',
      'Când slăbiciunea sau amorțeala persistă după un traumatism',
    ],
    treatment: md`
      Nervii secționați se repară chirurgical, prin sutura capetelor cu ajutorul unor instrumente de mărire. Când capetele nu pot fi apropiate, se poate folosi o grefă de nerv.

      După reparare, nervul crește lent, cu aproximativ un milimetru pe zi, așa că recuperarea sensibilității și a forței se întinde pe mai multe luni.
    `,
    recovery: md`
      Recuperarea este lentă și progresivă. Kinetoterapia și exercițiile de reeducare a sensibilității ajută la un rezultat cât mai bun.
    `,
    faqs: [
      {
        question: 'Se recuperează complet sensibilitatea?',
        answer:
          'Depinde de vârstă, de nervul afectat, de locul leziunii și de cât de repede s-a făcut repararea. Medicul vă poate da o estimare după evaluare.',
      },
    ],
    relatedServices: ['traumatologia-mainii'],
  },
  {
    ...base,
    title: 'Degetul în ciocan',
    slug: 'deget-in-ciocan',
    aka: 'Mallet finger, ruptura tendonului de la vârful degetului',
    symptomPrompt: 'Vârful degetului a rămas căzut după o lovitură',
    summary:
      'Vârful degetului rămâne îndoit și nu mai poate fi întins, după ruperea tendonului extensor sau smulgerea unui mic fragment de os.',
    overview: md`
      Afecțiunea apare tipic când vârful degetului întins este lovit brusc, de exemplu de o minge sau când vă prindeți degetul în cearșaf în timp ce faceți patul. Tendonul care întinde ultima falangă se rupe sau smulge un mic fragment din os.

      Deși pare o problemă minoră, netratată poate lăsa o deformare permanentă a degetului.
    `,
    symptoms: [
      'Vârful degetului rămâne căzut și nu poate fi întins',
      'Durere și umflătură la ultima articulație a degetului',
      'Uneori, vânătaie lângă unghie',
    ],
    causes: ['Lovituri în vârful degetului: o minge, prinderea degetului în așternut', 'Traumatisme sportive'],
    whenToSee: [
      'Cât mai curând după accidentare, ideal în primele zile',
      'Când degetul nu se mai întinde complet după o lovitură',
    ],
    treatment: md`
      Cele mai multe cazuri se tratează fără operație, cu o atelă care ține ultima articulație a degetului complet întinsă, purtată continuu mai multe săptămâni. Este esențial ca atela să nu fie scoasă în această perioadă, nici măcar pentru scurt timp.

      Operația se recomandă rar, de exemplu când un fragment de os mare este deplasat sau articulația nu este aliniată.
    `,
    recovery: md`
      După perioada de atelă continuă, aceasta se poartă de obicei încă un timp noaptea, iar degetul se mobilizează treptat.
    `,
    faqs: [
      {
        question: 'De ce nu am voie să scot atela nici măcar la duș?',
        answer:
          'Orice îndoire a vârfului degetului în perioada de vindecare poate rupe din nou tendonul, iar tratamentul trebuie luat de la capăt. Medicul vă arată cum să curățați sau să schimbați atela fără să îndoiți degetul.',
      },
    ],
    relatedServices: ['traumatologia-mainii', 'chirurgia-tendoanelor'],
  },
];
