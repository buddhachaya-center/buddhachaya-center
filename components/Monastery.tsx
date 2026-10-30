'use client';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { monasteryTranslations, IMAGE_ASSETS } from '@/content/site';
import { motion } from 'motion/react';
import { Landmark, Compass, ShieldCheck, MapPin } from 'lucide-react';

interface MonasteryProps {
  locale: Locale;
}

export default function Monastery({ locale }: MonasteryProps) {
  const contentLocale = contentSuffix[locale];
  const trans = monasteryTranslations[contentLocale];

  const galleryImages = [
    {
      src: IMAGE_ASSETS.monastery,
      title: contentLocale === 'my' ? 'ရိပ်သာပင်မကျောင်းဆောင်ကြီး' : contentLocale === 'de' ? 'Das Meditationszentrum' : 'Misty Monastery Gardens',
      desc: contentLocale === 'my' ? 'တည်ငြိမ်ဆိတ်ငြိမ်သော နှလုံးသားခိုလှုံရာ' : contentLocale === 'de' ? 'Ein friedvoller Rückzugsort' : 'A haven of complete quietude'
    },
    {
      src: IMAGE_ASSETS.hero,
      title: contentLocale === 'my' ? 'ပင်မဓမ္မသဘင်ခန်းမအဝင်ဝ' : contentLocale === 'de' ? 'Eingang zum Dhammasala' : 'Dhammasala Sanctuary Portal',
      desc: contentLocale === 'my' ? 'ဗုဒ္ဓမြတ်စွာ၏ တရားရိပ်အမြဲလွှမ်းခြုံရာ' : contentLocale === 'de' ? 'Zeitloser Segen' : 'Laden with timeless peace'
    },
    {
      src: 'https://picsum.photos/seed/monastery_path/800/600',
      title: contentLocale === 'my' ? 'သစ်တောရိပ်လမ်းလျှောက်တရားမှတ်လမ်း' : contentLocale === 'de' ? 'Wanderwege zur Gehmeditation' : 'Lush Forest Paths',
      desc: contentLocale === 'my' ? 'ခြေလှမ်းတိုင်းတွင် သတိကပ်နည်း' : contentLocale === 'de' ? 'Achtsame Gehmeditationen' : 'Every stride calibrated in mindfulness'
    },
    {
      src: IMAGE_ASSETS.sayadaw,
      title: contentLocale === 'my' ? 'တရားသင်ကြားပြသတော်မူစဉ်' : contentLocale === 'de' ? 'Geistige Unterweisungen' : 'Dhamma Class sessions',
      desc: contentLocale === 'my' ? 'ရိုသေစာ လေ့လာခြင်း' : contentLocale === 'de' ? 'Schriftstudium' : 'Direct transmissions'
    },
    {
      src: 'https://picsum.photos/seed/buddha_altar/800/600',
      title: contentLocale === 'my' ? 'ကျောင်းတွင်း ဗုဒ္ဓပလ္လင်တော်' : contentLocale === 'de' ? 'Der Hauptaltar' : 'The Shrine Altar',
      desc: contentLocale === 'my' ? 'ကြည်ညိုဖွယ် ဗုဒ္ဓရုပ်ပွားတော်' : contentLocale === 'de' ? 'Ort der Ruhe und Verehrung' : 'Luminous golden icons'
    },
    {
      src: 'https://picsum.photos/seed/buddhist_sangha/800/600',
      title: contentLocale === 'my' ? 'သာသနာ့ဝတ်ဆင်ပွဲတော်ကျင်းပုံ' : contentLocale === 'de' ? 'Klösterliches Zusammenleben' : 'Monastic Gatherings',
      desc: contentLocale === 'my' ? 'ဒါန ဆက်ကပ်လှူဒါန်းပွဲ' : contentLocale === 'de' ? 'Wohl aller Wesen' : 'In absolute cohesion'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 sm:py-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
            {contentLocale === 'my' ? 'ဗုဒ္ဓဆာယာ ဓမ္မနယ်မြေတစေ့တစောင်း' : contentLocale === 'de' ? 'Der Ort des Friedens' : 'Sanctuary Spaces'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* History essay block */}
        <div className="relative rounded-2xl bg-[#F4F1EA] border border-[#E5E1D4] px-6 py-10 sm:p-12 mb-16 overflow-hidden">
          {/* Decorative left-rail mask */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#1E3F20]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex items-center space-x-4">
              <div className="h-14 w-14 rounded-full bg-[#1E3F20]/15 flex items-center justify-center shrink-0">
                <Landmark className="h-7 w-7 text-[#1E3F20]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#1E3F20]">
                  {trans.historyTitle}
                </h3>
                <p className="text-xs font-mono text-[#334155]/60 mt-0.5">
                  Germany
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-5">
              {trans.historyContent.map((item, idx) => (
                <p key={idx} className="text-[#334155] text-base leading-relaxed text-justify">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Grid specifications: features and ground checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-[#1E3F20] mb-6 tracking-tight flex items-center">
              <Compass className="h-6 w-6 mr-2 mt-0.5" />
              <span>{trans.facilitiesTitle}</span>
            </h3>
            
            <div className="space-y-4">
              {trans.facilities.map((fac, i) => (
                <div key={i} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-[#1E3F20]/10 flex items-center justify-center shrink-0 mt-0.5 mr-3.5">
                    <ShieldCheck className="h-4 w-4 text-[#1E3F20]" />
                  </span>
                  <p className="text-[#334155] text-sm sm:text-base leading-relaxed">
                    {fac}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E5E1D4] shadow-md aspect-video relative group">
            {/* TEMP sample image, replace before launch */}
            <img
              src={IMAGE_ASSETS.monastery}
              alt="Monastery landscape view"
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full transform transition-transform duration-10000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 flex items-end p-6">
              <div className="flex items-center text-white space-x-2">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-mono text-xs tracking-wider uppercase font-semibold">
                  {contentLocale === 'my' ? 'ဗုဒ္ဓဆာယာ ကျောင်းတိုက်ဝင်း' : ' Kloster Buddhachaya, Germany'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Photo Gallery Section */}
        <div className="border-t border-[#E5E1D4] pt-16">
          <h3 className="font-display font-extrabold text-2xl text-slate-800 text-center mb-10 tracking-tight">
            {contentLocale === 'my' ? 'ကျောင်းတိုက်မြင်ကွင်း ဓါတ်ပုံများ' : contentLocale === 'de' ? 'Impressionen aus dem Kloster' : 'Monastery Life Photo Gallery'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="bg-[#F4F1EA] rounded-xl border border-[#E5E1D4] p-3 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="rounded-lg overflow-hidden h-48 bg-slate-200 aspect-[4/3] relative">
                  {/* TEMP sample image, replace before launch */}
                  <img
                    src={img.src}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="object-cover object-top w-full h-full hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3.5 px-1 pb-1">
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-800 leading-tight">
                    {img.title}
                  </h4>
                  <p className="text-xs text-[#334155]/70 mt-1 leading-snug">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
