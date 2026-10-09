import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Section } from '@/components/ui/Section';
import { featuredProjects, projectsByYear } from '@/content/projects';
import { sectionLabels, ui } from '@/content/ui';
import { t } from '@/lib/utils';

export function Projects() {
  return (
    <Section id="projetos" title={t(sectionLabels.projetos)}>
      <div className="flex flex-col gap-16">
        {featuredProjects.length > 0 && (
          <div>
            <h3 className="mb-6 text-step-2 font-semibold">{t(ui.projects.featured)}</h3>
            <ProjectGrid projects={featuredProjects} featured />
          </div>
        )}
        <div>
          <h3 className="mb-6 text-step-2 font-semibold">{t(ui.projects.all)}</h3>
          <ProjectGrid projects={projectsByYear} />
        </div>
      </div>
    </Section>
  );
}
