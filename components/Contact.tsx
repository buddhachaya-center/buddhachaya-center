'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { contactTranslations } from '@/content/site';
import { contactInfo } from '@/content/contact';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Users, ExternalLink } from 'lucide-react';
import CopyButton from './CopyButton';

interface ContactProps {
  locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
  const contentLocale = contentSuffix[locale];
  const trans = contactTranslations[contentLocale];

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
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <p className="text-[#334155]/85 mt-3 text-sm sm:text-base">
            {trans.subtitle}
          </p>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Direct Contact Card */}
        <div className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8 mb-8">
          <h3 className="font-display font-bold text-lg text-[#1E3F20] mb-4">
            {trans.directTitle}
          </h3>
          <p className="text-[#334155] mb-6 text-base leading-relaxed">
            {trans.emailIntro}
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex items-start gap-3 flex-1">
                <Mail className="h-5 w-5 text-[#1E3F20] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-semibold mb-1 text-base">{trans.emailTitle}</strong>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-mono text-lg text-[#1E3F20] break-all hover:underline"
                    translate="no"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <CopyButton
                text={contactInfo.email}
                label={trans.copyText}
                copiedLabel={trans.copiedText}
                ariaLabel={`${trans.copyText} ${trans.emailTitle}`}
              />
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#1E3F20] shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="block font-semibold mb-1 text-base">{trans.phoneTitle}</strong>
                <a
                  href={contactInfo.phoneHref}
                  className="font-mono text-lg text-[#1E3F20] hover:underline"
                  translate="no"
                >
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex items-start gap-3 flex-1">
                <MapPin className="h-5 w-5 text-[#1E3F20] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-semibold mb-1 text-base">{trans.addressTitle}</strong>
                  <p className="text-[#334155] text-base leading-relaxed" translate="no">
                    {contactInfo.addressLine}
                  </p>
                </div>
              </div>
              <CopyButton
                text={contactInfo.addressLine}
                label={trans.copyText}
                copiedLabel={trans.copiedText}
                ariaLabel={`${trans.copyText} ${trans.addressTitle}`}
              />
            </div>
          </div>
        </div>

        {/* Committee Card */}
        <div className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-[#1E3F20]" />
            <h3 className="font-display font-bold text-lg text-[#1E3F20]">
              {trans.committeeTitle}
            </h3>
          </div>
          <p className="text-sm text-[#334155]/80 mb-6">
            {trans.committeeSubtitle}
          </p>

          <div className="space-y-3">
            {trans.committeeMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 text-base">
                <span className="text-[#D4AF37] text-sm">◆</span>
                <span className={contentLocale === 'my' ? 'leading-loose' : ''}>{member}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8">
          <h3 className="font-display font-bold text-lg text-[#1E3F20] mb-4">
            {trans.mapTitle}
          </h3>
          <p className="text-[#334155] mb-6 text-base leading-relaxed" translate="no">
            {contactInfo.addressLine}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={contactInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1E3F20] text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <span>{trans.mapButton}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={contactInfo.osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1E3F20] font-medium px-6 py-3 rounded-lg border border-[#E5E1D4] hover:bg-[#FAF9F5] transition-colors"
            >
              <span>{trans.osmButton}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
