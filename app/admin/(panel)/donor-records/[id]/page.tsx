import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DonorRecordForm from '../DonorRecordForm'

export const dynamic = 'force-dynamic'

export default async function EditDonorRecordPage({
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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <p className="text-[#1E3F20]">Only an admin can open this page.</p>
  }

  const { data: staffUser } = await supabase
    .from('staff_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (staffUser?.role !== 'admin') {
    return <p className="text-[#1E3F20]">Only an admin can open this page.</p>
  }

  const { data: record, error } = await supabase
    .from('donor_records')
    .select('id, certificate_no, donated_on, shares, currency, amount, donor_name, remark')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    return <p className="text-[#1E3F20]">Could not load this donor record.</p>
  }

  if (!record) {
    notFound()
  }

  const initial: Record<string, string> = {
    donated_on: record.donated_on || '',
    shares: record.shares == null ? '' : String(record.shares),
    currency: record.currency || '',
    amount: record.amount == null ? '' : String(Number(record.amount)),
    donor_name: record.donor_name || '',
    remark: record.remark || '',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Edit Donor Record</h1>

      <DonorRecordForm
        mode="edit"
        id={record.id}
        certificateNo={Number(record.certificate_no)}
        initial={initial}
      />
    </div>
  )
}
