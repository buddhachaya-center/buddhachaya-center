import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '../actions'

export const dynamic = 'force-dynamic'

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: staffUser, error } = await supabase
    .from('staff_users')
    .select('role, display_name')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error || !staffUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-full max-w-md p-8 text-center">
          <p className="text-[#1E3F20] mb-6">
            This account is not registered as staff. Please contact the administrator.
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="py-2 px-4 bg-[#1E3F20] text-white rounded-md hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    )
  }

  const roleLabel = staffUser.role === 'admin' ? 'Admin' : 'Editor'

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="bg-[#1E3F20] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{staffUser.display_name || ''}</span>
          <span className="text-sm bg-white/20 px-2 py-1 rounded">{roleLabel}</span>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm hover:underline focus:outline-none"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
