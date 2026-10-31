import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { LOCALES } from '@/lib/i18n';

const sections = ['biography', 'contact', 'courses', 'donations', 'monastery', 'schedule', 'teachings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: string[] = [`${SITE_URL}/`];

  for (const locale of LOCALES) {
    urls.push(`${SITE_URL}/${locale}`);
    for (const section of sections) {
      urls.push(`${SITE_URL}/${locale}/${section}`);
    }
  }

  return urls.map((url) => ({ url }));
}
