import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ScheduleForm from '../ScheduleForm'
import { utcToBerlin } from '../berlin-time'

const TEXT_FIELDS = [
  'title_my', 'title_en', 'title_de',
  'description_my', 'description_en', 'description_de',
  'location_my', 'location_en', 'location_de',
  'date_text_my', 'date_text_en', 'date_text_de',
  'time_text_my', 'time_text_en', 'time_text_de',
] as const

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(id)) {
    notFound()
  }

  const supabase = await createClient()

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, starts_at, ends_at, category, weekday, title_my, title_en, title_de, description_my, description_en, description_de, date_text_my, date_text_en, date_text_de, time_text_my, time_text_en, time_text_de, location_my, location_en, location_de, is_published')
    .eq('id', id)
    .maybeSingle()

  if (eventError) {
    return <p className="text-[#1E3F20]">Could not load this event.</p>
  }

  if (!event) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()

  let role: string | null = null
  if (user) {
    const { data: staffUser } = await supabase
      .from('staff_users')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()
    role = staffUser?.role || null
  }

  if (event.is_published === true && role !== 'admin') {
    return (
      <div>
        <p className="text-[#1E3F20] mb-4">
          This event is published. Only an admin can edit it.
        </p>
        <a href="/admin/schedule" className="text-[#1E3F20] hover:underline">
          Back to schedule
        </a>
      </div>
    )
  }

  const initial: Record<string, string> = {}
  initial.category = event.category === 'annual' || event.category === 'weekly' ? event.category : 'annual'

  if (event.starts_at) {
    const start = utcToBerlin(event.starts_at)
    initial.start_date = start.date
    initial.start_time = start.time === '00:00' ? '' : start.time
  } else {
    initial.start_date = ''
    initial.start_time = ''
  }

  if (event.ends_at) {
    const end = utcToBerlin(event.ends_at)
    initial.end_date = end.date
    initial.end_time = end.time
  } else {
    initial.end_date = ''
    initial.end_time = ''
  }

  for (const field of TEXT_FIELDS) {
    initial[field] = (event as unknown as Record<string, string | null>)[field] || ''
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Edit Event</h1>

      <ScheduleForm
        mode="edit"
        id={event.id}
        isPublished={event.is_published === true}
        initial={initial}
      />
    </div>
  )
}
