import { getTranslations } from 'next-intl/server';
import { AccentScope } from '@/components/AccentScope';
import { ProjectGrid } from '@/components/ProjectGrid';
import { getProjectsByType } from '@/lib/data/projects';

export default async function DesignPage() {
  const t = await getTranslations('Nav');
  const projects = await getProjectsByType('design');

  return (
    <AccentScope section="design">
      <h1 className="mb-8 text-[32px] font-semibold tracking-tight text-foreground">
        {t('design')}
      </h1>
      <ProjectGrid projects={projects} />
    </AccentScope>
  );
}
