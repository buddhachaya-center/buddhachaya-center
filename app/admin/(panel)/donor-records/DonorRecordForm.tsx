'use client'

import { useActionState } from 'react'
import { saveDonorRecord } from './actions'

type DonorRecordFormProps = {
  mode: 'new' | 'edit'
  id?: string
  certificateNo?: number
  certificateHref?: string
  initial: Record<string, string>
}

function todayValue(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function DonorRecordForm({ mode, id, certificateNo, certificateHref, initial }: DonorRecordFormProps) {
  const [state, formAction, isPending] = useActionState(saveDonorRecord, { error: null, values: null })

  const value = (name: string) => state.values?.[name] ?? initial[name] ?? ''
  const defaultDate = value('donated_on') || todayValue()

  return (
    <form action={formAction} className="space-y-6">
      {mode === 'edit' && id && (
        <input type="hidden" name="id" value={id} />
      )}

      <div>
        <label className="block text-sm font-medium text-[#1E3F20] mb-1">
          Certificate number
        </label>
        {mode === 'edit' ? (
          <>
            <p className="text-[#1E3F20]">No. {certificateNo != null ? String(certificateNo).padStart(4, '0') : ''}</p>
            <p className="text-xs text-gray-600 mt-1">Assigned automatically.</p>
          </>
        ) : (
          <p className="text-xs text-gray-600 mt-1">A certificate number is assigned automatically when you save.</p>
        )}
      </div>

      <div>
        <label htmlFor="donated_on" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Date
        </label>
        <input
          type="date"
          id="donated_on"
          name="donated_on"
          defaultValue={defaultDate}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="shares" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Number of shares
        </label>
        <input
          type="text"
          id="shares"
          name="shares"
          inputMode="numeric"
          defaultValue={value('shares')}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Optional. Whole number.</p>
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          defaultValue={value('currency') || 'EUR'}
          className="text-base border border-gray-300 rounded p-2 w-full"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="MMK">MMK</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          inputMode="decimal"
          defaultValue={value('amount')}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Use a dot for decimals, for example 150.50.</p>
      </div>

      <div>
        <label htmlFor="donor_name" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Donor name
        </label>
        <textarea
          id="donor_name"
          name="donor_name"
          rows={2}
          maxLength={120}
          defaultValue={value('donor_name')}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Enter = new line. At most 2 lines.</p>
      </div>

      <div>
        <label htmlFor="remark" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Remark
        </label>
        <textarea
          id="remark"
          name="remark"
          rows={3}
          maxLength={300}
          defaultValue={value('remark')}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Optional. Shown on the certificate. Do not enter bank data or details about other people.</p>
      </div>

      <div className="bg-[#1E3F20]/10 p-4 rounded text-sm text-[#1E3F20]">
        <p>This is a thank-you certificate, not a tax receipt. Nothing is stored except this text.</p>
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
          href="/admin/donor-records"
          className="py-2 px-4 text-[#1E3F20] hover:underline focus:outline-none text-base"
        >
          Cancel
        </a>
        {mode === 'edit' && certificateHref && (
          <a
            href={certificateHref}
            className="border border-[#1E3F20] text-[#1E3F20] py-2 px-4 rounded hover:bg-[#1E3F20]/10 focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base"
          >
            Download Certificate
          </a>
        )}
      </div>
      {mode === 'edit' && (
        <p className="text-xs text-gray-600">Save your changes first. The certificate shows the saved record.</p>
      )}
    </form>
  )
}
