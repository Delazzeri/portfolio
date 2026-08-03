import { getTranslations } from 'next-intl/server';
import { AccentScope } from '@/components/AccentScope';
import { ProjectGrid } from '@/components/ProjectGrid';
import { getDummyProjectsByType } from '@/lib/dummy-projects';

export default async function AllPage() {
  const t = await getTranslations('Nav');
  const projects = getDummyProjectsByType(null);

  return (
    <AccentScope section="all">
      <h1 className="mb-8 text-[32px] font-semibold tracking-tight text-foreground">{t('all')}</h1>
      <ProjectGrid projects={projects} />
    </AccentScope>
  );
}
