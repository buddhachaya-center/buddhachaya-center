import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';

export const SITE_URL = 'https://buddhachaya-center.vercel.app';
export const SITE_NAME = 'Buddhachaya Center';

// While false, robots.txt blocks all crawlers. Set to true only at the launch check (P1-8), after real photos and the final domain.
export const INDEXING_ENABLED = false;

export function localeAlternates(locale: Locale, path: string = ''): NonNullable<Metadata['alternates']> {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      my: `/mm${path}`,
      en: `/en${path}`,
      de: `/de${path}`,
      'x-default': path === '' ? '/' : `/mm${path}`,
    },
  };
}
