"use client";

import { openTerminal } from "@/lib/fx-bus";

export function TerminalButton() {
  return (
    <button
      type="button"
      onClick={openTerminal}
      data-sfx="pop"
      title="Open the terminal (or press the ` key)"
      className="cursor-pointer uppercase tracking-widest transition-colors hover:text-brand"
    >
      &gt;_ terminal
    </button>
  );
}
