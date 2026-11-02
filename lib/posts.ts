import { getSupabase } from './supabase';

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

export async function getPublishedPosts(limit = 20): Promise<PostListItem[] | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, slug, post_type, category, published_at, title_my, title_en, title_de, excerpt_my, excerpt_en, excerpt_de, cover_image_url'
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    return null;
  }

  return data || [];
}
