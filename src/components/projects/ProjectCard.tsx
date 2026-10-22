import Link from 'next/link';

import { BrandIcon } from '@/components/icons/BrandIcon';
import { skillIcon } from '@/content/skills';
import { ui } from '@/content/ui';
import type { Project } from '@/lib/types';
import { cn, projectDate, t } from '@/lib/utils';

import { ProjectCover } from './ProjectCover';

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

/**
 * Capa ocupando o card todo, escurecida, com título + stack por cima. No hover/foco: o card
 * cresce, a camada escura e a stack somem e abre uma barra abaixo da capa com a data e o
 * "Ver mais" (por cima do conteúdo de baixo, sem empurrar o layout).
 * Em telas de toque (sem hover) a camada fica.
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { stack } = project;

  return (
    <Link
      href={`/projetos/${project.slug}`}
      scroll={false}
      data-project-link={project.slug}
      className="group relative block rounded-lg transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:scale-[1.03] motion-reduce:transform-none"
    >
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-[border-color,border-radius,box-shadow] duration-300 group-hover:rounded-b-none group-hover:border-primary group-hover:shadow-lg group-focus-visible:rounded-b-none group-focus-visible:border-primary">
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
            <ul className="flex flex-wrap justify-center gap-1.5" aria-label={t(ui.projects.stack)}>
              {stack.map((tech) => {
                const icon = skillIcon(tech);
                return (
                  <li
                    key={tech}
                    title={tech}
                    className="inline-flex h-7.5 min-w-7.5 items-center justify-center rounded-md border border-border bg-surface px-1.5 text-primary-ink"
                  >
                    {icon ? (
                      <>
                        <BrandIcon name={icon} className="size-4.5" />
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

      {/* Barra que abre abaixo da capa no hover/foco (0fr → 1fr anima a altura). */}
      <div className="absolute inset-x-0 top-full grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 rounded-b-lg border border-t-0 border-primary bg-surface px-4 py-3">
            <span className="text-step--1 font-medium">{projectDate(project)}</span>
            <span className="rounded-full bg-primary px-4 py-1.5 text-step--1 font-semibold text-primary-foreground">
              {t(ui.projects.more)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
