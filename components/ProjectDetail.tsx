import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import type { Project } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';

export async function ProjectDetail({ project }: { project: Project }) {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Links');
  const title = pickLocale(project.titlePt, project.titleEn, locale);
  const description = pickLocale(project.descriptionPt, project.descriptionEn, locale);

  return (
    <article>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[28px] bg-surface-solid">
        <Image
          src={project.bannerImageUrl}
          alt={title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="space-y-6 px-6 py-8 sm:px-10">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-foreground sm:text-[34px]">
            {title}
          </h1>
          {project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                >
                  {pickLocale(tag.namePt, tag.nameEn, locale)}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="max-w-2xl text-[16px] leading-relaxed text-foreground/75">{description}</p>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-4 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              >
                {link.label || t(link.type)}
              </a>
            ))}
          </div>
        )}

        {project.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {project.images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline"
              >
                <Image src={image.imageUrl} alt="" fill sizes="50vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
