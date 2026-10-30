'use client';

import { useEffect, useState } from 'react';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { IMAGE_ASSETS, welcomeTranslations } from '@/content/site';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const contentLocale = contentSuffix[locale];
  const trans = welcomeTranslations[contentLocale];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: IMAGE_ASSETS.hero,
      title: trans.title,
      alignment: 'center'
    },
    {
      image: IMAGE_ASSETS.monastery,
      title: contentLocale === 'my' ? 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း' : contentLocale === 'de' ? 'Buddhachaya Kloster & Meditationszentrum' : 'Buddhachaya Monastery & Meditation Center',
      alignment: 'center'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[480px] sm:h-[560px] overflow-hidden bg-[#11223A]">
      
      {/* Slide Images */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Shaded darkening mask */}
            <div className="absolute inset-0 bg-black/45 md:bg-black/35 z-10" />
            
            {/* Real Background Image */}
            {/* TEMP sample image, replace before launch */}
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 object-cover w-full h-full transition-transform duration-10000 ease-out transform scale-102"
              style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
            />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="relative z-20 flex h-full items-center justify-center text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide + locale}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {trans.subtitle && (
                <div className="inline-block rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/45 px-4 py-1 text-xs sm:text-sm font-semibold tracking-wider text-[#FAF9F5] uppercase">
                  {trans.subtitle}
                </div>
              )}
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FAF9F5] drop-shadow-md leading-tight max-w-xl sm:max-w-3xl">
                {slides[currentSlide].title}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual slide controllers */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-6">
        <button
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-[#FAF9F5] border border-[#FAF9F5]/20 hover:bg-black/40 transition-colors"
          title="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-[#FAF9F5] border border-[#FAF9F5]/20 hover:bg-black/40 transition-colors"
          title="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </section>
  );
}
