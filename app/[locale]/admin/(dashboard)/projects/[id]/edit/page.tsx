import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { getProjectById } from '@/lib/data/projects';
import { getAllTags } from '@/lib/data/tags';
import type { AppLocale } from '@/i18n/routing';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [project, allTags] = await Promise.all([getProjectById(Number(id)), getAllTags()]);
  if (!project) notFound();

  return <ProjectForm locale={locale as AppLocale} allTags={allTags} project={project} />;
}
