import { Language } from '../types';
import { biographyTranslations, IMAGE_ASSETS } from '../data';
import { motion } from 'motion/react';

interface BiographyProps {
  currentLang: Language;
}

export default function Biography({ currentLang }: BiographyProps) {
  const trans = biographyTranslations[currentLang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 sm:py-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation/Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
            {currentLang === 'my' ? 'ဦးဆောင်ဆရာတော်၏ ထေရုပ္ပတ္တိအခြေခံ' : currentLang === 'de' ? 'Unser geistiger Mentor' : 'Monastic Leadership'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Profile Card & Bio Introduction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Block: Image & Credentials card */}
          <div className="lg:col-span-4 bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 shadow-sm flex flex-col items-center">
            <div className="relative rounded-xl overflow-hidden w-full aspect-[3/4] mb-5">
              <img
                src={IMAGE_ASSETS.sayadaw}
                alt={trans.sayadawName}
                referrerPolicy="no-referrer"
                className="object-cover object-top w-full h-full shadow-sm"
              />
            </div>
            <div className="text-center w-full">
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#FAF9F5] bg-[#1E3F20] px-3 py-1 rounded-full uppercase">
                Sayadaw Ashin Kusalasami
              </span>
              <h3 className="font-display font-black text-xl text-[#1E3F20] mt-3.5 leading-tight">
                {trans.sayadawName}
              </h3>
              <p className="text-xs text-[#334155]/85 italic leading-relaxed font-semibold mt-1">
                {trans.sayadawTitle}
              </p>
            </div>
          </div>

          {/* Right Block: Essay style biography paragraphs */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display font-extrabold text-2xl text-[#1E3F20] tracking-tight">
              {currentLang === 'my' ? 'ဆရာတော်ကြီး၏ ဘဝဖြတ်သန်းမှု သမိုင်းကျဉ်း' : currentLang === 'de' ? 'Klösterlicher Werdegang' : 'Monastic Path & Spiritual Lineage'}
            </h3>
            
            {trans.fullBiography.map((p, idx) => {
              if (p.startsWith('•')) {
                return (
                  <div key={idx} className="flex items-start space-x-3 ml-2 sm:ml-4 text-[#334155] text-base leading-relaxed my-2">
                    <span className="text-[#1E3F20] font-bold text-lg leading-none shrink-0 mt-0.5">•</span>
                    <span className="flex-1">{p.substring(1).trim()}</span>
                  </div>
                );
              }
              
              if (p.includes(':') && !p.startsWith('http')) {
                const colonIndex = p.indexOf(':');
                const label = p.substring(0, colonIndex + 1);
                const value = p.substring(colonIndex + 1).trim();
                
                if (value === '') {
                  return (
                    <h4 key={idx} className="font-display font-bold text-lg text-[#1E3F20] mt-6 mb-2 pt-3 border-t border-[#E5E1D4]">
                      {label}
                    </h4>
                  );
                }

                return (
                  <p key={idx} className="text-[#334155] text-base leading-relaxed my-2.5">
                    <strong className="font-bold text-[#1E3F20]">{label}</strong> {value}
                  </p>
                );
              }

              return (
                <p key={idx} className="text-[#334155] text-base leading-relaxed my-2.5">
                  {p}
                </p>
              );
            })}


          </div>
        </div>

      </div>
    </motion.div>
  );
}
