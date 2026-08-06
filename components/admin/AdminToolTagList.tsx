import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { pickLocale } from '@/lib/localized-field';
import { DeleteToolTagButton } from '@/components/admin/DeleteToolTagButton';
import type { AppLocale } from '@/i18n/routing';
import type { Tag } from '@/lib/types';

export function AdminToolTagList({ locale, tags }: { locale: AppLocale; tags: Tag[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {tags.map((tag) => (
        <li
          key={tag.id}
          className="flex items-center justify-between rounded-2xl border border-hairline bg-surface px-4 py-3"
        >
          <Link href={`/admin/tools/${tag.id}/edit`} className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-solid">
              {tag.iconUrl && (
                <Image src={tag.iconUrl} alt="" fill className="object-contain p-1" />
              )}
            </div>
            <p className="truncate font-medium text-foreground">
              {pickLocale(tag.namePt, tag.nameEn, locale)}
            </p>
          </Link>
          <DeleteToolTagButton id={Number(tag.id)} locale={locale} />
        </li>
      ))}
    </ul>
  );
}
