import Image from 'next/image';

import { ui } from '@/content/ui';
import type { Project } from '@/lib/types';
import { cn, t } from '@/lib/utils';

type ProjectCoverProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Capa 16:10. Sem `cover`, mostra um bloco com o título (decorativo — o título já aparece ao lado). */
export function ProjectCover({ project, sizes, priority, className }: ProjectCoverProps) {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface-elevated',
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${t(ui.projects.coverAlt)} ${project.title}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-full items-center justify-center bg-linear-to-br from-primary/15 to-transparent p-6 text-center font-heading text-step-2 font-bold text-foreground/70"
        >
          {project.title}
        </div>
      )}
    </div>
  );
}
