import '../globals.css';
import { fontVariables } from '@/lib/fonts';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { seoDescriptions } from '@/content/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: seoDescriptions.en,
  alternates: { canonical: '/', languages: { my: '/mm', en: '/en', de: '/de', 'x-default': '/' } },
  openGraph: { siteName: SITE_NAME, type: 'website', locale: 'en_US' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
