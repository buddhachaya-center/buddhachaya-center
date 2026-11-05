import type { Metadata } from 'next';
import { type Locale, contentSuffix } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Schedule from '@/components/Schedule';
import { localeAlternates } from '@/lib/seo';
import { getPublishedEvents, eventToScheduled } from '@/lib/events';
import type { ScheduledEvent } from '@/content/types';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.schedule,
    alternates: localeAlternates(locale as Locale, '/schedule'),
  };
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const rows = await getPublishedEvents();
  const dbEvents = rows === null
    ? null
    : rows
        .map((r) => eventToScheduled(r, contentSuffix[locale as Locale]))
        .filter((e): e is ScheduledEvent => e !== null);

  return <Schedule locale={locale as Locale} dbEvents={dbEvents} />;
}
