"use client";

import { useEffect } from "react";
import { play, playNote, SFX_NAMES, unlock, type SoundName } from "@/lib/sfx";

const isSoundName = (value: string | null): value is SoundName =>
  value !== null && (SFX_NAMES as string[]).includes(value);

/**
 * Listens for `data-sfx` / `data-sfx-hover` / `data-sfx-note` anywhere in the
 * document so pages and server components can opt into interface sounds with
 * a plain attribute instead of importing the audio engine.
 */
export function SfxProvider() {
  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover)");

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest?.("[data-sfx]");
      const name = target?.getAttribute("data-sfx");
      if (isSoundName(name ?? null)) play(name as SoundName);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hoverCapable.matches) return;

      const target = (event.target as Element | null)?.closest?.(
        "[data-sfx-hover],[data-sfx-note]",
      );
      if (!target) return;

      if (
        event.relatedTarget instanceof Node &&
        target.contains(event.relatedTarget)
      ) {
        return;
      }

      const note = target.getAttribute("data-sfx-note");
      if (note !== null) {
        playNote(Number(note) || 0);
        return;
      }

      const name = target.getAttribute("data-sfx-hover");
      if (isSoundName(name)) play(name);
    };

    const handleUnlock = () => unlock();

    document.addEventListener("pointerdown", handleUnlock, {
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", handleUnlock, {
      capture: true,
      passive: true,
    });
    document.addEventListener("click", handleClick);
    document.addEventListener("pointerover", handlePointerOver, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handleUnlock, { capture: true });
      document.removeEventListener("keydown", handleUnlock, { capture: true });
      document.removeEventListener("click", handleClick);
      document.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  return null;
}
