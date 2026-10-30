import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Teachings from '@/components/Teachings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.teachings,
  };
}

export default async function TeachingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Teachings locale={locale as Locale} />;
}
