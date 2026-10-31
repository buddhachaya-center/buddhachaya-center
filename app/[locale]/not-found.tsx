'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LocaleNotFound() {
  const { locale } = useParams<{ locale: string }>();
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-6xl font-bold text-[#1E3A5F]">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-[#333C3E]">Page not found</h1>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-block px-6 py-3 rounded bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors"
        >
          Home
        </Link>
      </div>
    </main>
  );
}