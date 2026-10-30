'use client';

import { usePathname } from 'next/navigation';
import { localeLabels, LOCALE_COOKIE, type Locale } from '@/lib/i18n';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  const handleLocaleSwitch = (newLocale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const getPathForLocale = (newLocale: Locale): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    return '/' + segments.join('/');
  };

  return (
    <div className="flex gap-4 p-4 border-b border-[#E5E4E2]">
      {(['mm', 'en', 'de'] as Locale[]).map((locale) => (
        <a
          key={locale}
          href={getPathForLocale(locale)}
          onClick={() => handleLocaleSwitch(locale)}
          className={`px-3 py-1 rounded transition-colors ${
            locale === currentLocale
              ? 'bg-[#1E3A5F] text-white'
              : 'text-[#333C3E] hover:bg-[#F5F1E9]'
          }`}
        >
          {localeLabels[locale]}
        </a>
      ))}
    </div>
  );
}
