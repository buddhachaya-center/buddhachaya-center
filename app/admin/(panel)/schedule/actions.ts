'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ScheduleFormState, ScheduleActionState } from './form-state'
import { revalidatePublicEvents } from './revalidate'
import { berlinToUtc, weekdayOfDate } from './berlin-time'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function saveEvent(prev: ScheduleFormState, formData: FormData): Promise<ScheduleFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You are not signed in.', values: null }
  }

  const id = (formData.get('id') as string || '').trim()
  const category = (formData.get('category') as string || '').trim()
  const start_date = (formData.get('start_date') as string || '').trim()
  const start_time = (formData.get('start_time') as string || '').trim()
  const end_date = (formData.get('end_date') as string || '').trim()
  const end_time = (formData.get('end_time') as string || '').trim()
  const title_my = (formData.get('title_my') as string || '').trim()
  const title_en = (formData.get('title_en') as string || '').trim()
  const title_de = (formData.get('title_de') as string || '').trim()
  const description_my = (formData.get('description_my') as string || '').trim()
  const description_en = (formData.get('description_en') as string || '').trim()
  const description_de = (formData.get('description_de') as string || '').trim()
  const location_my = (formData.get('location_my') as string || '').trim()
  const location_en = (formData.get('location_en') as string || '').trim()
  const location_de = (formData.get('location_de') as string || '').trim()
  const date_text_my = (formData.get('date_text_my') as string || '').trim()
  const date_text_en = (formData.get('date_text_en') as string || '').trim()
  const date_text_de = (formData.get('date_text_de') as string || '').trim()
  const time_text_my = (formData.get('time_text_my') as string || '').trim()
  const time_text_en = (formData.get('time_text_en') as string || '').trim()
  const time_text_de = (formData.get('time_text_de') as string || '').trim()

  const values: Record<string, string> = {
    id,
    category,
    start_date,
    start_time,
    end_date,
    end_time,
    title_my,
    title_en,
    title_de,
    description_my,
    description_en,
    description_de,
    location_my,
    location_en,
    location_de,
    date_text_my,
    date_text_en,
    date_text_de,
    time_text_my,
    time_text_en,
    time_text_de,
  }

  if (category !== 'annual' && category !== 'weekly') {
    return { error: 'Choose Annual or Weekly.', values }
  }

  if (!title_my) {
    return { error: 'A Burmese title is required.', values }
  }

  if (!start_date) {
    return { error: 'A start date is required.', values }
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(start_date)) {
    return { error: 'A start date is required.', values }
  }
  const [sy, sm, sd] = start_date.split('-').map(Number)
  const startDateCheck = new Date(Date.UTC(sy, sm - 1, sd))
  if (
    isNaN(startDateCheck.getTime()) ||
    startDateCheck.getUTCFullYear() !== sy ||
    startDateCheck.getUTCMonth() !== sm - 1 ||
    startDateCheck.getUTCDate() !== sd
  ) {
    return { error: 'A start date is required.', values }
  }

  const finalStartTime = start_time || '00:00'
  if (!/^\d{2}:\d{2}$/.test(finalStartTime) || Number(finalStartTime.slice(0, 2)) > 23 || Number(finalStartTime.slice(3)) > 59) {
    return { error: 'Time must look like 09:30.', values }
  }

  let finalEndDate = end_date
  let finalEndTime = end_time

  if (finalEndDate && !finalEndTime) {
    return { error: 'Enter an end time when you set an end date.', values }
  }
  if (!finalEndDate && finalEndTime) {
    finalEndDate = start_date
  }

  if (category === 'weekly' && finalEndDate && finalEndDate !== start_date) {
    return { error: 'A weekly event ends on the same day it starts.', values }
  }

  const startInstant = berlinToUtc(start_date, finalStartTime)
  if (!startInstant) {
    return { error: 'This time does not exist in Berlin (clock change). Choose another time.', values }
  }

  let endInstant: Date | null = null
  if (finalEndDate && finalEndTime) {
    endInstant = berlinToUtc(finalEndDate, finalEndTime)
    if (!endInstant) {
      return { error: 'This time does not exist in Berlin (clock change). Choose another time.', values }
    }
    if (endInstant.getTime() <= startInstant.getTime()) {
      return { error: 'The end must be after the start.', values }
    }
  }

  const row: Record<string, unknown> = {
    starts_at: startInstant.toISOString(),
    ends_at: endInstant ? endInstant.toISOString() : null,
    category,
    weekday: category === 'weekly' ? weekdayOfDate(start_date) : null,
    title_my: title_my || null,
    title_en: title_en || null,
    title_de: title_de || null,
    description_my: description_my || null,
    description_en: description_en || null,
    description_de: description_de || null,
    location_my: location_my || null,
    location_en: location_en || null,
    location_de: location_de || null,
    date_text_my: date_text_my || null,
    date_text_en: date_text_en || null,
    date_text_de: date_text_de || null,
    time_text_my: time_text_my || null,
    time_text_en: time_text_en || null,
    time_text_de: time_text_de || null,
  }

  let wasPublished = false

  if (id) {
    if (!UUID_RE.test(id)) {
      return { error: 'Invalid event ID.', values }
    }

    const { data: existing, error: loadError } = await supabase
      .from('events')
      .select('id, is_published')
      .eq('id', id)
      .maybeSingle()

    if (loadError || !existing) {
      return { error: 'Event not found.', values }
    }

    wasPublished = existing.is_published === true

    const { data: updated, error: updateError } = await supabase
      .from('events')
      .update(row)
      .eq('id', id)
      .select('id')

    if (updateError) {
      if (updateError.code === '42501' || updateError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this event.', values }
      }
      return { error: 'Could not save the event. Please try again.', values }
    }

    if (!updated || updated.length === 0) {
      return { error: 'Not saved: the event was not found or you do not have permission.', values }
    }
  } else {
    row.is_published = false

    const { error: insertError } = await supabase.from('events').insert(row)

    if (insertError) {
      if (insertError.code === '42501' || insertError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this event.', values }
      }
      return { error: 'Could not save the event. Please try again.', values }
    }
  }

  if (wasPublished) {
    revalidatePublicEvents()
  }

  redirect('/admin/schedule?saved=1')
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
    return { id: null, error: 'Invalid event ID.' }
  }
  return { id, error: null }
}

export async function publishEvent(prev: ScheduleActionState, formData: FormData): Promise<ScheduleActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: event, error: loadError } = await supabase
    .from('events')
    .select('id, is_published')
    .eq('id', id)
    .maybeSingle()

  if (loadError || !event) {
    return { error: 'Event not found.' }
  }

  if (event.is_published === true) {
    return { error: 'This event is already published.' }
  }

  const { data: updated, error: updateError } = await supabase
    .from('events')
    .update({ is_published: true })
    .eq('id', id)
    .select('id')

  if (updateError) {
    return { error: 'Could not publish the event. Please try again.' }
  }

  if (!updated || updated.length === 0) {
    return { error: 'Not published: the event was not found or you do not have permission.' }
  }

  revalidatePublicEvents()
  redirect('/admin/schedule?done=published')
}

export async function unpublishEvent(prev: ScheduleActionState, formData: FormData): Promise<ScheduleActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: event, error: loadError } = await supabase
    .from('events')
    .select('id, is_published')
    .eq('id', id)
    .maybeSingle()

  if (loadError || !event) {
    return { error: 'Event not found.' }
  }

  if (event.is_published !== true) {
    return { error: 'This event is not published.' }
  }

  const { data: updated, error: updateError } = await supabase
    .from('events')
    .update({ is_published: false })
    .eq('id', id)
    .select('id')

  if (updateError) {
    return { error: 'Could not unpublish the event. Please try again.' }
  }

  if (!updated || updated.length === 0) {
    return { error: 'Not unpublished: the event was not found or you do not have permission.' }
  }

  revalidatePublicEvents()
  redirect('/admin/schedule?done=unpublished')
}

export async function deleteEvent(prev: ScheduleActionState, formData: FormData): Promise<ScheduleActionState> {
  const { supabase, error: authError } = await requireAdmin()
  if (authError) {
    return { error: authError }
  }

  const { id, error: idError } = getId(formData)
  if (idError) {
    return { error: idError }
  }

  const { data: deleted, error: deleteError } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
    .select('id')

  if (deleteError) {
    return { error: 'Could not delete the event. Please try again.' }
  }

  if (!deleted || deleted.length === 0) {
    return { error: 'Not deleted: the event was not found or you do not have permission.' }
  }

  revalidatePublicEvents()
  redirect('/admin/schedule?done=deleted')
}
