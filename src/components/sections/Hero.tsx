import { Download, MessageCircle } from 'lucide-react';
import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { t } from '@/lib/utils';

/** Seção "Sobre". Sem <Reveal>: o Hero aparece já visível para não atrasar o LCP. */
export function Hero() {
  const titleId = 'sobre-title';
  const paragraphs = t(profile.bio).split('\n\n');

  return (
    <section
      id="sobre"
      aria-labelledby={titleId}
      className="flex min-h-[calc(100svh-var(--header-height))] items-center py-section"
    >
      <div className="container-page grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <Image
          src={profile.avatar}
          alt={`${t(ui.hero.avatarAlt)} ${profile.name}`}
          width={224}
          height={224}
          sizes="(min-width: 768px) 224px, 160px"
          priority
          className="size-40 rounded-full border border-border bg-surface object-cover shadow-md md:size-56"
        />

        <div className="max-w-2xl">
          <p className="text-step-0 font-semibold text-primary">{t(profile.role)}</p>
          <h1 id={titleId} className="mt-2 text-step-5 font-bold">
            {profile.name}
          </h1>
          <div className="mt-6 space-y-4 text-step-1 text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={profile.cvUrl} target="_blank" rel="noopener" download>
              <Download aria-hidden className="size-4" />
              {t(ui.hero.downloadCv)}
            </ButtonLink>
            <ButtonLink href="#contatos" variant="outline">
              <MessageCircle aria-hidden className="size-4" />
              {t(ui.hero.contact)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
