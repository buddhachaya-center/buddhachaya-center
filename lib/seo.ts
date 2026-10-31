import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';

export const SITE_URL = 'https://buddhachaya-center.vercel.app';
export const SITE_NAME = 'Buddhachaya Center';

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
