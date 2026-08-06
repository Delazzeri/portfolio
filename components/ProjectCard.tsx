'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import type { Project } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import { useHoverCapable } from '@/hooks/useHoverCapable';
import { glassCard } from '@/lib/glass-card';

export function ProjectCard({
  project,
  variant = 'grid',
  enableLayoutAnimation = true,
}: {
  project: Project;
  variant?: 'grid' | 'row';
  enableLayoutAnimation?: boolean;
}) {
  const locale = useLocale() as AppLocale;
  const hoverCapable = useHoverCapable();
  const title = pickLocale(project.titlePt, project.titleEn, locale);
  const badgeTag = project.tags.find((tag) => tag.category === 'topic');

  return (
    <Link
      href={`/${project.type}/${project.slug}`}
      className={
        variant === 'row'
          ? 'group relative block w-[220px] shrink-0 snap-start rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[260px]'
          : 'group relative block rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      }
    >
      <motion.div
        layoutId={enableLayoutAnimation ? `project-cover-${project.id}` : undefined}
        className={glassCard(
          'relative',
          variant === 'row' ? 'aspect-[2/3] rounded-2xl' : 'aspect-[4/3]',
        )}
        whileHover={hoverCapable ? { scale: 1.035, y: -4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{ boxShadow: '0 1px 2px var(--shadow-color)' }}
      >
        <Image
          src={project.coverImageUrl}
          alt={title}
          fill
          sizes={
            variant === 'row'
              ? '(min-width: 640px) 260px, 220px'
              : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw'
          }
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 pt-10">
          <p className="truncate text-[15px] font-medium text-white">{title}</p>
          {badgeTag && (
            <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-wide text-white/70">
              {pickLocale(badgeTag.namePt, badgeTag.nameEn, locale)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
