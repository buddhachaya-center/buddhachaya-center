'use client';

import { useState } from 'react';
import type { DhammaArticle, DhammaVideo } from '@/content/types';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { dhammaArticles, dhammaVideos } from '@/content/site';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Clock, Globe, ArrowRight, X, Video, ExternalLink } from 'lucide-react';

interface TeachingsProps {
  locale: Locale;
}

export default function Teachings({ locale }: TeachingsProps) {
  const contentLocale = contentSuffix[locale];
  const [selectedArticle, setSelectedArticle] = useState<DhammaArticle | null>(null);
  const [activeVideo, setActiveVideo] = useState<DhammaVideo | null>(null);

  // Filter articles based on language (or show matching language, or matching fallback)
  const filteredArticles = dhammaArticles.filter(art => {
    // If article translation matches active language or matches 'all'
    return art.language === contentLocale;
  });

  // Fallback: if no articles for current language, show English articles with notice
  const displayArticles = filteredArticles.length > 0 ? filteredArticles : dhammaArticles.filter(a => a.language === 'en');
  const showFallbackNotice = filteredArticles.length === 0;

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
            {contentLocale === 'my' ? 'တရားဒေသနာတော်များနှင့် ဓမ္မဆောင်းပါးများ' : contentLocale === 'de' ? 'Vorträge & Abhandlungen' : 'Dhamma Library'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {contentLocale === 'my' ? 'ဓမ္မသဘင်နှင့် သင်ကြားချက်များ' : contentLocale === 'de' ? 'Dhamma-Lehren & Schriften' : 'Teachings & Dhamma Talks'}
          </h2>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Fallback translation notice if active selection has zero specific translations */}
        {showFallbackNotice && (
          <div className="mb-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 p-4 text-sm text-[#334155] max-w-4xl mx-auto">
            <span className="font-bold">⚠️ Notice / Hinweis:</span>{' '}
            {contentLocale === 'de' 
              ? 'Dieser Inhalt ist derzeit nur auf Englisch oder Burmesisch verfügbar. Es werden englische Abhandlungen unten angezeigt.' 
              : 'This content is currently available in English / Burmese only. English essays are displayed below.'}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Essays and Articles column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-xl text-[#1E3F20] flex items-center space-x-2 border-b border-[#E5E1D4] pb-3">
              <BookOpen className="h-5 w-5" />
              <span>
                {contentLocale === 'my' ? 'ပုံနှိပ်ဆောင်းပါးများနှင့် စာပေများ' : contentLocale === 'de' ? 'Aufsätze & Aufzeichnungen' : 'Essays & Literature'}
              </span>
            </h3>

            <div className="space-y-4">
              {displayArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#F4F1EA] rounded-xl border border-[#E5E1D4] p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(art)}
                  id={`article-${art.id}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#1E3F20] uppercase">
                      {art.author}
                    </span>
                    <span className="rounded bg-[#1E3F20]/10 text-[#1E3F20] text-[9px] font-extrabold tracking-widest px-2 py-0.5 uppercase">
                      {art.language.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 hover:text-[#1E3F20] transition-colors leading-snug">
                    {art.title}
                  </h4>
                  
                  <p className="text-sm text-[#334155]/85 mt-2.5 leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#E5E1D4]/50">
                    <span className="text-[11px] font-mono text-[#334155]/60">
                      Published: {art.date}
                    </span>
                    <span className="flex items-center text-xs font-bold text-[#1E3F20] hover:underline">
                      <span>{contentLocale === 'my' ? 'အပြည့်အစုံဖတ်ရန်' : contentLocale === 'de' ? 'Weiterlesen' : 'Read Paper'}</span>
                      <ArrowRight className="h-3 ml-1.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Video Embed talks column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-xl text-[#1E3F20] flex items-center space-x-2 border-b border-[#E5E1D4] pb-3">
              <Video className="h-5 w-5" />
              <span>
                {contentLocale === 'my' ? 'တရားဗီဒီယို သင်တန်းများ' : contentLocale === 'de' ? 'Video-Aufzeichnungen' : 'Recorded Sutta Lectures'}
              </span>
            </h3>

            {/* Video Lecture Cards */}
            <div className="space-y-4">
              {dhammaVideos.map((video) => {
                const isActive = activeVideo?.id === video.id;
                const displayTitle = contentLocale === 'my' && video.titleMy
                  ? video.titleMy
                  : contentLocale === 'de' && video.titleDe
                    ? video.titleDe
                    : video.title;
                const displayDesc = contentLocale === 'my' && video.descriptionMy
                  ? video.descriptionMy
                  : contentLocale === 'de' && video.descriptionDe
                    ? video.descriptionDe
                    : video.description;

                return (
                  <div
                    key={video.id}
                    className={`rounded-xl border p-4 transition-all ${
                      isActive 
                        ? 'border-[#1E3F20] bg-[#1E3F20]/5 shadow-sm' 
                        : 'border-[#E5E1D4] bg-[#F4F1EA] hover:border-[#1E3F20]'
                    }`}
                  >
                    {/* Embedded Frame if active or simple visual thumbnail */}
                    {isActive ? (
                      <div className="space-y-2 mb-3">
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-[#E5E1D4] shadow-sm">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                            title={displayTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full border-0"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setActiveVideo(null)}
                            className="text-[11px] font-mono text-[#334155]/70 hover:text-red-700 flex items-center space-x-1"
                          >
                            <X className="h-3 w-3" />
                            <span>{contentLocale === 'my' ? 'ဗီဒီယို ပြန်ပိတ်ရန်' : contentLocale === 'de' ? 'Player schließen' : 'Close Player'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setActiveVideo(video)}
                        className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-900 border border-[#E5E1D4]/45 mb-3 group cursor-pointer"
                        title={contentLocale === 'my' ? 'တိုက်ရိုက်ဖွင့်ရန် နှိပ်ပါ' : 'Click to play'}
                      >
                        {/* Shaded covering */}
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF9F5]/90 text-[#1E3F20] shadow-md group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </div>
                        </div>
                        {/* Real YouTube thumbnail with fallback */}
                        {/* TEMP sample image fallback, replace before launch */}
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={displayTitle}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/hero_buddha_chaya_1781268127495.jpg';
                          }}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-white z-20">
                          {video.duration}
                        </div>
                      </div>
                    )}

                    <div className="px-1">
                      <h4
                        onClick={() => setActiveVideo(isActive ? null : video)}
                        className="font-display font-bold text-sm sm:text-base text-slate-800 hover:text-[#1E3F20] transition-colors leading-snug cursor-pointer"
                      >
                        {displayTitle}
                      </h4>

                      {displayDesc && (
                        <p className="text-xs text-[#334155]/80 mt-1.5 leading-relaxed line-clamp-2">
                          {displayDesc}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#334155]/60 mt-3 pt-2.5 border-t border-[#E5E1D4]/60">
                        <span className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>{video.language}</span>
                        </span>
                        
                        <a
                          href={video.youtubeUrl || `https://youtu.be/${video.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-sans font-bold text-xs text-red-700 hover:text-red-800 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5"></span>
                          <span>YouTube Link</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to YouTube channel */}
            <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E5E1D4] flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-800">
                    {contentLocale === 'my' ? 'ဆရာတော်ကြီး၏ YouTube Channel' : contentLocale === 'de' ? 'Offizieller YouTube-Kanal' : 'Official YouTube Channel'}
                  </h5>
                  <p className="text-[11px] text-[#334155]/70">@kusalasami</p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@kusalasami"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#1E3F20] hover:text-red-700 transition-colors shrink-0 ml-2"
              >
                <span>{contentLocale === 'my' ? 'ချန်နယ်သို့' : contentLocale === 'de' ? 'Kanal besuchen' : 'Visit Channel'}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Deep detail article expander Modals */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#FAF9F5] border border-[#E5E1D4] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F4F1EA] text-[#334155] hover:bg-[#1E3F20] hover:text-[#FAF9F5] transition-all"
                  title="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest text-[#1E3F20] uppercase mb-4">
                  <span>{selectedArticle.author}</span>
                  <span className="text-[#334155]/30">•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E3F20] leading-tight mb-6">
                  {selectedArticle.title}
                </h3>

                <div className="border-t border-[#E5E1D4] pt-6 text-[#334155] text-base sm:text-lg leading-relaxed whitespace-pre-line text-justify">
                  {selectedArticle.content}
                </div>

                <div className="border-t border-[#E5E1D4] mt-10 pt-6 flex items-center justify-between text-xs text-[#334155]/60 font-medium">
                  <span>Language support: {selectedArticle.language.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 rounded bg-[#1E3F20] text-white hover:bg-emerald-800 transition-colors"
                  >
                    {contentLocale === 'my' ? 'ပိတ်မည်' : contentLocale === 'de' ? 'Schließen' : 'Close Article'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
