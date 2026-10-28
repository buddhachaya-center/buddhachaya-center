export const LOCALES = ['mm', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const htmlLang: Record<Locale, string> = {
  mm: 'my',
  en: 'en',
  de: 'de',
};

export const contentSuffix: Record<Locale, 'my' | 'en' | 'de'> = {
  mm: 'my',
  en: 'en',
  de: 'de',
};

export const localeLabels = {
  mm: 'မြန်မာ',
  en: 'English',
  de: 'Deutsch',
};

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(x: string): x is Locale {
  return LOCALES.includes(x as Locale);
}
