import { getLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import type { Project, Tag } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import { ProjectCard } from './ProjectCard';

export async function ProjectRow({
  tag,
  projects,
  seenProjectIds,
  section,
}: {
  tag: Tag;
  projects: Project[];
  seenProjectIds: Set<string>;
  section: 'design' | 'code' | 'all';
}) {
  const locale = (await getLocale()) as AppLocale;

  return (
    <section className="py-3">
      <h2 className="mb-3 px-4 text-[15px] font-semibold tracking-tight text-foreground/80 sm:px-6">
        {pickLocale(tag.namePt, tag.nameEn, locale)}
      </h2>
      <div className="scrollbar-none flex gap-4 overflow-x-auto px-4 pb-2 [scroll-snap-type:x_mandatory] sm:px-6">
        {projects.map((project) => {
          const alreadySeen = seenProjectIds.has(project.id);
          seenProjectIds.add(project.id);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              section={section}
              variant="row"
              enableLayoutAnimation={!alreadySeen}
            />
          );
        })}
      </div>
    </section>
  );
}
