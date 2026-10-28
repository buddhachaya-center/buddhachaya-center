import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';
import { htmlLang, isLocale, LOCALES, type Locale } from '@/lib/i18n';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Buddhachaya Center',
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
    <html lang={htmlLang[locale as Locale]}>
      <body>
        <LocaleSwitcher currentLocale={locale as Locale} />
        {children}
      </body>
    </html>
  );
}
