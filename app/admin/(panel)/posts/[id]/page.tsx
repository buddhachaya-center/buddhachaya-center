import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '../PostForm'
import PostActions from '../PostActions'

type PostRow = {
  id: string
  slug: string
  post_type: string
  status: string
  published_at: string | null
  author: string
  title_my: string | null
  title_en: string | null
  title_de: string | null
  excerpt_my: string | null
  excerpt_en: string | null
  excerpt_de: string | null
  content_my: string | null
  content_en: string | null
  content_de: string | null
  cover_image_url: string | null
}

export default async function EditPostPage({
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

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('id, slug, post_type, status, published_at, author, title_my, title_en, title_de, excerpt_my, excerpt_en, excerpt_de, content_my, content_en, content_de, cover_image_url')
    .eq('id', id)
    .maybeSingle()

  if (postError) {
    return <p className="text-[#1E3F20]">Could not load this post.</p>
  }

  if (!post) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()

  let role: string | null = null
  if (user) {
    const { data: staffUser } = await supabase
      .from('staff_users')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()
    role = staffUser?.role || null
  }

  if (post.status === 'published' && role !== 'admin') {
    return (
      <div>
        <p className="text-[#1E3F20] mb-4">
          This post is published. Only an admin can edit it.
        </p>
        <a href="/admin/posts" className="text-[#1E3F20] hover:underline">
          Back to posts
        </a>
      </div>
    )
  }

  const initial: Record<string, string> = {
    slug: post.slug,
    author: post.author,
    published_on: post.published_at ? post.published_at.substring(0, 10) : '',
    status: post.status,
    title_my: post.title_my || '',
    title_en: post.title_en || '',
    title_de: post.title_de || '',
    excerpt_my: post.excerpt_my || '',
    excerpt_en: post.excerpt_en || '',
    excerpt_de: post.excerpt_de || '',
    content_my: post.content_my || '',
    content_en: post.content_en || '',
    content_de: post.content_de || '',
    cover_image_url: post.cover_image_url || '',
  }

  const postType = post.post_type === 'blog' ? 'blog' : 'teaching'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">
        {postType === 'blog' ? 'Edit Blog post' : 'Edit Teaching'}
      </h1>

      <p className="text-sm text-[#1E3F20] mb-6">
        Status: {post.status}
      </p>

      <PostForm
        mode="edit"
        id={post.id}
        postType={postType}
        isPublished={post.status === 'published'}
        initial={initial}
      />

      {role === 'admin' && <PostActions id={post.id} isPublished={post.status === 'published'} />}
    </div>
  )
}
