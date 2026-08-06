'use client';

import { useState } from 'react';
import Image from 'next/image';

function guessNameFromFile(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
  const spaced = withoutExtension.replace(/[-_]+/g, ' ').trim();
  return spaced.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

export function ToolIconField({
  existingUrl,
  onFileNameGuess,
}: {
  existingUrl?: string;
  onFileNameGuess?: (guess: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const src = preview ?? existingUrl;

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      Ícone
      {src && (
        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-hairline bg-surface-solid">
          <Image src={src} alt="" fill unoptimized={!!preview} className="object-contain p-1.5" />
        </div>
      )}
      <input
        type="file"
        name="icon"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setPreview(URL.createObjectURL(file));
          onFileNameGuess?.(guessNameFromFile(file.name));
        }}
        className="text-sm text-foreground/70"
      />
    </label>
  );
}
