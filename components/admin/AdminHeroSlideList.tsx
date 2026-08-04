'use client';

import { useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { reorderHeroSlides } from '@/lib/actions/hero-slides';
import { pickLocale } from '@/lib/localized-field';
import { DeleteHeroSlideButton } from '@/components/admin/DeleteHeroSlideButton';
import type { AppLocale } from '@/i18n/routing';
import type { HeroSlide } from '@/lib/types';

type AdminHeroSlideListLabels = {
  published: string;
  draft: string;
};

export function AdminHeroSlideList({
  locale,
  slides: initialSlides,
  labels,
}: {
  locale: AppLocale;
  slides: HeroSlide[];
  labels: AdminHeroSlideListLabels;
}) {
  const [slides, setSlides] = useState(initialSlides);
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex((s) => s.id === active.id);
    const newIndex = slides.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(slides, oldIndex, newIndex);
    setSlides(reordered);

    try {
      await reorderHeroSlides(reordered.map((s) => Number(s.id)));
    } catch {
      setSlides(initialSlides);
      router.refresh();
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={slides.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {slides.map((slide) => (
            <SortableRow key={slide.id} slide={slide} locale={locale} labels={labels} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  slide,
  locale,
  labels,
}: {
  slide: HeroSlide;
  locale: AppLocale;
  labels: AdminHeroSlideListLabels;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slide.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-2xl border border-hairline bg-surface px-4 py-3"
    >
      <button
        type="button"
        className="mr-3 shrink-0 cursor-grab touch-none text-foreground/40 active:cursor-grabbing"
        aria-label="Reordenar"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <Link href={`/admin/hero/${slide.id}/edit`} className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">
          {pickLocale(slide.titlePt, slide.titleEn, locale)}
        </p>
        <p className="truncate text-xs text-foreground/50">
          {slide.mediaType === 'video' ? 'Vídeo' : 'Imagem'}
          {slide.projectSlug ? ` · vinculado a /${slide.projectSlug}` : ''}
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-foreground/60">
          {slide.published ? labels.published : labels.draft}
        </span>
        <DeleteHeroSlideButton id={Number(slide.id)} locale={locale} />
      </div>
    </li>
  );
}
