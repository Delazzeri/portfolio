import { notFound } from 'next/navigation';
import { HeroSlideForm } from '@/components/admin/HeroSlideForm';
import { getHeroSlideById } from '@/lib/data/hero-slides';
import { getProjectsByType } from '@/lib/data/projects';
import type { AppLocale } from '@/i18n/routing';

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [slide, projects] = await Promise.all([
    getHeroSlideById(Number(id)),
    getProjectsByType(null),
  ]);
  if (!slide) notFound();

  return <HeroSlideForm locale={locale as AppLocale} projects={projects} slide={slide} />;
}
