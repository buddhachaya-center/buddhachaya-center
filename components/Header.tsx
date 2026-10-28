'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const strings = uiStrings[locale];

  const menuItems = [
    { id: 'home', href: `/${locale}`, label: strings.header.nav.home },
    { id: 'biography', href: `/${locale}/biography`, label: strings.header.nav.biography },
    { id: 'teachings', href: `/${locale}/teachings`, label: strings.header.nav.teachings },
    { id: 'courses', href: `/${locale}/courses`, label: strings.header.nav.courses },
    { id: 'monastery', href: `/${locale}/monastery`, label: strings.header.nav.monastery },
    { id: 'schedule', href: `/${locale}/schedule`, label: strings.header.nav.schedule },
    { id: 'donations', href: `/${locale}/donations`, label: strings.header.nav.donations },
    { id: 'contact', href: `/${locale}/contact`, label: strings.header.nav.contact },
  ];

  const handleTabClick = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E1D4] bg-[#FAF9F5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <Link href={`/${locale}`} className="flex items-center space-x-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#D4AF37]/40 shadow-sm overflow-hidden p-0.5">
            <img src="/src/assets/images/buddhachaya_emblem_logo.jpg" alt="Buddhachaya Monastery Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[15px] sm:text-lg font-bold tracking-tight text-[#1E3F20]">
              {strings.header.brandName}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#334155]/75">
              {strings.header.location}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                id={`nav-${item.id}`}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  item.id === 'donations' 
                    ? 'ml-2 bg-[#D4AF37]/15 text-[#8A6D1C] hover:bg-[#D4AF37]/25 font-semibold'
                    : active
                      ? 'text-[#1E3F20]'
                      : 'text-[#334155] hover:text-[#1E3F20]'
                }`}
              >
                {item.label}
                {active && item.id !== 'donations' && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#1E3F20]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Quick Donate CTA */}
          <Link
            href={`/${locale}/donations`}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded bg-[#D4AF37] hover:bg-[#C19A2E] text-white shadow-sm"
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>{strings.header.mobileDonate}</span>
          </Link>

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
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleTabClick}
                  className={`flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#1E3F20] text-[#FAF9F5]'
                      : 'text-[#334155] hover:bg-[#F4F1EA]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
