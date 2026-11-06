import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type CourseRow = {
  id: string
  sort_order: number
  title_my: string | null
  title_en: string | null
  title_de: string | null
  duration_my: string | null
  duration_en: string | null
  duration_de: string | null
  is_published: boolean | null
  updated_at: string
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; saved?: string; done?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('courses')
    .select('id, sort_order, title_my, title_en, title_de, duration_my, duration_en, duration_de, is_published, updated_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(100)

  if (params.status === 'draft') {
    query = query.eq('is_published', false)
  } else if (params.status === 'published') {
    query = query.eq('is_published', true)
  }

  const { data: courses, error } = await query

  if (error) {
    return <p className="text-[#1E3F20]">Could not load courses.</p>
  }

  const getTitle = (course: CourseRow) => {
    if (course.title_my && course.title_my.trim()) return course.title_my
    if (course.title_en && course.title_en.trim()) return course.title_en
    if (course.title_de && course.title_de.trim()) return course.title_de
    return '(no title)'
  }

  const getDuration = (course: CourseRow) => {
    if (course.duration_my && course.duration_my.trim()) return course.duration_my
    if (course.duration_en && course.duration_en.trim()) return course.duration_en
    if (course.duration_de && course.duration_de.trim()) return course.duration_de
    return '-'
  }

  const activeClass = 'font-semibold underline'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Courses</h1>

      {params.saved === '1' && (
        <p className="text-green-700 text-sm mb-4">Saved.</p>
      )}

      {params.done === 'published' && (
        <p className="text-green-700 text-sm mb-4">Published.</p>
      )}
      {params.done === 'unpublished' && (
        <p className="text-green-700 text-sm mb-4">Unpublished.</p>
      )}
      {params.done === 'deleted' && (
        <p className="text-green-700 text-sm mb-4">Deleted.</p>
      )}

      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a href="/admin/courses" className={!params.status ? activeClass : ''}>All</a>
        <a href="/admin/courses?status=draft" className={params.status === 'draft' ? activeClass : ''}>Draft</a>
        <a href="/admin/courses?status=published" className={params.status === 'published' ? activeClass : ''}>Published</a>
      </div>

      <div className="mb-6">
        <a
          href="/admin/courses/new"
          className="bg-[#1E3F20] text-white py-2 px-4 rounded hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base inline-block"
        >
          Add New
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Title</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Duration</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Order</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Status</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-200">
                  <td className="p-3 text-[#1E3F20]">
                    <a href={`/admin/courses/${course.id}`} className="hover:underline">
                      {getTitle(course)}
                    </a>
                  </td>
                  <td className="p-3 text-[#1E3F20]">{getDuration(course)}</td>
                  <td className="p-3 text-[#1E3F20]">{course.sort_order}</td>
                  <td className="p-3 text-[#1E3F20]">{course.is_published ? 'Published' : 'Draft'}</td>
                  <td className="p-3 text-[#1E3F20]">{course.updated_at.substring(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-[#1E3F20]">
                  No courses yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
