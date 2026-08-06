'use client';

import { deleteToolTag } from '@/lib/actions/tags';
import type { AppLocale } from '@/i18n/routing';

export function DeleteToolTagButton({ id, locale }: { id: number; locale: AppLocale }) {
  return (
    <form
      action={deleteToolTag.bind(null, id, locale)}
      onSubmit={(event) => {
        if (
          !confirm(
            'Excluir esta ferramenta? Ela será removida de qualquer projeto que a utilize. Essa ação não pode ser desfeita.',
          )
        )
          event.preventDefault();
      }}
    >
      <button type="submit" className="text-xs text-red-500 hover:text-red-600">
        Excluir
      </button>
    </form>
  );
}
