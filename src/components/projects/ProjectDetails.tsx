import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { BrandIcon } from '@/components/icons/BrandIcon';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { ui } from '@/content/ui';
import type { Project } from '@/lib/types';
import { cn, t } from '@/lib/utils';

import { ProjectCover } from './ProjectCover';

type LinkKey = keyof Project['links'];

const linkIcons: Record<LinkKey, ReactNode> = {
  live: <ExternalLink aria-hidden className="size-4" />,
  repo: <BrandIcon name="github" className="size-4" />,
  linkedinPost: <BrandIcon name="linkedin" className="size-4" />,
  figma: <BrandIcon name="figma" className="size-4" />,
};

const linkOrder: LinkKey[] = ['live', 'repo', 'linkedinPost', 'figma'];

type ProjectDetailsProps = {
  project: Project;
  titleId: string;
  /** h1 na página completa, h2 dentro do modal. */
  titleAs: 'h1' | 'h2';
  /** Capa com prioridade de carregamento (página completa). */
  priority?: boolean;
};

/** Conteúdo do projeto — o mesmo na página `/projetos/[slug]` e no modal. */
export function ProjectDetails({
  project,
  titleId,
  titleAs: Title,
  priority,
}: ProjectDetailsProps) {
  const paragraphs = t(project.description).split('\n\n');
  const links = linkOrder.flatMap((key) => {
    const href = project.links[key];
    return href ? [{ key, href }] : [];
  });

  return (
    <article className="flex flex-col gap-8">
      <ProjectCover project={project} sizes="(min-width: 896px) 832px, 100vw" priority={priority} />

      <header className="flex flex-col gap-3">
        <p className="text-step--1 font-semibold text-primary">
          {t(ui.projectTypes[project.type])} · {project.year}
        </p>
        <Title
          id={titleId}
          tabIndex={-1}
          data-autofocus
          className={cn('font-bold outline-none', Title === 'h1' ? 'text-step-5' : 'text-step-4')}
        >
          {project.title}
        </Title>
        <p className="text-step-1 text-muted">{t(project.summary)}</p>
      </header>

      {links.length > 0 && (
        <ul className="flex flex-wrap gap-3">
          {links.map(({ key, href }, index) => (
            <li key={key}>
              <ButtonLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant={index === 0 ? 'primary' : 'outline'}
              >
                {linkIcons[key]}
                {t(ui.projectLinks[key])}
              </ButtonLink>
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-8 md:grid-cols-[1fr_14rem]">
        <div className="space-y-4 text-step-0">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="flex flex-col gap-5 text-step--1">
          {project.role && (
            <div>
              <dt className="font-semibold text-muted">{t(ui.projects.role)}</dt>
              <dd className="mt-1">{t(project.role)}</dd>
            </div>
          )}
          {project.stack.length > 0 && (
            <div>
              <dt className="font-semibold text-muted">{t(ui.projects.stack)}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {project.video && (
        <video
          controls
          playsInline
          preload="metadata"
          poster={project.cover}
          aria-label={`${t(ui.projects.video)}: ${project.title}`}
          className="aspect-video w-full rounded-md border border-border bg-surface-elevated"
        >
          <source src={project.video} />
        </video>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section aria-label={t(ui.projects.gallery)}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src, index) => (
              <li
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-md border border-border"
              >
                <Image
                  src={src}
                  alt={`${t(ui.projects.galleryAlt)} ${project.title} (${index + 1})`}
                  fill
                  sizes="(min-width: 896px) 416px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
