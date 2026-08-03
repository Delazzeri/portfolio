import { notFound } from 'next/navigation';
import { AccentScope } from '@/components/AccentScope';
import { Modal } from '@/components/Modal';
import { ProjectDetail } from '@/components/ProjectDetail';
import { getProjectBySlug } from '@/lib/data/projects';

export default async function AllProjectModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <AccentScope section="all">
      <Modal layoutId={`project-cover-${project.id}`}>
        <ProjectDetail project={project} />
      </Modal>
    </AccentScope>
  );
}
