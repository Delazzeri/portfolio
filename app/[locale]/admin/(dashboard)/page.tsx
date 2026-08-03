import { getLocale, getTranslations } from 'next-intl/server';
import { getProjectsByType } from '@/lib/data/projects';
import { pickLocale } from '@/lib/localized-field';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminDashboardPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Admin');
  const projects = await getProjectsByType(null);

  return (
    <ul className="flex flex-col gap-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between rounded-2xl border border-hairline bg-surface px-4 py-3"
        >
          <div>
            <p className="font-medium text-foreground">
              {pickLocale(project.titlePt, project.titleEn, locale)}
            </p>
            <p className="text-xs text-foreground/50">
              {project.type} · /{project.slug}
            </p>
          </div>
          <span className="text-xs font-medium text-foreground/60">
            {project.published ? t('published') : t('draft')}
          </span>
        </li>
      ))}
    </ul>
  );
}
