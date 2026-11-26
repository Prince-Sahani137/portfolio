"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { isMuted, play, setMuted, subscribeMuted, unlock } from "@/lib/sfx";

export function SoundToggle({ className = "" }: { className?: string }) {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    return subscribeMuted(() => setMutedState(isMuted()));
  }, []);

  function toggle() {
    const next = !muted;
    unlock();
    setMuted(next);
    if (!next) play("tap");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-sfx="tap"
      title={muted ? "Turn sounds on" : "Turn sounds off"}
      aria-label="Interface sounds"
      aria-pressed={!muted}
      className={`flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4 ${className}`}
    >
      <Icon name={muted ? "volume-x" : "volume-2"} />
    </button>
  );
}
