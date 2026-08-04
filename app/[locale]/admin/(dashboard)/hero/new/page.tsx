import { HeroSlideForm } from '@/components/admin/HeroSlideForm';
import { getProjectsByType } from '@/lib/data/projects';
import type { AppLocale } from '@/i18n/routing';

export default async function NewHeroSlidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects = await getProjectsByType(null);

  return <HeroSlideForm locale={locale as AppLocale} projects={projects} />;
}
