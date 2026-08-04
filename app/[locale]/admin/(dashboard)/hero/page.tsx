import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllHeroSlidesForAdmin } from '@/lib/data/hero-slides';
import { AdminHeroSlideList } from '@/components/admin/AdminHeroSlideList';
import type { AppLocale } from '@/i18n/routing';

export default async function AdminHeroPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Admin');
  const slides = await getAllHeroSlidesForAdmin();

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/hero/new"
        className="self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {t('newHeroSlide')}
      </Link>

      <AdminHeroSlideList
        locale={locale}
        slides={slides}
        labels={{ published: t('published'), draft: t('draft') }}
      />
    </div>
  );
}
