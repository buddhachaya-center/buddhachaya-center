'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { publishEvent, unpublishEvent, deleteEvent } from './actions'
import type { ScheduleActionState } from './form-state'

type ScheduleActionsProps = {
  id: string
  isPublished: boolean
}

type ConfirmActionProps = {
  action: (prev: ScheduleActionState, formData: FormData) => Promise<ScheduleActionState>
  id: string
  label: string
  confirmMessage: string
  confirmLabel: string
  danger?: boolean
}

function ConfirmAction({ action, id, label, confirmMessage, confirmLabel, danger }: ConfirmActionProps) {
  const [confirming, setConfirming] = useState(false)
  const [state, formAction, isPending] = useActionState(action, { error: null })

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={`py-2 px-4 rounded text-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          danger
            ? 'text-red-700 hover:bg-red-50 focus:ring-red-700'
            : 'bg-[#1E3F20] text-white hover:bg-[#163318] focus:ring-[#1E3F20]'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="border border-gray-300 rounded p-4 space-y-3">
      <p className="text-[#1E3F20] text-sm">{confirmMessage}</p>
      <form action={formAction} className="flex gap-3">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          disabled={isPending}
          className={`py-2 px-4 rounded text-base focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
            danger
              ? 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-700'
              : 'bg-[#1E3F20] text-white hover:bg-[#163318] focus:ring-[#1E3F20]'
          }`}
        >
          {isPending ? 'Working...' : confirmLabel}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="py-2 px-4 text-[#1E3F20] hover:underline focus:outline-none text-base"
        >
          Cancel
        </button>
      </form>
      {state.error && (
        <p role="alert" className="text-red-700 text-sm">
          {state.error}
        </p>
      )}
    </div>
  )
}

export default function ScheduleActions({ id, isPublished }: ScheduleActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-300">
      <h2 className="text-lg font-semibold text-[#1E3F20] mb-4">Actions</h2>
      <div className="flex flex-wrap gap-4">
        {!isPublished && (
          <ConfirmAction
            action={publishEvent}
            id={id}
            label="Publish"
            confirmMessage="Publish this event? It becomes visible to everyone on the Schedule page."
            confirmLabel="Yes, publish"
          />
        )}
        {isPublished && (
          <ConfirmAction
            action={unpublishEvent}
            id={id}
            label="Unpublish"
            confirmMessage="Unpublish this event? It will disappear from the Schedule page and go back to Draft."
            confirmLabel="Yes, unpublish"
          />
        )}
        <ConfirmAction
          action={deleteEvent}
          id={id}
          label="Delete"
          confirmMessage={
            isPublished
              ? 'Delete this PUBLISHED event permanently? It will disappear from the Schedule page. This cannot be undone.'
              : 'Delete this event permanently? This cannot be undone.'
          }
          confirmLabel="Yes, delete permanently"
          danger
        />
      </div>
    </div>
  )
}
