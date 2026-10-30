import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LOCALE_COOKIE, isLocale } from '@/lib/i18n';
import LanguageChooser from '@/components/LanguageChooser';

export default async function RootPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;

  if (localeCookie && isLocale(localeCookie)) {
    redirect(`/${localeCookie}`);
  }

  return <LanguageChooser />;
}