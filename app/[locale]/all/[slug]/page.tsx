import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { AccentScope } from '@/components/AccentScope';
import { ProjectDetail } from '@/components/ProjectDetail';
import { getDummyProjectBySlug } from '@/lib/dummy-projects';
import { pickLocale } from '@/lib/localized-field';
import type { AppLocale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDummyProjectBySlug(slug);
  if (!project) return {};
  const locale = (await getLocale()) as AppLocale;
  return {
    title: pickLocale(project.titlePt, project.titleEn, locale),
    description: pickLocale(project.descriptionPt, project.descriptionEn, locale),
    openGraph: { images: [project.bannerImageUrl] },
  };
}

export default async function AllProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getDummyProjectBySlug(slug);
  if (!project) notFound();

  return (
    <AccentScope section="all">
      <div className="-mt-24 overflow-hidden rounded-[28px] border border-hairline bg-surface-solid sm:-mt-28">
        <ProjectDetail project={project} />
      </div>
    </AccentScope>
  );
}
