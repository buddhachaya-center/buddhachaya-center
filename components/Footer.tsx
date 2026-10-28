import Link from 'next/link';
import { type Locale } from '@/lib/i18n';
import { uiStrings } from '@/content/ui';
import { Facebook, Youtube, Bookmark, Heart, MapPin } from 'lucide-react';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const strings = uiStrings[locale];

  const links = [
    { id: 'biography', href: `/${locale}/biography`, label: strings.footer.links.biography },
    { id: 'teachings', href: `/${locale}/teachings`, label: strings.footer.links.teachings },
    { id: 'courses', href: `/${locale}/courses`, label: strings.footer.links.courses },
    { id: 'monastery', href: `/${locale}/monastery`, label: strings.footer.links.monastery },
    { id: 'schedule', href: `/${locale}/schedule`, label: strings.footer.links.schedule },
    { id: 'donations', href: `/${locale}/donations`, label: strings.footer.links.donations },
  ];

  return (
    <footer className="bg-[#1E3F20] text-[#FAF9F5]/95 border-t border-[#FAF9F5]/10 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer quadrant */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FAF9F5]/10">
          
          {/* Logo brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#D4AF37]/50 shadow-md overflow-hidden p-0.5">
                <img src="/src/assets/images/buddhachaya_emblem_logo.jpg" alt="Buddhachaya Monastery Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-extrabold tracking-tight">
                  Buddhachaya Monastery & Meditation Center
                </span>
                <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest leading-none">
                  ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-[#FAF9F5]/75 leading-relaxed max-w-md text-justify font-sans">
              {strings.footer.description}
            </p>
          </div>

          {/* Quick links block */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#D4AF37] flex items-center">
              <Bookmark className="h-4 w-4 mr-1.5" />
              <span>{strings.footer.quickLinksTitle}</span>
            </h4>
            
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-[#FAF9F5]/80">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors hover:underline text-left"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social connections block */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#D4AF37] flex items-center">
              <ExternalLinkIcon className="h-4 w-4 mr-1.5" />
              <span>{strings.footer.socialChannelsTitle}</span>
            </h4>

            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/kusalasami/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Monastery Facebook Page"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              
              <a
                href="https://www.youtube.com/@kusalasami"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Monastery YouTube lectures Archive"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>

            <div className="pt-2 text-xs text-[#FAF9F5]/70 flex items-center space-x-1 font-mono">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              <a
                href="https://maps.google.com/?q=Meerholzerstra%C3%9Fe+33,+60386+Frankfurt+am+Main,+Germany"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Frankfurt am Main, Germany
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#FAF9F5]/60 font-mono gap-4">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Buddhachaya Kloster e.V. All rights preserved.</span>
          </div>

          <div className="flex items-center">
            <span>Crafted with devotion for the Triple Gem</span>
            <Heart className="h-3 w-3 text-red-400 fill-current ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
}

// Micro internal icon helper
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
