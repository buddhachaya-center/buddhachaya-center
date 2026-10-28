import React, { useState } from 'react';
import { Language } from '../types';
import { IMAGE_ASSETS } from '../data';
import { Globe, Menu, X, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLanguageModal?: () => void;
}

export default function Header({ currentLang, setLang, activeTab, setActiveTab, onOpenLanguageModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    try {
      localStorage.setItem('asiabuddy_language', selectedLang === 'my' ? 'mm' : selectedLang);
    } catch (e) {
      console.error(e);
    }
  };

  const menuItems = [
    { id: 'home', label: { my: 'ပင်မစာမျက်နှာ', en: 'Home', de: 'Home' } },
    { id: 'biography', label: { my: 'ဆရာတော်', en: 'Biography', de: 'Biografie' } },
    { id: 'teachings', label: { my: 'တရားတော်များ', en: 'Teachings', de: 'Lehren' } },
    { id: 'courses', label: { my: 'သင်တန်းများ', en: 'Courses', de: 'Kurse' } },
    { id: 'monastery', label: { my: 'ရိပ်သာအကြောင်း', en: 'Monastery', de: 'Kloster' } },
    { id: 'schedule', label: { my: 'အချိန်ဇယား', en: 'Schedule', de: 'Programm' } },
    { id: 'donations', label: { my: 'လှူဒါန်းရန်', en: 'Donations', de: 'Spenden' } },
    { id: 'contact', label: { my: 'ဆက်သွယ်ရန်', en: 'Contact', de: 'Kontakt' } },
  ];

  const languages: { id: Language; label: string }[] = [
    { id: 'my', label: 'မြန်မာ' },
    { id: 'en', label: 'EN' },
    { id: 'de', label: 'DE' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E1D4] bg-[#FAF9F5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex cursor-pointer items-center space-x-3" onClick={() => handleTabClick('home')}>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#D4AF37]/40 shadow-sm overflow-hidden p-0.5">
            <img src={IMAGE_ASSETS.logo} alt="Buddhachaya Monastery Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[15px] sm:text-lg font-bold tracking-tight text-[#1E3F20]">
              {currentLang === 'my' ? 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း' : currentLang === 'de' ? 'Buddhachaya Kloster & Meditationszentrum' : 'Buddhachaya Monastery & Meditation Center'}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#334155]/75">
              {currentLang === 'my' ? 'ဂျာမနီနိုင်ငံ' : 'Germany'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                id={`nav-${item.id}`}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  item.id === 'donations' 
                    ? 'ml-2 bg-[#D4AF37]/15 text-[#8A6D1C] hover:bg-[#D4AF37]/25 font-semibold'
                    : isActive
                      ? 'text-[#1E3F20]'
                      : 'text-[#334155] hover:text-[#1E3F20]'
                }`}
              >
                {item.label[currentLang]}
                {isActive && item.id !== 'donations' && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#1E3F20]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Multi-language Selector (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1.5 border-l border-[#E5E1D4] pl-4">
          <button 
            onClick={onOpenLanguageModal}
            className="p-1 text-[#334155]/70 hover:text-[#1E3F20] transition-colors"
            title="Open Language Selection Modal"
          >
            <Globe className="h-4 w-4" />
          </button>
          <div className="flex items-center space-x-1">
            {languages.map((lang, idx) => (
              <React.Fragment key={lang.id}>
                <button
                  onClick={() => handleLanguageSelect(lang.id)}
                  className={`text-[13px] font-medium transition-colors px-1.5 py-0.5 rounded ${
                    currentLang === lang.id
                      ? 'text-[#1E3F20] bg-[#F4F1EA] font-semibold'
                      : 'text-[#334155] hover:text-[#1E3F20]'
                  }`}
                >
                  {lang.label}
                </button>
                {idx < languages.length - 1 && <span className="text-[#334155]/30">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Quick Donate CTA */}
          <button
            onClick={() => handleTabClick('donations')}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded bg-[#D4AF37] hover:bg-[#C19A2E] text-white shadow-sm"
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>{currentLang === 'my' ? 'လှူဒါန်းရန်' : currentLang === 'de' ? 'Spenden' : 'Donate'}</span>
          </button>

          {/* Language icon select toggle */}
          <div className="relative">
            <button
              onClick={() => {
                if (onOpenLanguageModal) {
                  onOpenLanguageModal();
                } else {
                  const nextLangMap: Record<string, Language> = { 'my': 'en', 'en': 'de', 'de': 'my' };
                  handleLanguageSelect(nextLangMap[currentLang] || 'my');
                }
              }}
              title="Switch Language"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-[#F4F1EA] text-[#334155] border border-[#E5E1D4]"
            >
              <Globe className="h-4.5 w-4.5" />
              <span className="absolute -top-1 -right-1 text-[9px] font-extrabold bg-[#1E3F20] text-white px-1 rounded-sm">
                {currentLang.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Toggle Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#334155] hover:bg-[#F4F1EA]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#E5E1D4] bg-[#FAF9F5] overflow-hidden"
          >
            <div className="space-y-1.5 px-4 py-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#1E3F20] text-[#FAF9F5]'
                      : 'text-[#334155] hover:bg-[#F4F1EA]'
                  }`}
                >
                  {item.label[currentLang]}
                </button>
              ))}

              {/* Language Selector inside mobile menu */}
              <div className="flex items-center space-x-3 pt-4 pb-2 border-t border-[#E5E1D4] px-4">
                <Globe className="h-4 w-4 text-[#334155]/60" />
                <span className="text-xs font-semibold text-[#334155]/60 uppercase">
                  {currentLang === 'my' ? 'ဘာသာစကားပြောင်းရန်' : currentLang === 'de' ? 'Sprache wählen' : 'Select Language'}:
                </span>
                <div className="flex items-center space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setLang(lang.id)}
                      className={`px-2.5 py-1 text-xs rounded transition-all leading-tight ${
                        currentLang === lang.id
                          ? 'bg-[#1E3F20] text-[#FAF9F5] font-semibold'
                          : 'bg-[#F4F1EA] text-[#334155]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
