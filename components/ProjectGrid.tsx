import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations('Common');

  if (projects.length === 0) {
    return <p className="text-foreground/50">{t('emptyState')}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
