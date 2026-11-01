/**
 * Type definitions for the Buddhachaya Monastery website
 */

export type ContentLocale = 'my' | 'en' | 'de';

export interface WelcomeData {
  title: string;
  subtitle: string;
  tagline: string;
  greetingTitle: string;
  greetingContent: string;
  sayadawRole: string;
}

export interface BiographyData {
  title: string;
  sayadawName: string;
  sayadawTitle: string;
  birthDetails?: string;
  ordinationDetails?: string;
  educationDetails?: string;
  missionDetails?: string;
  fullBiography: string[];
}

export interface DhammaArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  language: 'en' | 'my' | 'de' | 'all';
}

export interface DhammaVideo {
  id: string;
  title: string;
  titleMy?: string;
  titleDe?: string;
  youtubeId: string;
  youtubeUrl?: string;
  date: string;
  duration: string;
  language: string;
  description?: string;
  descriptionMy?: string;
  descriptionDe?: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  objectivesTitle: string;
  objectives: string[];
  scheduleTitle: string;
  scheduleDetails: string;
  duration: string;
  targetAudience: string;
  zoomLink?: string;
  zoomInstructions?: string;
}

export interface MonasteryDetail {
  title: string;
  historyTitle: string;
  historyContent: string[];
  facilitiesTitle: string;
  facilities: string[];
}

export interface ScheduledEvent {
  id: string;
  title: string;
  dateStr: string;
  timeStr: string;
  location: string;
  description: string;
  category: 'annual' | 'weekly' | 'special';
  calendarLink: {
    title: string;
    description: string;
    location: string;
    startDate: string; // YYYYMMDDTHHMMSS
    endDate: string;
  };
}

export interface ContactData {
  title: string;
  subtitle: string;
  directTitle: string;
  emailIntro: string;
  addressTitle: string;
  phoneTitle: string;
  emailTitle: string;
  committeeTitle: string;
  committeeSubtitle: string;
  committeeMembers: string[];
  mapTitle: string;
  mapButton: string;
  osmButton: string;
  copyText: string;
  copiedText: string;
}

export interface DonationData {
  title: string;
  subtitle: string;
  purposeTitle: string;
  purposes: string[];
  gratitudeMessage: string;
  danaTitle: string;
  ctaText: string;
  accountHolderLabel: string;
  ibanLabel: string;
  bicLabel: string;
  referenceLabel: string;
  copyText: string;
  copiedText: string;
  contactQuestion: string;
}

export interface DonationCampaign {
  eyebrow: string;
  title: string;
  intro: string;
  whyTitle: string;
  whyItems: string[];
  planTitle: string;
  planCards: Array<{ label: string; value: string; note?: string }>;
  shareNote: string;
  promiseTitle: string;
  promiseItems: string[];
  howTitle: string;
  referenceNote: string;
  closingTitle: string;
  closing: string;
  leaders: string;
  sadhu: string;
}
