import type { ContentLocale } from './types';
import type { DonationCampaign } from './types';

export const donationCampaign: Record<ContentLocale, DonationCampaign> = {
  my: {
    eyebrow: 'ဂျာမနီမှာ မြန်မာကျောင်းတစ်ကျောင်း ပေါ်ပေါက်ရေး',
    title: 'ကျောင်းအလှူ ကုသိုလ်ဝေစု ဒါနပွဲ',
    intro: 'ဂျာမနီနိုင်ငံရောက် ဗုဒ္ဓဘာသာဝင်အပေါင်းတို့ရေ၊ ဂျာမနီနိုင်ငံတွင် မြန်မာကျောင်းတစ်ကျောင်း ပေါ်ပေါက်လာစေရန် အတူတကွ စတင်ဆောင်ရွက်ကြပါစို့။ ဆရာတော်ဦးဆောင်သော ဤအစီအစဉ်ကြီးတွင် သင်၏ ကုသိုလ်ဝေစု တစ်စုတစ်ပါး ပါဝင်ခွင့်ရှိပါသည်။',
    whyTitle: 'ကျောင်း ဘာကြောင့် လိုအပ်သလဲ',
    whyItems: [
      'ရှင်ပြုပွဲ၊ ရဟန်းခံပွဲ၊ သီလရှင်ဝတ်ပွဲနှင့် တရားစခန်းများအတွက် ဆရာတော်သည် ဒိန်းမတ်နိုင်ငံရှိ ကျောင်းသို့ သွားရောက်ဆောင်ရွက်နေရပါသည်။',
      'ဂျာမနီနိုင်ငံတွင် ရှင်ပြု၊ ရဟန်းခံ၊ သီလရှင်ဝတ်လိုသူများကို ကျောင်းမရှိသဖြင့် လက်ခံဆောင်ရွက်ပေးနိုင်ခြင်း မရှိသေးပါ။',
      'မြန်မာကျောင်းနှင့် တရားရိပ်သာတစ်ခုရှိလျှင် ဘာသာရေးအခမ်းအနားများနှင့် တရားစခန်းများကို ဂျာမနီနိုင်ငံတွင်ပင် ကျင်းပနိုင်ပါမည်။'
    ],
    planTitle: 'စီမံကိန်း တစ်ချက်ကြည့်ရန်',
    planCards: [
      { label: 'ကာလ', value: '၃ နှစ်', note: 'အလှူငွေ စောပြည့်မီပါက စောစီးစွာ စတင်ပါမည်' },
      { label: 'တစ်နှစ်လျှင်', value: '၅၀၀ စု', note: 'သုံးနှစ်ပေါင်း ၁,၅၀၀ စု' },
      { label: 'တစ်စုလျှင်', value: '၃၀၀ ယူရို' },
      { label: 'ပါဝင်ပုံ', value: '၁ စု သို့မဟုတ် ပိုမို', note: 'ဥပမာ ၁၀ စု၊ စွမ်းနိုင်သလောက် လှူဒါန်းနိုင်ပါသည်' }
    ],
    shareNote: 'ကုသိုလ်ဝေစုဆိုသည်မှာ စေတနာအလျောက် လှူဒါန်းခြင်းသာ ဖြစ်ပြီး ရင်းနှီးမြှုပ်နှံမှု သို့မဟုတ် ပိုင်ဆိုင်မှု မဟုတ်ပါ။',
    promiseTitle: 'ကျွန်ုပ်တို့၏ ကတိ',
    promiseItems: [
      'ကျောင်းအလှူ ကုသိုလ်ဝေစုအတွက် လှူဒါန်းငွေများကို ဘဏ်အကောင့်ထဲတွင်သာ ထားရှိမည်ဖြစ်ပြီး အခြားမည်သည့်လုပ်ငန်းအတွက်မျှ အသုံးပြုမည် မဟုတ်ပါ။',
      'လစဉ်လတိုင်း ကုသိုလ်ဝေစု မည်မျှ လှူဒါန်းရရှိပြီးကြောင်းနှင့် ပြည့်မီရန် မည်မျှလိုအပ်သေးကြောင်း အစီရင်ခံပါမည်။',
      'လိုအပ်သော အလှူငွေ ပြည့်မီသည့်အခါ ကျောင်းကို စတင်ဝယ်ယူပါမည်။'
    ],
    howTitle: 'လှူဒါန်းရန်',
    referenceNote: 'ငွေလွှဲရည်ရွယ်ချက် (Verwendungszweck) တွင် အလှူရှင်အမည်အပြည့်အစုံနှင့်အတူ "Kloster" ဟု မဖြစ်မနေ ထည့်ရေးပေးပါ။',
    closingTitle: 'ချစ်ခင်လေးစားစွာ ဖိတ်ခေါ်အပ်ပါသည်',
    closing: 'ဂျာမနီနိုင်ငံ ဒေသအသီးသီးရှိ ဗုဒ္ဓဘာသာဝင်တိုင်းသည် ကိုယ်တိုင်ပါဝင်လှူဒါန်းရုံသာမက အခြားသူများလည်း ပါဝင်လာစေရန် နှိုးဆော်ပေးကြပါရန် ချစ်ခင်လေးစားစွာ ဖိတ်ခေါ်အပ်ပါသည်။',
    leaders: 'ဆရာတော် အရှင်ကုသလသာမိနှင့် ကျောင်းအမှုဆောင်များ ဦးဆောင်ဆောင်ရွက်ပါသည်။',
    sadhu: 'သာဓု၊ သာဓု၊ သာဓု'
  },
  en: {
    eyebrow: 'A Burmese monastery in Germany',
    title: 'The Monastery Dāna Merit-Share Campaign',
    intro: 'Dear Buddhists across Germany, let us begin together to bring a Burmese monastery into being here. In this great undertaking, led by the Sayadaw, you are invited to take part with one or more merit shares.',
    whyTitle: 'Why a monastery is needed',
    whyItems: [
      'For novice ordinations (shinbyu), monk and nun ordinations and meditation retreats, the Sayadaw currently has to travel to a monastery in Denmark.',
      'Because Germany has no monastery of its own, people here who wish to be ordained as novices, monks or nuns cannot yet be received.',
      'With a Burmese monastery and meditation center, religious ceremonies and retreats could be held right here in Germany.'
    ],
    planTitle: 'The plan at a glance',
    planCards: [
      { label: 'Duration', value: '3 years', note: 'Starting earlier if the funds are reached sooner' },
      { label: 'Per year', value: '500 shares', note: '1,500 shares over three years' },
      { label: 'Per share', value: '€300' },
      { label: 'How to take part', value: 'One share or more', note: 'For example 10 shares: give as you are able' }
    ],
    shareNote: 'A merit share is a voluntary donation only. It is not an investment and gives no ownership.',
    promiseTitle: 'Our commitment',
    promiseItems: [
      'Donations for the monastery campaign are kept in the bank account only and will not be used for any other purpose.',
      'Every month we report how many merit shares have been given and how many are still needed.',
      'Once the required funds are reached, we will begin purchasing the monastery.'
    ],
    howTitle: 'How to give',
    referenceNote: 'In the transfer reference (Verwendungszweck), please always write your full name together with the word "Kloster".',
    closingTitle: 'A warm invitation',
    closing: 'We warmly invite every Buddhist across Germany not only to give, but also to encourage others to take part.',
    leaders: 'Led by Sayadaw Ashin Kusalasami together with the monastery committee.',
    sadhu: 'Sādhu, Sādhu, Sādhu'
  },
  de: {
    eyebrow: 'Ein burmesisches Kloster in Deutschland',
    title: 'Dāna-Aktion: Anteile für das Kloster',
    intro: 'Liebe Buddhistinnen und Buddhisten in Deutschland, lasst uns gemeinsam den Weg zu einem burmesischen Kloster in Deutschland beginnen. An diesem großen Vorhaben unter der Leitung des Sayadaw können Sie mit einem oder mehreren Dāna-Anteilen teilhaben.',
    whyTitle: 'Warum ein Kloster notwendig ist',
    whyItems: [
      'Für Novizenordinationen (Shinbyu), Mönchs- und Nonnenordinationen sowie Meditationsretreats muss der Sayadaw derzeit in ein Kloster in Dänemark reisen.',
      'Da es in Deutschland noch kein eigenes Kloster gibt, können Menschen hier, die als Novize, Mönch oder Nonne ordiniert werden möchten, bisher nicht aufgenommen werden.',
      'Mit einem burmesischen Kloster und Meditationszentrum könnten religiöse Zeremonien und Retreats direkt in Deutschland stattfinden.'
    ],
    planTitle: 'Das Vorhaben im Überblick',
    planCards: [
      { label: 'Dauer', value: '3 Jahre', note: 'Früher, sobald die Mittel zusammenkommen' },
      { label: 'Pro Jahr', value: '500 Anteile', note: '1.500 Anteile in drei Jahren' },
      { label: 'Pro Anteil', value: '300 €' },
      { label: 'Beteiligung', value: 'Ein Anteil oder mehr', note: 'Zum Beispiel 10 Anteile, nach Ihren Möglichkeiten' }
    ],
    shareNote: 'Ein Dāna-Anteil ist eine freiwillige Spende. Er ist keine Kapitalanlage und begründet kein Eigentum.',
    promiseTitle: 'Unser Versprechen',
    promiseItems: [
      'Spenden für die Kloster-Aktion verbleiben ausschließlich auf dem Bankkonto und werden für keinen anderen Zweck verwendet.',
      'Jeden Monat berichten wir, wie viele Dāna-Anteile bereits gespendet wurden und wie viele noch fehlen.',
      'Sobald die erforderlichen Mittel erreicht sind, beginnen wir mit dem Erwerb des Klosters.'
    ],
    howTitle: 'So können Sie spenden',
    referenceNote: 'Bitte geben Sie im Verwendungszweck stets Ihren vollständigen Namen zusammen mit dem Wort "Kloster" an.',
    closingTitle: 'Eine herzliche Einladung',
    closing: 'Wir laden jede Buddhistin und jeden Buddhisten in ganz Deutschland herzlich ein, nicht nur selbst zu spenden, sondern auch andere zur Teilnahme zu ermutigen.',
    leaders: 'Unter der Leitung von Sayadaw Ashin Kusalasami gemeinsam mit dem Klosterkomitee.',
    sadhu: 'Sādhu, Sādhu, Sādhu'
  }
};
