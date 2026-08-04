'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProjectImage } from '@/lib/types';

export function GalleryField({ initialImages }: { initialImages: ProjectImage[] }) {
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  function toggleRemove(id: string) {
    setRemoved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {initialImages.map((image) => {
          const isRemoved = removed.has(image.id);
          return (
            <div key={image.id} className="relative">
              <div
                className={`relative h-24 w-32 overflow-hidden rounded-xl border border-hairline bg-surface-solid ${
                  isRemoved ? 'opacity-30' : ''
                }`}
              >
                <Image src={image.imageUrl} alt="" fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => toggleRemove(image.id)}
                className="absolute right-1 top-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] text-white"
              >
                {isRemoved ? 'Desfazer' : 'Remover'}
              </button>
            </div>
          );
        })}
        {newPreviews.map((src, index) => (
          <div
            key={index}
            className="relative h-24 w-32 overflow-hidden rounded-xl border border-hairline bg-surface-solid"
          >
            <Image src={src} alt="" fill unoptimized className="object-cover" />
          </div>
        ))}
      </div>
      <input
        type="file"
        name="galleryFiles"
        accept="image/*"
        multiple
        onChange={(event) =>
          setNewPreviews(
            Array.from(event.target.files ?? []).map((file) => URL.createObjectURL(file)),
          )
        }
        className="text-sm text-foreground/70"
      />
      <input type="hidden" name="removeImageIds" value={JSON.stringify([...removed])} />
    </div>
  );
}
