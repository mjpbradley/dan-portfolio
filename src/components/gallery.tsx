"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/content/gallery-images";

type GalleryProps = {
  images: GalleryImage[];
};

function nextIndex(current: number, direction: 1 | -1, count: number): number {
  switch (direction) {
    case 1:
      return (current + 1) % count;
    case -1:
      return (current - 1 + count) % count;
    default: {
      const _exhaustive: never = direction;
      return _exhaustive;
    }
  }
}

function imageAt(images: GalleryImage[], index: number): GalleryImage {
  const image = images[index];
  if (!image) {
    throw new Error(`Missing gallery image at ${index}`);
  }
  return image;
}

function preload(src: string) {
  const image = new window.Image();
  image.src = src;
}

export function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const count = images.length;
  const current = count > 0 ? imageAt(images, index) : undefined;

  useEffect(() => {
    if (count === 0) {
      return;
    }

    preload(imageAt(images, nextIndex(index, 1, count)).src);
    preload(imageAt(images, nextIndex(nextIndex(index, 1, count), 1, count)).src);
  }, [count, images, index]);

  useEffect(() => {
    if (count === 0) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((currentIndex) => nextIndex(currentIndex, 1, count));
        setHasMoved(true);
        return;
      }

      if (event.key === "ArrowLeft" && hasMoved) {
        event.preventDefault();
        setIndex((currentIndex) => nextIndex(currentIndex, -1, count));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [count, hasMoved]);

  if (!current) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        setIndex((currentIndex) => nextIndex(currentIndex, 1, count));
        setHasMoved(true);
      }}
      className="gallery-advance cursor-custom"
      aria-label={`Portfolio page ${index + 1} of ${count}. Show next page.`}
    >
      <Image
        src={current.src}
        alt={current.alt}
        width={current.width}
        height={current.height}
        sizes="(max-width: 640px) 88vw, 60vw"
        quality={90}
        priority={index === 0}
        placeholder={current.blurDataURL ? "blur" : "empty"}
        blurDataURL={current.blurDataURL}
        draggable={false}
        className="gallery-frame select-none"
      />
      <span className="sr-only" aria-live="polite">
        Page {index + 1} of {count}
      </span>
    </button>
  );
}
