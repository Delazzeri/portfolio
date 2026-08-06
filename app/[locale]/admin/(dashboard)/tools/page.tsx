import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllTags } from '@/lib/data/tags';
import { AdminToolTagList } from '@/components/admin/AdminToolTagList';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminToolsPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Admin');
  const tags = await getAllTags();
  const toolTags = tags.filter((tag) => tag.category === 'tool');

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/tools/new"
        className="self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {t('newToolTag')}
      </Link>

      <AdminToolTagList locale={locale} tags={toolTags} />
    </div>
  );
}
