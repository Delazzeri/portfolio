import { ProjectForm } from '@/components/admin/ProjectForm';
import { getAllTags } from '@/lib/data/tags';
import type { AppLocale } from '@/i18n/routing';

export default async function NewProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allTags = await getAllTags();

  return <ProjectForm locale={locale as AppLocale} allTags={allTags} />;
}
