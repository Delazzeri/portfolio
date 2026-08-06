import type { Project, Tag } from '@/lib/types';

export function groupByTag(projects: Project[], tags: Tag[]): { tag: Tag; projects: Project[] }[] {
  return tags
    .filter((tag) => tag.category === 'topic')
    .map((tag) => ({
      tag,
      projects: projects.filter((project) => project.tags.some((t) => t.id === tag.id)),
    }))
    .filter((group) => group.projects.length > 0);
}
