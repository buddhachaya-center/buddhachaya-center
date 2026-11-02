import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import type { Metadata } from 'next';
import { isLocale, contentSuffix, type Locale } from '@/lib/i18n';
import { getPostBySlug } from '@/lib/posts';
import { pickText } from '@/lib/t';
import PostBody from '@/components/PostBody';
import { localeAlternates } from '@/lib/seo';

export const revalidate = 300;

const loadPost = cache((slug: string) => getPostBySlug(slug, 'teaching'));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const post = await loadPost(slug);

  if (!post) {
    return {};
  }

  const c = contentSuffix[locale];
  const title = pickText(
    { my: post.title_my, en: post.title_en, de: post.title_de },
    c
  )?.text;

  return {
    title,
    alternates: localeAlternates(locale, `/teachings/${slug}`),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const post = await loadPost(slug);

  if (!post) {
    notFound();
  }

  const c = contentSuffix[locale];
  const title = pickText(
    { my: post.title_my, en: post.title_en, de: post.title_de },
    c
  );
  const content = pickText(
    { my: post.content_my, en: post.content_en, de: post.content_de },
    c
  );

  if (!title || !content) {
    notFound();
  }

  const backText =
    locale === 'mm'
      ? 'တရားဒေသနာများသို့ ပြန်သွားရန်'
      : locale === 'de'
        ? 'Zurück zu den Lehren'
        : 'Back to Teachings';

  const noticeText =
    locale === 'mm'
      ? 'ဤအကြောင်းအရာကို သင်ရွေးထားသော ဘာသာဖြင့် မရရှိနိုင်သေးပါ။ ရရှိနိုင်သော ဘာသာဖြင့် ပြထားပါသည်။'
      : locale === 'de'
        ? 'Dieser Text ist in Ihrer Sprache noch nicht verfügbar. Er wird in einer verfügbaren Sprache angezeigt.'
        : 'This text is not yet available in your language. It is shown in an available language.';

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F5]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/teachings`}
          className="inline-block text-sm font-bold text-[#1E3F20] hover:underline mb-6"
        >
          {backText}
        </Link>

        {(title.lang !== c || content.lang !== c) && (
          <div className="mb-6 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 p-4 text-sm text-[#334155]">
            {noticeText}
          </div>
        )}

        <div className="text-[11px] font-mono font-bold tracking-widest text-[#1E3F20] uppercase mb-3">
          {post.author}{' '}
          {post.published_at ? post.published_at.slice(0, 10) : ''}
        </div>

        <h1
          lang={title.lang}
          className="font-display font-black text-2xl sm:text-4xl text-[#1E3F20] leading-tight mt-3 mb-6"
        >
          {title.text}
        </h1>

        <div className="border-t border-[#E5E1D4] pt-6">
          <PostBody markdown={content.text} lang={content.lang} />
        </div>
      </div>
    </div>
  );
}
