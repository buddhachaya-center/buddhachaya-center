import type { Locale } from './i18n';
import type { ContentLocale } from '@/content/types';

export function pick(obj: Partial<Record<Locale, string>>, locale: Locale): string {
  // Try locale first, then en, then mm (which maps to 'my' in content), then empty string
  if (obj[locale]) return obj[locale];
  if (obj['en']) return obj['en'];
  if (obj['mm']) return obj['mm'];
  return '';
}

export function pickText(
  values: Partial<Record<ContentLocale, string | null>>,
  locale: ContentLocale
): { text: string; lang: ContentLocale } | null {
  const order: ContentLocale[] = [locale, 'en', 'my', 'de'];
  for (const lang of order) {
    const value = values[lang];
    if (typeof value === 'string' && value.trim() !== '') {
      return { text: value, lang };
    }
  }
  return null;
}
