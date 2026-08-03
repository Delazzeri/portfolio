import { notFound } from 'next/navigation';
import { AccentScope } from '@/components/AccentScope';
import { Modal } from '@/components/Modal';
import { ProjectDetail } from '@/components/ProjectDetail';
import { getProjectBySlug } from '@/lib/data/projects';

export default async function DesignProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'design');
  if (!project) notFound();

  return (
    <AccentScope section="design">
      <Modal layoutId={`project-cover-${project.id}`}>
        <ProjectDetail project={project} />
      </Modal>
    </AccentScope>
  );
}
