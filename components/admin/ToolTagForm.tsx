'use client';

import { useActionState, useState } from 'react';
import type { Tag } from '@/lib/types';
import type { AppLocale } from '@/i18n/routing';
import { createToolTag, updateToolTag, type ToolTagFormState } from '@/lib/actions/tags';
import { ToolIconField } from './ToolIconField';

const inputClass =
  'rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent';

export function ToolTagForm({ locale, tag }: { locale: AppLocale; tag?: Tag }) {
  const action = tag
    ? updateToolTag.bind(null, Number(tag.id), locale)
    : createToolTag.bind(null, locale);
  const [state, formAction, pending] = useActionState<ToolTagFormState, FormData>(action, {});

  const [namePt, setNamePt] = useState(tag?.namePt ?? '');
  const [nameEn, setNameEn] = useState(tag?.nameEn ?? '');

  function handleFileNameGuess(guess: string) {
    if (!namePt) setNamePt(guess);
    if (!nameEn) setNameEn(guess);
  }

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          Nome (PT)
          <input
            name="namePt"
            value={namePt}
            onChange={(event) => setNamePt(event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Name (EN)
          <input
            name="nameEn"
            value={nameEn}
            onChange={(event) => setNameEn(event.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      <ToolIconField existingUrl={tag?.iconUrl ?? undefined} onFileNameGuess={handleFileNameGuess} />

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
