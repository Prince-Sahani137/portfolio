"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icons";
import { avatars } from "@/lib/site";

export function Avatar({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 flex -translate-x-1/2 items-end gap-1 whitespace-nowrap font-mono text-[10px] leading-none text-muted-foreground/60"
      >
        click me
        <Icon name="arrow-up-right" className="size-2.5" />
      </div>
      <button
        type="button"
        onClick={() => setIndex((current) => (current + 1) % avatars.length)}
        data-sfx="pop"
        data-sfx-hover="tick"
        aria-label="Prince Sahani. Click to cycle through avatars."
        className="relative block size-16 cursor-pointer overflow-hidden rounded-2xl border shadow-lg ring-4 ring-muted transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-20 md:size-24"
      >
        {avatars.map((avatar, avatarIndex) => (
          <Image
            key={avatar.src}
            src={avatar.src}
            alt={avatarIndex === index ? avatar.alt : ""}
            aria-hidden={avatarIndex !== index}
            fill
            sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
            loading={avatarIndex === 0 ? "eager" : "lazy"}
            className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${
              avatarIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"
        />
      </button>
    </div>
  );
}
