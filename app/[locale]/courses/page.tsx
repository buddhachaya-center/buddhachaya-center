import type { Metadata } from 'next';
import { type Locale, contentSuffix } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Courses from '@/components/Courses';
import { localeAlternates } from '@/lib/seo';
import { getPublishedCourses, courseToDetail } from '@/lib/courses';
import type { CourseDetail } from '@/content/types';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.courses,
    alternates: localeAlternates(locale as Locale, '/courses'),
  };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const rows = await getPublishedCourses();
  const dbCourses = rows === null
    ? undefined
    : rows
        .map((r) => courseToDetail(r, contentSuffix[locale as Locale]))
        .filter((c): c is CourseDetail => c !== null);

  return <Courses locale={locale as Locale} dbCourses={dbCourses} />;
}
