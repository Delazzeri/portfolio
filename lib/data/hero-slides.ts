import { createClient } from '@/lib/supabase/server';
import type { HeroMediaType, HeroSlide, ProjectType } from '@/lib/types';

const HERO_SLIDE_SELECT = `
  id, media_type, media_url, title_pt, title_en, description_pt, description_en,
  published, position,
  projects ( slug, type )
`;

type HeroSlideRow = {
  id: number;
  media_type: HeroMediaType;
  media_url: string;
  title_pt: string;
  title_en: string;
  description_pt: string | null;
  description_en: string | null;
  published: boolean;
  position: number;
  projects: { slug: string; type: ProjectType } | null;
};

function mapHeroSlideRow(row: HeroSlideRow): HeroSlide {
  return {
    id: String(row.id),
    mediaType: row.media_type,
    mediaUrl: row.media_url,
    titlePt: row.title_pt,
    titleEn: row.title_en,
    descriptionPt: row.description_pt ?? '',
    descriptionEn: row.description_en ?? '',
    projectSlug: row.projects?.slug ?? null,
    projectType: row.projects?.type ?? null,
    published: row.published,
    position: row.position,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select(HERO_SLIDE_SELECT)
    .eq('published', true)
    .order('position', { ascending: true });
  if (error) throw error;
  return (data as unknown as HeroSlideRow[]).map(mapHeroSlideRow);
}

export async function getAllHeroSlidesForAdmin(): Promise<HeroSlide[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select(HERO_SLIDE_SELECT)
    .order('position', { ascending: true });
  if (error) throw error;
  return (data as unknown as HeroSlideRow[]).map(mapHeroSlideRow);
}

export async function getHeroSlideById(id: number): Promise<HeroSlide | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select(HERO_SLIDE_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapHeroSlideRow(data as unknown as HeroSlideRow) : null;
}
