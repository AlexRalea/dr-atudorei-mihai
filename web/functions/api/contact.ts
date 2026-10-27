// Cloudflare Pages Function: POST /api/contact
// Primește cererea de programare din formular și o trimite pe email prin Brevo.
// Mesajele nu se stochează nicăieri altundeva.

interface Env {
  BREVO_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_FROM_NAME?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  reason: string;
  message: string;
}

const THANK_YOU_PATH = '/contact/multumim/';
const ERROR_PATH = '/contact/?eroare=1#programare';

const field = (form: FormData, name: string, max: number) => String(form.get(name) ?? '').trim().slice(0, max);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function validate(form: FormData): { data?: ContactRequest; error?: string } {
  const data: ContactRequest = {
    name: field(form, 'nume', 100),
    phone: field(form, 'telefon', 20),
    email: field(form, 'email', 120),
    reason: field(form, 'motiv', 80),
    message: field(form, 'mesaj', 1000),
  };

  if (data.name.length < 3) return { error: 'Vă rugăm să scrieți numele complet.' };
  if (data.phone.replace(/\D/g, '').length < 9) return { error: 'Vă rugăm să verificați numărul de telefon.' };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: 'Vă rugăm să verificați adresa de email.' };
  }
  if (form.get('acord') !== 'da') return { error: 'Pentru a trimite cererea, este nevoie de acordul dumneavoastră.' };
  return { data };
}

async function verifyTurnstile(secret: string, form: FormData, ip: string | null): Promise<boolean> {
  const token = form.get('cf-turnstile-response');
  if (typeof token !== 'string' || !token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

async function sendEmail(env: Env, data: ContactRequest): Promise<boolean> {
  const rows: [string, string][] = [
    ['Nume', data.name],
    ['Telefon', data.phone],
    ['Email', data.email || '-'],
    ['Motiv', data.reason || '-'],
    ['Mesaj', data.message || '-'],
  ];

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY!,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: env.CONTACT_FROM_EMAIL, name: env.CONTACT_FROM_NAME || 'Site programări' },
      to: [{ email: env.CONTACT_TO_EMAIL }],
      replyTo: data.email ? { email: data.email, name: data.name } : undefined,
      subject: `Cerere de programare: ${data.name}`,
      textContent: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      htmlContent: `<h2>Cerere de programare de pe site</h2><table cellpadding="6">${rows
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    }),
  });

  return response.ok;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;
  const reply = (ok: boolean, error?: string, status = ok ? 200 : 400) =>
    wantsJson
      ? Response.json({ ok, error }, { status })
      : Response.redirect(new URL(ok ? THANK_YOU_PATH : ERROR_PATH, request.url).toString(), 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(false, 'Cererea nu a putut fi citită.');
  }

  // Câmpul capcană completat înseamnă robot: răspundem „ok” fără să trimitem nimic.
  if (field(form, 'website', 200)) return reply(true);

  const { data, error } = validate(form);
  if (!data) return reply(false, error);

  if (env.TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, form, request.headers.get('cf-connecting-ip'));
    if (!human) return reply(false, 'Verificarea anti-spam nu a reușit. Vă rugăm să încercați din nou.');
  }

  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    console.error('Formularul de contact nu este configurat: lipsesc variabilele BREVO_API_KEY / CONTACT_*.');
    return reply(false, 'Formularul nu este disponibil momentan. Vă rugăm să ne sunați.', 503);
  }

  const sent = await sendEmail(env, data).catch(() => false);
  return sent ? reply(true) : reply(false, 'Cererea nu a putut fi trimisă. Vă rugăm să încercați din nou sau să ne sunați.', 502);
};
