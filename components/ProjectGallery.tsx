'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProjectImage } from '@/lib/types';
import { Lightbox } from './Lightbox';

export function ProjectBanner({ url, alt }: { url: string; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-t-[28px] bg-surface-solid"
      >
        <Image src={url} alt={alt} fill sizes="100vw" priority className="object-cover" />
      </button>
      {openIndex !== null && (
        <Lightbox
          images={[{ url, alt }]}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

export function ProjectGallery({ images, alt }: { images: ProjectImage[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl border border-hairline"
          >
            <Image src={image.imageUrl} alt="" fill sizes="50vw" className="object-cover" />
          </button>
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox
          images={images.map((image) => ({ url: image.imageUrl, alt }))}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
