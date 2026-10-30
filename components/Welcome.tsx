'use client';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { welcomeTranslations, IMAGE_ASSETS } from '@/content/site';
import { motion } from 'motion/react';
import Link from 'next/link';

interface WelcomeProps {
  locale: Locale;
}

export default function Welcome({ locale }: WelcomeProps) {
  const contentLocale = contentSuffix[locale];
  const trans = welcomeTranslations[contentLocale];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-2xl bg-[#F4F1EA] border border-[#E5E1D4] p-6 sm:p-10 lg:p-14 shadow-sm overflow-hidden">
          {/* Subtle background embellishment */}
          <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-[#1E3F20]/5 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Logo/Portrait Block */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#1E3F20] to-[#D4AF37] opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
                {/* TEMP sample image, replace before launch */}
                <img
                  src={IMAGE_ASSETS.sayadaw}
                  alt={trans.sayadawRole}
                  referrerPolicy="no-referrer"
                  className="relative rounded-xl border border-[#E5E1D4] shadow-md object-cover object-top h-[350px] sm:h-[420px] w-full max-w-[320px] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Content Greeting Board */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E3F20] leading-tight">
                {trans.greetingTitle}
              </h2>
              
              <div className="border-l-4 border-[#1E3F20] pl-4 sm:pl-6">
                <p className="text-[#334155] text-base sm:text-lg leading-relaxed font-normal whitespace-pre-line">
                  {trans.greetingContent}
                </p>
              </div>

              {/* Interaction Details */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={`/${locale}/biography`}
                  className="rounded-md border border-[#1E3F20] hover:bg-[#1E3F20] text-[#1E3F20] hover:text-[#FAF9F5] px-5 py-2.5 text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                  {contentLocale === 'my' ? 'ဆရာတော်၏နောက်ခံသမိုင်းဖတ်ရန်' : contentLocale === 'de' ? 'Abt-Biografie lesen' : "Read Sayadaw's Biography"}
                </Link>
                <Link
                  href={`/${locale}/monastery`}
                  className="rounded-md border border-transparent hover:bg-[#F4F1EA] text-[#334155] underline hover:no-underline px-3 py-2 text-sm font-semibold transition-all duration-200"
                >
                  {contentLocale === 'my' ? 'ရိပ်သာတည်းဆောက်ပုံလေ့လာရန် →' : contentLocale === 'de' ? 'Über das Kloster lernen →' : 'Learn About Monastery →'}
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
