import { getTranslations } from 'next-intl/server';
import { AccentScope } from '@/components/AccentScope';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProjectRow } from '@/components/ProjectRow';
import { pageContainer } from '@/lib/page-container';
import { groupByTag } from '@/lib/group-by-tag';
import { getFeaturedProjects, getProjectsByType } from '@/lib/data/projects';
import { getAllTags } from '@/lib/data/tags';

export default async function AllPage() {
  const t = await getTranslations('Common');
  const [featured, projects, tags] = await Promise.all([
    getFeaturedProjects(null),
    getProjectsByType(null),
    getAllTags(),
  ]);
  const rows = groupByTag(projects, tags);
  const seenProjectIds = new Set<string>();

  return (
    <AccentScope section="all">
      <HeroCarousel projects={featured} />
      {rows.length === 0 ? (
        <p className={pageContainer('text-foreground/50')}>{t('emptyState')}</p>
      ) : (
        <div className="flex flex-col">
          {rows.map(({ tag, projects: tagProjects }) => (
            <ProjectRow key={tag.id} tag={tag} projects={tagProjects} seenProjectIds={seenProjectIds} />
          ))}
        </div>
      )}
    </AccentScope>
  );
}
