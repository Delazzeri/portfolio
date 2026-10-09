import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Section } from '@/components/ui/Section';
import { getFeaturedProjects, getProjects } from '@/content/projects';
import { sectionLabels, ui } from '@/content/ui';
import { t } from '@/lib/utils';

export function Projects() {
  const projects = getProjects();
  const featured = getFeaturedProjects();

  return (
    <Section id="projetos" title={t(sectionLabels.projetos)}>
      <div className="flex flex-col gap-16">
        {featured.length > 0 && (
          <div>
            <h3 className="mb-6 text-step-2 font-semibold">{t(ui.projects.featured)}</h3>
            <ProjectGrid projects={featured} featured />
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h3 className="mb-6 text-step-2 font-semibold">{t(ui.projects.all)}</h3>
            <ProjectGrid projects={projects} />
          </div>
        )}
      </div>
    </Section>
  );
}
