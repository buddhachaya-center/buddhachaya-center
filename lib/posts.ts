import { getSupabase } from './supabase';
import type { DhammaArticle, ContentLocale } from '@/content/types';
import { pickText } from './t';

export type PostListItem = {
  id: string;
  slug: string;
  post_type: string;
  category: string | null;
  published_at: string | null;
  title_my: string | null;
  title_en: string | null;
  title_de: string | null;
  excerpt_my: string | null;
  excerpt_en: string | null;
  excerpt_de: string | null;
  cover_image_url: string | null;
};

export async function getPublishedPosts(limit = 20, postType?: string): Promise<PostListItem[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  let query = supabase
    .from('posts')
    .select(
      'id, slug, post_type, category, published_at, title_my, title_en, title_de, excerpt_my, excerpt_en, excerpt_de, cover_image_url'
    )
    .eq('status', 'published');

  if (postType) {
    query = query.eq('post_type', postType);
  }

  const { data, error } = await query
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    return null;
  }

  return data || [];
}

export function postToArticle(post: PostListItem, locale: ContentLocale): DhammaArticle | null {
  const title = pickText({ my: post.title_my, en: post.title_en, de: post.title_de }, locale);
  if (!title) return null;

  const excerpt = pickText({ my: post.excerpt_my, en: post.excerpt_en, de: post.excerpt_de }, locale)?.text ?? '';

  // content is the excerpt for now; full content comes with P3-2
  return {
    id: post.id,
    title: title.text,
    excerpt,
    content: excerpt,
    author: 'Sayadaw Ashin Kusalasami',
    date: post.published_at ? post.published_at.slice(0, 10) : '',
    language: title.lang,
  };
}
