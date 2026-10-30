import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Courses from '@/components/Courses';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.courses,
  };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Courses locale={locale as Locale} />;
}
