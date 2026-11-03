const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(iso?: string): string {
  if (!iso) return '';
  return dateFormatter.format(new Date(iso));
}

/** Link `tel:` doar pentru un număr complet; altfel `null` (de ex. cât timp numărul e încă necompletat). */
export function telHref(phone?: string): string | null {
  if (!phone) return null;
  let digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('0') && !digits.startsWith('00')) digits = `+4${digits}`;
  return digits.replace(/\D/g, '').length >= 10 ? `tel:${digits}` : null;
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Valorile marcate cu [ ] sunt încă de completat și nu trebuie afișate ca informații reale. */
export function isPlaceholder(value?: string): boolean {
  return !value || /\[.*\]/.test(value);
}

export interface TitleSegment {
  text: string;
  em: boolean;
}

/**
 * Împarte titlul principal pe rânduri și marchează cuvintele evidențiate.
 * În CMS, „|” desparte rândurile și *textul între steluțe* este evidențiat.
 * Fără marcaje, titlul se împarte automat: ultimele două cuvinte sunt evidențiate.
 */
export function heroTitleLines(title: string): TitleSegment[][] {
  const hasMarkup = /[|*]/.test(title);
  let lines: string[];

  if (hasMarkup) {
    lines = title.split('|').map((line) => line.trim()).filter(Boolean);
  } else {
    const words = title.trim().split(/\s+/);
    if (words.length < 4) return [[{ text: title, em: false }]];
    const breakAt = Math.round(words.length / 3);
    const second = words.slice(breakAt);
    lines = [words.slice(0, breakAt).join(' '), `${second.slice(0, -2).join(' ')} *${second.slice(-2).join(' ')}*`.trim()];
  }

  return lines.map((line) =>
    line
      .split(/(\*[^*]+\*)/)
      .filter(Boolean)
      .map((part) => (part.startsWith('*') && part.endsWith('*') ? { text: part.slice(1, -1), em: true } : { text: part, em: false })),
  );
}
