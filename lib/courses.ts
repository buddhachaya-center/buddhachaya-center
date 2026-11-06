import { getSupabase } from './supabase';
import type { CourseDetail, ContentLocale } from '@/content/types';
import { pickText } from './t';

export type CourseRow = {
  id: string;
  title_my: string | null;
  title_en: string | null;
  title_de: string | null;
  subtitle_my: string | null;
  subtitle_en: string | null;
  subtitle_de: string | null;
  description_my: string | null;
  description_en: string | null;
  description_de: string | null;
  objectives_my: string | null;
  objectives_en: string | null;
  objectives_de: string | null;
  schedule_my: string | null;
  schedule_en: string | null;
  schedule_de: string | null;
  duration_my: string | null;
  duration_en: string | null;
  duration_de: string | null;
  target_my: string | null;
  target_en: string | null;
  target_de: string | null;
  zoom_link: string | null;
  zoom_note_my: string | null;
  zoom_note_en: string | null;
  zoom_note_de: string | null;
};

export async function getPublishedCourses(): Promise<CourseRow[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('courses')
    .select(
      'id, title_my, title_en, title_de, subtitle_my, subtitle_en, subtitle_de, description_my, description_en, description_de, objectives_my, objectives_en, objectives_de, schedule_my, schedule_en, schedule_de, duration_my, duration_en, duration_de, target_my, target_en, target_de, zoom_link, zoom_note_my, zoom_note_en, zoom_note_de'
    )
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    return null;
  }

  return data || [];
}

export function courseToDetail(row: CourseRow, locale: ContentLocale): CourseDetail | null {
  const title = pickText({ my: row.title_my, en: row.title_en, de: row.title_de }, locale);
  if (!title) return null;

  const subtitle = pickText({ my: row.subtitle_my, en: row.subtitle_en, de: row.subtitle_de }, locale)?.text ?? '';
  const description = pickText({ my: row.description_my, en: row.description_en, de: row.description_de }, locale)?.text ?? '';
  const duration = pickText({ my: row.duration_my, en: row.duration_en, de: row.duration_de }, locale)?.text ?? '';
  const targetAudience = pickText({ my: row.target_my, en: row.target_en, de: row.target_de }, locale)?.text ?? '';
  const scheduleDetails = pickText({ my: row.schedule_my, en: row.schedule_en, de: row.schedule_de }, locale)?.text ?? '';
  const zoomInstructions = pickText({ my: row.zoom_note_my, en: row.zoom_note_en, de: row.zoom_note_de }, locale)?.text ?? '';

  const objectivesText = pickText({ my: row.objectives_my, en: row.objectives_en, de: row.objectives_de }, locale)?.text ?? '';
  const objectives = objectivesText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');

  const zoomLink = row.zoom_link && row.zoom_link.trim() !== '' ? row.zoom_link : undefined;

  const course: CourseDetail = {
    id: row.id,
    title: title.text,
    subtitle,
    description,
    objectivesTitle:
      locale === 'my'
        ? 'သင်တန်းမှရရှိမည့် အကျိုးကျေးဇူးများ'
        : locale === 'de'
          ? 'Was Sie lernen werden'
          : 'What You Will Learn',
    objectives,
    scheduleTitle:
      locale === 'my'
        ? 'သင်တန်းအချိန်ဇယား'
        : locale === 'de'
          ? 'Kurszeiten'
          : 'Class Schedule',
    scheduleDetails,
    duration,
    targetAudience,
    zoomLink,
  };
  if (zoomInstructions !== '') {
    course.zoomInstructions = zoomInstructions;
  }
  return course;
}
