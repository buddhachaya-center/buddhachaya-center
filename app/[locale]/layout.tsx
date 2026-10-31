import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';
import { htmlLang, isLocale, LOCALES, type Locale } from '@/lib/i18n';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fontVariables } from '@/lib/fonts';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { seoDescriptions, ogLocales } from '@/content/seo';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: seoDescriptions[locale],
    openGraph: { siteName: SITE_NAME, type: 'website', locale: ogLocales[locale] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={htmlLang[locale as Locale]} className={fontVariables}>
      <body>
        <LocaleSwitcher currentLocale={locale as Locale} />
        <Header locale={locale as Locale} />
        {children}
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
