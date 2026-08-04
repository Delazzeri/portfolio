import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getProjectsByType } from '@/lib/data/projects';
import { pickLocale } from '@/lib/localized-field';
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminDashboardPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Admin');
  const projects = await getProjectsByType(null);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/projects/new"
        className="self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {t('newProject')}
      </Link>

      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between rounded-2xl border border-hairline bg-surface px-4 py-3"
          >
            <Link href={`/admin/projects/${project.id}/edit`} className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
                {pickLocale(project.titlePt, project.titleEn, locale)}
              </p>
              <p className="truncate text-xs text-foreground/50">
                {project.type} · /{project.slug}
              </p>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-foreground/60">
                {project.published ? t('published') : t('draft')}
              </span>
              <DeleteProjectButton id={Number(project.id)} locale={locale} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
