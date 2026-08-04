import { createClient } from '@/lib/supabase/server';
import type { Tag } from '@/lib/types';

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('id, slug, name_pt, name_en')
    .order('name_pt');
  if (error) throw error;

  return data.map((tag) => ({
    id: String(tag.id),
    slug: tag.slug,
    namePt: tag.name_pt,
    nameEn: tag.name_en,
  }));
}
