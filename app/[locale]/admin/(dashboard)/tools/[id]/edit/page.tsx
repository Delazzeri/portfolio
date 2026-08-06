import { notFound } from 'next/navigation';
import { ToolTagForm } from '@/components/admin/ToolTagForm';
import { getTagById } from '@/lib/data/tags';
import type { AppLocale } from '@/i18n/routing';

export default async function EditToolTagPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const tag = await getTagById(Number(id));
  if (!tag || tag.category !== 'tool') notFound();

  return <ToolTagForm locale={locale as AppLocale} tag={tag} />;
}
