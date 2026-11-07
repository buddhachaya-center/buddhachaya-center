'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CourseFormState, CourseActionState } from './form-state'
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

async function requireAdmin(): Promise<{ supabase: Awaited<ReturnType<typeof createClient>>, error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { supabase, error: 'You are not signed in.' }
  }

  const { data: staffUser } = await supabase
    .from('staff_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!staffUser || staffUser.role !== 'admin') {
    return { supabase, error: 'Only an admin can do this.' }
  }

  return { supabase, error: null }
}

function getId(formData: FormData): { id: string | null, error: string | null } {
  const id = (formData.get('id') as string || '').trim()
  if (!id || !UUID_RE.test(id)) {
    return { id: null, error: 'Invalid course ID.' }
  }
  return { id, error: null }
}

export async function publishCourse(prev: CourseActionState, formData: FormData): Promise<CourseActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: course, error: loadError } = await supabase
    .from('courses')
    .select('id, is_published')
    .eq('id', id)
    .maybeSingle()

  if (loadError || !course) {
    return { error: 'Course not found.' }
  }

  if (course.is_published === true) {
    return { error: 'This course is already published.' }
  }

  const { data: updated, error: updateError } = await supabase
    .from('courses')
    .update({ is_published: true })
    .eq('id', id)
    .select('id')

  if (updateError) {
    return { error: 'Could not publish the course. Please try again.' }
  }

  if (!updated || updated.length === 0) {
    return { error: 'Not published: the course was not found or you do not have permission.' }
  }

  revalidatePublicCourses()
  redirect('/admin/courses?done=published')
}

export async function unpublishCourse(prev: CourseActionState, formData: FormData): Promise<CourseActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: course, error: loadError } = await supabase
    .from('courses')
    .select('id, is_published')
    .eq('id', id)
    .maybeSingle()

  if (loadError || !course) {
    return { error: 'Course not found.' }
  }

  if (course.is_published !== true) {
    return { error: 'This course is not published.' }
  }

  const { data: updated, error: updateError } = await supabase
    .from('courses')
    .update({ is_published: false })
    .eq('id', id)
    .select('id')

  if (updateError) {
    return { error: 'Could not unpublish the course. Please try again.' }
  }

  if (!updated || updated.length === 0) {
    return { error: 'Not unpublished: the course was not found or you do not have permission.' }
  }

  revalidatePublicCourses()
  redirect('/admin/courses?done=unpublished')
}

export async function deleteCourse(prev: CourseActionState, formData: FormData): Promise<CourseActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: deleted, error: deleteError } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .select('id')

  if (deleteError) {
    return { error: 'Could not delete the course. Please try again.' }
  }

  if (!deleted || deleted.length === 0) {
    return { error: 'Not deleted: the course was not found or you do not have permission.' }
  }

  revalidatePublicCourses()
  redirect('/admin/courses?done=deleted')
}
