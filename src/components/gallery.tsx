"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/gallery-images";

const stepCooldownMs = 250;

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
  const lastStepAtRef = useRef(0);
  const count = images.length;
  const current = count > 0 ? imageAt(images, index) : undefined;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (count === 0) {
        return;
      }

      if (direction === -1 && !hasMoved) {
        return;
      }

      const now = Date.now();
      if (now - lastStepAtRef.current < stepCooldownMs) {
        return;
      }

      lastStepAtRef.current = now;
      setIndex((currentIndex) => nextIndex(currentIndex, direction, count));
      setHasMoved(true);
    },
    [count, hasMoved],
  );

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
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [count, step]);

  if (!current) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        step(1);
      }}
      className="gallery-advance cursor-custom"
      aria-label={`Portfolio page ${index + 1} of ${count}. Show next page.`}
    >
      <Image
        src={current.src}
        alt={current.alt}
        width={current.width}
        height={current.height}
        sizes="(max-width: 640px) 82vw, 60vw"
        quality={100}
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
