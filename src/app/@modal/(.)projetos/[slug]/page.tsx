import { notFound } from 'next/navigation';

import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { getProject, getProjectParams } from '@/content/projects';

export function generateStaticParams() {
  return getProjectParams();
}

/** Rota interceptada: clicar num card abre o projeto em modal sobre a home. */
export default async function ProjectModalPage({ params }: PageProps<'/projetos/[slug]'>) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const titleId = `projeto-${project.slug}-title`;

  return (
    <ProjectModal slug={project.slug} titleId={titleId}>
      <ProjectDetails project={project} titleId={titleId} titleAs="h2" />
    </ProjectModal>
  );
}
