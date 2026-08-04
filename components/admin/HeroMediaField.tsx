'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { HeroMediaType } from '@/lib/types';

export function HeroMediaField({
  mediaType,
  existingUrl,
}: {
  mediaType: HeroMediaType;
  existingUrl?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const src = preview ?? existingUrl;

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      Mídia
      {src &&
        (mediaType === 'video' ? (
          <video
            key={src}
            src={src}
            controls
            muted
            className="w-full max-w-sm rounded-xl border border-hairline bg-surface-solid"
          />
        ) : (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-hairline bg-surface-solid">
            <Image src={src} alt="" fill unoptimized={!!preview} className="object-cover" />
          </div>
        ))}
      <input
        key={mediaType}
        type="file"
        name="media"
        accept={mediaType === 'video' ? 'video/*' : 'image/*'}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="text-sm text-foreground/70"
      />
    </label>
  );
}
