import PostForm from '../PostForm'

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const type = params.type === 'blog' ? 'blog' : 'teaching'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3F20] mb-4">
        {type === 'blog' ? 'New Blog post' : 'New Teaching'}
      </h1>

      <div className="flex gap-4 mb-6 text-sm text-[#1E3F20]">
        <a
          href="/admin/posts/new?type=teaching"
          className={type === 'teaching' ? 'font-semibold underline' : ''}
        >
          Teaching
        </a>
        <a
          href="/admin/posts/new?type=blog"
          className={type === 'blog' ? 'font-semibold underline' : ''}
        >
          Blog
        </a>
      </div>

      <PostForm mode="new" postType={type} isPublished={false} initial={{}} />
    </div>
  )
}
