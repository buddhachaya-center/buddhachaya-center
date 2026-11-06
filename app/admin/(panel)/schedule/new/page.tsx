import ScheduleForm from '../ScheduleForm'

export const dynamic = 'force-dynamic'

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">New Event</h1>

      <ScheduleForm mode="new" isPublished={false} initial={{}} />
    </div>
  )
}
