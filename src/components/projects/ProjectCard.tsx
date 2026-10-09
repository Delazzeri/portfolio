import Link from 'next/link';

import { BrandIcon } from '@/components/icons/BrandIcon';
import { skillIcon } from '@/content/skills';
import { ui } from '@/content/ui';
import type { Project } from '@/lib/types';
import { cn, t } from '@/lib/utils';

import { ProjectCover } from './ProjectCover';

const MAX_STACK = 4;

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

/**
 * Capa escurecida com título + stack por cima. No hover/foco: o card cresce, a camada
 * escura e a stack somem e aparece o "Ver mais". Em telas de toque (sem hover) a camada fica.
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const stack = project.stack.slice(0, MAX_STACK);

  return (
    <Link
      href={`/projetos/${project.slug}`}
      scroll={false}
      data-project-link={project.slug}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition duration-300 ease-out hover:scale-[1.03] hover:border-primary hover:shadow-lg focus-visible:scale-[1.03] motion-reduce:transform-none"
    >
      <div className="relative">
        <ProjectCover
          project={project}
          labelled={false}
          className="rounded-none border-0"
          sizes={
            featured
              ? '(min-width: 1200px) 600px, (min-width: 768px) 50vw, 100vw'
              : '(min-width: 1200px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          }
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 p-4 text-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
          <h4 className={cn('font-bold', featured ? 'text-step-3' : 'text-step-2')}>
            {project.title}
          </h4>
          {stack.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2" aria-label={t(ui.projects.stack)}>
              {stack.map((tech) => {
                const icon = skillIcon(tech);
                return (
                  <li
                    key={tech}
                    title={tech}
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-border bg-surface px-2 text-primary-ink"
                  >
                    {icon ? (
                      <>
                        <BrandIcon name={icon} className="size-6" />
                        <span className="sr-only">{tech}</span>
                      </>
                    ) : (
                      <span className="text-step--1 font-medium">{tech}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border px-4 py-3 transition-colors group-hover:border-primary">
        <span className="text-step--1 font-medium text-muted">{project.year}</span>
        <span className="rounded-full bg-primary px-4 py-1.5 text-step--1 font-semibold text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {t(ui.projects.more)}
        </span>
      </div>
    </Link>
  );
}
