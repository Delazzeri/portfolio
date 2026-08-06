'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { url: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const t = useTranslations('Common');
  const [index, setIndex] = useState(startIndex);

  const showPrev = useCallback(
    () => setIndex((current) => (current - 1 + images.length) % images.length),
    [images.length],
  );
  const showNext = useCallback(
    () => setIndex((current) => (current + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    }
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, showPrev, showNext]);

  const current = images[index];
  if (!current) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <motion.div
          key={current.url}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative h-full w-full max-w-6xl"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={current.url}
            alt={current.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
