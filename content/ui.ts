import type { Locale } from '@/lib/i18n';

export const uiStrings: Record<Locale, UIStrings> = {
  mm: {
    header: {
      brandName: 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း',
      location: 'ဂျာမနီနိုင်ငံ',
      nav: {
        home: 'ပင်မစာမျက်နှာ',
        biography: 'ဆရာတော်',
        teachings: 'တရားတော်များ',
        courses: 'သင်တန်းများ',
        monastery: 'ရိပ်သာအကြောင်း',
        schedule: 'အချိန်ဇယား',
        donations: 'လှူဒါန်းရန်',
        contact: 'ဆက်သွယ်ရန်',
      },
      mobileDonate: 'လှူဒါန်းရန်',
      languageSelector: 'ဘာသာစကားပြောင်းရန်',
    },
    footer: {
      quickLinksTitle: 'လျင်မြန်စွာသွားရန်',
      socialChannelsTitle: 'သာသနာရေး ချိတ်ဆက်ရန်',
      description: 'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာသည် သံဃာတော်များ သီတင်းသုံးရာ၊ သတိပဋ္ဌာန်တရားများကို ပွားများကျင့်ကြံအားထုတ်ရာနှင့် ဝါဆို၊ ကထိန် စသောသာသနာပွဲတော်များကို စုပေါင်းဆင်နွှဲရာ သာသနာ့အေးရိပ် ဖြစ်ပါသည်။',
      links: {
        biography: 'ဆရာတော်',
        teachings: 'တရားတော်များ',
        courses: 'သင်တန်းများ',
        monastery: 'ရိပ်သာ',
        schedule: 'ပြက္ခဒိန်',
        donations: 'လှူဒါန်းရန်',
      },
    },
  },
  en: {
    header: {
      brandName: 'Buddhachaya Monastery & Meditation Center',
      location: 'Germany',
      nav: {
        home: 'Home',
        biography: 'Biography',
        teachings: 'Teachings',
        courses: 'Courses',
        monastery: 'Monastery',
        schedule: 'Schedule',
        donations: 'Donations',
        contact: 'Contact',
      },
      mobileDonate: 'Donate',
      languageSelector: 'Select Language',
    },
    footer: {
      quickLinksTitle: 'Quick Links',
      socialChannelsTitle: 'Social Channels',
      description: 'Buddhachaya Buddhist Center is a registered non-profit sanctuary in Germany devoted to systematic Vipassana meditation and Pali studies. All study materials are shared free of charge.',
      links: {
        biography: 'Sayadaw Bio',
        teachings: 'Teachings',
        courses: 'Courses',
        monastery: 'Monastery',
        schedule: 'Schedule',
        donations: 'Donations',
      },
    },
  },
  de: {
    header: {
      brandName: 'Buddhachaya Kloster & Meditationszentrum',
      location: 'Germany',
      nav: {
        home: 'Home',
        biography: 'Biografie',
        teachings: 'Lehren',
        courses: 'Kurse',
        monastery: 'Kloster',
        schedule: 'Programm',
        donations: 'Spenden',
        contact: 'Kontakt',
      },
      mobileDonate: 'Spenden',
      languageSelector: 'Sprache wählen',
    },
    footer: {
      quickLinksTitle: '',
      socialChannelsTitle: '',
      description: 'Das Buddhachaya-Kloster ist ein eingetragener gemeinnütziger Verein in Deutschland, der dem Studium des Pali-Kanons und der Meditation dient. Alle Vorträge sind kostenfrei.',
      links: {
        biography: 'Sayadaw',
        teachings: 'Lehren',
        courses: 'Kurse',
        monastery: 'Kloster',
        schedule: 'Programm',
        donations: 'Spenden',
      },
    },
  },
};

export interface UIStrings {
  header: {
    brandName: string;
    location: string;
    nav: {
      home: string;
      biography: string;
      teachings: string;
      courses: string;
      monastery: string;
      schedule: string;
      donations: string;
      contact: string;
    };
    mobileDonate: string;
    languageSelector: string;
  };
  footer: {
    quickLinksTitle: string;
    socialChannelsTitle: string;
    description: string;
    links: {
      biography: string;
      teachings: string;
      courses: string;
      monastery: string;
      schedule: string;
      donations: string;
    };
  };
}
