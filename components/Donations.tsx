'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { donationTranslations } from '@/content/site';
import { donationBankData } from '@/content/donations';
import { motion } from 'motion/react';
import { HeartHandshake } from 'lucide-react';
import CopyButton from './CopyButton';

interface DonationsProps {
  locale: Locale;
}

export default function Donations({ locale }: DonationsProps) {
  const contentLocale = contentSuffix[locale];
  const trans = donationTranslations[contentLocale];

  // Helper function to format IBAN with spaces every 4 characters
  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})(?=.)/g, '$1 ').trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 sm:py-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
            {contentLocale === 'my' ? 'စေတနာအလျောက် ဓမ္မဒါနလှူဒါန်းခြင်း' : contentLocale === 'de' ? 'Unterstützung der Sangha' : 'Noble Generosity'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <p className="text-[#334155]/80 mt-3 text-base sm:text-lg">
            {trans.subtitle}
          </p>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Purposes Block */}
        <div className="max-w-4xl mx-auto bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-10 shadow-sm mb-12">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E3F20] mb-6 flex items-center">
            <HeartHandshake className="h-6 w-6 mr-2 mt-0.5" />
            <span>{trans.purposeTitle}</span>
          </h3>

          <div className="space-y-4">
            {trans.purposes.map((pur, i) => (
              <div key={i} className="flex items-start">
                <span className="h-5.5 w-5.5 rounded-full bg-[#1E3F20]/10 flex items-center justify-center shrink-0 mt-0.5 mr-3.5">
                  <span className="h-2 w-2 rounded-full bg-[#1E3F20]" />
                </span>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {pur}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E1D4]/60 mt-8 pt-6">
            <p className="text-sm text-[#1E3F20] font-normal italic leading-relaxed">
              {trans.gratitudeMessage}
            </p>
          </div>
        </div>

        {/* Bank Details Block */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#E5E1D4] shadow-sm overflow-hidden mb-12">
          <div className="p-6 sm:p-10">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E3F20] mb-8">
              {contentLocale === 'my' ? 'ဘဏ်အကောင့်အသေးစိတ်' : contentLocale === 'de' ? 'Bankverbindung' : 'Bank Account Details'}
            </h3>

            <div className="bg-[#FAF9F5] rounded-xl border border-[#E5E1D4] p-5 space-y-5">
              {/* Account Holder */}
              <div className="pb-4 border-b border-[#E5E1D4]/45">
                <span className="text-sm font-medium text-[#334155]/80 block mb-1">
                  {trans.accountHolderLabel}
                </span>
                <p className="text-base font-semibold text-[#1E3F20] leading-tight" translate="no">
                  {donationBankData.accountHolder}
                </p>
              </div>

              {/* IBAN with Copy Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E5E1D4]/45">
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#334155]/80 block mb-1">
                    {trans.ibanLabel}
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-[#1E3F20] leading-tight font-mono" translate="no">
                    {formatIban(donationBankData.iban)}
                  </p>
                </div>
                <CopyButton
                  text={donationBankData.iban}
                  label={trans.copyText}
                  copiedLabel={trans.copiedText}
                  ariaLabel={`${trans.copyText} ${trans.ibanLabel}`}
                />
              </div>

              {/* BIC with Copy Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E5E1D4]/45">
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#334155]/80 block mb-1">
                    {trans.bicLabel}
                  </span>
                  <p className="text-base font-semibold text-[#1E3F20] leading-tight font-mono" translate="no">
                    {donationBankData.bic}
                  </p>
                </div>
                <CopyButton
                  text={donationBankData.bic}
                  label={trans.copyText}
                  copiedLabel={trans.copiedText}
                  ariaLabel={`${trans.copyText} ${trans.bicLabel}`}
                />
              </div>

              {/* Reference with Copy Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#334155]/80 block mb-1">
                    {trans.referenceLabel}
                  </span>
                  <p className="text-base font-semibold text-[#1E3F20] leading-tight" translate="no">
                    {donationBankData.reference}
                  </p>
                </div>
                <CopyButton
                  text={donationBankData.reference}
                  label={trans.copyText}
                  copiedLabel={trans.copiedText}
                  ariaLabel={`${trans.copyText} ${trans.referenceLabel}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Email */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base text-[#334155]">
            {trans.contactQuestion}:{' '}
            <a
              href={`mailto:${donationBankData.contactEmail}`}
              className="text-[#1E3F20] font-semibold hover:underline"
              translate="no"
            >
              {donationBankData.contactEmail}
            </a>
          </p>
        </div>

      </div>
    </motion.div>
  );
}
