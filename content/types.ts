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
  formName: string;
  formEmail: string;
  formMessage: string;
  formSubmit: string;
  formSuccess: string;
  addressTitle: string;
  phoneTitle: string;
  emailTitle: string;
  committeeTitle: string;
  committeeMembers: Array<{ name: string; role: string }>;
}

export interface DonationOption {
  id: string;
  tabLabel: string;
  title: string;
  instructions: string;
  details: Record<string, string>;
}

export interface DonationData {
  title: string;
  subtitle: string;
  purposeTitle: string;
  purposes: string[];
  gratitudeMessage: string;
  danaTitle: string;
  ctaText: string;
}
