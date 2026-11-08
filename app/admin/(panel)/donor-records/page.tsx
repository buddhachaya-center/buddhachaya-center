import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type DonorRecordRow = {
  id: string
  certificate_no: number | string | null
  donated_on: string | null
  shares: number | null
  currency: string | null
  amount: number | string | null
  donor_name: string | null
  updated_at: string
}

export default async function DonorRecordsPage() {
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

  const { data: records, error } = await supabase
    .from('donor_records')
    .select('id, certificate_no, donated_on, shares, currency, amount, donor_name, updated_at')
    .order('certificate_no', { ascending: false })
    .limit(200)

  if (error) {
    return <p className="text-[#1E3F20]">Could not load donor records.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Donor Records</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 text-[#1E3F20] font-semibold">No.</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Date</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Donor</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Shares</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Currency</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Amount</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {records && records.length > 0 ? (
              records.map((record: DonorRecordRow) => (
                <tr key={record.id} className="border-b border-gray-200">
                  <td className="p-3 text-[#1E3F20]">
                    {record.certificate_no != null ? String(record.certificate_no).padStart(4, '0') : '-'}
                  </td>
                  <td className="p-3 text-[#1E3F20]">{record.donated_on}</td>
                  <td className="p-3 text-[#1E3F20]">
                    {record.donor_name ? record.donor_name.replace(/\r?\n/g, ' ') : '-'}
                  </td>
                  <td className="p-3 text-[#1E3F20]">{record.shares ?? '-'}</td>
                  <td className="p-3 text-[#1E3F20]">{record.currency}</td>
                  <td className="p-3 text-[#1E3F20]">
                    {record.amount != null ? Number(record.amount).toFixed(2) : '-'}
                  </td>
                  <td className="p-3 text-[#1E3F20]">{record.updated_at.substring(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-3 text-center text-[#1E3F20]">
                  No donor records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
