import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/lib/types';
import { cn, t } from '@/lib/utils';

import { ProjectCover } from './ProjectCover';

const MAX_BADGES = 4;

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      scroll={false}
      data-project-link={project.slug}
      className="group flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-3 shadow-sm transition-colors hover:border-primary"
    >
      <ProjectCover
        project={project}
        sizes={
          featured
            ? '(min-width: 1200px) 580px, (min-width: 768px) 50vw, 100vw'
            : '(min-width: 1200px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
        }
      />
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
        <h4
          className={cn(
            'font-semibold transition-colors group-hover:text-primary',
            featured ? 'text-step-2' : 'text-step-1',
          )}
        >
          {project.title}
        </h4>
        <p className={cn('text-muted', featured ? 'text-step-0' : 'text-step--1')}>
          {t(project.summary)}
        </p>
        {project.stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, MAX_BADGES).map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
