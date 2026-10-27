# Site Dr. Mihai Atudorei — Chirurgia mâinii

Site de prezentare cu panou de administrare pentru conținut.

| Folder | Ce conține |
|---|---|
| [`web/`](web/) | Site-ul public: Astro (HTML static), găzduit pe Cloudflare Pages |
| [`studio/`](studio/) | Panoul de administrare: Sanity Studio, găzduit gratuit pe `*.sanity.studio` |

```
Medicul publică în Sanity Studio
        │ webhook
        ▼
Cloudflare Pages reface site-ul (~1 min) ──► HTML static pe CDN
                                              │ formular
                                              ▼
                              Cloudflare Function → email (Brevo)
```

Cerință: **Node.js 22.12 sau mai nou**.

---

## Dezvoltare locală

```bash
cd web
npm install
npm run dev          # http://localhost:4321
```

Cât timp `PUBLIC_SANITY_PROJECT_ID` nu este setat, site-ul folosește conținutul de pornire din
[`web/src/content/seed/`](web/src/content/seed/). Valorile între `[ ]` sunt de completat.

| Comandă (în `web/`) | Ce face |
|---|---|
| `npm run build` | Generează site-ul în `dist/` |
| `npm run check` | Verificare TypeScript |
| `npm run pages:dev` | Rulează `dist/` cu funcția de formular, ca pe Cloudflare (după `build`) |
| `npm run seed:export` | Exportă conținutul de pornire pentru importul în Sanity |

---

## Configurare (o singură dată)

### 1. Sanity

1. Creați un cont pe [sanity.io](https://www.sanity.io) și un proiect nou (dataset `production`, public).
2. În `studio/`, copiați `.env.example` în `.env` și completați `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_HOST` și `SANITY_STUDIO_SITE_URL`.
3. Importați conținutul de pornire:
   ```bash
   cd web && npm run seed:export
   cd ../studio && npm install && npx sanity login && npm run seed:import
   ```
4. Publicați panoul: `npm run deploy` → `https://<SANITY_STUDIO_HOST>.sanity.studio`.
5. În [sanity.io/manage](https://www.sanity.io/manage) → **Members**, invitați medicul cu rolul **Editor**.

### 2. Cloudflare Pages

1. Urcați repository-ul pe GitHub (privat).
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → conectați repository-ul.
   - Root directory: `web`
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Settings → Variables and Secrets**:

   | Variabilă | Valoare |
   |---|---|
   | `NODE_VERSION` | `22` |
   | `PUBLIC_SITE_URL` | `https://www.domeniu.ro` (fără ea, site-ul nu se lasă indexat) |
   | `PUBLIC_SANITY_PROJECT_ID` | ID-ul proiectului Sanity |
   | `PUBLIC_SANITY_DATASET` | `production` |
   | `BREVO_API_KEY` (secret) | cheia API Brevo |
   | `CONTACT_TO_EMAIL` | adresa la care vin cererile de programare |
   | `CONTACT_FROM_EMAIL` | adresa expeditorului, verificată în Brevo |
   | `CONTACT_FROM_NAME` | de ex. `Site programări` |
   | `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | opțional, protecție anti-spam |

4. **Rebuild automat la publicare**: Settings → Builds → **Deploy hooks** → creați un hook și copiați URL-ul.
   În sanity.io/manage → **API → Webhooks** → creați un webhook `POST` către acel URL, pentru dataset-ul
   `production`, la creare, modificare și ștergere.
5. **Domeniul**: Custom domains → adăugați `domeniu.ro` și `www.domeniu.ro` (DNS-ul domeniului administrat în Cloudflare).

### 3. Email (Brevo)

Cont gratuit pe [brevo.com](https://www.brevo.com), verificați domeniul expeditorului (înregistrările DNS se adaugă
în Cloudflare) și generați o cheie API. Mesajele din formular se trimit doar pe email și nu se stochează.

---

## Cum funcționează

- **Pagini noi**: medicul adaugă o afecțiune, un serviciu, un articol sau o pagină simplă în Studio; la publicare
  site-ul se reface și pagina apare în meniuri, în sitemap și cu datele structurate pentru Google.
- **Adrese sigure**: după prima publicare, adresa unei pagini se blochează. Dacă este schimbată explicit, adresa
  veche se salvează și site-ul generează automat o redirecționare 301 (`web/src/pages/[file].ts` → `_redirects`).
- **SEO**: titlu și descriere per pagină (cu valori implicite), `sitemap-index.xml`, `robots.txt`, date structurate
  `Physician`, `MedicalWebPage`, `MedicalCondition`, `Article`, `FAQPage`, `BreadcrumbList`.
- **Indexare**: cât timp `PUBLIC_SITE_URL` lipsește, toate paginile au `noindex`, iar adresele `*.pages.dev` trimit
  `X-Robots-Tag: noindex`.

## Înainte de lansare

- [ ] Completați toate valorile `[ ]`: telefon, email, clinică, adresă, formare, cod CMR
- [ ] Textele medicale sunt revizuite și validate de medic
- [ ] Lista de servicii corespunde procedurilor pe care medicul le face efectiv
- [ ] Politica de confidențialitate și cea de cookie-uri sunt verificate (GDPR)
- [ ] Textele respectă Codul de deontologie CMR (fără promisiuni, comparații, superlative)
- [ ] Fotografia medicului este adăugată
- [ ] `PUBLIC_SITE_URL` setat, domeniul conectat, formularul testat cu o trimitere reală
- [ ] Google Search Console (cu sitemap) și profilul Google Business
