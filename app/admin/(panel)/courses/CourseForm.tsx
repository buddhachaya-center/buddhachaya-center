'use client'

import { useActionState } from 'react'
import { saveCourse } from './actions'

type CourseFormProps = {
  mode: 'new' | 'edit'
  isPublished: boolean
  id?: string
  initial: Record<string, string>
}

export default function CourseForm({ mode, isPublished, id, initial }: CourseFormProps) {
  const [state, formAction, isPending] = useActionState(saveCourse, { error: null, values: null })

  const value = (name: string) => state.values?.[name] ?? initial[name] ?? ''

  const languages = [
    { key: 'my', label: 'Burmese' },
    { key: 'en', label: 'English' },
    { key: 'de', label: 'Deutsch' },
  ]

  return (
    <form action={formAction} className="space-y-6">
      {mode === 'edit' && id && (
        <input type="hidden" name="id" value={id} />
      )}

      <div className="bg-[#1E3F20]/10 p-4 rounded text-sm text-[#1E3F20]">
        <p>Burmese title is required. English and German are optional.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E3F20] mb-1">
          Status
        </label>
        <p className="text-[#1E3F20]">{isPublished ? 'Published' : 'Draft'}</p>
        {!isPublished && (
          <p className="text-xs text-gray-600 mt-1">
            New courses are saved as Draft. An admin publishes them from the edit page.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="sort_order" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Order
        </label>
        <input
          type="number"
          id="sort_order"
          name="sort_order"
          min={0}
          max={9999}
          step={1}
          defaultValue={value('sort_order') || '100'}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Lower numbers are shown first.</p>
      </div>

      <div>
        <label htmlFor="zoom_link" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Zoom link (optional)
        </label>
        <input
          type="text"
          id="zoom_link"
          name="zoom_link"
          defaultValue={value('zoom_link')}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Must start with https://. This link is public.</p>
      </div>

      <div className="space-y-6">
        {languages.map(({ key, label }) => (
          <div key={key}>
            <h3 className="text-lg font-semibold text-[#1E3F20] mb-3">{label}</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor={`title_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Title{key === 'my' && ' (required)'}
                </label>
                <input
                  type="text"
                  id={`title_${key}`}
                  name={`title_${key}`}
                  defaultValue={value(`title_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`subtitle_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  id={`subtitle_${key}`}
                  name={`subtitle_${key}`}
                  defaultValue={value(`subtitle_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`description_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Description
                </label>
                <textarea
                  id={`description_${key}`}
                  name={`description_${key}`}
                  rows={4}
                  defaultValue={value(`description_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`objectives_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  What You Will Learn
                </label>
                <textarea
                  id={`objectives_${key}`}
                  name={`objectives_${key}`}
                  rows={5}
                  defaultValue={value(`objectives_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
                <p className="text-xs text-gray-600 mt-1">One point per line.</p>
              </div>
              <div>
                <label htmlFor={`schedule_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Class schedule
                </label>
                <textarea
                  id={`schedule_${key}`}
                  name={`schedule_${key}`}
                  rows={3}
                  defaultValue={value(`schedule_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`duration_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  id={`duration_${key}`}
                  name={`duration_${key}`}
                  defaultValue={value(`duration_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`target_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Target group
                </label>
                <input
                  type="text"
                  id={`target_${key}`}
                  name={`target_${key}`}
                  defaultValue={value(`target_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`zoom_note_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Online classroom note
                </label>
                <textarea
                  id={`zoom_note_${key}`}
                  name={`zoom_note_${key}`}
                  rows={2}
                  defaultValue={value(`zoom_note_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
                {key === 'my' && (
                  <p className="text-xs text-gray-600 mt-1">
                    Optional. Do not write a password here, this text is public.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-800 p-4 rounded">
          {state.error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1E3F20] text-white py-2 px-4 rounded hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <a
          href="/admin/courses"
          className="py-2 px-4 text-[#1E3F20] hover:underline focus:outline-none text-base"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
