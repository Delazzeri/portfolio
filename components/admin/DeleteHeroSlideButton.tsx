'use client';

import { deleteHeroSlide } from '@/lib/actions/hero-slides';
import type { AppLocale } from '@/i18n/routing';

export function DeleteHeroSlideButton({ id, locale }: { id: number; locale: AppLocale }) {
  return (
    <form
      action={deleteHeroSlide.bind(null, id, locale)}
      onSubmit={(event) => {
        if (!confirm('Excluir este slide? Essa ação não pode ser desfeita.'))
          event.preventDefault();
      }}
    >
      <button type="submit" className="text-xs text-red-500 hover:text-red-600">
        Excluir
      </button>
    </form>
  );
}
