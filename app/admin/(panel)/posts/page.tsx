import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type PostRow = {
  id: string
  slug: string
  post_type: string
  category: string | null
  status: string
  title_my: string | null
  title_en: string | null
  title_de: string | null
  published_at: string | null
  updated_at: string
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('id, slug, post_type, category, status, title_my, title_en, title_de, published_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(100)

  if (params.status === 'draft' || params.status === 'review' || params.status === 'published') {
    query = query.eq('status', params.status)
  }

  const { data: posts, error } = await query

  const getTitle = (post: PostRow) => {
    if (post.title_my && post.title_my.trim()) return post.title_my
    if (post.title_en && post.title_en.trim()) return post.title_en
    if (post.title_de && post.title_de.trim()) return post.title_de
    return '(no title)'
  }

  if (error) {
    return <p className="text-[#1E3F20]">Could not load posts.</p>
  }

  const allUrl = '/admin/posts'
  const draftUrl = '/admin/posts?status=draft'
  const reviewUrl = '/admin/posts?status=review'
  const publishedUrl = '/admin/posts?status=published'

  const activeClass = 'font-semibold underline'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Posts</h1>
      
      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a href={allUrl} className={!params.status ? activeClass : ''}>All</a>
        <a href={draftUrl} className={params.status === 'draft' ? activeClass : ''}>Draft</a>
        <a href={reviewUrl} className={params.status === 'review' ? activeClass : ''}>Review</a>
        <a href={publishedUrl} className={params.status === 'published' ? activeClass : ''}>Published</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Title</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Type</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Category</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Status</th>
              <th className="text-left p-3 text-[#1E3F20] font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-200">
                  <td className="p-3 text-[#1E3F20]">{getTitle(post)}</td>
                  <td className="p-3 text-[#1E3F20]">{post.post_type}</td>
                  <td className="p-3 text-[#1E3F20]">{post.category || '-'}</td>
                  <td className="p-3 text-[#1E3F20]">{post.status}</td>
                  <td className="p-3 text-[#1E3F20]">{post.updated_at.substring(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-[#1E3F20]">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
