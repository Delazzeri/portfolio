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
import { reorderProjects } from '@/lib/actions/projects';
import { pickLocale } from '@/lib/localized-field';
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton';
import type { AppLocale } from '@/i18n/routing';
import type { Project } from '@/lib/types';

type AdminProjectListLabels = {
  published: string;
  draft: string;
};

export function AdminProjectList({
  locale,
  projects: initialProjects,
  labels,
}: {
  locale: AppLocale;
  projects: Project[];
  labels: AdminProjectListLabels;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);
    setProjects(reordered);

    try {
      await reorderProjects(reordered.map((p) => Number(p.id)));
    } catch {
      setProjects(initialProjects);
      router.refresh();
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {projects.map((project) => (
            <SortableRow key={project.id} project={project} locale={locale} labels={labels} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: AppLocale;
  labels: AdminProjectListLabels;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
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
      <Link href={`/admin/projects/${project.id}/edit`} className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">
          {pickLocale(project.titlePt, project.titleEn, locale)}
        </p>
        <p className="truncate text-xs text-foreground/50">
          {project.type} · /{project.slug}
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-foreground/60">
          {project.published ? labels.published : labels.draft}
        </span>
        <DeleteProjectButton id={Number(project.id)} locale={locale} />
      </div>
    </li>
  );
}
