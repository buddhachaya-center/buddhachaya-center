'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { donationTranslations } from '@/content/site';
import { donationBankData } from '@/content/donations';
import { donationCampaign } from '@/content/donationCampaign';
import { motion } from 'motion/react';
import { Flower2, Landmark, CalendarClock, Coins, Users, ShieldCheck, Check, HeartHandshake } from 'lucide-react';
import CopyButton from './CopyButton';

interface DonationsProps {
  locale: Locale;
}

export default function Donations({ locale }: DonationsProps) {
  const contentLocale = contentSuffix[locale];
  const trans = donationTranslations[contentLocale];
  const campaign = donationCampaign[contentLocale];

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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Hero Band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#1E3F20] to-emerald-950 border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-12 mb-12"
        >
          <div className="text-center">
            <span className={`font-display text-sm sm:text-base text-[#D4AF37] font-bold mb-4 block ${contentLocale !== 'my' ? 'uppercase tracking-widest' : ''}`}>
              {campaign.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] mt-4 mb-6 leading-tight">
              {campaign.title}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-[#D4AF37]/60" />
              <Flower2 className="h-6 w-6 text-[#D4AF37]" />
              <div className="h-px w-16 bg-[#D4AF37]/60" />
            </div>
            <p className={`text-[#FAF9F5]/90 text-base sm:text-lg ${contentLocale === 'my' ? 'leading-loose' : 'leading-relaxed'}`}>
              {campaign.intro}
            </p>
          </div>
        </motion.div>

        {/* Why Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3F20] mb-8 text-center">
            {campaign.whyTitle}
          </h3>
          <div className="space-y-6">
            {campaign.whyItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center shrink-0 bg-[#FAF9F5]">
                  {i === 0 && <Landmark className="h-6 w-6 text-[#D4AF37]" />}
                  {i === 1 && <Users className="h-6 w-6 text-[#D4AF37]" />}
                  {i === 2 && <Flower2 className="h-6 w-6 text-[#D4AF37]" />}
                </div>
                <p className={`text-base text-[#334155] ${contentLocale === 'my' ? 'leading-loose' : 'leading-relaxed'}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3F20] mb-8 text-center">
            {campaign.planTitle}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {campaign.planCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white border-t-4 border-[#D4AF37] rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  {i === 0 && <CalendarClock className="h-5 w-5 text-[#D4AF37]" />}
                  {i === 1 && <Coins className="h-5 w-5 text-[#D4AF37]" />}
                  {i === 2 && <Coins className="h-5 w-5 text-[#D4AF37]" />}
                  {i === 3 && <HeartHandshake className="h-5 w-5 text-[#D4AF37]" />}
                  <span className="text-sm font-medium text-[#334155]/80">{card.label}</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#1E3F20] mb-2">
                  {card.value}
                </p>
                {card.note && (
                  <p className="text-xs text-[#334155]/70 italic">
                    {card.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-[#334155]/70 italic text-center mt-6">
            {campaign.shareNote}
          </p>
        </motion.div>

        {/* Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-[#F4F1EA] rounded-2xl p-6 sm:p-10 border border-[#E5E1D4]">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3F20] mb-6 flex items-center">
              <ShieldCheck className="h-7 w-7 mr-3 text-[#D4AF37]" />
              {campaign.promiseTitle}
            </h3>
            <div className="space-y-4">
              {campaign.promiseItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className={`text-base text-[#334155] ${contentLocale === 'my' ? 'leading-loose' : 'leading-relaxed'}`}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bank Details Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3F20] mb-8 text-center">
            {campaign.howTitle}
          </h3>
          <div className="bg-white rounded-2xl border border-[#D4AF37] shadow-sm overflow-hidden">
            <div className="p-6 sm:p-10">
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

              {/* Reference Note Highlight Box */}
              <div className="mt-6 bg-[#F4F1EA] border-l-4 border-[#D4AF37] p-4 rounded-r-lg">
                <p className={`text-sm text-[#334155] ${contentLocale === 'my' ? 'leading-loose' : 'leading-relaxed'}`}>
                  {campaign.referenceNote}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Email */}
          <div className="text-center mt-6">
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
        </motion.div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/60" />
            <Flower2 className="h-6 w-6 text-[#D4AF37]" />
            <div className="h-px w-16 bg-[#D4AF37]/60" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E3F20] mb-4">
            {campaign.closingTitle}
          </h3>
          <p className={`text-base text-[#334155] mb-4 ${contentLocale === 'my' ? 'leading-loose' : 'leading-relaxed'}`}>
            {campaign.closing}
          </p>
          <p className="text-sm text-[#334155]/80 mb-6">
            {campaign.leaders}
          </p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-[#D4AF37]">
            {campaign.sadhu}
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
