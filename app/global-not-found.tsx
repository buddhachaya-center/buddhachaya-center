import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  title: '404 - Page not found',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="min-h-screen flex items-center justify-center bg-[#FAF9F5] px-6">
          <div className="text-center">
            <p className="text-6xl font-bold text-[#1E3A5F]">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-[#333C3E]">
              Page not found
            </h1>
            <p className="mt-2 text-[#333C3E]">
              Buddhachaya Monastery &amp; Meditation Center
            </p>
            <nav aria-label="Language" className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/mm" className="px-6 py-3 rounded bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors">
                မြန်မာ
              </Link>
              <Link href="/en" className="px-6 py-3 rounded bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors">
                English
              </Link>
              <Link href="/de" className="px-6 py-3 rounded bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors">
                Deutsch
              </Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}