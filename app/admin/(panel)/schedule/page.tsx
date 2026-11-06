import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type EventRow = {
  id: string
  starts_at: string | null
  ends_at: string | null
  category: string | null
  weekday: number | null
  title_my: string | null
  title_en: string | null
  title_de: string | null
  is_published: boolean | null
  updated_at: string
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Europe/Berlin',
})

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('events')
    .select('id, starts_at, ends_at, category, weekday, title_my, title_en, title_de, is_published, updated_at')
    .order('category', { ascending: true })
    .order('starts_at', { ascending: true, nullsFirst: false })
    .limit(100)

  if (params.status === 'draft') {
    query = query.eq('is_published', false)
  } else if (params.status === 'published') {
    query = query.eq('is_published', true)
  }

  const { data: events, error } = await query

  if (error) {
    return <p className="text-[#1E3F20]">Could not load events.</p>
  }

  const getTitle = (event: EventRow) => {
    if (event.title_my && event.title_my.trim()) return event.title_my
    if (event.title_en && event.title_en.trim()) return event.title_en
    if (event.title_de && event.title_de.trim()) return event.title_de
    return '(no title)'
  }

  const getCategoryLabel = (event: EventRow) => {
    if (event.category === 'annual') return 'Annual'
    if (event.category === 'weekly') return 'Weekly'
    return event.category || '-'
  }

  const getWhenText = (event: EventRow) => {
    if (event.category === 'weekly' && event.weekday !== null && event.weekday >= 0 && event.weekday <= 6) {
      return `Every ${WEEKDAYS[event.weekday]}`
    }
    if (event.starts_at) {
      return dateTimeFormatter.format(new Date(event.starts_at))
    }
    return 'No date'
  }

  const hasPassed = (event: EventRow) => {
    if (event.category !== 'annual' || !event.starts_at) return false
    const end = event.ends_at ? new Date(event.ends_at) : new Date(new Date(event.starts_at).getTime() + 2 * 60 * 60 * 1000)
    return end < new Date()
  }

  const activeClass = 'font-semibold underline'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Schedule</h1>

      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a href="/admin/schedule" className={!params.status ? activeClass : ''}>All</a>
        <a href="/admin/schedule?status=draft" className={params.status === 'draft' ? activeClass : ''}>Draft</a>
        <a href="/admin/schedule?status=published" className={params.status === 'published' ? activeClass : ''}>Published</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Title</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Category</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">When</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Status</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="border-b border-gray-200">
                  <td className="p-3 text-[#1E3F20]">{getTitle(event)}</td>
                  <td className="p-3 text-[#1E3F20]">{getCategoryLabel(event)}</td>
                  <td className="p-3 text-[#1E3F20]">
                    {getWhenText(event)}
                    {hasPassed(event) && (
                      <div className="text-xs text-red-700">Date has passed. Set a new date.</div>
                    )}
                  </td>
                  <td className="p-3 text-[#1E3F20]">{event.is_published ? 'Published' : 'Draft'}</td>
                  <td className="p-3 text-[#1E3F20]">{event.updated_at.substring(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-[#1E3F20]">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
