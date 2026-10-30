import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Biography from '@/components/Biography';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.biography,
  };
}

export default async function BiographyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Biography locale={locale as Locale} />;
}
