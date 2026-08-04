'use client';

import { useActionState, useState } from 'react';
import type { HeroSlide, Project } from '@/lib/types';
import type { AppLocale } from '@/i18n/routing';
import {
  createHeroSlide,
  updateHeroSlide,
  type HeroSlideFormState,
} from '@/lib/actions/hero-slides';
import { pickLocale } from '@/lib/localized-field';
import { HeroMediaField } from './HeroMediaField';

const inputClass =
  'rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent';

export function HeroSlideForm({
  locale,
  projects,
  slide,
}: {
  locale: AppLocale;
  projects: Project[];
  slide?: HeroSlide;
}) {
  const action = slide
    ? updateHeroSlide.bind(null, Number(slide.id), locale)
    : createHeroSlide.bind(null, locale);
  const [state, formAction, pending] = useActionState<HeroSlideFormState, FormData>(action, {});

  const [mediaType, setMediaType] = useState<'image' | 'video'>(slide?.mediaType ?? 'image');

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          Título (PT)
          <input name="titlePt" defaultValue={slide?.titlePt} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Title (EN)
          <input name="titleEn" defaultValue={slide?.titleEn} required className={inputClass} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          Descrição (PT)
          <textarea
            name="descriptionPt"
            defaultValue={slide?.descriptionPt}
            rows={3}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Description (EN)
          <textarea
            name="descriptionEn"
            defaultValue={slide?.descriptionEn}
            rows={3}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr_auto]">
        <label className="flex flex-col gap-1.5 text-sm">
          Tipo de mídia
          <select
            name="mediaType"
            value={mediaType}
            onChange={(event) => setMediaType(event.target.value as 'image' | 'video')}
            className={inputClass}
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Projeto vinculado (opcional)
          <select
            name="projectId"
            defaultValue={
              slide?.projectSlug
                ? projects.find((p) => p.slug === slide.projectSlug)?.id
                : ''
            }
            className={inputClass}
          >
            <option value="">Nenhum</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {pickLocale(project.titlePt, project.titleEn, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={slide?.published ?? true}
            className="h-4 w-4"
          />
          Publicado
        </label>
      </div>

      <HeroMediaField mediaType={mediaType} existingUrl={slide?.mediaUrl} />

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Salvando…' : 'Salvar'}
      </button>
    </form>
  );
}
