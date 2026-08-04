'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import type { HeroSlide } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import { pageContainer } from '@/lib/page-container';

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('Common');
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused || slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reducedMotion, paused, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const title = pickLocale(slide.titlePt, slide.titleEn, locale);
  const description = pickLocale(slide.descriptionPt, slide.descriptionEn, locale);

  function goTo(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') goTo(index + 1);
        if (event.key === 'ArrowLeft') goTo(index - 1);
      }}
      className="relative mb-6 h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[70vh]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slide.mediaType === 'video' ? (
            <video
              key={slide.mediaUrl}
              src={slide.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={slide.mediaUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className={pageContainer('relative flex h-full flex-col justify-end pb-14 sm:pb-16')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-xl"
          >
            <h1 className="line-clamp-2 text-[32px] font-semibold tracking-tight text-white sm:text-[44px]">
              {title}
            </h1>
            <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
              {description}
            </p>
            {slide.projectSlug && slide.projectType && (
              <Link
                href={`/${slide.projectType}/${slide.projectSlug}`}
                className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-black transition-opacity hover:opacity-90"
              >
                {t('viewProject')}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="mt-8 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="h-1.5 w-5 rounded-full bg-white/40 transition-all data-[current=true]:w-6 data-[current=true]:bg-white"
                data-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
