'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CourseFormState } from './form-state'
import { revalidatePublicCourses } from './revalidate'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const LANGS = ['my', 'en', 'de'] as const
const TEXT_FIELDS = ['title', 'subtitle', 'description', 'objectives', 'schedule', 'duration', 'target', 'zoom_note'] as const

function field(formData: FormData, name: string): string {
  return (formData.get(name) as string || '').trim()
}

function normaliseObjectives(value: string): string | null {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0)
  return lines.length > 0 ? lines.join('\n') : null
}

export async function saveCourse(prev: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You are not signed in.', values: null }
  }

  const id = field(formData, 'id')
  const sort_order = field(formData, 'sort_order')
  const zoom_link = field(formData, 'zoom_link')

  const values: Record<string, string> = { id, sort_order, zoom_link }
  const textValues: Record<string, string> = {}

  for (const key of LANGS) {
    for (const name of TEXT_FIELDS) {
      const value = field(formData, `${name}_${key}`)
      textValues[`${name}_${key}`] = value
      values[`${name}_${key}`] = value
    }
  }

  if (!textValues.title_my) {
    return { error: 'A Burmese title is required.', values }
  }

  if (!/^\d{1,4}$/.test(sort_order)) {
    return { error: 'Order must be a whole number from 0 to 9999.', values }
  }

  if (zoom_link && !/^https:\/\/\S+$/.test(zoom_link)) {
    return { error: 'The Zoom link must start with https:// and contain no spaces.', values }
  }

  const row: Record<string, unknown> = {
    sort_order: Number(sort_order),
    zoom_link: zoom_link || null,
  }

  for (const key of LANGS) {
    for (const name of TEXT_FIELDS) {
      const raw = textValues[`${name}_${key}`]
      row[`${name}_${key}`] = name === 'objectives' ? normaliseObjectives(raw) : (raw || null)
    }
  }

  let wasPublished = false

  if (id) {
    if (!UUID_RE.test(id)) {
      return { error: 'Invalid course ID.', values }
    }

    const { data: existing, error: loadError } = await supabase
      .from('courses')
      .select('id, is_published')
      .eq('id', id)
      .maybeSingle()

    if (loadError || !existing) {
      return { error: 'Course not found.', values }
    }

    wasPublished = existing.is_published === true

    const { data: updated, error: updateError } = await supabase
      .from('courses')
      .update(row)
      .eq('id', id)
      .select('id')

    if (updateError) {
      if (updateError.code === '42501' || updateError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this course.', values }
      }
      return { error: 'Could not save the course. Please try again.', values }
    }

    if (!updated || updated.length === 0) {
      return { error: 'Not saved: the course was not found or you do not have permission.', values }
    }
  } else {
    row.is_published = false

    const { error: insertError } = await supabase.from('courses').insert(row)

    if (insertError) {
      if (insertError.code === '42501' || insertError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this course.', values }
      }
      return { error: 'Could not save the course. Please try again.', values }
    }
  }

  if (wasPublished) {
    revalidatePublicCourses()
  }

  redirect('/admin/courses?saved=1')
}
