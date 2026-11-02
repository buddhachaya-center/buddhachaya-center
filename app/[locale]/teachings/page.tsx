import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import Teachings from '@/components/Teachings';
import { localeAlternates } from '@/lib/seo';
import { getPublishedPosts, postToArticle } from '@/lib/posts';
import { contentSuffix } from '@/lib/i18n';
import type { DhammaArticle } from '@/content/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: uiStrings[locale as Locale].header.nav.teachings,
    alternates: localeAlternates(locale as Locale, '/teachings'),
  };
}

export const revalidate = 300;

export default async function TeachingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const posts = await getPublishedPosts(20, 'teaching');
  let dbArticles: DhammaArticle[] | null = null;

  if (posts && posts.length > 0) {
    const mapped = posts
      .map(post => postToArticle(post, contentSuffix[locale as Locale]))
      .filter((article): article is DhammaArticle => article !== null);
    dbArticles = mapped.length > 0 ? mapped : null;
  }

  return <Teachings locale={locale as Locale} dbArticles={dbArticles} />;
}
