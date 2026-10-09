'use client';

import { type RefObject, useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

type UseDialogOptions = {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

/**
 * Comportamento comum de diálogos: foco inicial, foco preso, `Esc` fecha e trava o scroll da página.
 * O foco inicial vai para o elemento com `data-autofocus` (ou o primeiro focável).
 */
export function useDialog({ open, containerRef, onClose }: UseDialogOptions) {
  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    const initial =
      container?.querySelector<HTMLElement>('[data-autofocus]') ??
      container?.querySelector<HTMLElement>(FOCUSABLE);
    initial?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      const index =
        document.activeElement instanceof HTMLElement
          ? focusable.indexOf(document.activeElement)
          : -1;

      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && index === focusable.length - 1) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, containerRef, onClose]);
}
