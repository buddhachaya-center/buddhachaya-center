import type { ContentLocale } from './types';
import type {
  WelcomeData,
  BiographyData,
  DhammaArticle,
  DhammaVideo,
  CourseDetail,
  MonasteryDetail,
  ScheduledEvent,
  ContactData,
  DonationOption,
  DonationData
} from './types';

// Image paths
export const IMAGE_ASSETS = {
  hero: '/src/assets/images/hero_buddha_chaya_1781268127495.jpg',
  sayadaw: '/src/assets/images/buddhachaya_official_logo_1786274550066.jpg',
  monastery: '/src/assets/images/monastery_grounds_1781268160420.jpg',
  logo: '/src/assets/images/buddhachaya_emblem_logo.jpg'
};

export const welcomeTranslations: Record<ContentLocale, WelcomeData> = {
  my: {
    title: 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်း',
    subtitle: 'ဘုရားရိပ်မှာ ငြိမ်းချမ်းပါစေ။ ဗုဒ္ဓအရိပ်မှာ ငြိမ်းချမ်းပါစေ။',
    tagline: '',
    greetingTitle: 'ကြိုဆိုနှုတ်ခွန်းဆက်လွှာ',
    greetingContent: 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်းကို ဆရာတော် အရှင်ကုသလသာမိ ဦးစီးတည်ထောင်၍ လမ်းညွှန်ပြသလျက် ရှိပါသည်။ "ဗုဒ္ဓဆာယာ" ဆိုသည်မှာ မြတ်စွာဘုရား၏ အေးမြသော အရိပ်အာဝါသဟု အဓိပ္ပာယ်ရပါသည်။ ဤဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာသည် မြတ်စွာဘုရား၏ တရားတော်များကို သင်ယူလေ့လာရန်နှင့် ပျော်ရွှင်အေးချမ်းစွာ နေထိုင်နိုင်ရန်အတွက် လက်တွေ့ကျင့်ကြံအားထုတ်နိုင်သော ငြိမ်းချမ်းသော သာသနာ့နယ်မြေတစ်ခု ဖြစ်ပါသည်။ ဤရိပ်သာတွင် အဘိဓမ္မာ၊ ဝိသုဒ္ဓိမဂ်နှင့် သုတ္တန်တရားတော်များကို လေ့လာသင်ယူနိုင်ပြီး လက်တွေ့ သတိပဋ္ဌာန်တရားများကို ပွားများအားထုတ်နိုင်ပါသည်။ ဗုဒ္ဓဘာသာကို စိတ်ပါဝင်စားသူ မည်သူမဆို လာရောက်လေ့လာရန်နှင့် တရားဓမ္မများကို အတူတကွ ပွားများအားထုတ်ရန် နွေးထွေးစွာ ဖိတ်ခေါ်အပ်ပါသည်။',
    sayadawRole: 'အရှင်ကုသလသာမိ (ဦးဆောင်ဆရာတော်)'
  },
  en: {
    title: 'Buddhachaya Monastery & Meditation Center',
    subtitle: 'May the Buddha\'s serene shade bring you eternal peace.',
    tagline: 'Discover true inner peace and harmony under the cooling shade of the Buddha\'s timeless teachings.',
    greetingTitle: 'Welcome Message',
    greetingContent: 'The Buddhachaya Monastery & Meditation Center was established and is guided by the Presiding Sayadaw Ashin Kusalasami. The name "Buddhachaya" signifies the peaceful and cooling shade of the Buddha. This center serves as a sanctuary for learning and practicing the Buddha\'s teachings on how to live life with peace and genuine happiness. Here, you can study Abhidhamma, Visuddhimagga, and Sutta teachings systematically and practice Satipatthana meditation. We warmly welcome everyone interested in Buddhism and mindfulness meditation to visit our monastery and practice together.',
    sayadawRole: 'Ashin Kusalasami (Presiding Sayadaw)'
  },
  de: {
    title: 'Buddhachaya Meditationszentrum',
    subtitle: 'Möge der friedvolle Schatten des Buddha Ihnen ewigen Frieden bringen.',
    tagline: 'Entdecken Sie wahren inneren Frieden und Harmonie im kühlenden Schatten der zeitlosen Lehren des Buddha.',
    greetingTitle: 'Willkommensgruß',
    greetingContent: 'Das Buddhachaya-Kloster und Meditationszentrum wurde vom leitenden Sayadaw Ashin Kusalasami gegründet und steht unter seiner Leitung. Der Name "Buddhachaya" bedeutet "der kühle und friedliche Schatten des Buddha". Dieses Zentrum dient als Zufluchtsort, um die Lehren des Buddha zu erlernen und zu praktizieren, um ein Leben in tiefem Frieden und Glück zu führen. Hier können Sie Abhidhamma, Visuddhimagga und Sutta-Lehren studieren sowie Satipatthana-Meditation praktizieren. Jeder, der sich für Buddhismus interessiert, ist herzlich eingeladen, unser Kloster zu besuchen und gemeinsam zu praktizieren.',
    sayadawRole: 'Ashin Kusalasami (Leitender Sayadaw)'
  }
};

export const biographyTranslations: Record<ContentLocale, BiographyData> = {
  my: {
    title: 'ဆရာတော်ကြီး၏ အတ္ထုပ္ပတ္တိ',
    sayadawName: 'အရှင်ကုသလသာမိ',
    sayadawTitle: 'သာသနဓဇဓမ္မာစရိယ၊ B.A. (ဗုဒ္ဓဓမ္မ)၊ M.A. (Kelaniya University)',
    fullBiography: [
      'အမည်: Venerable Kusalasami',
      'ပညာအရည်အချင်းများ: သာသနဓဇဓမ္မာစရိယ (မြန်မာနိုင်ငံ၏ ပရိယတ္တိစာပေဆိုင်ရာ အမြင့်ဆုံးဘွဲ့)၊ သာသနတက္ကသီလ ဓမ္မာစရိယ ( B.A. ဗုဒ္ဓဓမ္မ)၊ M.A. (Kelaniya University, Sri Lanka)',
      'ကျွမ်းကျင်သည့် နယ်ပယ်များ: ဗုဒ္ဓဘာသာ၊ ဗုဒ္ဓဒေသိယတ္ထဗေဒ၊ ဗုဒ္ဓစာပေနှင့် မြန်မာ့ဗုဒ္ဓဘာသာ၊ ဗုဒ္ဓဘာသာ ကမ္မဋ္ဌာန်းတရား (ထေရဝါဒနှင့် မြန်မာ့ရိုးရာနည်းစနစ်)',
      'အတွေ့အကြုံများ:',
      '• ၁၉၉၄ ခုနှစ်မှစ၍ ဘုန်းတော်ကြီးကျောင်း အမျိုးမျိုး၊ နိုင်ငံတော် ပရိယတ္တိသာသနာ့ တက္ကသိုလ်နှင့် Kelaniya University တို့တွင် ဗုဒ္ဓစာပေများကို သင်ယူဆည်းပူးခဲ့သည်။',
      '• မြန်မာတစ်နိုင်ငံလုံး၌ ကလေးဗဟိုပြုသင်ကြားရေးစနစ် (CCA) တိုးတက်ပြန့်ပွားရေးအတွက် ဓမ္မစကူးလ်ဖောင်ဒေးရှင်းကို ပူးတွဲတည်ထောင်ခဲ့ပြီး အထွေထွေအတွင်းရေးမှူးအဖြစ် ဆောင်ရွက်ခဲ့သည်။ (၂၀၁၂ – ၂၀၁၃)',
      '• မလေးရှားနိုင်ငံ၊ ပီနန်းမြို့ရှိ Dhammikarama Myanmar Temple တွင် တရုတ်နှင့် မြန်မာ တပည့်ဒါယကာ၊ ဒါယိကာမများအား တရားကမ္မဋ္ဌာန်း ပြသညွှန်ပြခဲ့သည်။ (၂၀၁၀ – ၂၀၁၁)',
      'ထုတ်ဝေခဲ့သည့် စာအုပ်များ: မြန်မာဘာသာဖြင့် စာအုပ် (၅) အုပ်နှင့် သုတေသန ဆောင်းပါးများစွာ',
      'လက်ရှိဆောင်ရွက်ချက်များ:',
      '• Goethe University Frankfurt (ဂျာမနီနိုင်ငံ)၊ အရှေ့တောင်အာရှ လေ့လာရေးဌာနတွင် နည်းပြဆရာအဖြစ် ဆောင်ရွက်လျက်ရှိသည်။',
      '• Myanmar Buddhist Center (ဂျာမနီနိုင်ငံ) ၏ ကျောင်းထိုင်ဆရာတော်',
      '• Dhammachaya Myanmar Buddhist Center (ဒိန်းမတ်နိုင်ငံ) ၏ တည်ထောင်သူနှင့် သဘာပတိ',
      '• မြန်မာလူမျိုးများနှင့် ဥရောပတိုက်သားများအား တရားကမ္မဋ္ဌာန်း ပြသညွှန်ပြခြင်းနှင့် ဗုဒ္ဓဓမ္မ သင်ကြားပေးခြင်း',
      '• နယ်သာလန်၊ ဒိန်းမတ်၊ ဩစတြီးယား၊ နော်ဝေး၊ ဂျာမနီ အစရှိသော ဥရောပနိုင်ငံများမှ သင်တန်းသားများအတွက် Zoom မှတစ်ဆင့် အဘိဓမ္မာ၊ ပါဠိနှင့် ဝိသုဒ္ဓိမဂ် သင်တန်းများကို ပို့ချပေးလျက်ရှိသည်။'
    ]
  },
  en: {
    title: 'Biography of the Sayadaw',
    sayadawName: 'Ashin Kusalasami',
    sayadawTitle: 'Sasanadhaja Dhammacariya, B.A. (Buddha Dhamma), M.A. (Kelaniya University)',
    fullBiography: [
      'Name: Venerable Kusalasami',
      'Academic & Monastic Qualifications: Sasanadhaja Dhammacariya (Myanmar\'s highest monastic degree in Pariyatti scripture), Sasanatakkasila Dhammacariya (B.A. Buddha Dhamma), M.A. (Kelaniya University, Sri Lanka)',
      'Areas of Expertise: Buddhism, Buddhist Hermeneutics, Buddhist Literature & Myanmar Buddhism, Buddhist Meditation (Theravada & Traditional Myanmar Systems)',
      'Experience & Background:',
      '• Studied and researched Buddhist scriptures at various monasteries, the State Pariyatti Sasana University, and Kelaniya University since 1994.',
      '• Co-founded the Dhamma School Foundation and served as General Secretary to promote Child-Centered Approach (CCA) education across Myanmar (2012–2013).',
      '• Instructed meditation to Chinese and Myanmar devotees at Dhammikarama Myanmar Temple in Penang, Malaysia (2010–2011).',
      'Publications: 5 books published in Myanmar language and numerous research articles.',
      'Current Roles & Activities:',
      '• Lecturer/Instructor at Goethe University Frankfurt (Germany), Department of Southeast Asian Studies.',
      '• Presiding Monk / Abbot of Myanmar Buddhist Center (Germany).',
      '• Founder and Chairman of Dhammachaya Myanmar Buddhist Center (Denmark).',
      '• Teaching Buddha Dhamma and guiding meditation for both Myanmar communities and European practitioners.',
      '• Conducting online Abhidhamma, Pali, and Visuddhimagga courses via Zoom for students across European countries including the Netherlands, Denmark, Austria, Norway, and Germany.'
    ]
  },
  de: {
    title: 'Biografie des Sayadaw',
    sayadawName: 'Ashin Kusalasami',
    sayadawTitle: 'Sasanadhaja Dhammacariya, B.A. (Buddha Dhamma), M.A. (Kelaniya Universität)',
    fullBiography: [
      'Name: Ehrwürdiger Kusalasami',
      'Akademische Qualifikationen: Sasanadhaja Dhammacariya (Myanmars höchste klösterliche Auszeichnung in Pariyatti-Schriften), Sasanatakkasila Dhammacariya (B.A. Buddha Dhamma), M.A. (Kelaniya Universität, Sri Lanka)',
      'Fachgebiete: Buddhismus, Buddhistische Hermeneutik, Buddhistische Literatur & Myanmar-Buddhismus, Buddhistische Meditation (Theravada & Traditionelle Myanmar-Methoden)',
      'Erfahrungen & Hintergrund:',
      '• Studium und Erforschung buddhistischer Schriften an verschiedenen Klöstern, der staatlichen Pariyatti Sasana Universität und der Kelaniya Universität seit 1994.',
      '• Mitbegründer der Dhamma School Foundation und Generalsekretär zur Förderung der kindzentrierten Pädagogik (CCA) in ganz Myanmar (2012–2013).',
      '• Meditationslehrer für chinesische und burmesische Anhänger im Dhammikarama Myanmar Tempel in Penang, Malaysia (2010–2011).',
      'Veröffentlichungen: 5 Bücher in myanmarischer Sprache und zahlreiche Forschungsartikel.',
      'Derzeitige Aktivitäten & Positionen:',
      '• Dozent am Institut für Südostasienwissenschaften der Goethe-Universität Frankfurt (Deutschland).',
      '• Abt / Leitender Mönch des Myanmar Buddhist Center (Deutschland).',
      '• Gründer und Vorsitzender des Dhammachaya Myanmar Buddhist Center (Dänemark).',
      '• Unterweisung in Buddha-Dhamma und Anleitung zur Meditation für die myanmarische Gemeinschaft und europäische Praktizierende.',
      '• Durchführung von Online-Kursen für Abhidhamma, Pali und Visuddhimagga via Zoom für Studierende in europäischen Ländern wie den Niederlanden, Dänemark, Österreich, Norwegen und Deutschland.'
    ]
  }
};

export const dhammaArticles: DhammaArticle[] = [
  {
    id: 'art-1',
    title: 'The Importance of Mindfulness in Daily Life',
    excerpt: 'How the systematic cultivation of Satipatthana transforms raw reactiveness into clear, compassionate awareness in modern hectic environments.',
    content: 'Mindfulness (Sati) is not merely a practice reserved for formal meditation cushions. Satipatthana—the establishing of mindfulness—is a continuous tool to witness the mind and body with clarity. When we observe daily states cleanly, without grasping or repulsion, we break the loop of reactive habits and cultivate true, stable peace.',
    author: 'Venerable Sayadaw Ashin Kusalasami',
    date: '2026-05-15',
    language: 'en'
  },
  {
    id: 'art-1-de',
    title: 'Die Bedeutung der Achtsamkeit im täglichen Leben',
    excerpt: 'Wie die systematische Kultivierung von Satipatthāna die alltägliche Reaktionsfähigkeit in eine klare, mitfühlende Wahrnehmung verwandelt.',
    content: 'Achtsamkeit (Sati) ist mehr als eine Übung auf dem Meditationskissen. Satipatthāna—das Verankern der Achtsamkeit—ist ein beständiges Werkzeug, u.v.m. Wenn wir die Phänomene des täglichen Lebens ohne Gier und Hass beobachten, befreien wir uns von unseren Mustern und errichten eine stabile Säule des inneren Friedens.',
    author: 'Sayadaw Ashin Kusalasami',
    date: '2026-05-15',
    language: 'de'
  },
  {
    id: 'art-1-my',
    title: 'နေ့စဉ်ဘဝတွင် သတိပဋ္ဌာန်၏ အရေးပါပုံ',
    excerpt: 'နေ့စဉ်ကြုံတွေ့ရသမျှ လှုပ်ရှားရုန်းကန်မှုများကြားတွင် လောကဓာတ်တို့၏ ဖြစ်ပျက်မှုကို သတိဖြင့် သိရှိနေထိုင်နည်း လမ်းညွှန်ချက်။',
    content: 'သတိပဋ္ဌာန်ဆိုသည်မှာ တရားစခန်းဝင်မှ ပွားများရမည့်အရာ မဟုတ်ဘဲ၊ လမ်းလျှောက်နေစဉ်၊ စကားပြောနေစဉ် သို့မဟုတ် အလုပ်လုပ်နေစဉ်တွင်ပင် စိတ်၏ အခြေအနေနှင့် ရုပ်၏ လှုပ်ရှားမှုကို သတိကပ်မိစေခြင်း ဖြစ်ပါသည်။ သတိတရား တည်ငြိမ်လာသောအခါ ဒေါသ၊ လောဘ စသော ကိလေသာလှိုင်းများ လာသော်လည်း ယိမ်းယိုင်မသွားဘဲ မှန်ကန်သော ဆုံးဖြတ်ချက်များကို ချမှတ်နိုင်ပြီး နှလုံးစိတ်ဝမ်း အေးချမ်းမှုကို ရရှိစေမည် ဖြစ်ပါသည်။',
    author: 'ဆရာတော် ဦးကုသလသာမိ',
    date: '2026-05-15',
    language: 'my'
  },
  {
    id: 'art-2',
    title: 'The Path to True Happiness (Sukha)',
    excerpt: 'Exploring the difference between temporary sensory gratification (Amisa Sukha) and the lasting spiritual bliss of a quietened mind (Niramisa Sukha).',
    content: 'The Buddha pointed out that material happiness is unstable and bound with decay. By turning inward, purifying our ethical conduct (Sila), and stabilizing the consciousness, we tap into a well of joy independent of external conditions—known as Niramisa Sukha.',
    author: 'Venerable Sayadaw Ashin Kusalasami',
    date: '2026-06-01',
    language: 'en'
  },
  {
    id: 'art-2-de',
    title: 'Der Pfad zu wahrem Glück (Sukha)',
    excerpt: 'Einblick in den Unterschied zwischen vergänglichem, sinnlichem Vergnügen (Āmisa Sukha) und der beständigen Freude eines stillen Geistes (Nirāmisa Sukha).',
    content: 'Der Buddha lehrte uns, dass materielles Glück zerbrechlich und stets dem Verfall unterworfen ist. Wenn wir unseren moralischen Kompass (Sīla) reinigen und die Gedanken beruhigen, offenbart sich ein beständiges, von äußeren Umständen freies Glück: Nirāmisa Sukha.',
    author: 'Sayadaw Ashin Kusalasami',
    date: '2026-06-01',
    language: 'de'
  },
  {
    id: 'art-2-my',
    title: 'စစ်မှန်သော ချမ်းသာခြင်းသို့ လမ်းညွှန်ချက်',
    excerpt: 'အာမိသ သုခ (အာရုံခံစားမှု အပေါ်အခြေခံသော သာမန်ပျော်ရွှင်မှု) နှင့် နိရာမိသ သုခ (ကိလေသာ ငြိမ်းအေးရာမှရရှိသော စစ်မှန်သောချမ်းသာမှု) တို့၏ ခြားနားပုံ။',
    content: 'လောကလောကီ စည်းစိမ်ချမ်းသာများသည် ပြိုကွဲပျက်စီး လွယ်ပြီး စစ်မှန်သော တည်ငြိမ်မှု မပေးနိုင်ပါ။ ရှိသမျှအပေါ် စွဲလန်းမှု မရှိဘဲ၊ ကောင်းမွန်သော သီလဂုဏ်များကို ဆောက်တည်ပြီး စိတ်ကို သမထ၊ ဝိပဿနာအာရုံပေါ်တွင် ထားရှိနိုင်ပါက မည်သည့်အရာကမျှ ဖျက်ဆီး၍မရသော ရင်ထဲမှ အေးချမ်းမှု "နိရာမိသ သုခ" ကို ရရှိခံစားနိုင်မည် ဖြစ်ပါသည်။',
    author: 'ဆရာတော် ဦးကုသလသာမိ',
    date: '2026-06-01',
    language: 'my'
  }
];

export const dhammaVideos: DhammaVideo[] = [
  {
    id: 'v-1',
    title: 'Introduction to Abhidhamma - Course 01',
    titleMy: 'Introduction to Abhidhamma - အဘိဓမ္မာသင်တန်း အမှတ် (၁)',
    titleDe: 'Introduction to Abhidhamma - Kurs 01',
    youtubeId: 'ZdjFVURm8qU',
    youtubeUrl: 'https://youtu.be/ZdjFVURm8qU?si=h0yHBnraXWN1hbzl',
    date: '2026-03-10',
    duration: '1:15:20',
    language: 'Burmese / English',
    description: 'Venerable Sayadaw Ashin Kusalasami — Fundamental Buddhist Psychology & Abhidhamma Lecture 01.',
    descriptionMy: 'ဆရာတော် အရှင်ကုသလသာမိ ဟောကြားပို့ချတော်မူသော အဘိဓမ္မာ အခြေခံသင်တန်း အမှတ် (၁) တရားတော်။',
    descriptionDe: 'Einführung in die Grundlagen des Abhidhamma und buddhistische Psychologie mit Sayadaw Ashin Kusalasami.'
  },
  {
    id: 'v-2',
    title: 'Salipatthana Vipassana Meditation Guide for Senior Practitioners',
    titleMy: 'Salipatthana Vipassana Meditation Guide for Senior Practitioners - သတိပဋ္ဌာန်ဝိပဿနာ တရားတော်',
    titleDe: 'Salipatthana Vipassana Meditation Guide for Senior Practitioners',
    youtubeId: '714hIsmDHtA',
    youtubeUrl: 'https://youtu.be/714hIsmDHtA?si=FXvGNMB_kPlBuNrX',
    date: '2026-04-22',
    duration: '58:04',
    language: 'English / Burmese',
    description: 'Practical Vipassana meditation instructions and mindfulness insights for dedicated practitioners.',
    descriptionMy: 'ဝါရင့်ယောဂီများနှင့် တရားချစ်ခင်သူများအတွက် သတိပဋ္ဌာန်ဝိပဿနာ လက်တွေ့ကျင့်စဉ်ဆိုင်ရာ လမ်းညွှန်ချက်တရားတော်။',
    descriptionDe: 'Praktische Anleitung zur Satipaṭṭhāna-Vipassanā-Meditation für erfahrene Praktizierende.'
  }
];

export const courseTranslations: Record<ContentLocale, CourseDetail[]> = {
  my: [
    {
      id: 'course-abha',
      title: 'အဘိဓမ္မာ အထူးသင်တန်း',
      subtitle: 'ပရမတ္ထတရား ၄ ပါး ရိုးရှင်းစွာ လေ့လာခြင်း',
      description: 'စိတ်၊ စေတသိက၊ ရုပ်၊ နိဗ္ဗာန် ဟူသော ပရမတ္ထတရားများကို စနစ်တကျ သင်ကြားပေးမည့် အဘိဓမ္မာ ဂန္ထဝင်သင်တန်း ဖြစ်ပါသည်။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'ပညတ်တရားနှင့် ပရမတ်တရားတို့၏ ကွာခြားချက်ကို သဘောပေါက်နားလည်ခြင်း',
        'စိတ်နှင့် စေတသိကတို့၏ သဘောသဘာဝနှင့် အလုပ်လုပ်ပုံကို ဆန်းစစ်နိုင်ခြင်း',
        'ရုပ်တရားများ၏ အကြောင်းအကျိုး ဆက်စပ်ပုံကို သိရှိခြင်း',
        'ဝိပဿနာ တရားကျင့်ကြံမှုအတွက် ခိုင်မာသော သီအိုရီ အခြေခံရရှိခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'အပတ်စဉ် တနင်္ဂနွေနေ့တိုင်း (မြန်မာစံတော်ချိန် ညနေ ၃:၀၀ နာရီ ၊ ဥရောပစံတော်ချိန် နံနက် ၁၀:၃၀ နာရီ)',
      duration: '၆ လ (သင်ခန်းစာ ၂၄ ခု)',
      targetAudience: 'အဘိဓမ္မာကို တစိုက်မတ်မတ် လေ့လာလိုသော လူငယ်/လူကြီး မည်သူမဆို',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'Zoom Meeting room သို့ ဝင်ရောက်ရန် Password မလိုပါ။ ၁၀ မိနစ် ကြိုတင်ဝင်ရောက်ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။'
    },
    {
      id: 'course-visu',
      title: 'ဝိသုဒ္ဓိမဂ်လာ ကျမ်းစာသင်တန်း',
      subtitle: 'သီလ၊ သမာဓိ၊ ပညာ သန့်စင်သော လမ်းစဉ်',
      description: 'အရှင်မဟာဗုဒ္ဓဃောသ ပြုစုသော ဝိသုဒ္ဓိမဂ် မဟာကျမ်းကြီးပါ သုဒ္ဓိခုနစ်ပါးနှင့် ကမ္မဋ္ဌာန်း လမ်းညွှန်ချက်များကို လေ့လာမည်။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'သီလဝိသုဒ္ဓိမှ စတင်၍ စိတ်ကို သန့်စင်ရန် ကျင့်စဉ်ကြီးကို သိရှိခြင်း',
        'ကသိုင်း၊ အနုဿတိ စသော သမထကမ္မဋ္ဌာန်း ၄၀ ကို အသေးစိတ် သိမြင်ခြင်း',
        'ဝိပဿနာဉာဏ်စဉ်များ တစ်ဆင့်ပြီးတစ်ဆင့် တက်လှမ်းပုံကို လေ့လာခြင်း',
        'သာသနာတော်၌ တရားကျင့်စဉ် သမိုင်းကြောင်းကို နှံ့စပ်ခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'အပတ်စဉ် စနေနေ့တိုင်း (မြန်မာစံတော်ချိန် ညနေ ၄:၀၀ နာရီ ၊ ဥရောပစံတော်ချိန် နံနက် ၁၁:၃၀ နာရီ)',
      duration: '၁ နှစ် (သင်ခန်းစာ ၄၈ ခု)',
      targetAudience: 'အခြေခံတရားသီအိုရီ ကျွမ်းကျင်ပြီး သတိပဋ္ဌာန် လက်တွေ့ကျင့်သုံးသူများ',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'ကျမ်းစာ အခမဲ့ download ရယူရန် link ကို Zoom Class တွင် ပေးဝေပါမည်။'
    },
    {
      id: 'course-sutta',
      title: 'သုတ္တန်ဒေသနာတော် သင်တန်း',
      subtitle: 'မြတ်စွာဘုရား၏ တရားတော်များနှင့် လက်တွေ့ဘဝ',
      description: 'မင်္ဂလသုတ်၊ ရတနသုတ်၊ သိင်္ဂါလောဝါဒသုတ် စသော သုတ္တန်တော်ကြီးများတွင် ပါဝင်သော လူမှုဆက်ဆံရေးနှင့် သံသရာလွတ်မြောက်ရေး လမ်းစဉ်များ။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'နေ့စဉ်ဘဝတွင် သုတ္တန်ပါ ဒေသနာတော်များကို အသုံးချပြီး အိမ်ထောင်ရေး၊ စီးပွားရေး ပိုမိုငြိမ်းချမ်းစေခြင်း',
        'မြတ်စွာဘုရား၏ စကားပြောပုံ၊ ဆုံးမပုံ နည်းလမ်းများကို သင်ယူခြင်း',
        'အခြေခံ ဗုဒ္ဓယဉ်ကျေးမှုနှင့် သီလတရားများကို မြှင့်တင်နိုင်ခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'အပတ်စဉ် သောကြာနေ့တိုင်း (ဥရောပစံတော်ချိန် ညနေ ၇:၀၀ နာရီ)',
      duration: '၃ လ (သင်ခန်းစာ ၁၂ ခု)',
      targetAudience: 'အခြေခံ ဗုဒ္ဓဘာသာအတွေးအခေါ်ကို တိုက်ရိုက်လေ့လာလိုသူများ',
      zoomLink: 'https://zoom.us/j/9a972897ac00'
    },
    {
      id: 'course-vinaya',
      title: 'ဝိနည်းတော် သင်တန်း',
      subtitle: 'သိက္ခာပုဒ်များနှင့် ဘုန်းကြီးကျောင်း ယဉ်ကျေးမှု',
      description: 'ရဟန်းသာမဏေများ၏ ကျင့်ဝတ် သိက္ခာပုဒ်များနှင့် သာသနာတော် တည်တံ့ပြန့်ပွားရေးအတွက် ဒါယကာ ဒါယိကာမများ သိထားသင့်သော ကျောင်းယဉ်ကျေးမှုစနစ်။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'သာသနာ့အဆောက်အုံ ရေရှည်တည်တံ့ရန် ဝိနည်း၏ အရေးပါပုံကို နားလည်ခြင်း',
        'ရဟန်းသံဃာတော်များကို ဝိနည်းနှင့်အညီ စနစ်တကျ လှူဒါန်းပူဇော်တတ်ခြင်း',
        'ကျောင်းစည်းကမ်း၊ ဝိနည်းဉပဒေများကို သဘောပေါက်ခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'လစဉ် ဒုတိယမြောက် တနင်္ဂနွေနေ့ (ဥရောပစံတော်ချိန် ညနေ ၅:၀၀ နာရီ)',
      duration: 'အဆက်မပြတ် (လစဉ်ဆက်တိုက်)',
      targetAudience: 'ရိပ်သာ စေတနာ့ဝန်ထမ်းများနှင့် အလှူဒါယကာများ'
    },
    {
      id: 'course-youth',
      title: 'လူငယ်ဓမ္မဗဟုသုတအတန်း',
      subtitle: 'ခေတ်သစ်လူငယ်များအတွက် ဗုဒ္ဓနည်းကျ တွေးခေါ်မြော်မြင်နည်း',
      description: 'စိတ်ဖိစီးမှု ခံနိုင်ရည်ရှိခြင်း၊ ဆုံးဖြတ်ချက်မှန်ခြင်းနှင့် ကရုဏာစိတ် ပြုစုပျိုးထောင်ခြင်းတို့အတွက် လူငယ်များအတွက် အထူးစီစဉ်ထားသော အတန်း။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'ခေတ်သစ်လောကတွင် ဗုဒ္ဓ၏ တရားတော်များဖြင့် စိတ်ရောကိုယ်ပါ ကျန်းမာသန်စွမ်းအောင် နေထိုင်နည်း',
        'အာရုံစူးစိုက်မှု ကောင်းမွန်စေသော တရားရှုမှတ်နည်း အခွင့်အရေးရရှိခြင်း',
        'လူငယ်အချင်းချင်း ကောင်းမွန်သောအလှူဒါန ကွန်ရက်တစ်ခု ဖြစ်ပေါ်စေခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'နှစ်ပတ်တစ်ကြိမ် စနေနေ့ (ဥရောပစံတော်ချိန် ညနေ ၄:၀၀ နာရီ)',
      duration: 'အမြဲတမ်းတန်း',
      targetAudience: 'အသက် ၁၅ နှစ်မှ ၃၀ နှစ်အတွင်းရှိ လူငယ်များ'
    },
    {
      id: 'course-children',
      title: 'ကလေးငယ်များ ဓမ္မသင်တန်းနှင့် မြန်မာစာသင်တန်း',
      subtitle: 'မြန်မာ့ရိုးရာယဉ်ကျေးမှုနှင့် အခြေခံ ဘာသာစကား/တရားတော်များ',
      description: 'ဥရောပရောက် ကလေးငယ်များအတွက် မိခင်မြန်မာစာ ကျွမ်းကျင်စေရန်နှင့် ရိုးရိုးရှင်းရှင်း ကြည်ညိုဖွယ် ဗုဒ္ဓဘာသာ အခြေခံများ သင်ကြားမှု။',
      objectivesTitle: 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ',
      objectives: [
        'မြန်မာစာ အခြေခံ (ဗျည်း၊ သရ၊ ဖတ်စာ) များကို အလွယ်တကူ ရေးဖတ်တတ်စေခြင်း',
        'ကျေးဇူးသိတတ်ခြင်း၊ ကြင်နာတတ်ခြင်း စသော သာသနာပြု စာရိတ္တကောင်းများ ပိုင်ဆိုင်ခြင်း',
        'ဘုရားစာနှင့် မေတ္တာသုတ်များကို မြတ်နိုးစွာ ရွတ်ဖတ်တတ်ခြင်း'
      ],
      scheduleTitle: 'သင်တန်းအချိန်ဇယား',
      scheduleDetails: 'အပတ်စဉ် တနင်္ဂနွေနေ့တိုင်း (ဥရောပစံတော်ချိန် နေ့လယ် ၁:၃၀ နာရီ)',
      duration: 'ဝင်ခွင့်အမြဲဖွင့်လှစ်ထားပါသည်',
      targetAudience: 'အသက် ၅ နှစ်မှ ၁၄ နှစ်အတွင်းရှိ ကလေးငယ်များ'
    }
  ],
  en: [
    {
      id: 'course-abha',
      title: 'Advanced Abhidhamma Course',
      subtitle: 'Decoding Ultimate Realities Simply',
      description: 'A structured exploration of Mind (Citta), Mental Factors (Cetasika), Matter (Rupa), and Nirvana as detailed in ultimate Buddhist psychology.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Distinguish between conventional and ultimate reality cleanly',
        'Map the intricate chemical structure of mental states and processing flows',
        'Learn how conditioned physical matter interfaces with consciousness',
        'Establish a robust theoretical baseline for advanced Vipassana practice'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Every Sunday (10:30 AM CET / 3:00 PM MMT)',
      duration: '6 Months (24 Weekly Lectures)',
      targetAudience: 'Enthusiasts of clinical human psychology, philosophy, and Buddhist doctrine',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'Password is not required. Recommended to join 10 minutes prior.'
    },
    {
      id: 'course-visu',
      title: 'Visuddhimagga (Path of Purification)',
      subtitle: 'A Masterclass on Morality, Meditation, and Wisdom',
      description: 'Deep dive into Ashin Buddhaghosa\'s majestic fifth-century handbook compiling early Theravada meditation schemes.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Understand the complete architecture of Buddhist purification stages (Seven Purifications)',
        'Examine the mechanics of the 40 classic Samatha concentration targets (Kasinas)',
        'Trace the systematic step-by-step scaling of Vipassana insight knowledges (Jnanas)'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Every Saturday (11:30 AM CET / 4:00 PM MMT)',
      duration: '1 Year (48 Weekly Lectures)',
      targetAudience: 'Intermediate practitioners looking for structural spiritual direction',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'Course texts PDF will be provided free of charge.'
    },
    {
      id: 'course-sutta',
      title: 'Sutta Study and Daily Living',
      subtitle: 'The Blessed One\'s Dialogues for Well-being',
      description: 'Study essential discourses like Mangala Sutta and Sigalovada Sutta to map healthy relationships and secular societal harmony.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Bring the direct wisdom of the discourses into active family and professional life',
        'Learn the precise methods used by the Buddha for peaceful communication'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Every Friday (7:00 PM CET)',
      duration: '3 Months (12 Weekly Lectures)',
      targetAudience: 'Beginners eager to read the actual words of the historical Buddha',
      zoomLink: 'https://zoom.us/j/9a972897ac00'
    },
    {
      id: 'course-vinaya',
      title: 'Vinaya Study & Monastery Culture',
      subtitle: 'Unpacking Monastic Codes and Sacred Reciprocity',
      description: 'Learn the ethical guidelines of Theravada Bhikkhus and how lay donors should support and behave in a monastic setting.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Understand the spiritual rationale behind the 227 strict monastic rules',
        'Learn correct monastic protocols for offering food, medicines, and lodgings'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Second Sunday of every month (5:00 PM CET)',
      duration: 'Continuous / Monthly',
      targetAudience: 'Monastery supporters, volunteers, and potential lay retreatants'
    },
    {
      id: 'course-youth',
      title: 'Dhamma Class for Youth',
      subtitle: 'Buddhist Rationality for Modern Young Professionals',
      description: 'Stress management, cognitive tools for clear decision-making, and structural compassion for digital natives.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Equip yourself with ancient tactical tools to navigate modern burnout',
        'Engage in peer discussion circles on ethics, tech, and spiritual values'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Bi-weekly Saturdays (4:00 PM CET)',
      duration: 'Ongoing open group',
      targetAudience: 'Ages 15 to 30 years old'
    },
    {
      id: 'course-children',
      title: 'Children English, Burmese & Dhamma Class',
      subtitle: 'Traditional Values, Basic Language, and Kindness training',
      description: 'A warm, engaging space for diasporic children to learn Myanmar language alongside joyful core values like gratitude and respect.',
      objectivesTitle: 'What You Will Learn',
      objectives: [
        'Learn elemental reading and writing in Burmese script',
        'Sing sweet Dhamma songs and perform simple chanting with mindfulness',
        'Form strong character traits centered on loving-kindness (Metta)'
      ],
      scheduleTitle: 'Class Schedule',
      scheduleDetails: 'Every Sunday (1:30 PM CET)',
      duration: 'Open intake anytime',
      targetAudience: 'Ages 5 to 14 years old'
    }
  ],
  de: [
    {
      id: 'course-abha',
      title: 'Fortgeschrittenes Abhidhamma-Studium',
      subtitle: 'Die Analytische Psychologie des Buddha verstehen',
      description: 'Ein systematischer Einblick in die vier ultimativen Realitäten des Daseins: Geist (Citta), geistige Faktoren (Cetasika), Materie (Rupa) und Nirvana.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Erfassen Sie den Unterschied zwischen relativer und ultimativer Realität',
        'Verstehen Sie die genauen Mechanismen mentaler Prozesse und Emotionen',
        'Analysieren Sie die wechselseitige Beziehung von Materie und Geist',
        'Erhalten Sie ein theoretisches Fundament für die fortgeschrittene Vipassana-Praxis'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Jeden Sonntag (10:30 Uhr MEZ / 15:00 Uhr burmesischer Zeit)',
      duration: '6 Monate (24 wöchentliche Seminare)',
      targetAudience: 'Interessierte für Philosophie, Geistesschulung und buddhistische Tiefenpsychologie',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'Kein Passwort erforderlich. Wir bitten darum, sich 10 Minuten vor Beginn einzuwählen.'
    },
    {
      id: 'course-visu',
      title: 'Visuddhimagga (Der Pfad zur Reinheit)',
      subtitle: 'Ein Leitfaden für Moral, Konzentration und Weisheit',
      description: 'Detailliertes Studium von Ashin Buddhaghosas legendärem Handbuch über die klassischen Theravada-Meditationsmethoden.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Betrachten Sie die klassische Struktur der Stufen der Reinigung (Sieben Reinheiten)',
        'Analysieren Sie die Funktionsweise der 40 traditionellen Entspannungsobjekte (Kasinas)',
        'Verfolgen Sie den methodischen Aufstieg der Einsichtserkenntnisse'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Jeden Samstag (11:30 Uhr MEZ / 16:00 Uhr burmesischer Zeit)',
      duration: '1 Jahr (48 wöchentliche Lehrgänge)',
      targetAudience: 'Fortgeschrittene, die tiefere theoretische Unterweisung in Meditation suchen',
      zoomLink: 'https://zoom.us/j/9a972897ac00',
      zoomInstructions: 'Die Kursunterlagen werden per PDF kostenlos ausgegeben.'
    },
    {
      id: 'course-sutta',
      title: 'Sutta-Studium im Alltag',
      subtitle: 'Die Lehrreden des Erhabenen für praktisches Lebensglück',
      description: 'Studium grundlegender Sutten wie der Mangala- oder der Sigalovada-Sutta für harmonische menschliche Beziehungen und kluge Alltagspflege.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Bringen Sie die Weisheit der originalen Lehrreden direkt in Ihr Berufs- und Familienleben',
        'Erlernen Sie die friedliche Kommunikation nach dem Vorbild des Buddha'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Jeden Freitag (19:00 Uhr MEZ)',
      duration: '3 Monate (12 Termine)',
      targetAudience: 'Anfänger, die an den historischen Worten des Buddha interessiert sind',
      zoomLink: 'https://zoom.us/j/9a972897ac00'
    },
    {
      id: 'course-vinaya',
      title: 'Vinaya & Klosterkultur',
      subtitle: 'Mönchische Regeln und heilsame Wechselwirkung',
      description: 'Lernen Sie die ethischen Vorschriften für Theravada-Mönche kennen und erfahren Sie, wie Laien das Klosterleben würdevoll unterstützen.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Verstehen Sie den praktischen Sinn hinter den klösterlichen Disziplinen',
        'Erlernen Sie die richtige Gabe von Speisen, Kleidung und Unterkünften'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Jeden zweiten Sonntag im Monat (17:00 Uhr MEZ)',
      duration: 'Fortlaufend / Monatlich',
      targetAudience: 'Unterstützer des Klosters, Helfer und interessierte Laien-Retreatanten'
    },
    {
      id: 'course-youth',
      title: 'Dhamma-Bildung für Jugendliche',
      subtitle: 'Buddhistische Rationalität für moderne junge Menschen',
      description: 'Umgang mit Leistungsstress, geistige Resilienz und Kultivierung von Mitgefühl für junge Erwachsene.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Ausrüstung mit klösterlichen Methoden, um digitalem Burnout vorzubeugen',
        'Teilnahme an anregenden moralisch-ethischen Diskussionsrunden'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Zweiwöchentlich samstags (16:00 Uhr MEZ)',
      duration: 'Fortlaufendes Treffen',
      targetAudience: 'Junge Erwachsene von 15 bis 30 Jahren'
    },
    {
      id: 'course-children',
      title: 'Kinder-Klasse: Burmesisch & Dhamma',
      subtitle: 'Traditionelle Werte, grundlegende Sprache und Herzlichkeit',
      description: 'Ein warmherziger Unterricht für bilinguale Kinder, um die burmesische Sprache zu pflegen und christlich/buddhistische Kernwerte wie Dankbarkeit zu erlernen.',
      objectivesTitle: 'Was Sie lernen werden',
      objectives: [
        'Erste Schritte beim Lesen und Schreiben der burmesischen Schrift',
        'Gemeinsame heilsame Rezitationen und achtsamer Gesang',
        'Bildung eines liebevollen Charakters (Metta) gegenüber allen Lebewesen'
      ],
      scheduleTitle: 'Kurszeiten',
      scheduleDetails: 'Jeden Sonntag (13:30 Uhr MEZ)',
      duration: 'Offener Einstieg jederzeit möglich',
      targetAudience: 'Kinder im Alter von 5 bis 14 Jahren'
    }
  ]
};

export const monasteryTranslations: Record<ContentLocale, MonasteryDetail> = {
  my: {
    title: 'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာအကြောင်း',
    historyTitle: 'ရိပ်သာ၏ သမိုင်းကြောင်းနှင့် ဖြစ်တည်လာပုံ',
    historyContent: [
      'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာ (Buddhachaya Kloster) ကို ဂျာမနီနိုင်ငံတွင် ဘာသာတရား၊ ကြင်နာသနားမှုနှင့် ငြိမ်းချမ်းမှုကို အမြတ်တနိုးတန်ဖိုးထားသော ဓမ္မမိတ်ဆွေများအားလုံးအတွက် သာသနာပြုရန် တည်ထောင်ခဲ့ခြင်း ဖြစ်ပါသည်။ ဆရာတော် အရှင်ကုသလသာမိ၏ မေတ္တာ၊ ကရုဏာ ဦးဆောင်မှုတို့ဖြင့် ဥရောပတိုက်သားများနှင့် မြန်မာမိသားစုများစွာ စုပေါင်းလှူဒါန်း အားထုတ်မှုကြောင့် ယခုကဲ့သို့ သပ်ရပ်လှပသော စံပြကျောင်းတိုက်တည်ဆောက်နိုင်ခဲ့ပါသည်။',
      'ရိပ်သာ၏ အဓိကတာဝန်မှာ မြတ်စွာဘုရား၏ ပိဋကတ်တော်လာ သီအိုရီသင်ကြားမှုများကို စနစ်တကျလေ့လာရန်နှင့် ကမ္မဋ္ဌာန်းလက်တွေ့ တရားကျင့်စဉ်များကို ဂျာမနီနိုင်ငံနှင့် အနီးတစ်ဝိုက်ရှိ ဥရောပနိုင်ငံများတွင် စိုက်ထူပြသရန်ဖြစ်ပါသည်။'
    ],
    facilitiesTitle: 'ရိပ်သာရှိ သာသနိက အဆောက်အအုံများနှင့် ဝန်ဆောင်မှုများ',
    facilities: [
      'အေးချမ်းတိတ်ဆိတ်၍ သမာဓိထူထောင်ရန် ကောင်းမွန်လှသော တရားဓမ္မသဘင်ခန်းမကြီး (Meditation Hall)',
      'အဘိဓမ္မာနှင့် အခြားကျမ်းစာလေ့လာရန် ဗုဒ္ဓဘာသာ စာကြည့်တိုက် (Dharma Library)',
      'ဆရာတော်နှင့် သံဃာတော်များ သီတင်းသုံးရာ အေးချမ်းသော သီတင်းသုံးကျောင်းဆောင် (Monk\'s Quarters)',
      'တရားစခန်းဝင် ဒါယကာ သီလရှင်များ တည်းခိုရန် သပ်ရပ်သော ဓမ္မရိပ်သာတည်းခိုခန်းများ (Retreat Cabins)',
      'လမ်းလျှောက်တရားမှတ်ရန်နှင့် သဘာဝအေးချမ်းမှုကိုရရှိစေမည့် သာယာသော သစ်ပင်ပန်းမန် ဥယျာဉ်တော်များ'
    ]
  },
  en: {
    title: 'About Buddhachaya Center',
    historyTitle: 'Story and Evolution of our Monastery',
    historyContent: [
      'The Buddhachaya Buddhist Monastery and Meditation Center in Germany was established to serve as an enduring light of genuine Dhamma in Central Europe. Under the visionary guidelines of Venerable Sayadaw Ashin Kusalasami, the monastery has evolved into a key multi-cultural locus for learning and practice.',
      'Constructed with meticulous eco-friendly practices, our compound serves as an actual shelter—comfortably shielding continuous Vipassana retreats, systematic Abhidhamma examinations, and child characters grooming courses.'
    ],
    facilitiesTitle: 'Monastery Amenities & Facilities',
    facilities: [
      'Spacious and soundproofed Dhamma Sanctuary and Meditation Hall',
      'A multi-lingual library housing ancient Pali texts, translations, and modern psychology crossworks',
      'Clean, simple individual lodging quarters (Kutis) for live-in retreatants',
      'A vegetarian refectory serving continuous nutrient-dense meals with mindfulness and gratitude',
      'Quiet landscape forest pathways specifically groomed for continuous walking meditation'
    ]
  },
  de: {
    title: 'Über das Buddhachaya-Kloster',
    historyTitle: 'Geschichte und Entwicklung unseres Klosters',
    historyContent: [
      'Das buddhistische Kloster Buddhachaya in Deutschland wurde gegründet, um als dauerhaftes Leuchtfeuer der authentischen Lehre des Buddha in Mitteleuropa zu dienen. Unter der weisen Aufsicht des Ehrwürdigen Sayadaw Ashin Kusalasami hat sich das Kloster zu einem lebendigen, multikulturellen Ort des Lernens und der Praxis entwickelt.',
      'Errichtet mit großer Liebe zum Detail und im Einklang mit der Natur, bietet unser Anwesen einen schützenden Raum für tiefe Vipassana-Retreats, systematische Abhidhamma-Klassen und wertevollen Charakterunterricht für Familien.'
    ],
    facilitiesTitle: 'Einrichtungen des Klosters',
    facilities: [
      'Ein weitläufiger, stiller Meditationssaal für friedliche Versammlungen (Dhammasala)',
      'Eine buddhistische Fachbibliothek mit Texten in Pali, Deutsch, Englisch und Burmesisch',
      'Schlichte und saubere Einzelzimmer (Kutis) für Übernachtungsgäste und Retreat-Teilnehmer',
      'Ein klösterlicher Speisesaal für achtsam zubereitete vegetarische Mahlzeiten (Dana)',
      'Wunderschön gepflegte Waldpfade für kontemplative Gehmeditation in der Natur'
    ]
  }
};

export const scheduledEvents: Record<ContentLocale, ScheduledEvent[]> = {
  my: [
    {
      id: 'event-waso',
      title: 'ဝါဆိုတရားပွဲတော်နှင့် ဝါဆိုရွှေကြာသင်္ကန်းကပ်လှူပွဲ',
      dateStr: 'ဇူလိုင်–သြဂုတ်လ (နှစ်စဉ်)',
      timeStr: 'နံနက် ၉:၃၀ နာရီ မှ ညနေ ၄:၀၀ နာရီ',
      location: 'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာ (ဂျာမနီ)',
      description: 'ရဟန်းတော်များ ဝါတွင်းသုံးလပတ်လုံး သီတင်းသုံးရန်အတွက် ဝါဆိုသင်္ကန်းနှင့် သာသနာ့အလှူပစ္စည်းများ ကပ်လှူပူဇော်ကာ ဆရာတော်ကြီးထံမှ သရဏဂုံနှင့် သီလတရားတော်များကို ခံယူဆောက်တည်ကြပါမည်။',
      category: 'annual',
      calendarLink: {
        title: 'Waso Festival - Buddhachaya',
        description: 'Annual Waso Robe Offering and Dhamma Ceremony',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20260719T093000',
        endDate: '20260719T160000'
      }
    },
    {
      id: 'event-kathina',
      title: 'မဟာကထိန်သင်္ကန်း ဆက်ကပ်လှူဒါန်းပွဲ မဟာမင်္ဂလာ',
      dateStr: 'အောက်တိုဘာ–နိုဝင်ဘာလ (နှစ်စဉ်)',
      timeStr: 'နံနက် ၉:၀၀ နာရီ မှ ညနေ ၅:၀၀ နာရီ',
      location: 'ဗုဒ္ဓဆာယာ ဓမ္မရိပ်သာ (ဂျာမနီ)',
      description: 'တစ်နှစ်လျှင် တစ်ကြိမ်၊ တစ်ကျောင်းလျှင် တစ်ခါသာ ပြုလုပ်ခွင့်ရှိသော ဆုတောင်းမေတ္တာ ပြည့်ဝသည့် ကထိန်သင်္ကန်း ကပ်လှူပူဇော်ပွဲကြီး ဖြစ်ပါသည်။ ဥရောပတခွင်ရှိ မြန်မာနှင့် ဒေသခံဗုဒ္ဓဘာသာဝင်များ စုပေါင်းဆင်နွှဲကြပါမည်။',
      category: 'annual',
      calendarLink: {
        title: 'Kathina Ceremony - Buddhachaya',
        description: 'Noble Kathina Robe offering celebration',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20261101T090000',
        endDate: '20261101T170000'
      }
    },
    {
      id: 'event-weekly',
      title: 'အပတ်စဉ် တနင်္ဂနွေ တရားတော်နှင့် တရားရှုမှတ်ခြင်း',
      dateStr: 'အပတ်စဉ် တနင်္ဂနွေနေ့တိုင်း',
      timeStr: 'နေ့လယ် ၂:၀၀ နာရီ မှ ညနေ ၄:၃၀ နာရီ',
      location: 'Zoom နှင့် ရိပ်သာတွင် တပြိုင်နက်တည်း',
      description: 'ဆရာတော်ကြီးမှ အခြေခံသမထ၊ ဝိပဿနာ တရားရှုမှတ်နည်း သင်ကြားခြင်း၊ တရားဆွေးနွေးခြင်းနှင့် မေတ္တာဘာဝနာ ကမ္မဋ္ဌာန်း ပွားများခြင်းတို့ကို ဦးဆောင်သင်ကြားပါမည်။',
      category: 'weekly',
      calendarLink: {
        title: 'Weekly Sunday Meditation - Buddhachaya',
        description: 'Guided Vipassana and Dhamma Session with Sayadaw',
        location: 'Buddhachaya Center & Zoom',
        startDate: '20260614T140000',
        endDate: '20260614T163000'
      }
    }
  ],
  en: [
    {
      id: 'event-waso',
      title: 'Waso Monastic Robe Offering Ceremony',
      dateStr: 'July–August (Annual)',
      timeStr: '9:30 AM - 4:00 PM CET',
      location: 'Buddhachaya Kloster, Germany',
      description: 'Annual celebratory ceremony commemorating the starting of the three-month rain-retreat. Devotees join to offer rain robes, supportive medicines, and listen to traditional discourses from Sayadaw.',
      category: 'annual',
      calendarLink: {
        title: 'Waso Festival - Buddhachaya',
        description: 'Annual Waso Robe Offering and Dhamma Ceremony',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20260719T093000',
        endDate: '20260719T160000'
      }
    },
    {
      id: 'event-kathina',
      title: 'Grand Kathina Almsgiving & Festival',
      dateStr: 'October–November (Annual)',
      timeStr: '9:00 AM - 5:00 PM CET',
      location: 'Buddhachaya Kloster, Germany',
      description: 'The highly revered communal almsgiving held once a year within restricted moon shifts. Monks who spent the rain retreat receive the newly woven communal robe with collective chanting.',
      category: 'annual',
      calendarLink: {
        title: 'Kathina Ceremony - Buddhachaya',
        description: 'Noble Kathina Robe offering celebration',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20261101T090000',
        endDate: '20261101T170000'
      }
    },
    {
      id: 'event-weekly',
      title: 'Weekly Guided Vipassana Meditation & Sutta Talk',
      dateStr: 'Every Sunday',
      timeStr: '2:00 PM - 4:30 PM CET',
      location: 'Buddhachaya Temple Hall & Zoom Stream',
      description: 'A direct study session offering structural mindfulness guidance, posture alignments, silent practice sessions, and Q&A with Sayadaw.',
      category: 'weekly',
      calendarLink: {
        title: 'Weekly Sunday Meditation - Buddhachaya',
        description: 'Guided Vipassana and Dhamma Session with Sayadaw',
        location: 'Buddhachaya Center & Zoom',
        startDate: '20260614T140000',
        endDate: '20260614T163000'
      }
    }
  ],
  de: [
    {
      id: 'event-waso',
      title: 'Waso-Gewänder-Darbringung zum Regenretreat',
      dateStr: 'Juli–August (Jährlich)',
      timeStr: '09:30 - 16:00 Uhr MEZ',
      location: 'Kloster Buddhachaya, Deutschland',
      description: 'Die alljährliche Zeremonie zur Ankündigung der dreimonatigen klösterlichen Regenzeitklausur (Vassa). Laien stiften Schützendes und lauschen inspirierenden Dhamma-Vorträgen.',
      category: 'annual',
      calendarLink: {
        title: 'Waso Festival - Buddhachaya',
        description: 'Annual Waso Robe Offering and Dhamma Ceremony',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20260719T093000',
        endDate: '20260719T160000'
      }
    },
    {
      id: 'event-kathina',
      title: 'Großes Kathina-Gewandfest des Sangha',
      dateStr: 'Oktober–November (Jährlich)',
      timeStr: '09:00 - 17:00 Uhr MEZ',
      location: 'Kloster Buddhachaya, Deutschland',
      description: 'Die höchste Laienzeremonie des Jahres, die nur einmal stattfindet. Dem Sangha wird das traditionelle Kathina-Gewand dargebracht, gefolgt von einer tiefen Feierlichkeit der Gemeinschaft.',
      category: 'annual',
      calendarLink: {
        title: 'Kathina Ceremony - Buddhachaya',
        description: 'Noble Kathina Robe offering celebration',
        location: 'Kloster Buddhachaya, Germany',
        startDate: '20261101T090000',
        endDate: '20261101T170000'
      }
    },
    {
      id: 'event-weekly',
      title: 'Wöchentliche Vipassana-Meditation & Dhamma-Gespräch',
      dateStr: 'Jeden Sonntag',
      timeStr: '14:00 - 16:30 Uhr MEZ',
      location: 'Meditationshalle im Kloster & Online per Zoom',
      description: 'Systematische Achtsamkeitslehre und Gehmeditation im parkähnlichen Klostergarten, gefolgt von Fragen und Antworten mit dem Ehrwürdigen Sayadaw.',
      category: 'weekly',
      calendarLink: {
        title: 'Weekly Sunday Meditation - Buddhachaya',
        description: 'Guided Vipassana and Dhamma Session with Sayadaw',
        location: 'Buddhachaya Center & Zoom',
        startDate: '20260614T140000',
        endDate: '20260614T163000'
      }
    }
  ]
};

export const contactTranslations: Record<ContentLocale, ContactData> = {
  my: {
    title: 'ဆက်သွယ်ရန်',
    subtitle: 'သင်၏ မေးမြန်းစုံစမ်းမှုများကို ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်းအဖွဲ့မှ ကြိုဆိုလျက်ရှိပါသည်။',
    formName: 'အမည်',
    formEmail: 'အီးမေးလ်လိပ်စာ',
    formMessage: 'မေးမြန်းလိုသည့်အကြောင်းအရာ',
    formSubmit: 'ပေးပို့ရန်',
    formSuccess: 'သင်၏ပေးပို့မှု အောင်မြင်ပါသည်။ ဆရာတော်နှင့် သာသနာပြုကျောင်းအဖွဲ့မှ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။ သတ္တဝါအားလုံး အေးချမ်းကြပါစေ။',
    addressTitle: 'တည်နေရာ (ယာယီ)',
    phoneTitle: 'ဆက်သွယ်ရန်ဖုန်းမံပါတ်',
    emailTitle: 'အီးမေးလ်လိပ်စာ',
    committeeTitle: 'ဗုဒ္ဓဆာယာ ဗုဒ္ဓအရိပ် သာသနာပြုကျောင်းအဖွဲ့',
    committeeMembers: [
      { name: 'ဆရာတော် ဦးကုသလသာမိ', role: 'ဦးဆောင်ဆရာတော် / နာယက' },
      { name: 'ဒေါ်အုန်းမော် (Evelyn)', role: 'ဂေါပကအဖွဲ့ အတွင်းရေးမှူး' },
      { name: 'U Heinz Weber', role: 'နိုင်ငံတကာဆက်ဆံရေးနှင့် ဘဏ္ဍာရေးမှူး' },
      { name: 'ဒေါ်ခင်လှတင့်', role: 'သာသနာရေးညှိနှိုင်းမှု တာဝန်ခံ' }
    ]
  },
  en: {
    title: 'Contact Us',
    subtitle: 'The Buddhachaya Buddhist Missionary Group warmly welcomes your inquiries and suggestions.',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formMessage: 'Detailed Message / Inquiry',
    formSubmit: 'Send Message',
    formSuccess: 'Your message has been received with gratitude. We will reach out to you shortly. May you be peaceful.',
    addressTitle: 'Location (Temporary)',
    phoneTitle: 'Mobile / Telephone',
    emailTitle: 'Email Address',
    committeeTitle: 'Buddhachaya Center Committee',
    committeeMembers: [
      { name: 'Venerable Sayadaw Ashin Kusalasami', role: 'Abt / Presiding Advisor' },
      { name: 'Daw Ohn Maw (Evelyn)', role: 'General Secretary of Trustee board' },
      { name: 'Mr. Heinz Weber', role: 'International Relations & Treasury' },
      { name: 'Daw Khin Hla Tint', role: 'Monastic Welfare Coordinator' }
    ]
  },
  de: {
    title: 'Kontaktieren Sie uns',
    subtitle: 'Die Buddhachaya Buddhistische Missionsgemeinschaft begrüßt Ihre Anfragen von ganzem Herzen.',
    formName: 'Vollständiger Name',
    formEmail: 'E-Mail-Adresse',
    formMessage: 'Ihre Nachricht / Anfrage',
    formSubmit: 'Nachricht senden',
    formSuccess: 'Ihre Nachricht wurde mit Dankbarkeit empfangen. Wir werden uns in Kürze mit Ihnen in Verbindung setzen. Mögen Sie glücklich sein.',
    addressTitle: 'Standort (Vorläufig)',
    phoneTitle: 'Telefonnummer',
    emailTitle: 'E-Mail-Adresse',
    committeeTitle: 'Vorstand & Kuratorium Buddhachaya e.V.',
    committeeMembers: [
      { name: 'Ehrw. Sayadaw Ashin Kusalasami', role: 'Abt & Geistiger Berater' },
      { name: 'Daw Ohn Maw (Evelyn)', role: 'Generalsekretärin' },
      { name: 'Herr Heinz Weber', role: 'Schatzmeister & Europa-Koordinator' },
      { name: 'Daw Khin Hla Tint', role: 'Organisationsleiterin' }
    ]
  }
};

export const donationTranslations: Record<ContentLocale, DonationData> = {
  my: {
    title: 'သာသနာ့ဒါန လှူဒါန်းရန်',
    subtitle: 'သာသနာတော် တည်တံ့ပြန့်ပွားရေးနှင့် ရိပ်သာတည်ဆောက်ပြုပြင်ရေး လုပ်ငန်းများတွင် စေတနာအလျောက် ပါဝင်လှူဒါန်းနိုင်ပါသည်။',
    purposeTitle: 'လှူဒါန်းငွေများကို အောက်ပါနေရာများတွင် အကျိုးရှိရှိ သုံးစွဲသွားပါမည်',
    purposes: [
      'ရိပ်သာကျောင်းတိုက်ကြီး၏ ပတ်ဝန်းကျင်သန့်ရှင်းရေးနှင့် ရေမီး၊ ကျောင်းပြင်ဆင်စရိတ်များ',
      'သီတင်းသုံးနေထိုင်တော်မူကြသော ဆရာတော် သံဃာတော်များ၏ ဆွမ်း၊ သင်္ကန်း၊ ကျောင်း၊ ဆေး ပစ္စည်းလေးပါးထောက်ပံ့စရိတ်',
      'ကလေးသူငယ်များနှင့် လူငယ်များအတွက် အခမဲ့တရားသင်တန်းနှင့် စာအုပ်စာပေ အကူအညီများ',
      'အပတ်စဉ်  Zoom စာသင်တန်း စာကြည့်တိုက်နှင့် သာသနာပြု နည်းပညာစနစ်များထိန်းသိမ်းခြင်း'
    ],
    gratitudeMessage: 'ဒါယကာ ဒါယိကာမများ၏ ဆည်းပူးအပ်သော ဒါနကောင်းမှုသည် ဘဝတစ်လျှောက်လုံး အေးမြငြိမ်းချမ်းသော သာသနာရိပ်ဖြစ်စေကာ ဘေးဘယာဝေးကွာပြီး ကုသိုလ်ထူးရရှိစေပါစေကြောင်း ဆုတောင်းမေတ္တာပို့သအပ်ပါသည်။',
    danaTitle: 'စေတနာအလျောက် လှူဒါန်းဖိတ်ခေါ်ခြင်း',
    ctaText: 'အလှူတော် ဒါနပြုလုပ်မည်'
  },
  en: {
    title: 'Dana & Donations',
    subtitle: 'Support the Sangha. Support the Dhamma. Your generous donations sustain our monastery and continuous free teaching operations.',
    purposeTitle: 'How Your Generosity is Utilized',
    purposes: [
      'Monastery ongoing maintenance, solar heating, eco-water systems, and physical garden grooming',
      'Four Requisites for resident monks (Almsfood, Robes, Lodgings, and Medical expenditures)',
      'Free printed and digital booklets, classroom utilities for Youth & Children Dhamma programs',
      'Maintenance of Zoom systems and scholarly libraries'
    ],
    gratitudeMessage: 'May your noble acts of generosity bring you deep inner calm, continuous prosperity, and direct progress along the Path. We pray for your eternal peace.',
    danaTitle: 'Sow Seeds of Generosity',
    ctaText: 'Dana — Make a Donation'
  },
  de: {
    title: 'Dāna & Spenden',
    subtitle: 'Unterstützen Sie den Sangha. Unterstützen Sie den Dhamma. Ihre gütigen Spenden erhalten die Gebäude und finanzieren den kostenfreien Unterricht.',
    purposeTitle: 'Wie Ihre Großzügigkeit verwendet wird',
    purposes: [
      'Instandhaltung der Gebäude, Solarheizung, umweltfreundliche Wassersysteme und Gartenpflege',
      'Die vier requisiten der ansässigen Mönche (Speise, Kleidung, Unterkunft und Medizin)',
      'Kostenfreie Verteilung von Studienheften, Büchern und Lehrmaterialien für Jugendliche und Kinder',
      'Pflege der Zoom-Infrastruktur und Literaturarchivierung'
    ],
    gratitudeMessage: 'Möge Ihre noble Großzügigkeit Ihnen tiefen inneren Frieden, Wohlstand und direkten Fortschritt auf dem Pfad des Erwachens bringen.',
    danaTitle: 'Heilsames dāna praktizieren',
    ctaText: 'Dāna — Spende tätigen'
  }
};

// TEMP: Bank details below are placeholders until the committee confirms (D5)
export const donationOptions: DonationOption[] = [
  {
    id: 'pay-sepa',
    tabLabel: '🏦 SEPA Bank Transfer',
    title: 'Deductive Bank Transfer (Europe IBAN)',
    instructions: 'Direct SEPA Bank wire transfers are fully free from system charges and the most efficient way to support the monastery in Germany.',
    details: {
      'Account Holder (Spendenempfänger)': 'Buddhachaya Meditationszentrum e.V.',
      'Bank Name (Kreditinstitut)': 'Sparkasse KölnBonn',
      'IBAN': 'DE45 3705 0198 0012 3456 78',
      'BIC / SWIFT': 'COLO DE 33 XXX',
      'Purpose of Payment (Verwendungszweck)': 'Dhamma Dana / Spende'
    }
  },
  {
    id: 'pay-paypal',
    tabLabel: '💳 PayPal',
    title: 'Instant Online Contribution (PayPal)',
    instructions: 'Make secure, instant donations with your PayPal account or via linked bank accounts globally.',
    details: {
      'PayPal Recipient Email': 'donations@buddhachaya-center.org',
      'Reference Code': 'Dana Buddhachaya Center',
      'Alternative Link / QR': 'paypal.me/buddhachaya'
    }
  },
  {
    id: 'pay-myanmar',
    tabLabel: '📱 Myanmar Mobile Banking',
    title: 'Myanmar Diaspora Direct Transfer',
    instructions: 'Specifically created to facilitate easy merit offerings (Ahlu Dana) from the domestic Myanmar population and family structures.',
    details: {
      'KBZPay Wallet': '0915214489565 (Daw Ohn Maw - Sec. Buddhachaya)',
      'WavePay Wallet': '0915214489565 (Trusteecouncil)',
      'Reference text': 'ဂျာမနီ ဗုဒ္ဓဆာယာ ကျောင်းအလှူ'
    }
  }
];
