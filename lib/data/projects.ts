import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import type { Project, ProjectType } from '@/lib/types';

const PROJECT_SELECT = `
  id, slug, type, title_pt, title_en, description_pt, description_en,
  cover_image_url, banner_image_url, position, published,
  project_images ( id, image_url, position ),
  project_links ( id, label, url, type, position ),
  project_tags ( tags ( id, slug, name_pt, name_en, category, icon_url ) )
`;

type ProjectRow = {
  id: number;
  slug: string;
  type: ProjectType;
  title_pt: string;
  title_en: string;
  description_pt: string | null;
  description_en: string | null;
  cover_image_url: string | null;
  banner_image_url: string | null;
  position: number;
  published: boolean;
  project_images: { id: number; image_url: string; position: number }[];
  project_links: { id: number; label: string; url: string; type: string; position: number }[];
  project_tags: {
    tags: {
      id: number;
      slug: string;
      name_pt: string;
      name_en: string;
      category: 'topic' | 'tool';
      icon_url: string | null;
    } | null;
  }[];
};

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: String(row.id),
    slug: row.slug,
    type: row.type,
    titlePt: row.title_pt,
    titleEn: row.title_en,
    descriptionPt: row.description_pt ?? '',
    descriptionEn: row.description_en ?? '',
    coverImageUrl: row.cover_image_url ?? '',
    bannerImageUrl: row.banner_image_url ?? '',
    position: row.position,
    published: row.published,
    images: row.project_images
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((image) => ({
        id: String(image.id),
        imageUrl: image.image_url,
        position: image.position,
      })),
    links: row.project_links
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((link) => ({
        id: String(link.id),
        label: link.label,
        url: link.url,
        type: link.type as Project['links'][number]['type'],
      })),
    tags: row.project_tags
      .map((join) => join.tags)
      .filter((tag): tag is NonNullable<typeof tag> => tag !== null)
      .map((tag) => ({
        id: String(tag.id),
        slug: tag.slug,
        namePt: tag.name_pt,
        nameEn: tag.name_en,
        category: tag.category,
        iconUrl: tag.icon_url,
      })),
  };
}

export async function getProjectsByType(type: ProjectType | null): Promise<Project[]> {
  const supabase = await createClient();
  let query = supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .order('position', { ascending: true });
  if (type) query = query.eq('type', type);

  const { data, error } = await query;
  if (error) throw error;
  return (data as unknown as ProjectRow[]).map(mapProjectRow);
}

export const getProjectBySlug = cache(async function getProjectBySlug(
  slug: string,
  type?: ProjectType,
): Promise<Project | null> {
  const supabase = await createClient();
  let query = supabase.from('projects').select(PROJECT_SELECT).eq('slug', slug);
  if (type) query = query.eq('type', type);

  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data ? mapProjectRow(data as unknown as ProjectRow) : null;
});

export async function getProjectById(id: number): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProjectRow(data as unknown as ProjectRow) : null;
}
