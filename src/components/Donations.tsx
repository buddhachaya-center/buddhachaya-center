import React, { useState } from 'react';
import { Language, DonationOption } from '../types';
import { donationTranslations, donationOptions } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, Check, Copy, Share2, Award, ClipboardCheck, MessageSquarePlus, Sparkles } from 'lucide-react';

interface DonationsProps {
  currentLang: Language;
}

export default function Donations({ currentLang }: DonationsProps) {
  const trans = donationTranslations[currentLang];
  const [activeTab, setActiveTab] = useState(donationOptions[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form states for donor roll simulation
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [sadhuOpen, setSadhuOpen] = useState(false);
  const [sharedMerit, setSharedMerit] = useState<{ name: string; amount: string; message: string } | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDanaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName) return;
    
    // Inscribe on donor roll & Trigger Sadhu!
    setSharedMerit({
      name: donorName,
      amount: donorAmount || '100',
      message: donorMessage || (currentLang === 'my' ? 'သာသနာတော်တည်တံ့ပြန့်ပွားပါစေ' : 'May the Teachings endure')
    });
    setSadhuOpen(true);
  };

  const resetForm = () => {
    setDonorName('');
    setDonorAmount('');
    setDonorMessage('');
    setSadhuOpen(false);
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
            {currentLang === 'my' ? 'စေတနာအလျောက် ဓမ္မဒါနလှူဒါန်းခြင်း' : currentLang === 'de' ? 'Unterstützung der Sangha' : 'Noble Generosity'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {trans.title}
          </h2>
          <p className="text-[#334155]/80 mt-3 text-base sm:text-lg">
            {trans.subtitle}
          </p>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Top Split Layout: Left side = why support; Right side = donor roll form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Block: Purposes Checklist */}
          <div className="lg:col-span-7 bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-10 shadow-sm">
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

          {/* Right Block: Dynamic Donor Inscription Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E1D4] p-6 shadow-sm">
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 mb-4 flex items-center space-x-2">
              <MessageSquarePlus className="h-5 w-5 text-[#1E3F20]" />
              <span>
                {currentLang === 'my' ? 'အလှူရှင်ကမ္ပည်းစာ ကြေငြာရန်' : currentLang === 'de' ? 'Ehrung für Spender' : 'Inscribe Donor Roll'}
              </span>
            </h3>
            
            <p className="text-xs text-[#334155]/75 leading-relaxed mb-6">
              {currentLang === 'my'
                ? 'အောက်ပါပုံစံတွင် ကမ္ပည်းအလှူရှင်အမည်နှင့် တောင်းဆုထည့်သွင်းပေးပါ။ အဖွဲ့မှ လှူဒါန်းမှုစာရင်းတွင် ဂုဏ်ပြုဆုတောင်းပေးပါမည်။'
                : currentLang === 'de'
                  ? 'Tragen Sie Ihren Namen ein, um Ihre Widmung für das Kloster und die Sangha digital zu teilen.'
                  : 'Enter your details below to share your offering blessing message symbolically with the monastery circle.'}
            </p>

            <form onSubmit={handleDanaSubmit} className="space-y-4.5">
              <div>
                <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                  {currentLang === 'my' ? 'အလှူရှင်အမည် (မဖြစ်မနေ)' : currentLang === 'de' ? 'Name des Spenders (Pflicht)' : 'Donor Name (Required)'}
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={currentLang === 'my' ? 'ဥပမာ - ဟဲင့်စ်ဝက်ဘာ' : 'e.g. Heinz Weber'}
                  className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                    {currentLang === 'my' ? 'အလှူပမာဏ (ယူရို/ကျပ်)' : currentLang === 'de' ? 'Spendenbetrag (€)' : 'Dana Amount (€)'}
                  </label>
                  <input
                    type="number"
                    value={donorAmount}
                    onChange={(e) => setDonorAmount(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                    {currentLang === 'my' ? 'မျှဝေမည့်ဆုတောင်း' : currentLang === 'de' ? 'Kategorie' : 'Offering Class'}
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-xs sm:text-sm bg-[#FAF9F5] focus:outline-none focus:ring-1 focus:ring-[#1E3F20]">
                    <option>{currentLang === 'my' ? 'ဓမ္မပူဇာ ဒါန' : 'Dhamma Dana'}</option>
                    <option>{currentLang === 'my' ? 'ဆွမ်း၊ ကျောင်း၊ ဆေး ၄ ပါး ဒါန' : 'Sangha Requisites'}</option>
                    <option>{currentLang === 'my' ? 'ကလေးငယ်များ သင်ကြားရေးဒါန' : 'Children Education'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold tracking-wider text-[#334155] uppercase mb-1.5">
                  {currentLang === 'my' ? 'ဂုဏ်ပြုဆုတောင်းစကား' : currentLang === 'de' ? 'Widmung' : 'Blessing / Dedication'}
                </label>
                <textarea
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder={currentLang === 'my' ? 'ဥပမာ - ရိပ်သာကြီး အောင်မြင်ပြီး သတ္တဝါအပေါင်း ချမ်းသာပါစေ။' : 'e.g. May this merit bring ultimate peace to all.'}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-md border border-[#E5E1D4] text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] bg-[#FAF9F5]"
                />
              </div>

              {/* Gold Button strictly for Donations */}
              <button
                type="submit"
                className="w-full justify-center flex items-center space-x-2 rounded-md bg-[#D4AF37] hover:bg-[#C19A2E] text-slate-900 font-extrabold text-sm px-6 py-3 shadow-md transition-all duration-300 transform active:scale-98"
              >
                <HeartHandshake className="h-4.5 w-4.5 mr-1" />
                <span>{trans.ctaText}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Tabbed Payment Selector Options */}
        <div className="border-t border-[#E5E1D4] pt-16">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E3F20] text-center mb-10 tracking-tight">
            {currentLang === 'my' ? 'အလှူငွေပေးသွင်းနိုင်သော နည်းလမ်းများ' : currentLang === 'de' ? 'Zahlungsmethoden & Bankverbindung' : 'Payment Frameworks'}
          </h3>

          <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#E5E1D4] shadow-sm overflow-hidden">
            
            {/* Pay Selector Tabs */}
            <div className="flex border-b border-[#E5E1D4] overflow-x-auto bg-[#F4F1EA]/40">
              {donationOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveTab(opt.id)}
                  className={`flex-1 min-w-[130px] text-center px-4 py-4 text-xs sm:text-sm font-bold transition-all border-b-2 leading-tight ${
                    activeTab === opt.id
                      ? 'border-[#1E3F20] text-[#1E3F20] bg-white font-black'
                      : 'border-transparent text-[#334155]/70 hover:text-[#1E3F20] hover:bg-[#F4F1EA]/30'
                  }`}
                >
                  {opt.tabLabel}
                </button>
              ))}
            </div>

            {/* Selected Pay Pane */}
            <div className="p-6 sm:p-10">
              {donationOptions.map((opt) => {
                if (opt.id !== activeTab) return null;
                return (
                  <motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                    id={`pane-${opt.id}`}
                  >
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-slate-800">
                        {opt.title}
                      </h4>
                      <p className="text-sm text-[#334155]/80 mt-1.5 leading-relaxed">
                        {opt.instructions}
                      </p>
                    </div>

                    {/* Specific details rendering with simple copy support */}
                    <div className="bg-[#FAF9F5] rounded-xl border border-[#E5E1D4] p-5 space-y-4">
                      {Object.entries(opt.details).map(([label, val]) => {
                        const copyKey = `${opt.id}-${label}`;
                        const isCopied = copiedKey === copyKey;
                        return (
                          <div key={label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-[#E5E1D4]/45 last:border-b-0">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#334155]/65">
                                {label}
                              </span>
                              <p className="text-sm font-semibold text-[#1E3F20] select-all leading-tight">
                                {val}
                              </p>
                            </div>
                            
                            {/* Copy button triggers */}
                            <button
                              onClick={() => handleCopy(val, copyKey)}
                              className="self-start sm:self-center flex items-center space-x-1 px-3 py-1 rounded border border-[#E5E1D4] hover:bg-[#1E3F20] hover:text-[#FAF9F5] text-[#334155] text-xs font-mono tracking-tighter"
                              title="Copy details"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <ClipboardCheck className="h-3 w-3 mr-1" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* full-screen Buddhist "SADHU / SHARE MERITS" visual dialog on submit */}
        <AnimatePresence>
          {sadhuOpen && sharedMerit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-[#1E3F20] to-emerald-950 text-white rounded-3xl border border-[#D4AF37]/50 max-w-lg w-full p-8 text-center shadow-2xl relative overflow-hidden"
              >
                {/* Floating particle design highlights */}
                <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#D4AF37]/10 blur-2xl" />
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#D4AF37]/10 blur-2xl" />
                
                {/* Visual Sacred Ring */}
                <div className="mx-auto h-20 w-20 rounded-full border border-[#D4AF37]/45 bg-[#FAF9F5] flex items-center justify-center shadow-md mb-6 transform scale-110">
                  <HeartHandshake className="h-10 w-10 text-[#D4AF37] fill-current" />
                </div>

                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#D4AF37]">
                  {currentLang === 'my' ? 'ကုသိုလ်အမျှ မျှဝေခြင်း' : 'Merit Confirmed'}
                </span>

                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#D4AF37] tracking-tight mt-1 mb-2">
                  {currentLang === 'my' ? 'သာဓု! သာဓု! သာဓု!' : 'Sādhu, Sādhu, Sādhu!'}
                </h3>

                <p className="text-xs text-white/70 italic leading-relaxed font-semibold max-w-sm mx-auto mb-6">
                  {currentLang === 'my'
                    ? 'အမျှဝေသောကောင်းမှုကြောင့် အလှူရှင်သည် ဘဝတစ်လျှောက်လုံး ရောဂါကင်းငြိမ်းပြီး အေးမြသောတရားရိပ်အောက်ဝယ် စစ်မှန်သောငြိမ်းချမ်းရေးရရှိပါစေ။'
                    : currentLang === 'de'
                      ? 'Möge diese heilsame Gabe Ihnen tiefen inneren Frieden bringen und das heilsame Erwachen aller fühlenden Wesen nähren.'
                      : 'May this noble act of generosity nurture your inner quiet, release reactivity, and feed the happiness of all beings.'}
                </p>

                {/* Donor Receipt Card */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 text-left mb-8 space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                    <span className="opacity-75">{currentLang === 'my' ? 'အလှူရှင်အမည်:' : 'Donor Name:'}</span>
                    <strong className="text-[#D4AF37]">{sharedMerit.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 text-sm">
                    <span className="opacity-75">{currentLang === 'my' ? 'အလှူပမာဏ:' : 'Dana Amount:'}</span>
                    <strong className="text-[#D4AF37]">{sharedMerit.amount} EUR</strong>
                  </div>
                  <div className="text-xs pt-1">
                    <span className="opacity-75 block mb-1">{currentLang === 'my' ? 'ဆုတောင်းစာ:' : 'Dedication Message:'}</span>
                    <p className="italic text-white/95 leading-relaxed bg-black/10 rounded p-2.5">"{sharedMerit.message}"</p>
                  </div>
                </div>

                {/* Return button */}
                <button
                  onClick={resetForm}
                  className="w-full rounded-md bg-[#D4AF37] hover:bg-[#C19A2E] text-slate-900 font-extrabold text-sm py-3 transition-colors shadow"
                >
                  {currentLang === 'my' ? 'နတ်လူသာဓု ခေါ်ဆိုပြီးပြန်သွားမည်' : currentLang === 'de' ? 'Zurück zum Kloster' : 'Sadhu! Return to Page'}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
