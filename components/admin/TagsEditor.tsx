'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Tag, TagCategory } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import type { AppLocale } from '@/i18n/routing';

type PendingTag = { namePt: string; nameEn: string; category: TagCategory };

function TagCategoryEditor({
  tags,
  selected,
  onToggle,
  pending,
  onAddPending,
  locale,
  placeholderPt,
  placeholderEn,
  addLabel,
}: {
  tags: Tag[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  pending: PendingTag[];
  onAddPending: (namePt: string, nameEn: string) => void;
  locale: AppLocale;
  placeholderPt: string;
  placeholderEn: string;
  addLabel: string;
}) {
  const [newPt, setNewPt] = useState('');
  const [newEn, setNewEn] = useState('');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selected.has(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => onToggle(tag.id)}
              data-selected={isSelected}
              className="rounded-full border border-hairline px-3 py-1.5 text-sm text-foreground/70 transition-colors data-[selected=true]:border-accent data-[selected=true]:bg-accent data-[selected=true]:text-white"
            >
              {pickLocale(tag.namePt, tag.nameEn, locale)}
            </button>
          );
        })}
        {pending.map((tag, index) => (
          <span key={index} className="rounded-full bg-accent/10 px-3 py-1.5 text-sm text-accent">
            {pickLocale(tag.namePt, tag.nameEn, locale)}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={newPt}
          onChange={(event) => setNewPt(event.target.value)}
          placeholder={placeholderPt}
          className="rounded-xl border border-hairline bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          value={newEn}
          onChange={(event) => setNewEn(event.target.value)}
          placeholder={placeholderEn}
          className="rounded-xl border border-hairline bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="button"
          onClick={() => {
            if (!newPt.trim() || !newEn.trim()) return;
            onAddPending(newPt.trim(), newEn.trim());
            setNewPt('');
            setNewEn('');
          }}
          className="rounded-full border border-hairline px-3 py-1.5 text-sm text-foreground/70 hover:text-foreground"
        >
          {addLabel}
        </button>
      </div>
    </div>
  );
}

function ToolTagPicker({
  tags,
  selected,
  onToggle,
  locale,
}: {
  tags: Tag[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  locale: AppLocale;
}) {
  if (tags.length === 0) {
    return (
      <p className="text-sm text-foreground/50">
        Nenhuma ferramenta cadastrada —{' '}
        <Link href="/admin/tools" className="text-accent hover:underline">
          adicione em Admin → Ferramentas
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selected.has(tag.id);
        const label = pickLocale(tag.namePt, tag.nameEn, locale);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => onToggle(tag.id)}
            data-selected={isSelected}
            className="flex items-center gap-2 rounded-full border border-hairline py-1.5 pl-2 pr-3 text-sm text-foreground/70 transition-colors data-[selected=true]:border-accent data-[selected=true]:bg-accent data-[selected=true]:text-white"
          >
            {tag.iconUrl ? (
              <span className="relative h-5 w-5 shrink-0">
                <Image src={tag.iconUrl} alt="" fill className="object-contain" />
              </span>
            ) : null}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function TagsEditor({
  allTags,
  initialSelectedIds,
}: {
  allTags: Tag[];
  initialSelectedIds: string[];
}) {
  const locale = useLocale() as AppLocale;
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedIds));
  const [pending, setPending] = useState<PendingTag[]>([]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addPending(namePt: string, nameEn: string, category: TagCategory) {
    setPending((prev) => [...prev, { namePt, nameEn, category }]);
  }

  const topicTags = allTags.filter((tag) => tag.category === 'topic');
  const toolTags = allTags.filter((tag) => tag.category === 'tool');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
          Tags de seção
        </p>
        <TagCategoryEditor
          tags={topicTags}
          selected={selected}
          onToggle={toggle}
          pending={pending.filter((tag) => tag.category === 'topic')}
          onAddPending={(pt, en) => addPending(pt, en, 'topic')}
          locale={locale}
          placeholderPt="Nova tag (PT)"
          placeholderEn="New tag (EN)"
          addLabel="+ tag"
        />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
          Ferramentas usadas
        </p>
        <ToolTagPicker tags={toolTags} selected={selected} onToggle={toggle} locale={locale} />
      </div>
      <input type="hidden" name="selectedTagIds" value={JSON.stringify([...selected])} />
      <input type="hidden" name="newTags" value={JSON.stringify(pending)} />
    </div>
  );
}
