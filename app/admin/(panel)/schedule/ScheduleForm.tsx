'use client'

import { useActionState } from 'react'
import { saveEvent } from './actions'

type ScheduleFormProps = {
  mode: 'new' | 'edit'
  isPublished: boolean
  id?: string
  initial: Record<string, string>
}

export default function ScheduleForm({ mode, isPublished, id, initial }: ScheduleFormProps) {
  const [state, formAction, isPending] = useActionState(saveEvent, { error: null, values: null })

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
        <label htmlFor="category" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={value('category') || 'annual'}
          className="text-base border border-gray-300 rounded p-2 w-full"
        >
          <option value="annual">Annual</option>
          <option value="weekly">Weekly</option>
        </select>
        <p className="text-xs text-gray-600 mt-1">
          For a weekly event pick the date of the first or next occurrence. The weekday is taken from this date.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E3F20] mb-1">
          Status
        </label>
        <p className="text-[#1E3F20]">{isPublished ? 'Published' : 'Draft'}</p>
        {!isPublished && (
          <p className="text-xs text-gray-600 mt-1">
            New events are saved as Draft. An admin publishes them from the edit page.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-[#1E3F20] mb-1">
            Start date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            required
            defaultValue={value('start_date')}
            className="text-base border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-[#1E3F20] mb-1">
            Start time
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            defaultValue={value('start_time')}
            className="text-base border border-gray-300 rounded p-2 w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Leave empty if there is no fixed time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-[#1E3F20] mb-1">
            End date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            defaultValue={value('end_date')}
            className="text-base border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="end_time" className="block text-sm font-medium text-[#1E3F20] mb-1">
            End time
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            defaultValue={value('end_time')}
            className="text-base border border-gray-300 rounded p-2 w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Optional</p>
        </div>
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
                <label htmlFor={`description_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Description
                </label>
                <textarea
                  id={`description_${key}`}
                  name={`description_${key}`}
                  rows={3}
                  defaultValue={value(`description_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`location_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id={`location_${key}`}
                  name={`location_${key}`}
                  defaultValue={value(`location_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`date_text_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Date text (optional)
                </label>
                <input
                  type="text"
                  id={`date_text_${key}`}
                  name={`date_text_${key}`}
                  defaultValue={value(`date_text_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor={`time_text_${key}`} className="block text-sm font-medium text-[#1E3F20] mb-1">
                  Time text (optional)
                </label>
                <input
                  type="text"
                  id={`time_text_${key}`}
                  name={`time_text_${key}`}
                  defaultValue={value(`time_text_${key}`)}
                  className="text-base border border-gray-300 rounded p-2 w-full"
                />
              </div>
              {key === 'my' && (
                <p className="text-xs text-gray-600">
                  Only fill the date text and time text if the shown wording must differ from the date picker, for example 'July to August' or '09:30 CET'. They change only what visitors read, not the calendar button.
                </p>
              )}
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
          href="/admin/schedule"
          className="py-2 px-4 text-[#1E3F20] hover:underline focus:outline-none text-base"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
