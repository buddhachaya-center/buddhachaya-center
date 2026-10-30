'use client';

import { useRouter } from 'next/navigation';
import { localeLabels, LOCALE_COOKIE } from '@/lib/i18n';

export default function LanguageChooser() {
  const router = useRouter();

  const handleLocaleSelect = (locale: 'mm' | 'en' | 'de') => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold mb-8 text-[#333C3E]">
          Please choose your language
        </h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLocaleSelect('mm')}
            className="px-8 py-4 bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors rounded"
          >
            {localeLabels.mm}
          </button>
          <button
            onClick={() => handleLocaleSelect('en')}
            className="px-8 py-4 bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors rounded"
          >
            {localeLabels.en}
          </button>
          <button
            onClick={() => handleLocaleSelect('de')}
            className="px-8 py-4 bg-[#1E3A5F] text-white font-medium hover:bg-[#162e4d] transition-colors rounded"
          >
            {localeLabels.de}
          </button>
        </div>
      </div>
    </div>
  );
}
