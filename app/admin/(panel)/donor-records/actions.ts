'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { DonorRecordFormState } from './form-state'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function field(formData: FormData, name: string): string {
  return (formData.get(name) as string || '').trim()
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export async function saveDonorRecord(prev: DonorRecordFormState, formData: FormData): Promise<DonorRecordFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You are not signed in.', values: null }
  }

  const { data: staffUser } = await supabase
    .from('staff_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!staffUser || staffUser.role !== 'admin') {
    return { error: 'Only an admin can do this.', values: null }
  }

  const id = field(formData, 'id')
  const donated_on = field(formData, 'donated_on')
  const shares = field(formData, 'shares')
  const currency = field(formData, 'currency')
  const amount = field(formData, 'amount')
  const donor_name = field(formData, 'donor_name')
  const remark = field(formData, 'remark')

  const values: Record<string, string> = {
    id,
    donated_on,
    shares,
    currency,
    amount,
    donor_name,
    remark,
  }

  const donorNameLines = donor_name
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (donorNameLines.length > 2) {
    return { error: 'The donor name may have at most 2 lines.', values }
  }

  const donorName = donorNameLines.join('\n')

  if (!donorName) {
    return { error: 'The donor name is required.', values }
  }

  if (donorName.length > 120) {
    return { error: 'The donor name may have at most 120 characters.', values }
  }

  if (remark.length > 300) {
    return { error: 'The remark may have at most 300 characters.', values }
  }

  if (!/^(EUR|USD|MMK)$/.test(currency)) {
    return { error: 'Choose a currency.', values }
  }

  const amountValue = amount.replace(',', '.')

  if (!/^\d{1,10}(\.\d{1,2})?$/.test(amountValue)) {
    return { error: 'Amount must be a number of zero or more with up to 2 decimals.', values }
  }

  if (shares && (!/^\d{1,6}$/.test(shares) || Number(shares) <= 0)) {
    return { error: 'Shares must be a whole number greater than 0, or empty.', values }
  }

  if (!isValidDate(donated_on)) {
    return { error: 'Enter a valid date.', values }
  }

  if (id && !UUID_RE.test(id)) {
    return { error: 'Invalid donor record ID.', values }
  }

  const row = {
    donated_on,
    shares: shares ? Number(shares) : null,
    currency,
    amount: Number(amountValue),
    donor_name: donorName,
    remark: remark || null,
  }

  if (id) {
    const { data: updated, error: updateError } = await supabase
      .from('donor_records')
      .update(row)
      .eq('id', id)
      .select('id')

    if (updateError) {
      return { error: 'Could not save the donor record. Please try again.', values }
    }

    if (!updated || updated.length === 0) {
      return { error: 'Not saved: the record was not found or you do not have permission.', values }
    }
  } else {
    const { error: insertError } = await supabase
      .from('donor_records')
      .insert(row)

    if (insertError) {
      return { error: 'Could not save the donor record. Please try again.', values }
    }
  }

  redirect('/admin/donor-records?saved=1')
}
