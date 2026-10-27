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
