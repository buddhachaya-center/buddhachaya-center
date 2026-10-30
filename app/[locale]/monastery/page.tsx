import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Monastery from '@/components/Monastery';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.monastery,
  };
}

export default async function MonasteryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Monastery locale={locale as Locale} />;
}
