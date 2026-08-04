'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import type { Tag } from '@/lib/types';
import { pickLocale } from '@/lib/localized-field';
import type { AppLocale } from '@/i18n/routing';

export function TagsEditor({
  allTags,
  initialSelectedIds,
}: {
  allTags: Tag[];
  initialSelectedIds: string[];
}) {
  const locale = useLocale() as AppLocale;
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedIds));
  const [pending, setPending] = useState<{ namePt: string; nameEn: string }[]>([]);
  const [newPt, setNewPt] = useState('');
  const [newEn, setNewEn] = useState('');

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addPending() {
    if (!newPt.trim() || !newEn.trim()) return;
    setPending((prev) => [...prev, { namePt: newPt.trim(), nameEn: newEn.trim() }]);
    setNewPt('');
    setNewEn('');
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selected.has(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
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
          placeholder="Nova tag (PT)"
          className="rounded-xl border border-hairline bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          value={newEn}
          onChange={(event) => setNewEn(event.target.value)}
          placeholder="New tag (EN)"
          className="rounded-xl border border-hairline bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="button"
          onClick={addPending}
          className="rounded-full border border-hairline px-3 py-1.5 text-sm text-foreground/70 hover:text-foreground"
        >
          + tag
        </button>
      </div>
      <input type="hidden" name="selectedTagIds" value={JSON.stringify([...selected])} />
      <input type="hidden" name="newTags" value={JSON.stringify(pending)} />
    </div>
  );
}
