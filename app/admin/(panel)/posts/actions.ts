'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { PostFormState } from './form-state'

export async function savePost(prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You are not signed in.', values: null }
  }

  const id = (formData.get('id') as string || '').trim()
  const post_type = (formData.get('post_type') as string || '').trim()
  const slug = (formData.get('slug') as string || '').trim()
  const author = (formData.get('author') as string || '').trim()
  const published_on = (formData.get('published_on') as string || '').trim()
  const status = (formData.get('status') as string || '').trim()
  const title_my = (formData.get('title_my') as string || '').trim()
  const title_en = (formData.get('title_en') as string || '').trim()
  const title_de = (formData.get('title_de') as string || '').trim()
  const excerpt_my = (formData.get('excerpt_my') as string || '').trim()
  const excerpt_en = (formData.get('excerpt_en') as string || '').trim()
  const excerpt_de = (formData.get('excerpt_de') as string || '').trim()
  const content_my = (formData.get('content_my') as string || '').trim()
  const content_en = (formData.get('content_en') as string || '').trim()
  const content_de = (formData.get('content_de') as string || '').trim()

  const values: Record<string, string> = {
    id,
    post_type,
    slug,
    author,
    published_on,
    status,
    title_my,
    title_en,
    title_de,
    excerpt_my,
    excerpt_en,
    excerpt_de,
    content_my,
    content_en,
    content_de,
  }

  let postType: string
  let finalStatus: string
  let finalSlug: string

  if (id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return { error: 'Invalid post ID.', values }
    }

    const { data: existing, error: loadError } = await supabase
      .from('posts')
      .select('id, post_type, status, slug')
      .eq('id', id)
      .maybeSingle()

    if (loadError || !existing) {
      return { error: 'Post not found.', values }
    }

    postType = existing.post_type
    if (existing.status === 'published') {
      finalStatus = 'published'
      finalSlug = existing.slug
    } else {
      finalStatus = (status === 'draft' || status === 'review') ? status : 'draft'
      finalSlug = slug
    }
  } else {
    if (post_type !== 'teaching' && post_type !== 'blog') {
      return { error: 'Post type must be teaching or blog.', values }
    }
    postType = post_type
    finalStatus = (status === 'draft' || status === 'review') ? status : 'draft'
    finalSlug = slug
  }
  if (!finalSlug) {
    return { error: 'Slug is required.', values }
  }
  if (finalSlug) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(finalSlug) || finalSlug.length < 1 || finalSlug.length > 80) {
      return { error: 'Slug: use lowercase English letters, digits and single hyphens only (for example mindfulness-in-daily-life).', values }
    }
  }

  if (postType === 'blog') {
    const hasTitle = title_my || title_en || title_de
    const hasContent = content_my || content_en || content_de
    if (!hasTitle || !hasContent) {
      return { error: 'A Blog post needs at least one title and one body text (Burmese, English or German).', values }
    }
  } else {
    if (!title_my || !content_my) {
      return { error: 'A Teaching needs a Burmese title and Burmese body text.', values }
    }
  }

  let published_at: string | null = null
  if (published_on) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(published_on)) {
      return { error: 'Published date must be in YYYY-MM-DD format.', values }
    }
    const date = new Date(published_on)
    if (isNaN(date.getTime())) {
      return { error: 'Invalid published date.', values }
    }
    published_at = `${published_on}T00:00:00Z`
  }

  const finalAuthor = author || 'Sayadaw Ashin Kusalasami'

  const row: Record<string, unknown> = {
    slug: finalSlug,
    status: finalStatus,
    author: finalAuthor,
    published_at,
    title_my: title_my || null,
    title_en: title_en || null,
    title_de: title_de || null,
    excerpt_my: excerpt_my || null,
    excerpt_en: excerpt_en || null,
    excerpt_de: excerpt_de || null,
    content_my: content_my || null,
    content_en: content_en || null,
    content_de: content_de || null,
  }

  if (id) {
    const { data: updated, error: updateError } = await supabase
      .from('posts')
      .update(row)
      .eq('id', id)
      .select('id')

    if (updateError) {
      if (updateError.code === '23505') {
        return { error: 'This slug is already used by another post.', values }
      }
      if (updateError.code === '42501' || updateError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this post.', values }
      }
      return { error: 'Could not save the post. Please try again.', values }
    }

    if (!updated || updated.length === 0) {
      return { error: 'Not saved: the post was not found or you do not have permission.', values }
    }
  } else {
    row.post_type = postType
    const { error: insertError } = await supabase.from('posts').insert(row)

    if (insertError) {
      if (insertError.code === '23505') {
        return { error: 'This slug is already used by another post.', values }
      }
      if (insertError.code === '42501' || insertError.message?.toLowerCase().includes('row-level security')) {
        return { error: 'You do not have permission to save this post.', values }
      }
      return { error: 'Could not save the post. Please try again.', values }
    }
  }

  redirect('/admin/posts?saved=1')
}
