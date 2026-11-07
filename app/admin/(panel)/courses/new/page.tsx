import CourseForm from '../CourseForm'

export const dynamic = 'force-dynamic'

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">New Course</h1>

      <CourseForm mode="new" isPublished={false} initial={{}} />
    </div>
  )
}
