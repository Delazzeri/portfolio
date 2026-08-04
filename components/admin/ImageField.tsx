'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ImageField({
  name,
  label,
  existingUrl,
}: {
  name: string;
  label: string;
  existingUrl?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const src = preview ?? existingUrl;

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label}
      {src && (
        <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-xl border border-hairline bg-surface-solid">
          <Image src={src} alt="" fill unoptimized={!!preview} className="object-cover" />
        </div>
      )}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="text-sm text-foreground/70"
      />
    </label>
  );
}
