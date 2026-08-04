'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/service-role';
import { redirect } from '@/i18n/navigation';
import { heroSlideFieldsSchema } from '@/lib/validation/hero-slide';
import type { AppLocale } from '@/i18n/routing';

export type HeroSlideFormState = { error?: string };

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function parseFields(formData: FormData) {
  const projectIdRaw = formData.get('projectId');
  return heroSlideFieldsSchema.parse({
    mediaType: formData.get('mediaType'),
    titlePt: formData.get('titlePt'),
    titleEn: formData.get('titleEn'),
    descriptionPt: formData.get('descriptionPt') || '',
    descriptionEn: formData.get('descriptionEn') || '',
    projectId: projectIdRaw ? Number(projectIdRaw) : null,
    published: formData.get('published') === 'on',
  });
}

async function uploadHeroMedia(
  supabase: SupabaseServerClient,
  slideId: number,
  file: File,
): Promise<string> {
  const path = `hero/${slideId}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from('project-media')
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from('project-media').getPublicUrl(path);
  return publicUrl;
}

function revalidateAll() {
  revalidatePath('/[locale]/admin/hero', 'page');
  revalidatePath('/[locale]/design', 'page');
  revalidatePath('/[locale]/code', 'page');
  revalidatePath('/[locale]/all', 'page');
}

export async function createHeroSlide(
  locale: AppLocale,
  _prevState: HeroSlideFormState,
  formData: FormData,
): Promise<HeroSlideFormState> {
  const supabase = await createClient();

  let fields;
  try {
    fields = parseFields(formData);
  } catch {
    return { error: 'Confira os campos obrigatórios.' };
  }

  const media = formData.get('media') as File | null;
  if (!media || media.size === 0) {
    return { error: 'Escolha uma imagem ou vídeo para o slide.' };
  }

  const { data: inserted, error: insertError } = await supabase
    .from('hero_slides')
    .insert({
      media_type: fields.mediaType,
      media_url: '',
      title_pt: fields.titlePt,
      title_en: fields.titleEn,
      description_pt: fields.descriptionPt,
      description_en: fields.descriptionEn,
      project_id: fields.projectId,
      published: fields.published,
    })
    .select('id')
    .single();

  if (insertError) return { error: insertError.message };
  const slideId = inserted.id as number;

  const mediaUrl = await uploadHeroMedia(supabase, slideId, media);
  await supabase.from('hero_slides').update({ media_url: mediaUrl }).eq('id', slideId);

  revalidateAll();
  return redirect({ href: '/admin/hero', locale });
}

export async function updateHeroSlide(
  id: number,
  locale: AppLocale,
  _prevState: HeroSlideFormState,
  formData: FormData,
): Promise<HeroSlideFormState> {
  const supabase = await createClient();

  let fields;
  try {
    fields = parseFields(formData);
  } catch {
    return { error: 'Confira os campos obrigatórios.' };
  }

  const media = formData.get('media') as File | null;
  const mediaUrl = media && media.size > 0 ? await uploadHeroMedia(supabase, id, media) : undefined;

  const { error: updateError } = await supabase
    .from('hero_slides')
    .update({
      media_type: fields.mediaType,
      ...(mediaUrl ? { media_url: mediaUrl } : {}),
      title_pt: fields.titlePt,
      title_en: fields.titleEn,
      description_pt: fields.descriptionPt,
      description_en: fields.descriptionEn,
      project_id: fields.projectId,
      published: fields.published,
    })
    .eq('id', id);

  if (updateError) return { error: updateError.message };

  revalidateAll();
  return redirect({ href: '/admin/hero', locale });
}

async function deleteHeroSlideStorage(slideId: number) {
  const client = createServiceRoleClient();
  const { data } = await client.storage.from('project-media').list(`hero/${slideId}`);
  if (data && data.length > 0) {
    await client.storage
      .from('project-media')
      .remove(data.map((file) => `hero/${slideId}/${file.name}`));
  }
}

export async function deleteHeroSlide(id: number, locale: AppLocale) {
  const supabase = await createClient();
  await supabase.from('hero_slides').delete().eq('id', id);
  await deleteHeroSlideStorage(id);

  revalidateAll();
  return redirect({ href: '/admin/hero', locale });
}

export async function reorderHeroSlides(orderedIds: number[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('hero_slides').update({ position: index }).eq('id', id),
    ),
  );
  revalidateAll();
}
