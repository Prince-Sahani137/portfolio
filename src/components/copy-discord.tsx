"use client";

import { useState } from "react";
import { Icon } from "./icons";

export function DiscordRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-sfx="tap"
      data-sfx-hover="tick"
      title={`Copy ${value}`}
      className="group flex w-full cursor-pointer items-center gap-3 px-6 py-3.5 text-left transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
    >
      <span className="flex size-8 flex-none items-center justify-center rounded-md border border-border bg-background text-foreground">
        <Icon name="discord" className="size-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="text-sm font-medium text-foreground">Discord</span>
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {copied ? "copied!" : value}
        </span>
      </span>
      <Icon
        name={copied ? "check" : "copy"}
        className={`size-3.5 transition-colors ${
          copied ? "text-brand" : "text-muted-foreground"
        }`}
      />
    </button>
  );
}
