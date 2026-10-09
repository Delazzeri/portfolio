import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { getProject, getProjectParams } from '@/content/projects';
import { ui } from '@/content/ui';
import { t } from '@/lib/utils';

export function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({
  params,
}: PageProps<'/projetos/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: t(project.summary) };
}

/** Página completa do projeto (acesso direto ou recarregando a URL do modal). */
export default async function ProjectPage({ params }: PageProps<'/projetos/[slug]'>) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="container-page py-section">
      <Link
        href="/#projetos"
        className="mb-8 inline-flex items-center gap-2 rounded-sm text-step--1 font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t(ui.projects.back)}
      </Link>
      <ProjectDetails
        project={project}
        titleId={`projeto-${project.slug}-title`}
        titleAs="h1"
        priority
      />
    </div>
  );
}
