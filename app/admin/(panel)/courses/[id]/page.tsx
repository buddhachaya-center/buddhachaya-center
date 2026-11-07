import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CourseForm from '../CourseForm'
import CourseActions from '../CourseActions'

const TEXT_FIELDS = [
  'title_my', 'title_en', 'title_de',
  'subtitle_my', 'subtitle_en', 'subtitle_de',
  'description_my', 'description_en', 'description_de',
  'objectives_my', 'objectives_en', 'objectives_de',
  'schedule_my', 'schedule_en', 'schedule_de',
  'duration_my', 'duration_en', 'duration_de',
  'target_my', 'target_en', 'target_de',
  'zoom_note_my', 'zoom_note_en', 'zoom_note_de',
] as const

export const dynamic = 'force-dynamic'

export default async function EditCoursePage({
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

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id, sort_order, zoom_link, is_published, title_my, title_en, title_de, subtitle_my, subtitle_en, subtitle_de, description_my, description_en, description_de, objectives_my, objectives_en, objectives_de, schedule_my, schedule_en, schedule_de, duration_my, duration_en, duration_de, target_my, target_en, target_de, zoom_note_my, zoom_note_en, zoom_note_de')
    .eq('id', id)
    .maybeSingle()

  if (courseError) {
    return <p className="text-[#1E3F20]">Could not load this course.</p>
  }

  if (!course) {
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

  if (course.is_published === true && role !== 'admin') {
    return (
      <div>
        <p className="text-[#1E3F20] mb-4">
          This course is published. Only an admin can edit it.
        </p>
        <a href="/admin/courses" className="text-[#1E3F20] hover:underline">
          Back to courses
        </a>
      </div>
    )
  }

  const initial: Record<string, string> = {}
  initial.sort_order = String(course.sort_order)
  initial.zoom_link = course.zoom_link || ''

  for (const field of TEXT_FIELDS) {
    initial[field] = (course as unknown as Record<string, string | null>)[field] || ''
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Edit Course</h1>

      <CourseForm
        mode="edit"
        id={course.id}
        isPublished={course.is_published === true}
        initial={initial}
      />

      {role === 'admin' && (
        <CourseActions id={course.id} isPublished={course.is_published === true} />
      )}
    </div>
  )
}
