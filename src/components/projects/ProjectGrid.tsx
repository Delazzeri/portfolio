import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

import { ProjectCard } from './ProjectCard';

type ProjectGridProps = {
  projects: Project[];
  featured?: boolean;
};

export function ProjectGrid({ projects, featured = false }: ProjectGridProps) {
  return (
    <ul className={cn('grid gap-6', featured ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Reveal index={index} className="h-full">
            <ProjectCard project={project} featured={featured} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
