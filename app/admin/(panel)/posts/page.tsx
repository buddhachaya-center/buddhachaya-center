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
  searchParams: Promise<{ status?: string; type?: string; saved?: string; done?: string }>
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

  if (params.type === 'teaching' || params.type === 'blog') {
    query = query.eq('post_type', params.type)
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

  const buildFilterUrl = (status?: string, type?: string) => {
    const sp = new URLSearchParams()
    if (status) sp.set('status', status)
    if (type) sp.set('type', type)
    const qs = sp.toString()
    return qs ? `/admin/posts?${qs}` : '/admin/posts'
  }

  const activeClass = 'font-semibold underline'

  const currentType = params.type === 'teaching' || params.type === 'blog' ? params.type : undefined

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">Posts</h1>

      {params.saved === '1' && (
        <p className="text-green-700 text-sm mb-4">Saved.</p>
      )}

      {params.done === 'published' && (
        <p className="text-green-700 text-sm mb-4">Published.</p>
      )}

      {params.done === 'unpublished' && (
        <p className="text-green-700 text-sm mb-4">Unpublished.</p>
      )}

      {params.done === 'deleted' && (
        <p className="text-green-700 text-sm mb-4">Deleted.</p>
      )}

      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a href={buildFilterUrl(params.status)} className={!currentType ? activeClass : ''}>All types</a>
        <a href={buildFilterUrl(params.status, 'teaching')} className={currentType === 'teaching' ? activeClass : ''}>Teaching</a>
        <a href={buildFilterUrl(params.status, 'blog')} className={currentType === 'blog' ? activeClass : ''}>Blog</a>
      </div>

      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a href={buildFilterUrl(undefined, currentType)} className={!params.status ? activeClass : ''}>All</a>
        <a href={buildFilterUrl('draft', currentType)} className={params.status === 'draft' ? activeClass : ''}>Draft</a>
        <a href={buildFilterUrl('review', currentType)} className={params.status === 'review' ? activeClass : ''}>Review</a>
        <a href={buildFilterUrl('published', currentType)} className={params.status === 'published' ? activeClass : ''}>Published</a>
      </div>

      <div className="mb-6">
        <a
          href={`/admin/posts/new?type=${currentType || 'teaching'}`}
          className="bg-[#1E3F20] text-white py-2 px-4 rounded hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base inline-block"
        >
          Add New
        </a>
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
                  <td className="p-3 text-[#1E3F20]">
                    <a href={`/admin/posts/${post.id}`} className="hover:underline">
                      {getTitle(post)}
                    </a>
                  </td>
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
