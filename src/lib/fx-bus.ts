import type { FxName } from "./fx-registry";

export type PlayDetail = {
  name: FxName;
  /** viewport pixels */
  x: number;
  y: number;
  palette?: string[];
};

const KEY = "fx";

export function fxEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setFxEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage can be blocked */
  }
}

/** Fire a pixel effect at a viewport position. Safe to call from anywhere on the client. */
export function playFx(name: FxName, x: number, y: number, palette?: string[]) {
  if (typeof window === "undefined" || !fxEnabled()) return;
  window.dispatchEvent(
    new CustomEvent<PlayDetail>("pixelfx:play", { detail: { name, x, y, palette } }),
  );
}

/** Fire an effect at the centre of an element (e.g. a button that was clicked). */
export function playFxAt(name: FxName, el: Element, palette?: string[]) {
  const r = el.getBoundingClientRect();
  playFx(name, r.left + r.width / 2, r.top + r.height / 2, palette);
}

export function openTerminal() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("terminal:open"));
}
