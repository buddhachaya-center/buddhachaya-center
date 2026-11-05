import { getSupabase } from './supabase';
import type { ScheduledEvent, ContentLocale } from '@/content/types';
import { pickText } from './t';

export type EventRow = {
  id: string;
  starts_at: string | null;
  ends_at: string | null;
  category: 'annual' | 'weekly';
  weekday: number | null;
  title_my: string | null;
  title_en: string | null;
  title_de: string | null;
  description_my: string | null;
  description_en: string | null;
  description_de: string | null;
  date_text_my: string | null;
  date_text_en: string | null;
  date_text_de: string | null;
  time_text_my: string | null;
  time_text_en: string | null;
  time_text_de: string | null;
  location_my: string | null;
  location_en: string | null;
  location_de: string | null;
};

export async function getPublishedEvents(): Promise<EventRow[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('events')
    .select(
      'id, starts_at, ends_at, category, weekday, title_my, title_en, title_de, description_my, description_en, description_de, date_text_my, date_text_en, date_text_de, time_text_my, time_text_en, time_text_de, location_my, location_en, location_de'
    )
    .eq('is_published', true)
    .order('category', { ascending: true })
    .order('starts_at', { ascending: true, nullsFirst: false });

  if (error) {
    return null;
  }

  return data || [];
}

const BERLIN_TZ = 'Europe/Berlin';
const WEEKDAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
const WEEKDAYS_DE = [
  'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag',
];
const WEEKDAYS_MY = [
  'တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ',
];

function berlinParts(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-GB', {
    ...options,
    timeZone: BERLIN_TZ,
    hourCycle: 'h23',
  }).formatToParts(date);
}

function berlinHm(date: Date): { hour: string; minute: string } {
  const parts = berlinParts(date, { hour: '2-digit', minute: '2-digit' });
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return { hour: get('hour'), minute: get('minute') };
}

function berlinStamp(date: Date): string {
  const parts = berlinParts(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return `${get('year')}${get('month')}${get('day')}T${get('hour')}${get('minute')}${get('second')}`;
}

function gcalStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').slice(0, 15);
}

function berlinLocalMs(date: Date): number {
  const parts = berlinParts(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
  return Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
}

export function eventToScheduled(row: EventRow, locale: ContentLocale, now: Date = new Date()): ScheduledEvent | null {
  const title = pickText({ my: row.title_my, en: row.title_en, de: row.title_de }, locale);
  if (!title) return null;

  const description = pickText({ my: row.description_my, en: row.description_en, de: row.description_de }, locale)?.text ?? '';
  const location = pickText({ my: row.location_my, en: row.location_en, de: row.location_de }, locale)?.text ?? '';

  const startDate = row.starts_at ? new Date(row.starts_at) : null;
  const endDate = row.ends_at ? new Date(row.ends_at) : null;

  let dateStr = pickText({ my: row.date_text_my, en: row.date_text_en, de: row.date_text_de }, locale)?.text ?? '';
  if (!dateStr) {
    if (row.category === 'weekly' && row.weekday !== null && row.weekday >= 0 && row.weekday <= 6) {
      const d = row.weekday;
      dateStr =
        locale === 'my'
          ? `အပတ်စဉ် ${WEEKDAYS_MY[d]}နေ့တိုင်း`
          : locale === 'de'
            ? `Jeden ${WEEKDAYS_DE[d]}`
            : `Every ${WEEKDAYS_EN[d]}`;
    } else if (startDate) {
      const tag = locale === 'my' ? 'my' : locale === 'en' ? 'en-GB' : 'de-DE';
      dateStr = new Intl.DateTimeFormat(tag, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: BERLIN_TZ,
      }).format(startDate);
    }
  }

  let timeStr = pickText({ my: row.time_text_my, en: row.time_text_en, de: row.time_text_de }, locale)?.text ?? '';
  if (!timeStr && startDate) {
    const start = berlinHm(startDate);
    if (endDate) {
      const end = berlinHm(endDate);
      timeStr = `${start.hour}:${start.minute} – ${end.hour}:${end.minute}`;
    } else if (!(start.hour === '00' && start.minute === '00')) {
      timeStr = `${start.hour}:${start.minute}`;
    }
  }

  let calendarLink: ScheduledEvent['calendarLink'];
  if (row.category === 'weekly' && startDate) {
    const effectiveEnd = endDate ?? new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const duration = effectiveEnd.getTime() - startDate.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const nowLocal = berlinLocalMs(now);
    let localStart = berlinLocalMs(startDate);
    while (localStart + duration <= nowLocal) {
      localStart += weekMs;
    }
    calendarLink = {
      title: title.text,
      description,
      location,
      startDate: gcalStamp(new Date(localStart)),
      endDate: gcalStamp(new Date(localStart + duration)),
      recur: 'RRULE:FREQ=WEEKLY',
    };
  } else if (startDate) {
    const effectiveEnd = endDate ?? new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    if (effectiveEnd > now) {
      calendarLink = {
        title: title.text,
        description,
        location,
        startDate: berlinStamp(startDate),
        endDate: berlinStamp(effectiveEnd),
      };
    }
  }

  const event: ScheduledEvent = {
    id: row.id,
    title: title.text,
    dateStr,
    timeStr,
    location,
    description,
    category: row.category,
  };
  if (calendarLink) {
    event.calendarLink = calendarLink;
  }
  return event;
}
