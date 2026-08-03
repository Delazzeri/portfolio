import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('Common');
  return <p className="py-24 text-center text-foreground/50">{t('emptyState')}</p>;
}
