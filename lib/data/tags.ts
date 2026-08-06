import { createClient } from '@/lib/supabase/server';
import type { Tag } from '@/lib/types';

const TAG_SELECT = 'id, slug, name_pt, name_en, category, icon_url';

function mapTagRow(tag: {
  id: number;
  slug: string;
  name_pt: string;
  name_en: string;
  category: Tag['category'];
  icon_url: string | null;
}): Tag {
  return {
    id: String(tag.id),
    slug: tag.slug,
    namePt: tag.name_pt,
    nameEn: tag.name_en,
    category: tag.category,
    iconUrl: tag.icon_url,
  };
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tags').select(TAG_SELECT).order('name_pt');
  if (error) throw error;

  return data.map(mapTagRow);
}

export async function getTagById(id: number): Promise<Tag | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select(TAG_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return mapTagRow(data);
}
