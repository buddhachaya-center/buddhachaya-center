import { createClient } from '@/lib/supabase/server'
import DonorRecordForm from '../DonorRecordForm'

export const dynamic = 'force-dynamic'

export default async function NewDonorRecordPage() {
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">New Donor Record</h1>

      <DonorRecordForm mode="new" initial={{}} />
    </div>
  )
}
