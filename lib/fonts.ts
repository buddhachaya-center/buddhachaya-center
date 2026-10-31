import { Inter, Playfair_Display, JetBrains_Mono, Noto_Sans_Myanmar, Noto_Serif_Myanmar } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  variable: '--font-noto-sans-myanmar',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const notoSerifMyanmar = Noto_Serif_Myanmar({
  subsets: ['myanmar'],
  variable: '--font-noto-serif-myanmar',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const fontVariables = `${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${notoSansMyanmar.variable} ${notoSerifMyanmar.variable}`;
