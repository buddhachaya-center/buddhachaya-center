/**
 * Buddhachaya Buddhistisches Kloster & Meditationszentrum (Germany)
 * Official Website
 */

import { useState, useEffect } from 'react';
import { Language } from './types';

// Child components
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import WelcomeModal from './components/WelcomeModal';
import Biography from './components/Biography';
import Teachings from './components/Teachings';
import Courses from './components/Courses';
import Monastery from './components/Monastery';
import Schedule from './components/Schedule';
import Donations from './components/Donations';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Data resources import
import { welcomeTranslations } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, HeartHandshake, MapPin, GraduationCap } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('my');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  // Check localStorage for saved language "asiabuddy_language" on client load
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('asiabuddy_language');
      const supportedLangs = ['en', 'th', 'mm', 'my', 'de', 'fr', 'es'];
      if (savedLang && supportedLangs.includes(savedLang.toLowerCase())) {
        const code = savedLang.toLowerCase();
        const langMap: Record<string, Language> = {
          mm: 'my',
          my: 'my',
          en: 'en',
          de: 'de',
          th: 'en',
          es: 'en',
          fr: 'en',
        };
        setLang(langMap[code] || 'en');
        setShowWelcomeModal(false);
      } else {
        setShowWelcomeModal(true);
      }
    } catch (e) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleSelectLanguage = (selectedLangCode: string) => {
    const code = selectedLangCode.toLowerCase();
    const langMap: Record<string, Language> = {
      mm: 'my',
      my: 'my',
      en: 'en',
      de: 'de',
      th: 'en',
      es: 'en',
      fr: 'en',
    };
    setLang(langMap[code] || 'en');
    
    try {
      localStorage.setItem('asiabuddy_language', code === 'my' ? 'mm' : code);
    } catch (e) {
      console.error('Failed to write asiabuddy_language to localStorage:', e);
    }

    setShowWelcomeModal(false);
  };

  // Sync scroll on tab transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Quick Home Preview items
  const trans = welcomeTranslations[lang] || welcomeTranslations['en'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] selection:bg-[#1E3A5F]/15 selection:text-[#1E3A5F]">
      
      {/* Welcome & Language Selector Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onSelectLanguage={handleSelectLanguage}
        currentLang={lang}
      />

      {/* Top sticky navigation and language switcher board */}
      <Header
        currentLang={lang}
        setLang={(newLang) => {
          setLang(newLang);
          try {
            localStorage.setItem('asiabuddy_language', newLang === 'my' ? 'mm' : newLang);
          } catch (e) {
            console.error(e);
          }
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLanguageModal={() => setShowWelcomeModal(true)}
      />

      {/* Main Content Area split into Vertical Editorial Sidebar + Active Panel Frame */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Editorial Vertical Sidebar Rail (Desktop Only) */}
        <div className="hidden lg:flex lg:w-16 border-r border-[#E5E4E2] items-center justify-center shrink-0 bg-[#F4F3EF]/30 relative select-none">
          <span 
            className="rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.4em] font-mono font-bold text-[#999999]/85 text-center whitespace-nowrap"
            style={{ textRendering: 'optimizeLegibility' }}
          >
            {lang === 'my' 
              ? 'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာ — သီလ ၊ သမာဓိ ၊ ပညာ — ၂၀၂၆' 
              : lang === 'de'
                ? 'Buddhachaya Kloster e.V. — Sīla • Samādhi • Paññā — 2026'
                : 'Buddhachaya Monastery — Forest Vipassana — 2026'}
          </span>
        </div>

        {/* Dynamic active Tab panel */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Rotating Banner */}
                <Hero currentLang={lang} onNavigate={handleNavigate} />
                
                {/* Sayadaw Welcome Portrait & Card */}
                <Welcome currentLang={lang} onNavigate={handleNavigate} />

                {/* Homepage Features Bento Block */}
                <section className="py-16 bg-[#F4F1EA]/40 border-t border-b border-[#E5E1D4]">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E3F20] tracking-tight">
                        {lang === 'my' ? 'လုပ်ငန်းဆောင်ရွက်ချက်များ' : lang === 'de' ? 'Aktivitäten im Überblick' : 'Monastery Highlights'}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155]/75 mt-2">
                        {lang === 'my' ? 'တရားဒေသနာတော်များ နာယူရန်နှင့် အခြေခံကျသောအဘိဓမ္မာသင်တန်းများကို တံခါးမရှိဓားမရှိ လေ့လာနိုင်ပါသည်။' : lang === 'de' ? 'Offene Seminare, Feste und Meditationen für alle.' : 'Systematic study circles, community events, and guided insight meditations.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Feature 1 — Courses */}
                      <div className="bg-[#F4F1EA] rounded-xl p-6 border border-[#E5E1D4] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <div className="h-10 w-10 rounded-lg bg-[#1E3F20]/15 text-[#1E3F20] flex items-center justify-center mb-4">
                            <GraduationCap className="h-5.5 w-5.5" />
                          </div>
                          <h4 className="font-display font-bold text-lg text-slate-800">
                            {lang === 'my' ? 'သင်တန်းပို့ချချက်များ' : lang === 'de' ? 'Systematisches Studium' : 'Active Studies'}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#334155]/85 mt-2 leading-relaxed">
                            {lang === 'my' ? 'အဘိဓမ္မာ၊ ဝိသုဒ္ဓိမဂ်နှင့် သုတ္တန် တရားတော်များကို ဆရာတော်ကြီးကိုယ်တိုင် စနစ်တကျ သင်ကြားပို့ချပေးနေပါသည်။' : lang === 'de' ? 'Erforschen Sie die Abhandlungen des Abhidhamma und des Visuddhimagga unter fachkundiger Leitung.' : 'Explore Abhidhamma ultimate realities and Visuddhimagga purification guides directly under Sayadaw.'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigate('courses')}
                          className="mt-6 text-xs font-bold text-[#1E3F20] hover:underline text-left inline-flex items-center"
                        >
                          <span>{lang === 'my' ? 'သင်တန်းများ ကြည့်ရန် →' : lang === 'de' ? 'Kurse erkunden →' : 'Explore Courses →'}</span>
                        </button>
                      </div>

                      {/* Feature 2 — Dhamma Literature (ဓမ္မစာပေများ) */}
                      <div className="bg-[#F4F1EA] rounded-xl p-6 border border-[#E5E1D4] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <div className="h-10 w-10 rounded-lg bg-[#1E3F20]/15 text-[#1E3F20] flex items-center justify-center mb-4">
                            <BookOpen className="h-5.5 w-5.5" />
                          </div>
                          <h4 className="font-display font-bold text-lg text-slate-800">
                            {lang === 'my' ? 'ဓမ္မစာပေများ' : lang === 'de' ? 'Dhamma-Schriften' : 'Dhamma Literature'}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#334155]/85 mt-2 leading-relaxed">
                            {lang === 'my' ? 'ဓမ္မစာအုပ်များ၊ ပိဋကတ်တော်စာအုပ်များနှင့် ဓမ္မဆောင်းပါးများ' : lang === 'de' ? 'Dhamma-Bücher, Tipiṭaka-Texte und Aufsätze zur Vertiefung der Lehre.' : 'Dhamma books, Tipitaka scriptures, and articles for contemplation and study.'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigate('teachings')}
                          className="mt-6 text-xs font-bold text-[#1E3F20] hover:underline text-left inline-flex items-center"
                        >
                          <span>{lang === 'my' ? 'ဝင်ရောက်ဖတ်ရှု့ရန် →' : lang === 'de' ? 'Schriften lesen →' : 'Read & Study →'}</span>
                        </button>
                      </div>

                      {/* Feature 3 — Scheduled Gatherings */}
                      <div className="bg-[#F4F1EA] rounded-xl p-6 border border-[#E5E1D4] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <div className="h-10 w-10 rounded-lg bg-[#1E3F20]/15 text-[#1E3F20] flex items-center justify-center mb-4">
                            <Calendar className="h-5.5 w-5.5" />
                          </div>
                          <h4 className="font-display font-bold text-lg text-slate-800">
                            {lang === 'my' ? 'အပတ်စဉ် တရားဆွေးနွေးပွဲ' : lang === 'de' ? 'Gemeinsame Praxis' : 'Weekly Gatherings'}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#334155]/85 mt-2 leading-relaxed">
                            {lang === 'my' ? 'အပတ်စဉ် တနင်္ဂနွေနေ့တိုင်း တိုက်ရိုက် သတိပဋ္ဌာန်တရားပွားများခြင်းနှင့် တရားဆွေးနွေးပွဲများ ဆင်နွှဲပါ။' : lang === 'de' ? 'Jeden Sonntag angeleitete Meditation und Austausch in der Meditationshalle des Klosters.' : 'Participate in guided Vipassana, silent intervals, and interactive Dhamma talks every Sunday.'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigate('schedule')}
                          className="mt-6 text-xs font-bold text-[#1E3F20] hover:underline text-left inline-flex items-center"
                        >
                          <span>{lang === 'my' ? 'ပြက္ခဒိန်ကြည့်ရန် →' : lang === 'de' ? 'Programm & Feste →' : 'Check Program →'}</span>
                        </button>
                      </div>

                      {/* Feature 4 — Spendings / Spender Dana */}
                      <div className="bg-[#F4F1EA] rounded-xl p-6 border border-[#E5E1D4] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <div className="h-10 w-10 rounded-lg bg-[#D4AF37]/15 text-[#8A6D1C] flex items-center justify-center mb-4 border border-[#D4AF37]/20">
                            <HeartHandshake className="h-5.5 w-5.5" />
                          </div>
                          <h4 className="font-display font-bold text-lg text-slate-800">
                            {lang === 'my' ? 'လှူဒါန်းရန်' : lang === 'de' ? 'Heilsames Dāna' : 'Dhamma Dana'}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#334155]/85 mt-2 leading-relaxed">
                            {lang === 'my' ? 'သာသနာပြုကျောင်း တည်တံ့ရေးနှင့် သာသနာပြုလုပ်ငန်းများအတွက် လှူဒါန်းနိုင်ပါသည်။' : lang === 'de' ? 'Unterstützen Sie den Sangha und die Erhaltung der Meditationsräume durch Ihre Großzügigkeit.' : 'Sustain the resident monks and physical monastery gardens upkeep through your gütige contributions.'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigate('donations')}
                          className="mt-6 text-xs font-semibold text-[#8A6D1C] hover:underline text-left inline-flex items-center"
                        >
                          <span>{lang === 'my' ? 'လှူဒါန်းမှုဇယားဖတ်ရန် →' : lang === 'de' ? 'Dāna spenden →' : 'Practice Dana →'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Geo reference quick panel on homepage */}
                <section className="py-16 bg-[#FAF9F5]">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between border border-[#E5E1D4] rounded-2xl p-6 sm:p-10 bg-white shadow-sm">
                    <div className="space-y-2 mb-6 sm:mb-0">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
                        {lang === 'my' ? 'တည်နေရာ (ယာယီ)' : lang === 'de' ? 'STANDORT (VORLÄUFIG)' : 'LOCATION (TEMPORARY)'}
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E3F20] tracking-tight">
                        Meerholzerstraße 33, 60386, Frankfurt am Main, Germany
                      </h3>
                    </div>
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="flex shrink-0 items-center justify-center space-x-2 rounded-md bg-[#1E3F20] hover:bg-[#152E4D] text-white font-bold text-sm px-6 py-3.5 shadow transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{lang === 'my' ? 'လမ်းညွှန်ကြည့်ရန်' : lang === 'de' ? 'Anfahrt & Kontakt' : 'Get Location Details'}</span>
                    </button>
                  </div>
                </section>
              </motion.div>
            )}

          {activeTab === 'biography' && (
            <motion.div
              key="biography"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Biography currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'teachings' && (
            <motion.div
              key="teachings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Teachings currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Courses currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'monastery' && (
            <motion.div
              key="monastery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Monastery currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Schedule currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'donations' && (
            <motion.div
              key="donations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Donations currentLang={lang} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Contact currentLang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>

      {/* Global Bottom Footer navigation element */}
      <Footer
        currentLang={lang}
        onNavigate={handleNavigate}
        activeTab={activeTab}
      />

    </div>
  );
}

