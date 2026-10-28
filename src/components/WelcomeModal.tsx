import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, X } from 'lucide-react';
import { Language } from '../types';
import { IMAGE_ASSETS } from '../data';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSelectLanguage: (langCode: string) => void;
  currentLang?: Language;
}

export default function WelcomeModal({ isOpen, onClose, onSelectLanguage, currentLang }: WelcomeModalProps) {
  if (!isOpen) return null;

  const languageOptions = [
    {
      code: 'en',
      badge: <Globe className="h-5 w-5 text-[#1E3A5F]" />,
      name: 'ENGLISH',
      greeting: 'Start',
    },
    {
      code: 'mm',
      badge: <span className="font-bold text-xs text-[#1E3A5F] tracking-tight">MM</span>,
      name: 'မြန်မာ',
      greeting: 'မင်္ဂလာပါ',
    },
    {
      code: 'de',
      badge: <span className="font-bold text-xs text-[#1E3A5F] tracking-tight">DE</span>,
      name: 'DEUTSCH',
      greeting: 'Starten',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#FAF9F5] shadow-2xl border border-[#E5E4E2]"
          >
            {/* Optional Close Button if modal can be dismissed */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Top Banner — Serene Metta Blue (#1E3A5F) */}
            <div className="relative bg-[#1E3A5F] pt-8 pb-10 px-6 text-center flex flex-col items-center justify-center overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#C0A47D]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Centered Circular Badge with Official Buddhachaya Logo */}
              <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl border-2 border-[#D4AF37]/60 overflow-hidden p-1.5">
                <img
                  src={IMAGE_ASSETS.logo}
                  alt="Buddhachaya Monastery Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* "MINGALAPAR" greeting subtext directly under the badge */}
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.35em] text-white/95 uppercase">
                MINGALAPAR • မင်္ဂလာပါ
              </span>
            </div>

            {/* Middle Section: Buddha's Shade & Monastery Title Statements */}
            <div className="px-6 py-8 sm:px-10 text-center bg-[#FAF9F5] border-b border-[#E5E4E2]">
              <div className="max-w-2xl mx-auto space-y-3">
                {/* Line 1: ဘုရားရိပ်မှာ ငြိမ်းချမ်းပါစေ။ ဗုဒ္ဓအရိပ်မှာ ငြိမ်းချမ်းပါစေ။ */}
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] tracking-tight leading-snug">
                  ဘုရားရိပ်မှာ ငြိမ်းချမ်းပါစေ။ ဗုဒ္ဓအရိပ်မှာ ငြိမ်းချမ်းပါစေ။
                </h2>

                <div className="w-12 h-0.5 bg-[#C0A47D]/60 mx-auto my-4" />

                {/* Line 3: ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#1E3A5F]">
                  ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း
                </h3>

                {/* Line 4: Buddhachaya Monastery & Meditation Center */}
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#333C3E]/75 font-semibold">
                  Buddhachaya Monastery & Meditation Center
                </p>
              </div>
            </div>

            {/* Bottom Grid: Language Selector Cards */}
            <div className="p-6 sm:p-8 bg-[#F5F1E9]/40">
              <p className="text-center text-xs font-mono uppercase tracking-widest text-[#333C3E]/60 mb-5 font-semibold">
                Select Your Language / ဘာသာစကား ရွေးချယ်ပါ
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => onSelectLanguage(opt.code)}
                    className="group relative flex items-center space-x-3 rounded-2xl bg-white p-3.5 sm:p-4 border border-[#E5E4E2] shadow-sm hover:shadow-md hover:border-[#1E3A5F] hover:bg-[#FAF9F5] transition-all duration-200 text-left active:scale-[0.98]"
                  >
                    {/* Badge / Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F]/5 group-hover:bg-[#1E3A5F]/10 border border-[#1E3A5F]/10 transition-colors">
                      {opt.badge}
                    </div>

                    {/* Language Label & Subtext */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] tracking-wider truncate">
                        {opt.name}
                      </span>
                      <span className="font-serif italic text-[11px] sm:text-xs text-[#666666] truncate">
                        {opt.greeting}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
