import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getProjectsByType } from '@/lib/data/projects';
import { AdminProjectList } from '@/components/admin/AdminProjectList';
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

      <AdminProjectList
        locale={locale}
        projects={projects}
        labels={{ published: t('published'), draft: t('draft') }}
      />
    </div>
  );
}
