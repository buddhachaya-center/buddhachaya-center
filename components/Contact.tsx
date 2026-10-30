'use client';

import React, { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { contactTranslations } from '@/content/site';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Compass, Send, CheckCircle, Users, ExternalLink, Copy, Check } from 'lucide-react';

interface ContactProps {
  locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
  const contentLocale = contentSuffix[locale];
  const trans = contactTranslations[contentLocale];

  // Forms states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Map state
  const [mapMode, setMapMode] = useState<'map' | 'satellite' | 'osm'>('map');
  const [copied, setCopied] = useState(false);

  const addressText = 'Meerholzerstraße 33, 60386, Frankfurt am Main';

  const copyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
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
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <p className="text-[#334155]/85 mt-3 text-sm sm:text-base">
            {trans.subtitle}
          </p>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Main interactive grid splitting directions VS inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* LEFT: Contact endpoints & Trustees list */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8 space-y-5">
              <h3 className="font-display font-extrabold text-lg text-[#1E3F20] uppercase tracking-wide flex items-center">
                <Compass className="h-5 w-5 mr-2" />
                <span>{contentLocale === 'my' ? 'တိုက်ရိုက်ဆက်သွယ်ရန်' : contentLocale === 'de' ? 'Klösterliche Adresse' : 'Direct Contacts'}</span>
              </h3>

              <div className="space-y-4 text-sm text-[#334155]">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#1E3F20] mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-0.5">{trans.addressTitle}</strong>
                    <span className="leading-relaxed text-[#334155]/90">
                      Meerholzerstraße 33, 60386, Frankfurt am Main, Germany
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#1E3F20] mr-3 shrink-0" />
                  <div>
                    <strong className="block font-semibold mb-0.5">{trans.phoneTitle}</strong>
                    <a
                      href="tel:+4915214489565"
                      className="hover:underline text-[#1E3F20] font-mono font-medium"
                    >
                      +49 152 14489565
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#1E3F20] mr-3 shrink-0" />
                  <div>
                    <strong className="block font-semibold mb-0.5">{trans.emailTitle}</strong>
                    <a
                      href="mailto:Kusalasami@gmail.com"
                      className="hover:underline text-[#1E3F20] font-mono"
                    >
                      Kusalasami@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support and Trustee Councils roster */}
            <div className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8">
              <h3 className="font-display font-extrabold text-sm text-[#1E3F20] uppercase tracking-wide mb-5 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{trans.committeeTitle}</span>
              </h3>

              <div className="space-y-3.5">
                {trans.committeeMembers.map((mem, i) => (
                  <div key={i} className="flex justify-between items-center text-xs sm:text-sm pb-2.5 border-b border-[#E5E1D4]/50 last:border-0 last:pb-0">
                    <span className="font-semibold text-slate-800">{mem.name}</span>
                    <span className="text-[#334155]/70 italic text-[11px] font-medium">{mem.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Active Mail Sender Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E1D4] p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                        {trans.formName}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Daw Evelyn"
                        className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                        {trans.formEmail}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. evelyn@gmail.com"
                        className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                      {trans.formMessage}
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={contentLocale === 'my' ? 'မွေးမြူလိုသည့်အကြောင်းအရာ' : 'Your brief query, retreat booking question or greeting...'}
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 rounded-md bg-[#1E3F20] text-white font-bold text-sm px-6 py-3 hover:bg-emerald-800 transition-colors shadow shadow-emerald-900/5 cursor-pointer"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    <span>{trans.formSubmit}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2 shadow-sm">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800">
                    {contentLocale === 'my' ? 'ပေးပို့မှု ပြီးမြောက်ပါသည်' : contentLocale === 'de' ? 'Nachricht erfolgreich gesendet' : 'Message Sent Successfully'}
                  </h3>
                  
                  <p className="text-sm text-[#334155] max-w-sm leading-relaxed mx-auto">
                    {trans.formSuccess}
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-5 py-2 hover:bg-[#F4F1EA] text-[#334155] font-semibold text-xs border border-[#E5E1D4] rounded-md transition-colors mt-6"
                  >
                    {contentLocale === 'my' ? 'အသစ်ပြန်ရေးရန်' : 'Write Another Message'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Embedded Google Maps container - replaced with link button per requirements */}
        <div className="border-t border-[#E5E1D4] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="font-display font-extrabold text-[#1E3F20] tracking-tight text-xl sm:text-2xl mb-2">
              {contentLocale === 'my' ? 'ဂြိုလ်တုလမ်းညွှန် မြေပုံညွှန်း' : contentLocale === 'de' ? 'Anfahrtskarte & Geoposition' : 'Map Guidance & Location Embed'}
            </h3>
            <p className="text-xs sm:text-sm text-[#334155]/85 font-semibold">
              Meerholzerstraße 33, 60386, Frankfurt am Main
            </p>
          </div>

          {/* Copy Address Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1E3F20] hover:text-emerald-900 bg-white border border-[#E5E1D4] px-3 py-1.5 rounded-md shadow-xs hover:bg-[#FAF9F5] transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>
                {copied
                  ? (contentLocale === 'my' ? 'လိပ်စာကူးယူပြီးပါပြီ' : contentLocale === 'de' ? 'Kopiert!' : 'Copied!')
                  : (contentLocale === 'my' ? 'လိပ်စာကူးယူရန်' : contentLocale === 'de' ? 'Adresse kopieren' : 'Copy Address')}
              </span>
            </button>
          </div>

          {/* Google Maps iframe replaced with link button per requirements */}
          <div className="rounded-2xl overflow-hidden border border-[#E5E1D4] shadow-md aspect-[21/9] min-h-[320px] w-full relative bg-slate-100 flex items-center justify-center">
            <a
              href="https://maps.google.com/?q=50.1338572,8.7596068+(Meerholzerstra%C3%9Fe+33,+60386+Frankfurt+am+Main)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#1E3F20] text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors"
            >
              <MapPin className="h-5 w-5" />
              <span>{contentLocale === 'my' ? 'Google Maps တွင်တိုက်ရိုက်လမ်းညွှန်ရှာရန်' : contentLocale === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
