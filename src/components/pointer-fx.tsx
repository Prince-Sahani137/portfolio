"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-only polish:
 *  - a soft brand-coloured glow that trails the cursor
 *  - `.spotlight` elements get a light that follows the pointer (--mx / --my)
 *  - `.tilt` elements lean toward the pointer (--rx / --ry)
 * Touch devices and reduced-motion users never get the tilt or the trailing lag.
 */
export function PointerFx() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!glow || !fine.matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let shown = false;

    const loop = () => {
      const k = reduce.matches ? 1 : 0.16;
      x += (tx - x) * k;
      y += (ty - y) * k;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      tx = event.clientX;
      ty = event.clientY;
      if (!shown) {
        shown = true;
        x = tx;
        y = ty;
        glow.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const el = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight, .tilt");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      el.style.setProperty("--mx", `${px}px`);
      el.style.setProperty("--my", `${py}px`);
      if (el.classList.contains("tilt") && !reduce.matches) {
        el.style.setProperty("--ry", `${((px / rect.width - 0.5) * 7).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-(py / rect.height - 0.5) * 7).toFixed(2)}deg`);
      }
    };

    const onOut = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.<HTMLElement>(".tilt");
      if (!el) return;
      if (event.relatedTarget instanceof Node && el.contains(event.relatedTarget)) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onLeave = () => {
      shown = false;
      glow.style.opacity = "0";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] size-[540px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklab, var(--brand) 15%, transparent), transparent)",
      }}
    />
  );
}
