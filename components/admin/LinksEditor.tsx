'use client';

import { useState } from 'react';
import type { LinkType } from '@/lib/types';

type LinkRow = { label: string; url: string; type: LinkType };

const LINK_TYPES: LinkType[] = ['github', 'vercel', 'live_site', 'instagram', 'ebook', 'other'];

export function LinksEditor({ initialLinks }: { initialLinks: LinkRow[] }) {
  const [links, setLinks] = useState<LinkRow[]>(initialLinks);

  function update(index: number, patch: Partial<LinkRow>) {
    setLinks((prev) => prev.map((link, i) => (i === index ? { ...link, ...patch } : link)));
  }

  function remove(index: number) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function add() {
    setLinks((prev) => [...prev, { label: '', url: '', type: 'other' }]);
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => (
        <div key={index} className="flex flex-wrap items-center gap-2">
          <select
            value={link.type}
            onChange={(event) => update(index, { type: event.target.value as LinkType })}
            className="rounded-xl border border-hairline bg-surface px-2.5 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
          >
            {LINK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            value={link.label}
            onChange={(event) => update(index, { label: event.target.value })}
            placeholder="Label"
            className="w-32 rounded-xl border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            value={link.url}
            onChange={(event) => update(index, { url: event.target.value })}
            placeholder="https://..."
            className="min-w-0 flex-1 rounded-xl border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            aria-label="Remover link"
            className="rounded-full px-2 py-1 text-foreground/50 hover:text-foreground"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="self-start text-sm font-medium text-accent">
        + Adicionar link
      </button>
      <input type="hidden" name="links" value={JSON.stringify(links)} />
    </div>
  );
}
