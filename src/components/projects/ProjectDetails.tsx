import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { BrandIcon } from '@/components/icons/BrandIcon';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { skillIcon } from '@/content/skills';
import { ui } from '@/content/ui';
import type { Project } from '@/lib/types';
import { cn, projectDate, t } from '@/lib/utils';
import { youtubeEmbedUrl } from '@/lib/video';

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
  /** Mídia com prioridade de carregamento (página completa). */
  priority?: boolean;
};

/**
 * Conteúdo do projeto — o mesmo na página `/projetos/[slug]` e no modal.
 * Desktop: mídia (vídeo ou capa + galeria), stack e links à esquerda; título e texto à direita.
 * Mobile: mídia → texto → stack e links.
 */
export function ProjectDetails({
  project,
  titleId,
  titleAs: Title,
  priority,
}: ProjectDetailsProps) {
  const videoUrl = project.video && youtubeEmbedUrl(project.video);
  const links = linkOrder.flatMap((key) => {
    const href = project.links[key];
    return href ? [{ key, href }] : [];
  });

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6">
      <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title={`${t(ui.projects.video)}: ${project.title}`}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-full rounded-md border border-border bg-surface-elevated"
          />
        ) : (
          <ProjectCover
            project={project}
            sizes="(min-width: 1200px) 600px, (min-width: 1024px) 50vw, 100vw"
            priority={priority}
          />
        )}

        {project.gallery && project.gallery.length > 0 && (
          <ul className="grid grid-cols-2 gap-3" aria-label={t(ui.projects.gallery)}>
            {project.gallery.map((src, index) => (
              <li
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-md border border-border"
              >
                <Image
                  src={src}
                  alt={`${t(ui.projects.galleryAlt)} ${project.title} (${index + 1})`}
                  fill
                  sizes="(min-width: 1200px) 300px, (min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <header className="flex flex-col gap-2 pr-10">
          <p className="text-step--1 font-semibold text-muted">
            {t(ui.projectTypes[project.type])}
            {project.role && <> · {t(project.role)}</>}
            {' · '}
            <span className="text-primary-ink">{projectDate(project)}</span>
          </p>
          <Title
            id={titleId}
            tabIndex={-1}
            data-autofocus
            className={cn(
              'font-bold text-primary-ink outline-none',
              Title === 'h1' ? 'text-step-5' : 'text-step-4',
            )}
          >
            {project.title}
          </Title>
        </header>

        {/* \n vira quebra de linha (listas com "•"), \n\n separa parágrafos. */}
        <p className="text-step-0 whitespace-pre-line text-muted">{t(project.description)}</p>
      </div>

      {/* Stack e links logo abaixo da mídia (desktop); no mobile, depois do texto. */}
      {(project.stack.length > 0 || links.length > 0) && (
        <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2 lg:self-start">
          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label={t(ui.projects.stack)}>
              {project.stack.map((tech) => {
                const icon = skillIcon(tech);
                return (
                  <li key={tech}>
                    <Badge className="gap-1.5">
                      {icon && <BrandIcon name={icon} className="size-3.5 text-primary-ink" />}
                      {tech}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}

          {links.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <ButtonLink href={href} target="_blank" rel="noopener noreferrer">
                    {linkIcons[key]}
                    {t(ui.projectLinks[key])}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
