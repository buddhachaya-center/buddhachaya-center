import type { Locale } from './i18n';

export function pick(obj: Partial<Record<Locale, string>>, locale: Locale): string {
  // Try locale first, then en, then mm (which maps to 'my' in content), then empty string
  if (obj[locale]) return obj[locale];
  if (obj['en']) return obj['en'];
  if (obj['mm']) return obj['mm'];
  return '';
}
