'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { deleteDonorRecord } from './actions'
import type { DonorRecordActionState } from './form-state'

type DonorRecordActionsProps = {
  id: string
}

type ConfirmActionProps = {
  action: (prev: DonorRecordActionState, formData: FormData) => Promise<DonorRecordActionState>
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

export default function DonorRecordActions({ id }: DonorRecordActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-300">
      <h2 className="text-lg font-semibold text-[#1E3F20] mb-4">Actions</h2>
      <div className="flex flex-wrap gap-4">
        <ConfirmAction
          action={deleteDonorRecord}
          id={id}
          label="Delete"
          confirmMessage="Delete this donor record permanently? The certificate number will not be reused. This cannot be undone."
          confirmLabel="Yes, delete permanently"
          danger
        />
      </div>
    </div>
  )
}
