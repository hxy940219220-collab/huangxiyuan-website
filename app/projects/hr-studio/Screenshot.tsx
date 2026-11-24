"use client";

import Image from "next/image";

type ScreenshotProps = {
  original: string;
  alt: string;
  width: number;
  height: number;
  cover?: boolean;
};

export default function Screenshot({ original, alt, width, height, cover }: ScreenshotProps) {
  const preview = original.replace(/\/([^/]+)$/, "/previews/$1");
  return (
    <Image
      src={preview} alt={alt} width={width} height={height} unoptimized
      preload={cover} loading={cover ? undefined : "eager"}
      onError={({ currentTarget }) => {
        const fallback = new URL(original, currentTarget.baseURI).href;
        if (currentTarget.src !== fallback) currentTarget.src = fallback;
      }}
    />
  );
}
