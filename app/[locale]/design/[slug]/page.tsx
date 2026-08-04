import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { AccentScope } from '@/components/AccentScope';
import { ProjectDetail } from '@/components/ProjectDetail';
import { getProjectBySlug } from '@/lib/data/projects';
import { pickLocale } from '@/lib/localized-field';
import { glassCard } from '@/lib/glass-card';
import type { AppLocale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'design');
  if (!project) return {};
  const locale = (await getLocale()) as AppLocale;
  return {
    title: pickLocale(project.titlePt, project.titleEn, locale),
    description: pickLocale(project.descriptionPt, project.descriptionEn, locale),
    openGraph: { images: [project.bannerImageUrl] },
  };
}

export default async function DesignProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'design');
  if (!project) notFound();

  return (
    <AccentScope section="design">
      <div className={glassCard('-mt-24 sm:-mt-28')}>
        <ProjectDetail project={project} />
      </div>
    </AccentScope>
  );
}
