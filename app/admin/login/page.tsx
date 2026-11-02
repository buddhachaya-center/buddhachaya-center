import { login } from '../actions'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === '1'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-[#1E3F20] mb-6 text-center">
          Staff login
        </h1>
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1E3F20] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:border-transparent text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1E3F20] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:border-transparent text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#1E3F20] text-white rounded-md hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base"
          >
            Sign in
          </button>
        </form>
        {hasError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              Incorrect email or password.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
