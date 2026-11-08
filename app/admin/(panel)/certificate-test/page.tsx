import { createClient } from '@/lib/supabase/server'
import CertificatePrototype from './CertificatePrototype'

export const dynamic = 'force-dynamic'

export default async function CertificateTestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <p>Only an admin can open this page.</p>
  }

  const { data: staffUser } = await supabase
    .from('staff_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (staffUser?.role !== 'admin') {
    return <p>Only an admin can open this page.</p>
  }

  return <CertificatePrototype />
}
