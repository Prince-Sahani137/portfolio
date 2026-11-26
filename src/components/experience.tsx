"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icons";
import type { Experience } from "@/lib/site";

export function ExperienceList({ items }: { items: Experience[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="-mx-3 flex flex-col gap-1">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.org}
            className="relative overflow-hidden rounded-xl transition-[opacity,filter] duration-300 ease-out"
          >
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-colors ${
                isOpen ? "bg-muted/40" : "bg-transparent"
              }`}
            />
            <h3 className="relative flex">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                data-sfx="expand"
                data-sfx-hover="tick"
                aria-expanded={isOpen}
                aria-controls={`experience-panel-${index}`}
                className="group flex flex-1 cursor-pointer items-center gap-3.5 rounded-xl px-3 py-3.5 text-left focus-visible:outline-none"
              >
                <span
                  className={`relative flex size-9 flex-none items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br ${item.logoTone} text-[11px] font-semibold text-white shadow-sm sm:size-10`}
                >
                  {item.logoImage ? (
                    <Image
                      src={item.logoImage}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    item.logo
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-semibold leading-tight">
                    {item.org}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {item.role}
                  </span>
                </span>
                <span className="flex flex-none flex-col items-end font-mono text-[11px] leading-tight tabular-nums text-muted-foreground sm:flex-row sm:gap-1">
                  <span>{item.start}</span>
                  {item.end ? (
                    <span>
                      <span className="hidden sm:inline">– </span>
                      {item.end}
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-7 flex-none items-center justify-center rounded-md border border-border text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring"
                >
                  <Icon
                    name="chevron-down"
                    className={`size-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>

            {isOpen ? (
              <div
                id={`experience-panel-${index}`}
                role="region"
                className="relative grid gap-4 px-3 pb-4 pt-1 text-sm sm:pl-[66px]"
              >
                <ul className="grid gap-2.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1 flex-none rounded-full bg-muted-foreground/40"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex h-6 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.href.startsWith("http")
                        ? "view work"
                        : "see the build"}
                      <Icon name="arrow-up-right" className="size-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
